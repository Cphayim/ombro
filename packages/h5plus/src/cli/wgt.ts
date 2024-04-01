/*
 * @Author: Cphayim
 * @Date: 2021-01-28 17:12:41
 * @Description: 生成 wgt 增量包，请先将含有 manifest.json 的项目编译到 dist
 */
import compressing from 'compressing'
import consola from 'consola'
import fs from 'fs-extra'
// import { execaCommandSync } from 'execa'
import { jsonc } from 'jsonc'
import path from 'path'

import { findProjectRoot } from './utils.js'

export async function buildWgt() {
  const rootDir = await findProjectRoot()
  const distDir = path.join(rootDir, 'dist')
  const manifestPath = path.join(distDir, 'manifest.json')

  if (!fs.existsSync(distDir)) {
    consola.error('oh5plus wgt: dist 目录不存在，请先编译项目')
    process.exit(1)
  }

  if (!fs.existsSync(manifestPath)) {
    consola.error(
      'oh5plus wgt: dist 目录下没有找到 manifest.json，请先执行 oh5plus init 后重新编译项目',
    )
    process.exit(1)
  }

  /**
   * manifest.json 可能是 comment json 格式
   */
  const manifest = jsonc.parse(fs.readFileSync(manifestPath).toString())

  consola.info('正在创建 wgt 增量包...')

  const tmpPath = path.join(rootDir, `${manifest.id}.wgt`)
  const targetPath = path.join(distDir, `unpackage/release/${manifest.id}.wgt`)

  fs.mkdirpSync(path.join(distDir, 'unpackage/release'))
  // 如果已经存在 wgt 包，则删除，防止被打包进去
  if (fs.existsSync(targetPath)) {
    fs.removeSync(targetPath)
  }

  await compressing.zip.compressDir(distDir, tmpPath, {
    ignoreBase: true,
  })

  fs.moveSync(tmpPath, targetPath)

  consola.success(`wgt 增量包已创建: dist/unpackage/release/${manifest.id}.wgt`)
}
