const beautify = require('js-beautify')

const JsLoader = require('./js-loader')
const WxmlLoader = require('./wxml-loader')
const WxsslLoader = require('./wxss-loader')

const { getComponentFiles } = require('../utils')


const combination = ({
  html, 
  js, 
  css
}) => {
  const code = `<template>\n${html}\n</template>\n<script>\n${js}\n</script>\n<style lang="scss" scoped>\n${css}\n</style>`;

  return code
}

const loader = (dir) => {
  // 已过滤的小程序文件目录，符合小程序组件的目录，存在，.js, .json, .wxml, .wxss 的目录
  const components = getComponentFiles(dir)

  return components.map(async content => {
    const generatorHtml = WxmlLoader(content.wxml)
    const generatorJs = JsLoader(content.js)
    const generatorWxss = await WxsslLoader(content.wxss)
    const html = beautify.html(`\t<div>${generatorHtml}</div>\t`, {
      indent_size: 2
    })
    const js = beautify.js(`\t${generatorJs}\t`, {
      indent_size: 2
    })
    const css = beautify.css(`\t${generatorWxss}\t`)
    const code =  combination({ html, js, css })
    return {
      name: content.name,
      code
    };
  })
}


module.exports = loader