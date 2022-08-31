# @ombro/is-main

![npm package](https://badgen.net/npm/v/@ombro/is-main)

检查当前模块是否是 ESM 的入口模块，通常在命令行脚本中很有用

## 安装

```sh
$ npm install @ombro/is-main
```

## 使用

```js
import { isMain } from '@ombro/is-main'

if (isMain(import.meta)) {
  // ...
}
```

如果您使用的是 CommonJS 模块，那么请直接判断

```js
if (require.main === module) {
  // ...
}
```

## 示例

假设我们要创建 `clean` 和 `build` 两个任务，在 `build` 之前我们会通过一个参数 `--clean` 来判断是否需要先进行 `clean`，并且 `clean` 任务也可以单独执行

```sh
# Only clean
node clean.js

# Only build
node build.js
# Clean and build
node build.js --clean
```

`clean.js`:

```js
import { isMain } from '@ombro/is-main'

export function clean() {
  // clean...
}

// Executed only when the clean.js is an entry module
if (isMain(import.meta)) {
  clean()
}
```

`build.js`:

```js
import { isMain } from '@ombro/is-main'
import { clean } from './clean.js'

export function build() {
  // build...
}

// Executed only when the build.js is an entry module
if (isMain(import.meta)) {
  process.argv.includes('--clean') && clean()
  build()
}
```

## License

MIT
