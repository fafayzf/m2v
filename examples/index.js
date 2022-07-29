const path = require('path')
const { transform } = require('../src/index')

const resolve = (file) => {
  return path.resolve(__dirname, file)
}

const entry = resolve('./components/')
const output = resolve('./outComponents/')

transform(entry, output)