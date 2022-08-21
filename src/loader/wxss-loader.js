const postcss = require('postcss')

const postcssPluginRpxtoPx = postcss.plugin('postcss-plugin-rpx-to-px', () => {
  return (root) => {
    root.walkDecls((decl) => {
      decl.value = decl.value.replace(/(\d*\.?\d+)\s*rpx/, (match, numStr) => {
				return Number(numStr) / 2 + 'px'
			})
    })
  }
})

const postcssPluginImport = postcss.plugin('postcss-plugin-import', () => {
  return (root) => {
    root.walkAtRules('import', (decl) => {
      decl.params = decl.params.replace(/\.wxss/g, '.css')
    })
  }
})

module.exports = async (code) => {
  const generate = await postcss([
    postcssPluginRpxtoPx, 
    postcssPluginImport
  ]).process(code)
  return generate.css
}
