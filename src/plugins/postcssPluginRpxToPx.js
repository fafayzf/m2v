module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-plugin-rpx-to-px',
    Once (root, { result }) {
      root.walkDecls((decl) => {
        decl.value = decl.value.replace(/(\d*\.?\d+)\s*rpx/, (match, numStr) => {
          return Number(numStr) / 2 + 'px'
        })
      })
      root.walkAtRules('import', (decl) => {
        decl.params = decl.params.replace(/\.wxss/g, '.css')
      })
    }
  }
}

module.exports.postcss = true