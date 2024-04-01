# @ombro/h5plus

[![npm package](https://badgen.net/npm/v/@ombro/h5plus)](https://npmjs.com/package/@ombro/h5plus)

English | [简体中文](./README_zh.md)

The extension toolkit of h5plus is divided into two parts: "command line tool" and "API lib"

- oh5plus command line tool

  - Initialization function to generate necessary files in the project, such as manifest.json
  - Version number update function, synchronize version and versionCode in package.json and manifest.json
  - Forward/reverse sync function
    - `public/manifest.json -> dist/manifest.json`
    - `dist/manifest.json -> public/manifest.json`
  - Command to generate wgt delta package function, which will be useful in CI

- API lib
  - execPlus executor
  - System platform detection
  - App version update check and automatic upgrade

## Install

```sh
$ npm install @ombro/h5plus

# pnpm
$ pnpm install @ombro/h5plus
```

## Command line tools

`@ombro/h5plus` comes with a command line tool `oh5plus`. You can use it to help you manage a plus project and reduce some tedious manual operations. It includes the following commands

- oh5plus init: initialization
- oh5plus update-version: update version number
- oh5plus sync: forward/reverse synchronization
- oh5plus wgt: generate wgt incremental package

> `oh5plus` is only used as a `bin` entry and does not provide export, so you cannot call oh5plus through API.

### oh5plus init: initialization

Initialize plus in an existing project directory and generate the necessary files:

- `${cwd}/public/manifest.json`
- `${cwd}/manifest.json` (if the public directory does not exist)

> It depends on an existing mobile project (framework independent). You can create a mobile project without plus through `@vrn-deco/cli` for testing

```sh
# Execute in the project where @ombro/h5plus is installed
pnpm oh5plus init
```

If you executed this command in a Vue or React project, the `public/manifest.json` file should have been created by now

> **Note:**
> oh5plus depends on $cwd (current working directory), so you need to make sure to execute the command in the project root directory (or package root directory), or add it to the scripts of package.json
>
> **This note also applies to subsequent commands and will not be repeated**

There is another **important step** after this, execute a build to compile the project, import the `dist/` directory into HBuilder, open `dist/manifest.json`, and re-obtain the new `AppID` in the basic configuration

![image-20221101122034299](https://cdn.jsdelivr.net/gh/cphayim/oss@main/images/2022/11/01/122034NPKnLZ.png)

Then open the source code view and copy the id just generated from `dist/manifest.json` back to `public/manifest.json` (**This step can be processed through the `plus sync --reverse` command introduced later**)

![image-20221101122630598](https://cdn.jsdelivr.net/gh/cphayim/oss@main/images/2022/11/01/1226316m0cmF.png)

> Also don’t forget to modify fields such as the application name (name), which can be modified directly in `public/manifest.json`

### oh5plus update-version: Update version number

Update version number function, synchronize version and versionCode in package.json and manifest.json

> This command should be used before each build

```sh
pnpm oh5plus update-version
```

You will then be asked for the version number. Enter the appropriate version number and press Enter to confirm.

![image-20221101123637225](https://cdn.jsdelivr.net/gh/cphayim/oss@main/images/2022/11/01/123637Y50dwK.png)

Version number rules:

- Must satisfy the regular expression `/\d+\.\d+\.\d+/`, for example (`0.1.5`, `1.10.2`)
- Cannot be less than the previous version number (can be equal)

This command will simultaneously update the `version` field of `package.json`, the `version.name` and `version.code` fields of `public/manifest.json`, and the `version.code` conversion rules are:

- `1.0.0 -> 10000`
- `0.1.0 -> 100`
- `1.2.3 -> 10203`
- `2.3.11 -> 20311`

### oh5plus sync: forward/reverse synchronization

Sync content between `public/manifest.json` and `dist/manifest.json`

> This command can be used after each modification of a unilateral file. You need to ensure that both files exist at the same time, otherwise the command will report an error.

Forward synchronization is to copy the contents of `public/manifest.json` to `dist/manifest.json`

```sh
pnpm oh5plus sync --forward
```

> Usually you don't need forward synchronization, because the project will copy the manifest.json file in public to dist during the build process

Reverse synchronization is to copy the contents of `dist/manifest.json` to `public/manifest.json`

```sh
pnpm oh5plus sync --reverse
```

> Anti-phase synchronization will come in handy after you modify `dist/manifest.json` through HBuilder

You can also execute the `sync` command without options

```sh
pnpm oh5plus sync
```

It will judge the **last update time** of the `public/manifest.json` and `dist/manifest.json` files to decide whether to use forward update or reverse update

> **One rule to remember: never modify both files at the same time**

### oh5plus wgt: generate wgt incremental package

The content in the dist directory can be generated into an incremental package of `${AppID}.wgt`. This incremental package can replace the resource files in the current `apk/ipa` in h5plus runtime to achieve hot update purposes.

> This command should be used after **build**. If dist does not exist, the command will report an error

```sh
pnpm oh5plus wgt
```

After the command is executed, `unpackage/release/${AppID}.wgt` will be created in the dist. It is recommended to upload the entire `dist` content to the server and cooperate with the `upgrade` function provided in the API library to check for updates and install wgt Bag

The most commonly used command combination is: `scripts.build: oh5plus update-version && your build command && oh5plus wgt `

You can use this command to package and deploy in CI, and the App will be automatically updated to the latest version.

##APIlib

`@ombro/h5plus` provides some enhanced API functions used at runtime

### execPlus()

```ts
type ExecPlusCallback<T = any> = (plus: any) => T | Promise<T>
function execPlus<T = any>(cb: ExecPlusCallback<T>): Promise<T>
```

The `execPlus` function receives a callback function that depends on the `plus` environment, and always ensures that the callback function is called only in the plus environment (that is, within the Webview container containing `h5plus`), and passes in the `plus` object

- `execPlus` can be called anywhere
- You no longer need to do judgments like `typeof plus !== 'undefined'` or event listening for `plusready`
  - `execPlus` will ensure that the callback function you pass in is only called when `plus` exists
  - And pass `plus` itself to the parameter of the callback function (this can solve the problem of needing to declare the global variable `plus` in ts)

Sample code:

```ts
import { execPlus } from '@ombro/h5plus'

// The callback function will only be executed in the plus environment. Accessing this part of the code directly in the browser will be ignored.
execPlus((plus) => {
  //Vertical screen lock
  plus.screen.lockOrientation('portrait-primary')
  // Change the text color of the mobile phone battery bar to white
  plus.navigator.setStatusBarStyle('light')
  // ...
})
```

> `execPlus` should always be used where plus logic is included

### platform

Determine the current operating system

```ts
type Platform = {
  iPhone: boolean // Whether the current system is iOS
  iPad: boolean // Whether the current system is iPadOS
  Android: boolean // Whether the current system is Android (Hongmeng's judgment is processed here, it is still true on Huawei)
}
```

Sample code:

```ts
import { platform } from '@ombro/h5plus'

platform.iPhone
platform.iPad
platform.Android
```

### Update checking and automatic installation of update packages

Two functions, `checkVersion()` and `upgrade()`, are provided to provide app with available update checking and automatic installation of updates.

### checkVersion()

This function checks whether a new version exists by comparing the online and local `manifest.json`

```ts
/**
 * Version check option
 */
type CheckVersionOptions = {
  /**
   * manifest http url
   */
  manifestUrl: string
  /**
   * Whether to be silent (no toast will pop up)
   * Default false
   */
  silent?: boolean
}

/**
 * version check results
 */
type CheckVersionResult = {
  /**
   * is there a new version?
   */
  hasNewVersion: boolean
  /**
   * application id
   */
  appid: string
  /**
   * latest version number
   */
  version: string
  /**
   * latest version code
   */
  versionCode: number
  /**
   * manifest url
   */
  manifestUrl: string
  /**
   * online manifest object
   */
  manifest: any
}

function checkVersion(options: CheckVersionOptions): Promise<CheckVersionResult>
```

Sample code:

```ts
import { checkVersion } from '@ombro/h5plus'

const { hasNewVersion, version } = await checkVersion({
  // The directory accessed by /app is the dist deployment directory. It is recommended to bring a timestamp to prevent the json file from being affected by the cache set by nginx.
  manifestUrl: `http://yourproject.com/app/manifest.json?t=${Date.now()}`,
})

if (hasNewVersion) {
  console.log(`New version found: ${version}`)
}
```

> It is worth mentioning that this function does not have to be called in the callback function of `execPlus`, because the internal implementation of the function already uses `execPlus`. Of course, there will be no problem in adding another layer.

### upgrade()

This function checks whether a new version exists by comparing the online and local `manifest.json` (during this period `checkVersion()` will be called). When a new version exists, the wgt resource package will be downloaded and automatically installed.

```ts
/**
 * Upgrade options
 */
type UpgradeOptions = CheckVersionOptions & {
  /**
   * wgt download address or function that returns wgt download address
   * The relative address of manifestUrl is taken by default './unpackage/release/${appId}.wgt'
   */
  wgtUrl?: string | ((result: CheckVersionResult) => string)

  /**
   * Behavior after successful installation of wgt
   * - `restart`: directly restart the application
   * - `none`: No processing is done, the installed update will take effect the next time the app is launched
   * Default is 'none'
   */
  behavior?: 'restart' | 'none'
}

function upgrade(options: UpgradeOptions): Promise<void>
```

Sample code:

```ts
import { upgrade } from '@ombro/h5plus'

upgrade({
  // The directory accessed by /app is the dist deployment directory. It is recommended to bring a timestamp to prevent the json file from being affected by the cache set by nginx.
  manifestUrl: `http://yourproject.com/app/manifest.json?t=${Date.now()}`,
  // behavior: 'restart' // If you want to restart the app (apply the new version) immediately after installing the wgt file
})
```

> If you use `oh5plus` to generate wgt after `build` and publish dist, then you do not need to pass in `wgtUrl`, otherwise you need to specify it manually
>
> The `upgrade` function already contains the `checkVersion` operation, so there is no need to call `checkVersion` before calling it
>
> Like `checkVersion`, the internal implementation of `upgrade` also uses `execPlus`
