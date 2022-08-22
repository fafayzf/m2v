module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-plugin-page',
    Rule (rule) {
      if (rule.selector === 'page') {
        rule.selector = '.page'
      }
    }
  }
}

module.exports.postcss = true