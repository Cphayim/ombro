# @ombro/h5plus

[![npm package](https://badgen.net/npm/v/@ombro/h5plus)](https://npmjs.com/package/@ombro/h5plus)

[English](./README.md) | 简体中文

h5plus 的扩展工具包，分为”命令行工具“和 ”API lib“两个部分

- oh5plus 命令行工具

  - 初始化功能，在项目中生成必须的文件，例如 manifest.json
  - 版本号更新功能，同步 package.json 和 manifest.json 中的 version 与 versionCode
  - 正/反向同步功能
    - `public/manifest.json -> dist/manifest.json`
    - `dist/manifest.json -> public/manifest.json`
  - 命令生成 wgt 增量包功能，这在 CI 中会很有用

- API lib
  - execPlus 执行器
  - 系统平台检测
  - App 版本更新检查和自动升级

## 安装

```sh
$ npm install @ombro/h5plus

# pnpm
$ pnpm install @ombro/h5plus
```

## 命令行工具

`@ombro/h5plus` 附带了一个命令行工具 `oh5plus`，你可以使用它来帮助你管理一个 plus 项目，减少一些繁琐的手动操作，包含了如下命令

- oh5plus init: 初始化
- oh5plus update-version：更新版本号
- oh5plus sync：正/反向同步
- oh5plus wgt：生成 wgt 增量包

> `oh5plus` 仅做为 `bin` 入口使用，不提供导出，因此你无法通过 API 方式调用 oh5plus

### oh5plus init：初始化

在一个现有的项目目录中初始化 plus，并生成必要的文件：

- `${cwd}/public/manifest.json`
- `${cwd}/manifest.json`（如果 public 目录不存在）

> 它依赖于一个已经存在的移动端项目（框架无关），你可以通过 `@vrn-deco/cli` 创建一个不含 plus 的移动端项目来进行测试

```sh
# 在安装了 @ombro/h5plus 的项目中执行
pnpm oh5plus init
```

如果你在一个 Vue 或 React 项目中执行了该命令，此时 `public/manifest.json` 文件应该已经创建好了

> **注意事项：**
> oh5plus 依赖 $cwd (当前工作目录)，因此你需要确保在项目根目录（或 package 根目录）执行命令，或将其添加到 package.json 的 scripts 中
>
> **该注意事项同样适用于后续的命令，不再赘述**

在此之后还有一个**重要步骤**，执行一次 build 编译项目，将 `dist/` 目录导入 HBuilder 中，打开 `dist/manifest.json`，在基础配置中重新获取新的 `AppID`

![image-20221101122034299](https://cdn.jsdelivr.net/gh/cphayim/oss@main/images/2022/11/01/122034NPKnLZ.png)

然后打开源码视图，将刚才生成的 id 从 `dist/manifest.json` 复制回 `public/manifest.json`（**这一步可以通过后面介绍的 `plus sync --reverse` 命令处理**）

![image-20221101122630598](https://cdn.jsdelivr.net/gh/cphayim/oss@main/images/2022/11/01/1226316m0cmF.png)

> 另外别忘了修改应用名称（name）等字段，可直接在 `public/manifest.json` 中修改

### oh5plus update-version：更新版本号

更新版本号功能，同步 package.json 和 manifest.json 中的 version 与 versionCode

> 该命令应该在**每次 build 之前**使用

```sh
pnpm oh5plus update-version
```

之后会询问你版本号，输入合适的版本号后回车确认

![image-20221101123637225](https://cdn.jsdelivr.net/gh/cphayim/oss@main/images/2022/11/01/123637Y50dwK.png)

版本号规则：

- 必须满足正则表达式 `/\d+\.\d+\.\d+/` ，例如（`0.1.5`, `1.10.2`）
- 不能小于之前的版本号（可以相等）

该命令将同时更新 `package.json` 的 ` version` 字段，`public/manifest.json` 的 `version.name` 和 `version.code` 字段，`version.code` 转化规则为：

- `1.0.0 -> 10000`
- `0.1.0 -> 100`
- `1.2.3 -> 10203`
- `2.3.11 -> 20311`

### oh5plus sync：正/反向同步

在 `public/manifest.json` 和 `dist/manifest.json` 之间同步内容

> 该命令在每次修改了单边文件后可以使用，你需要确保这两个文件同时存在，否则命令会报错

正向同步是将 `public/manifest.json` 中的内容复制给 `dist/manifest.json`

```sh
pnpm oh5plus sync --forward
```

> 通常你不需要正向同步，因为项目在编译（build）过程中会将 public 中的 manifest.json 文件复制到 dist 中

反向同步是将 `dist/manifest.json` 中的内容复制给 `public/manifest.json`

```sh
pnpm oh5plus sync --reverse
```

> 反相同步在你通过 HBuilder 修改了 `dist/manifest.json` 之后会派上用场

你也可以不带选项执行 `sync` 命令

```sh
pnpm oh5plus sync
```

它将判断 `public/manifest.json` 和 `dist/manifest.json` 文件的**最后更新时间**来决定使用正向更新还是反向更新

> **请记住的一个准则：永远不要同时修改这两个文件**

### oh5plus wgt：生成 wgt 增量包

能够将 dist 目录中的内容生成 `${AppID}.wgt` 增量包，该增量包可以在 h5plus runtime 中替换当前的 `apk/ipa` 内的资源文件，达到热更新目的

> 该命令应该在 **build** 之后使用，如果 dist 不存在，命令会报错

```sh
pnpm oh5plus wgt
```

命令执行后将在 dist 内创建 `unpackage/release/${AppID}.wgt`，建议将整个 `dist` 中的内容上传到服务器，配合 API 库中提供的 `upgrade` 函数来检查更新并安装 wgt 包

最常用的命令组合是： `scripts.build: oh5plus update-version && 你的构建命令 && oh5plus wgt  `

你可以在 CI 中使用该命令打包并部署，App 端将自动更新到最新版本

## API lib

`@ombro/h5plus` 提供了运行时使用的部分增强 API 功能

### execPlus()

```ts
type ExecPlusCallback<T = any> = (plus: any) => T | Promise<T>
function execPlus<T = any>(cb: ExecPlusCallback<T>): Promise<T>
```

`execPlus` 函数接收依赖 `plus` 环境的回调函数，并始终确保仅在 plus 环境（即含有 `h5plus` 的 Webview 容器内）下，才会调用回调函数，并传入 `plus` 对象

- `execPlus` 可以在任何地方调用
- 你不再需要做类似 `typeof plus !== 'undefined'` 的判断或 `plusready` 的事件监听
  - `execPlus` 会确保仅在 `plus` 存在时才调用你传入的回调函数
  - 并且传递 `plus` 本身给回调函数的参数（这可以解决 ts 中需要声明全局变量 `plus` 的问题）

示例代码：

```ts
import { execPlus } from '@ombro/h5plus'

// 回调函数只会在 plus 环境下执行，直接在浏览器中访问这部分代码会被忽略
execPlus((plus) => {
  // 竖屏锁定
  plus.screen.lockOrientation('portrait-primary')
  // 将手机电池栏文字颜色改为白色
  plus.navigator.setStatusBarStyle('light')
  // ...
})
```

> 应该始终在包含 plus 的逻辑的地方使用 `execPlus`

### platform

判断当前操作系统

```ts
type Platform = {
  iPhone: boolean // 当前系统是否是 iOS
  iPad: boolean // 当前系统是否是 iPadOS
  Android: boolean // 当前系统是否是 Android（这里处理了鸿蒙的判断，华为上依然是 true）
}
```

示例代码：

```ts
import { platform } from '@ombro/h5plus'

platform.iPhone
platform.iPad
platform.Android
```

### 更新检查和自动安装更新包

提供了 `checkVersion()` 和 `upgrade()` 两个函数来提供 app 可用更新检查和自动安装更新

### checkVersion()

该函数通过对比线上和本地的 `manifest.json` 来检查是否存在新版本

```ts
/**
 * 版本检查选项
 */
type CheckVersionOptions = {
  /**
   * manifest http url
   */
  manifestUrl: string
  /**
   * 是否静默（将不弹出 toast）
   * 默认 false
   */
  silent?: boolean
}

/**
 * 版本检查结果
 */
type CheckVersionResult = {
  /**
   * 是否有新版本
   */
  hasNewVersion: boolean
  /**
   * 应用 id
   */
  appid: string
  /**
   * 最新版本号
   */
  version: string
  /**
   * 最新版本 code
   */
  versionCode: number
  /**
   * manifest url
   */
  manifestUrl: string
  /**
   * 线上 manifest 对象
   */
  manifest: any
}

function checkVersion(options: CheckVersionOptions): Promise<CheckVersionResult>
```

示例代码：

```ts
import { checkVersion } from '@ombro/h5plus'

const { hasNewVersion, version } = await checkVersion({
  // /app 访问的目录即 dist 部署目录，建议带上个时间戳，防止 json 文件被 nginx 设置的缓存影响
  manifestUrl: `http://yourproject.com/app/manifest.json?t=${Date.now()}`,
})

if (hasNewVersion) {
  console.log(`发现新版本: ${version}`)
}
```

> 值得一提的是，该函数不一定要在 `execPlus` 的回调函数中调用，因为函数内部实现已经使用了 `execPlus`，当然，再套一层也不会有问题

### upgrade()

该函数通过对比线上和本地的 `manifest.json` 来检查是否存在新版本（在此期间会调用 `checkVersion()`），当存在新版本时，将下载 wgt 资源包并自动安装

```ts
/**
 * 升级选项
 */
type UpgradeOptions = CheckVersionOptions & {
  /**
   * wgt 下载地址或返回 wgt 下载地址的函数
   * 默认取 manifestUrl 的相对地址 './unpackage/release/${appId}.wgt'
   */
  wgtUrl?: string | ((result: CheckVersionResult) => string)

  /**
   * 安装 wgt 成功后的行为
   * - `restart`: 直接重启应用
   * - `none`: 不做处理，安装的更新将在下次启动 app 时生效
   * 默认为 'none'
   */
  behavior?: 'restart' | 'none'
}

function upgrade(options: UpgradeOptions): Promise<void>
```

示例代码：

```ts
import { upgrade } from '@ombro/h5plus'

upgrade({
  // /app 访问的目录即 dist 部署目录，建议带上个时间戳，防止 json 文件被 nginx 设置的缓存影响
  manifestUrl: `http://yourproject.com/app/manifest.json?t=${Date.now()}`,
  // behavior: 'restart' // 如果你希望在安装 wgt 文件后立即重启 app（应用新版本）
})
```

> 如果你使用 `oh5plus` 在 `build` 后生成 wgt，并发布 dist，那么不需要传入 `wgtUrl`，否则需要手动指定
>
> `upgrade` 函数已经包含了 `checkVersion` 操作，因此，不需要在调用它之前调用 `checkVersion`
>
> 同 `checkVersion` 一样，`upgrade` 内部实现也使用了 `execPlus`
