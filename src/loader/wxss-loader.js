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

module.exports = async (code) => {
  const generate = await postcss([postcssPluginRpxtoPx]).process(code)
  return generate.css
}
