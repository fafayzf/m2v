const { Parser, DomHandler, DomUtils } = require("htmlparser2")
const render = require("dom-serializer").default
const traverse = require('../traverse/wxml-traverse')
const config = require('../config')

// path 的方法
const ele = DomUtils


const parser = (code) => {

  const handlerCallback = (error, dom) => {
    if (error) {
      // Handle error
    } else {
      // Parsing completed, do something
      // return dom
    }
  }
  const handler = new DomHandler(handlerCallback)
  const parser = new Parser(handler, {
    xmlMode: true,
    lowerCaseAttributeNames: true,
    recognizeSelfClosing: true,
    lowerCaseTags: true
  })

  parser.write(code)
  parser.end()

  return handler.root
}

const transformNode = (ast) => {
  traverse(ast, {
    typeStatement(node, key, value) {
      
    },
    nameStatement(node, key, value) {
      // 非tag标签，直接忽略
      if (node.type !== 'tag') return

      // 替换成config配置的标签
      node.name = config.elementMap[value] || value
    },
    attribsStatement(node, key, value) {
      // 若自有属性为空，则忽略
      const attrs = Object.getOwnPropertyNames(value)
      if (attrs.length === 0) return
      const newAttribs = {}
      // 替换所有attribute
      attrs.map(attr => {
        let newKey = attr
          .replace(/^wx:if/g, 'v-if')
          .replace(/^wx:for/g, 'v-for')
          .replace(/^wx:for/g, 'v-for')
          .replace(/^wx:key/g, ':key')
          .replace(/^(bind):?/g, '@')
          .replace(/^catch:?(.*?)$/g, '@$1.capture')
          .replace(/tap$/g, 'click')


        let newValue = value[attr].replace(/\{\{(.*?)\}\}/g, (full, match) => {
          if (!/^(:|v-)/.test(newKey)) {
            newKey = ':' + newKey
          }

          if (match && value[attr] !== `{{${match}}}`) {
            return `\$\{${match}\}`
          }

          return match
        })

        if (newValue.indexOf('${') > -1) {
          newValue = `\`${newValue}\``
        }

        newAttribs[newKey] = newValue

        if (newKey === ':class') {
          const v = newValue
            .replace(/^\`(.*)\`$/g, (full, match) => match)
            .split('$')
            .map(item => {
              if (item.indexOf(':') > -1 || item.indexOf('?') > -1) {
                return item.replace(/\{(.*)\}/g, (full, match) => match.trim())
              } else {
                return `'${item.trim()}'`
              }
            })
            .join(',')

          newAttribs[newKey] = `[${v}]`
        }

        if (newKey === ':hidden') {
          if (newValue === 'false' || newValue === 'true') {
            newAttribs['v-show'] = String(!JSON.parse(newValue))
          } else {
            newAttribs['v-show'] = newValue
          }
         
          delete newAttribs[':hidden']
        }
      })

      const isForNode = Object.keys(newAttribs).find(key => key === 'v-for')
      // 替换for
      if (isForNode) {
        const forValue = newAttribs['v-for']
        const formKeyName = newAttribs['v-for-index']
        const forItemName = newAttribs['v-for-item']
        const wxKey = newAttribs[':key']
        const forKey = [forItemName, formKeyName]

        forKey[0] =  forKey[0] || 'item'
        if (wxKey) {
          forKey[1] = !forKey[1] 
        }

        forKey[1] = wxKey ? wxKey : (forKey[1] || 'index')
        newAttribs[':key'] = forKey[1]

        if (wxKey && wxKey.indexOf('.') > -1) {
          newAttribs['v-for'] = `(${[forKey[0], wxKey.split('.')[0]]}) in ${forValue}`
        } else {
          newAttribs['v-for'] = `(${forKey.join(',')}) in ${forValue}`
        }
        // 删除多余的v-for-item, v-for-index
        delete newAttribs['v-for-item']
        delete newAttribs['v-for-index']

      }
      // 重新赋值
      node.attribs = newAttribs
    }
  })

  return ast
}

module.exports = (code) => {
  const ast = parser(code)
  const treeNode = transformNode(ast)
  const dom = render(treeNode, {
    selfClosingTags: true,
    encodeEntities: 'utf8'
  })

  return dom 
}