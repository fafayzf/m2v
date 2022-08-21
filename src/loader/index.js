const beautify = require('js-beautify')

const JsLoader = require('./js-loader')
const WxmlLoader = require('./wxml-loader')
const WxsslLoader = require('./wxss-loader')
const fs = require('fs')

const { getComponentFiles } = require('../utils')


const combination = ({
  html, 
  js, 
  css
}) => {
  const code = `<template>\n${html}\n</template>\n<script>\n${js}\n</script>\n<style lang="scss" scoped>\n${css}\n</style>`;

  return code
}

const loader = async (dir) => {
  // 已过滤的小程序文件目录，符合小程序组件的目录，存在，.js, .json, .wxml, .wxss 的目录
  const components = getComponentFiles(dir)
  let vueFiles = null
  let cssFiles = []
  let otherFiles = []
  // 若存在组件
  if (components.componentFiles.length > 0) {
    let generatorHtml, generatorWxss, generatorJs, transformFilePath;

    for (let i = 0; i < components.componentFiles.length; i++) {

      const filepath = components.componentFiles[i]
      const content = fs.readFileSync(filepath).toString('utf-8')
      const fileArray = filepath.split('\\')
      const fileData = fileArray[fileArray.length -1]
      const filename = fileData.split('.')

      if (filename[1] === 'wxml') {
        generatorHtml = WxmlLoader(content)
        transformFilePath = filename[0]
      }
      // 由于json配置文件默认加载到script中，故.json 文件逻辑在js中操作
      if (filename[1] === 'js') {
        let jsonContent = null
        const jsonPath = filepath.replace('.js', '.json')

        if (fs.existsSync(jsonPath)) {
          jsonContent = fs.readFileSync(jsonPath).toString('utf-8')
        }

        generatorJs = JsLoader(content, jsonContent)
      }
      if (filename[1] === 'wxss') {
        generatorWxss = await WxsslLoader(content)
      }

    }

    const html = generatorHtml && beautify.html(`\t<div>${generatorHtml}</div>\t`, {
      indent_size: 2
    })
    const js = generatorJs && beautify.js(`\t${generatorJs}\t`, {
      indent_size: 2
    })
    const css = generatorWxss && beautify.css(`\t${generatorWxss}\t`)
    const code =  combination({ html, js, css })
    // 转换后的组件内容和组件名
    vueFiles = {
      name: transformFilePath,
      code
    }

  }
  // 若存在wxss
  if (components.wxssFiles.length > 0) {
    for (let i = 0; i < components.wxssFiles.length; i++) {
      const filepath = components.wxssFiles[i]
      const content = fs.readFileSync(filepath).toString('utf-8')
      const fileArray = filepath.split('\\')
      const fileData = fileArray[fileArray.length -1]
      const generatorWxss = await WxsslLoader(content)

      cssFiles.push({
        name: fileData.split('.')[0],
        code: generatorWxss
      })
    }
  }
  // 其它文件，不处理
  if (components.otherFiles) {
    otherFiles = components.otherFiles
  }

  return { 
    vueFiles, 
    cssFiles, 
    otherFiles
  }
}


module.exports = loader