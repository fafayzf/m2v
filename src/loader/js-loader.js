const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')
const config = require('../config')
const uppercamelcase = require('uppercamelcase')
const decamelize = require('decamelize')


const transformNode = (ast, JsonAst) => {
  // json配置文件
  const jsonConfig = JsonAst && JSON.parse(JsonAst)

  traverse(ast, {
    Program(path) {
      // 根节点打标记
      const node = path.node
      if (node.body.length === 0) return
      node.body.map(childNode => {
        if (childNode.type === 'ExpressionStatement') {
          const expression = childNode.expression
            if (expression.callee.name === 'Component') {
              const properties = expression.arguments[0].properties
              if (properties) {
                // 根节点打标记
                properties.map(item => {
                  item.rootProperty = true 
                })

                if (jsonConfig.usingComponents) {
                  const componentNames = Object.keys(jsonConfig.usingComponents)
                  const obj = componentNames.map(name => types.objectProperty(
                    types.StringLiteral(decamelize(name, {separator: '-'})),
                    types.Identifier(uppercamelcase(name))
                  ))
                  
                  const values = types.objectExpression(obj)
                  const components = types.objectProperty(types.Identifier('components'), values)
                  properties.unshift(components)
                }
              }
              
            }
        }
        
      })
      // 引入组件
      if (jsonConfig.usingComponents) {
        const components = Object.keys(jsonConfig.usingComponents)
        components.forEach(componentName => {
          const importDefaultSpecifier = [
            types.ImportDefaultSpecifier(types.Identifier(uppercamelcase(componentName))),
          ]
          const importDeclaration = types.ImportDeclaration(
            importDefaultSpecifier,
            types.StringLiteral(`${jsonConfig.usingComponents[componentName]}.vue`) // vue3 未加后缀 引入错误
          );
          path.get('body')[0].insertBefore(importDeclaration);
        })
       
      }
    },
    ExpressionStatement(path) {
      const node = path.node
      const expression = node.expression
      if (expression?.type === 'CallExpression' && ['Component'].includes(expression.callee.name)) {
        const objExpression = expression.arguments[0]
        const exportDefault = types.exportDefaultDeclaration(objExpression)
        path.replaceWith(exportDefault)
      }
    },
    ObjectProperty(path) {
      let node = path.node
      if (node.rootProperty) {
        if (node.key.name === 'behaviors' && node.value.type === 'ArrayExpression') {
          node.key.name = 'mixins'
        }

        if (node.key.name === 'properties' && node.value.type === 'ObjectExpression') {
          node.key.name = 'props'
          const properties = node.value.properties
          properties && properties.map(item => {
            item.value.properties && item.value.properties.find(item => {
              item.key.name = item.key.name === 'value' ? 'default' : item.key.name 
            })
          })
        }

        if (node.key.name === 'data' && node.value.type === 'ObjectExpression') {
          node = types.objectMethod('method', node.key, [],
            types.blockStatement([types.returnStatement(node.value)])
          )
        }

        if (node.key.name === 'lifetimes' && node.value.type === 'ObjectExpression') {

          const properties = node.value.properties
          let mounted = []
          let created = null
          let destroyed = null
          properties.length > 0 && properties.forEach(node => {
            if (node.key.name === 'attached' || node.key.name === 'ready') {
              mounted.push(...node.value.body.body)
            }
            if (node.key.name === 'created') {
              created = node
              created.key = types.Identifier('crated')
              path.insertBefore(created)
            }
            if (node.key.name === 'detached') {
              destroyed = node
              destroyed.key = types.Identifier('destroyed')
              path.insertAfter(destroyed)
            }
          })

          node = types.objectMethod('method', types.Identifier('mounted'), [], types.blockStatement(mounted))
          
        }
      }
      path.replaceWith(node)
    },
    MemberExpression(path) {
      const node = path.node
      const { object: _object, property: _property } = node
      if (
        (!node.computed && types.isIdentifier(_property) && _property.name === 'data')
        ||
        (node.computed && types.isStringLiteral(_property) && _property.value === 'data')
      ) {
        const thisExpression = _object
        let isThis = types.isThisExpression(thisExpression)

        if (types.isIdentifier(_object)) {
          const expressionThisName = thisExpression.name
          let currentPath = path
          do {

            currentPath = currentPath.findParent(path => path.isBlockStatement() || path.isProgram())
            if (!currentPath) break

            currentPath.traverse({
              VariableDeclarator (path) {
                const node = path.node
                const id = node.id
                if (types.isThisExpression(node.init)) {
                  if (types.isIdentifier(id) && id.name === expressionThisName) {
                    isThis = true
                  }
                }
              }
            })

          } while (currentPath && !isThis)
        }
        if (isThis) {
          path.replaceWith(_object)
        }
      }
    },
    CallExpression(path) {
      const node = path.node
      const callee = node.callee
      const args = node.arguments
      
      if (callee.property && callee.property.name === 'setData') {

        const properties = args[0] && args[0].properties
        if (!Array.isArray(properties) && properties.length === 0) return

        const memberExpressionMerge = (array) => {
          const nextArray = array.filter((_, i) => i < array.length - 1)
          const _object = nextArray.length == 1 ? nextArray[0] : memberExpressionMerge(nextArray)
          const _property = array[array.length - 1]

          return types.memberExpression(_object, _property)
        }

        const memberExpressionList = properties.map(dataItem => {
          const key = dataItem.key
          const value = dataItem.value
          const leftArr = (key.name || key.value || '')
            .split('.')
            .map((name) => {
              return types.identifier(name)
            })

          leftArr.unshift(callee.object)

          const left = memberExpressionMerge(leftArr)
          const right = value
          return types.assignmentExpression("=", left, right)
        })

        path.replaceWithMultiple(memberExpressionList)
      }

      if (callee.property && callee.property.name === 'triggerEvent') {
        // callee.property.name = types.Identifier('$emit') 
        callee.property = types.Identifier('$emit') 
      }
    }
  })

  return ast
}

module.exports = (code, JsonCode) => {
  const ast = transformNode(parser.parse(code, {sourceType: 'module'}), JsonCode)
  const node = generator(ast, {}, code)
  return node.code
}