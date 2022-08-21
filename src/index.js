const { traverseDir, mkdirSync } = require('./utils/index')
const path = require('path')
const fs = require('fs')
const loader = require('./loader')

// 执行任务
const tasks = (entry, output) => {

  const fileList = traverseDir(entry)
  
  return fileList.map(async entryPath => {
    const result = await loader(entryPath)
    const baseUrl = path.join(output, entryPath.replace(entry, ''))
    // 写入组件
    if (result.vueFiles && mkdirSync(baseUrl)) {
      const { name, code } = result.vueFiles
      fs.writeFileSync(path.join(baseUrl, name + '.vue'), code)
    }
    // 写入css
    if (result.cssFiles.length > 0 && mkdirSync(baseUrl)) {
      result.cssFiles.map(wxssObj => {
        const { name, code } = wxssObj
        fs.writeFileSync(path.join(baseUrl, name + '.css'), code)
      })
    }
    // 复制其它文件
    if (result.otherFiles.length > 0 && mkdirSync(baseUrl)) {
      result.otherFiles.map(paths => {
        const fileArray = paths.split('\\')
        fs.copyFileSync(paths, path.join(baseUrl, fileArray[fileArray.length - 1]))
      })
    }
  })
}


// 输出
const transform = (entry, output) => {
  return Promise.all(tasks(entry, output))
}



module.exports = {
  transform
}