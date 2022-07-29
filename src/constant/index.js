const path = require('path')

const findDir = (dir) => {
  // 当前目录是否存在mini.config.js 配置文件
  if (path.join(dir, 'mini.config.js')) {
    return dir
  }
  const parentDir = dirname(dir)
  if (dir === parentDir) {
    return dir
  }
  return findDir(parentDir)
}

const CWD = process.cwd()
const ROOT = findDir(CWD)
const LOADER_DIR = path.join(ROOT, 'loader')

module.exports = {
  CWD,
  ROOT,
  LOADER_DIR
}