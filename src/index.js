const { traverseDir, mkdirSync } = require('./utils/index')
const path = require('path')
const fs = require('fs')
const loader = require('./loader')

// 执行任务
const tasks = (entry, output) => {

  const fileList = traverseDir(entry)

  return fileList.map(async entryPath => {
    const result = await loader(entryPath)

    return Promise.resolve(result).then(components => {
        if (!components) return
        if (!Array.isArray(components)) {
          components = [components]
        }
        components.forEach(async component => {

          const { code, name } = await component;
          const baseUrl = path.join(output, entryPath.replace(entry, ''))
          // 同步创建目录
          mkdirSync(baseUrl)

          const outputPath = path.join(baseUrl, name + '.vue')
          // 写入文件
          fs.writeFileSync(outputPath, code)
        });
        // 转义后的组件 
        // console.log('vue-components', components)
      })
  })
} 

// 输出
const transform = (entry, output) => {
  
  return Promise.all(tasks(entry, output))
}



module.exports = {
  transform
}