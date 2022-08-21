# m2v

#### 微信小程序（组件）代码转Vue（组件）代码
###### Wechat applet code into Vue code

> only component transformations are supported !!!

## Scripts

```sh

npm i m2v

```

## Use


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

## 转换逻辑

1. 若目录存在`.wxml`, 则作为组件进行转换
2. 若不存在`.wxml`, 但存在`.wxss`, 则作为样式文件单独转换
3. 若既不存在`.wxml`, 也不存在`.wxss`, 则直接拷贝文件，不进行任何处理