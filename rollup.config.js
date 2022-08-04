
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { uglify } from "rollup-plugin-uglify"

const path = require('path')

export default {
  input: path.resolve(__dirname, './src/index.js'),
  output: {
    file: path.resolve(__dirname, './lib/m2v.mini.js'),
    format: 'cjs'
  },
  plugins: [nodeResolve(), commonjs(), json(), uglify()]
};