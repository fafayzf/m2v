# m2v

#### 微信小程序（组件）代码转Vue（组件）代码

###### Wechat applet code into Vue code

> only component transformations are supported !!!

### Scripts

```sh

npm i m2v

```

### Use

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

### 转换逻辑

1. 若目录存在 `.wxml`, 则作为组件进行转换
2. 若不存在 `.wxml`, 但存在 `.wxss`, 则作为样式文件单独转换
3. 若既不存在 `.wxml`, 也不存在 `.wxss`, 则直接拷贝文件，不进行任何处理

### 转换实现

| 小程序规则 | vue规则 | 是否实现 |
| ---- | ---- | ---- |
| .wxml, .json, .wxss, .js 文件合并转换成vue单文件 | .json文件只取文件引用部分, .wxml抓换成template, .js 转换成script部分, .wxss转换成style部分 | 已实现 |
|  wx api 转成vue实例方法   | 由于web端的限制，只实现部分sdk功能，现统一转成this.$xxx语法，项目中使用需要单独挂载，部分sdk参考[wx-web-sdk](https://www.npmjs.com/package/wx-web-sdk) | 已实现 |
| .wxs 转成 vue.filter | .wxs在.wxml引用规则被限制，语法需转成vue.filter，在重写.wxml上的.wxs语法规则，转成vue filter语法 | 未实现 |

### tips

1. 只支持lifetimes 里的生命周期，钩子函数有created， attached， ready， moved， detached， error（若写在了lifetimes对象外，请统一移到lifetimes中）