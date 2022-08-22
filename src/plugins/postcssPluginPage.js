module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-plugin-page',
    Rule (rule) {
      if (rule.selector === 'page') {
        rule.selector = ':root'
      }
    }
  }
}

module.exports.postcss = true