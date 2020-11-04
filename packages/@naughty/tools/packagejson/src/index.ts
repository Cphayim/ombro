import path, { join } from 'path'
import fs from 'fs'

export interface IPackage {
  name: string
  version: string
  description: string
  author: string
  license: string
  keywords: string[]
  [x: string]: any
}

/**
 * Read the `package.json` in the specified directory and returns the `IPackage` object
 *
 * 读取指定目录下的 `package.json` 返回 `IPackage` 对象
 *
 * @param dir
 *
 * specified directory, default: `process.cwd()`
 *
 * 指定目录, 默认值: `process.cwd()`
 */
export function readPackage(dir: string = process.cwd()): IPackage {
  const filePath = join(dir, 'package.json')
  if (!fs.existsSync(filePath) && fs.statSync(filePath).isFile) {
    throw Error(`File not exists: ${filePath}`)
  }
  try {
    const pkg: IPackage = JSON.parse(fs.readFileSync(filePath).toString('utf8'))
    return pkg
  } catch (error) {
    throw Error(`Invalid JSON: ${filePath}`)
  }
}

/**
 * Write the `IPackage` object to the `package.json` in the specified directory
 *
 * 写入 `IPackage` 对象到指定目录下的 `package.json`
 *
 * @param pkg `IPackage` object
 *
 * @param dir
 * specified directory, default: `process.cwd()`
 *
 * 指定目录, 默认值: `process.cwd()`
 */
export function writePackage(pkg: IPackage, dir: string = process.cwd()) {
  const filePath = join(dir, 'package.json')
  try {
    fs.writeFileSync(filePath, JSON.stringify(pkg), { encoding: 'utf8' })
  } catch (error) {
    throw Error(`Write failed: ${filePath}`)
  }
}
