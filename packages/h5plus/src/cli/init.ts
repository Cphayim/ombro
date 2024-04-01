/*
 * @Author: Cphayim
 * @Date: 2022-11-03 00:27:38
 * @Description: 在一个现有的项目目录中初始化 plus，并生成必要的文件：
 */
import consola from 'consola'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

import { findManifestPath, findProjectRoot } from './utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function injectManifest() {
  const rootDir = await findProjectRoot()
  const manifestPath = findManifestPath(rootDir)

  // 如果已经存在 manifest.json，则警告退出
  if (manifestPath) {
    consola.warn(`manifest 已经存在: ${path.relative(rootDir, manifestPath)}`)
    process.exit(0)
  }

  const tplPath = path.resolve(__dirname, '../../tpl/manifest.json')
  const targetPath = fs.existsSync(path.join(rootDir, 'public'))
    ? path.join(rootDir, 'public/manifest.json')
    : path.join(rootDir, 'manifest.json')

  // 复制 manifest.json 文件
  fs.copyFileSync(tplPath, targetPath)

  consola.success(`manifest 创建成功: ${path.relative(rootDir, targetPath)}`)
}
