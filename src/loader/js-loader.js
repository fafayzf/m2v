const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')
const config = require('../config')


const transformNode = (ast) => {
  traverse(ast, {
    Program(path) {
      // 根节点打标记
      const node = path.node
      if (node.body.length === 0) return
      node.body.map(childNode => {
        const expression = childNode.expression
        if (expression.callee.name === 'Component') {
          const properties = expression.arguments[0].properties
          properties && properties.map(item => {
            item.rootProperty = true // 打标
          })
        }
      })
    },
    ExpressionStatement(path) {
      const node = path.node
      const expression = node.expression
      if (expression.type === 'CallExpression' && ['Component'].includes(expression.callee.name)) {
        const objExpression = expression.arguments[0]
        const exportDefault = types.exportDefaultDeclaration(objExpression)
        path.replaceWith(exportDefault)
      }
    },
    ObjectProperty(path) {
      const node = path.node
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
      }
      path.replaceWith(node)
    }
  })

  return ast
}

module.exports = (code) => {
  const ast = transformNode(parser.parse(code))
  const node = generator(ast, {}, code)
  return node.code
}