const { difference } = require('loadsh')
const fs = require('fs')
const path = require('path')



// 判断指定后缀名文件是否存在
const extractComponentsIndex = (fileList) => {
  return fileList.findIndex(file => /\.wxml$/.test(file))
}

const extractFiles = (dir, fileList) => {
  return fileList
    .map(filename => path.join(dir, filename))
    .filter(filePath => {
      const stat = fs.statSync(filePath)
      return !stat.isDirectory()
    })
}
// 获取组件文件内容
const getComponentFiles = (dir) => {

  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) throw new Error("该路径错误或不存在")

  const fileList = fs.readdirSync(dir)

  // 1. 判断是否存在.wxml, 若.wxml 存在，则取找其它几个相同名字的文件，组合， 其它文件为可选
  // 2. 若不存在.wxml, 则视为非组件目录，wxss处理成css, 其它一律不改变内容

  const wxmlIndex = extractComponentsIndex(fileList)
  // 组件文件集合
  let componentFiles = []

  if (wxmlIndex > -1) {
    const types = ['.js', '.json', '.wxss', '.wxs']
    const componentname = fileList[wxmlIndex]
    for (let i = 0; i < types.length; i++) {
      const filename = componentname.split('.')[0]
      // 其它组件文件
      const oFilePath = path.join(dir, filename + types[i])
      // 若存在，则写入
      fs.existsSync(oFilePath) && componentFiles.push(oFilePath)
    }
    componentFiles.push(path.join(dir, componentname))
    
  }
 
  // wxss 文件集合
  let wxssFiles = []

  // 组件外的所有文件
  const noComponentFiles = difference(extractFiles(dir, fileList), componentFiles)
  noComponentFiles.map(filePath => {
    filePath && /\.wxss/.test(filePath) && wxssFiles.push(filePath)
  })

  // 其它文件集合
  const otherFiles = difference(noComponentFiles, wxssFiles)

  return {
    componentFiles, 
    wxssFiles, 
    otherFiles
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