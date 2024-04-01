/*
 * @Author: Cphayim
 * @Date: 2022-11-03 00:28:12
 * @Description: 在 `public/manifest.json` 和 `dist/manifest.json` 之间同步内容
 */
import consola from 'consola'
import fs from 'fs-extra'
import path from 'path'

import { findManifestPath, findProjectRoot } from './utils'

export async function syncManifest() {
  const rootDir = await findProjectRoot()
  const srcManifestPath = ensureBothManifestExist(rootDir)
  const distManifestPath = path.join(rootDir, 'dist/manifest.json')

  if (process.argv.slice(2).includes('--forward')) {
    forward(rootDir, srcManifestPath, distManifestPath)
  } else if (process.argv.slice(2).includes('--reverse')) {
    reverse(rootDir, srcManifestPath, distManifestPath)
  } else {
    fs.statSync(srcManifestPath).mtimeMs >= fs.statSync(distManifestPath).mtimeMs
      ? forward(rootDir, srcManifestPath, distManifestPath)
      : reverse(rootDir, srcManifestPath, distManifestPath)
  }
}

function forward(rootDir: string, srcManifestPath: string, distManifestPath: string) {
  consola.info('oh5plus sync: forward mode')
  fs.writeFileSync(distManifestPath, fs.readFileSync(srcManifestPath))
  consola.success(
    `${path.relative(rootDir, srcManifestPath)} -> ${path.relative(rootDir, distManifestPath)}`,
  )
}

function reverse(rootDir: string, srcManifestPath: string, distManifestPath: string) {
  consola.info('oh5plus sync: reverse mode')
  fs.writeFileSync(srcManifestPath, fs.readFileSync(distManifestPath))
  consola.success(
    `${path.relative(rootDir, distManifestPath)} -> ${path.relative(rootDir, srcManifestPath)}`,
  )
}

function ensureBothManifestExist(rootDir: string) {
  const manifestPath = findManifestPath(rootDir)
  if (!manifestPath) {
    consola.error('oh5plus sync: 没有找到 manifest.json，请先初始化')
    process.exit(1)
  }
  if (!fs.existsSync(path.join(rootDir, 'dist/manifest.json'))) {
    consola.error('oh5plus sync: 没有找到 dist/manifest.json，请先构建项目')
    process.exit(1)
  }
  return manifestPath
}
