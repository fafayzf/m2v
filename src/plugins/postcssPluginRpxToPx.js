module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-plugin-rpx-to-px',
    Once (root, { result }) {
      root.walkDecls((decl) => {
        decl.value = decl.value.replace(/(\d*\.?\d+)\s*rpx/, (match, numStr) => {
          return Number(numStr) / 2 + 'px'
        })
      })
    }
  }
}

module.exports.postcss = true