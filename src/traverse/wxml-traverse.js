const astMap = new Map()

astMap.set('typeStatement', {
  visitor: 'type'
})

astMap.set('nameStatement', {
  visitor: 'name'
})

astMap.set('attribsStatement', {
  visitor: 'attribs'
})

const traverse = (node, visitors) => {
  astMap.forEach((value, key) => {

    const visitor = node[value.visitor]
    let visitorFunc = visitors[key] || {}
    if (visitor) {
      if (typeof visitorFunc === 'function') {
        visitorFunc = {
          enter: visitorFunc
        }
      }
      visitorFunc.enter && visitorFunc.enter(node, value.visitor, node[value.visitor])
    }
  })

  if (Array.isArray(node.children) && node.children.length > 0) {
    node.children.map(childNode => {
      traverse(childNode, visitors)
    })
  }
}

module.exports = traverse