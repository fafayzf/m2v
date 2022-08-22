const postcss = require('postcss')
const atImport = require("postcss-import")
const postcssPluginRpxtoPx = require('../plugins/postcssPluginRpxToPx')
const postcssPluginPage = require('../plugins/postcssPluginPage')
// const postcssPluginRpxtoPx = postcss.plugin('postcss-plugin-rpx-to-px', () => {
//   return (root) => {
//     root.walkDecls((decl) => {
//       decl.value = decl.value.replace(/(\d*\.?\d+)\s*rpx/, (match, numStr) => {
// 				return Number(numStr) / 2 + 'px'
// 			})
//     })
//   }
// })

// const postcssPluginRpxtoPx = (opts = {}) => {
//   return {
//     postcssPlugin: 'postcss-plugin-rpx-to-px',
//     Once (root, { result }) {
//       root.walkDecls((decl) => {
//         decl.value = decl.value.replace(/(\d*\.?\d+)\s*rpx/, (match, numStr) => {
//           return Number(numStr) / 2 + 'px'
//         })
//       })
//     }
//   }
// }

// const postcssPluginImport = postcss.plugin('postcss-plugin-import', () => {
  
//   return (root) => {
//     root.walkAtRules('import', (decl) => {
//       decl.params = decl.params.replace(/\.wxss/g, '.css')
//     })
//   }
// })

module.exports = async (code, filepath) => {
  const generate = await postcss()
    .use(atImport())
    .use(postcssPluginPage())
    .use(postcssPluginRpxtoPx())
    .process(code, {
      from: filepath
    })
  return generate.css
}
