const path = require('path')

module.exports = {
  entryFile: path.resolve(__dirname, './package.json'),
  outputFile: path.resolve(__dirname, './build/version.json')
}