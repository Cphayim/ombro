<!--
 * @Author: Cphayim
 * @Date: 2020-05-27 13:59:30
 * @LastEditTime: 2020-11-04 11:18:25
 * @Description:
-->
# @naughty/packagejson

## Why?

When you try to read package.json with typescript

for example:

```ts
import pkg from 'package.json'
```

You may get:
```
Cannot find module'package.json'. Consider using'--resolveJsonModule' to import module with'.json' extension
```

After you enable `resolveJsonModule` in `tsconfig.json`, `package.json` will be output in your `dist` directory and destroy the directory structure

```
├── package.json
├── src
│   └── xxx
├── dist
│   ├── src ???
│   │   └── xxx
│   └── package.json ???
```


Choosing `require('package.json')` is one way, but you can choose an elegant way

## Install

```sh
npm i @naughty/packagejson
```

## Usage

```ts
import path from 'path'
import { readPackage, IPackage } from '@naughty/packagejson'

const pkg: IPackage = readPackage(path.join(__dirname, '..', '..'))

console.log(pkg.name, pkg.version) // that's it
```

### readPackage

Read the `package.json` in the specified directory and returns the `IPackage` object

`readPackage(dir: string)`

- `dir`: `[string]` specified directory, default: `process.cwd()`

### writePackage

Write the `IPackage` object to the `package.json` in the specified directory

`writePackage(pkg: IPackage, dir: string)`

- `pkg`: `[IPackage]`
- `dir`: `[string]` specified directory, default: `process.cwd()`
