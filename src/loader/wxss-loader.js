const postcss = require('postcss')
let importcss = ''
const postcssPluginRpxtoPx = postcss.plugin('postcss-plugin-rpx-to-px', () => {
  return (root) => {
    root.walkDecls((decl) => {
      decl.value = decl.value.replace(/(\d*\.?\d+)\s*rpx/, (match, numStr) => {
				return Number(numStr) / 2 + 'px'
			})
    })
  }
})

const postcssPluginImport = postcss.plugin('postcss-plugin-import', (type) => {
  return (root) => {
    root.walkAtRules('import', (decl) => {
      const importVal = decl.params.replace(/\.wxss/g, '.css')
      importcss += `@${decl.name} ${importVal};`
      if (type === 'component') {
        decl.remove()
      } else {
        decl.params = importVal
      }
    })
  }
})

module.exports = async (code, type) => {
  const generate = await postcss([
    postcssPluginRpxtoPx, 
    postcssPluginImport(type)
  ]).process(code)
  return {
    importCss: importcss,
    css: generate.css
  }
}
