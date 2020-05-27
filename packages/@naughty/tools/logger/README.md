<!--
 * @Author: Cphayim
 * @Date: 2020-05-27 13:59:30
 * @LastEditTime: 2020-05-27 14:05:59
 * @Description:
-->
# @naughty/logger

## 如何安装

```sh
npm i @naughty/logger
```

## 如何使用

```js
import { Logger } from '@naughty/logger' // ESM
// 或 const { Logger } = require('@naughty/logger') // CommonJS

Logger.print(123) // 控制台打印普通输出，类似于 console.log
Logger.info(123) // 输出蓝色 '[信息]: 123'
Logger.info(123, {tip: '标签'}) // 输出蓝色 '[标签]: 123'
Logger.exec(123) // 输出青色 '[执行]: 123'
Logger.success(123) // 输出绿色 '[成功]: 123'
Logger.error(123) // 输出红色 '[错误]: 123'

// 默认 devOnly 为 true
// 仅在环境变量 process.env.NODE_ENV 为 'devlopment' 时打印信息
Logger.debug(123) // 输出黄色 '[调试]: 123'

// 在任何环境打印信息
Logger.debug(456, { devOnly: false }) // 输出黄色 '[调试]: 456'
```
