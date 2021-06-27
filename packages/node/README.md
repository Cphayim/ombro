# @naughty/cy-node

🚀一个快速启动 `ESNext` 运行时

## 如何使用？

安装
```sh
# 安装在项目中（推荐）
$ npm install -D @naughty/cy-node
# 安装在全局
$ npm install -g @naughty/cy-node
```

**命令**
```sh
$ cy-node xxx.js

$ cy-node --entry=./src/app.js
```

**参数**

* entry: [可选] 启动文件，默认为 `./src/index.js`


## 更新日志

* v1.0.12
  * 修复在项目中局部安装，通过 npm 脚本运行时无法找到 babel 启动器的问题
* v1.0.0
  * 现在可以直接使用 `cy-node xxx` 来执行指定文件了
