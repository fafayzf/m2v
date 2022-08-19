const fs = require('fs')
const path = require('path')

// 获取组件文件内容
const getComponentFiles = (dir) => {

  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) throw new Error("该路径错误或不存在")

  const fileList = fs.readdirSync(dir)

  // 获取组件名 例：index.wxml -> index.vue
  const componentNameList = fileList
    .filter(item => /\.wxml$/.test(item))
    .map(item => item.replace('.wxml', ''))


  const newComponentFiles = componentNameList.map(name => {
    // 获取组件的.wxml, .wxss, .js, .wxs, .json 文件路径，并返回内容
    const [wxml, wxss, js, wxs, json] = ['wxml', 'wxss', 'js', 'wxs', 'json'].map(type => {
      
      const filePath = path.join(dir, name + '.' + type)
      const stat = fs.statSync(filePath)
      if (!stat.isFile()) return null
      // 读取文件内容
      const code = fs.readFileSync(filePath).toString('utf-8')

      return code
    })
    
    return {
      wxml, 
      wxss, 
      js, 
      wxs, 
      json, 
      name
    }
  })

  const wxssList = fileList
    .filter(item => !(/\.wxml$/.test(item)) && (/\.wxss$/.test(item)))
    .map(item => item.replace('.wxss', ''))

  const wxssFiles = wxssList.map(name => {
    const [wxss] = ['wxss'].map(type => {
      
      const filePath = path.join(dir, name + '.' + type)
      const stat = fs.statSync(filePath)
      if (!stat.isFile()) return null
      // 读取文件内容
      const code = fs.readFileSync(filePath).toString('utf-8')

      return code
    })
    
    return {
      wxss,
      name
    }
  })

  return {
    newComponentFiles, 
    wxssFiles
  }
}


// 获取目录列表
const traverseDir = (entry) => {
  const dirList = [entry]
  const list = fs.readdirSync(entry)
  list.forEach(name => {
    const _path = path.join(entry, name)
    const stat = fs.statSync(_path)
    if (stat.isDirectory()) {
      dirList.push(...traverseDir(_path))
    }
  })
  return dirList
}

// 创建目录
const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}


module.exports = {
  traverseDir,
  mkdirSync,
  getComponentFiles
}