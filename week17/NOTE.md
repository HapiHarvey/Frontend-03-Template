
## 工具链

Yeoman有什么用？

Yeoman的router？

NPM Link有什么用？

会把一个本地模块link到npm的标准模块中

Yeoman的文件系统

---

## 构建工具

如何理解webpack？

核心思路，打资源打包成一个JS文件，然后让HTML引用这个JS文件。
用途是，能够做多文件合并，可以通过各种的loader和plugin，控制合并的一些规则和对文件进行一些转换。

```sh

npm install webpack-cli -g
npm install webpack -g

```

什么是 npx ?

可以执行 local 的 webpack，不再需要安装全局的 webpack

理解 loader ？

将 source 转换为目标代码；纯粹的文本转换。

理解 babel ？

作用是将 新版本的JS 编译成老版的JS

babel 的 presets ？

可以通过 presets 指定使用一套 babel 的配置，如 preset-env

webpack 里的 babel-loader？

babel-loader 默认不会读取 .babelrc配置

```js

{
  test: /\.js$/,
  use: {
    options: {
      presets: ["@babel/preset-env"],
      plugins: [["@babel/plugin-transform-react-jsx", {pragma: "createElement"}]]
    }
  }
}

```

实践中，一般使用现成的 preset 和 少数特殊的插件。