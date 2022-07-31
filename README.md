## 微信小程序代码转Vue代码

### 只支持组件（Component）转换！！！

```js

const path = require('path')
const { transform } = require('m2v')

const resolve = (file) => {
  return path.resolve(__dirname, file)
}

// 入口的微信小程序组件文件夹
const entry = resolve('./components/')

// 编译后的Vue组件文件夹
const output = resolve('./outComponents/')

transform(entry, output)

```