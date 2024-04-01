/*
 * @Author: Cphayim
 * @Date: 2021-01-28 17:12:41
 * @Description: 更新 package.json 和 manifest.json 中的版本号和 code
 */
import consola from 'consola'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import { jsonc } from 'jsonc'
import path from 'path'

import { findManifestPath, findProjectRoot } from './utils.js'

export async function updateVersion() {
  const rootDir = await findProjectRoot()
  const pkgPath = path.join(rootDir, 'package.json')
  const manifestPath = findManifestPath(rootDir)

  if (!manifestPath) {
    consola.error('oh5plus update-version: 没有找到 manifest.json，请先初始化')
    process.exit(1)
  }

  const pkg = fs.readJsonSync(pkgPath)
  /**
   * manifest.json 可能是 comment json 格式
   */
  const manifest = jsonc.parse(fs.readFileSync(manifestPath).toString())
  try {
    // 交互式更新 package.json 版本号
    if (!process.argv.includes('--ci') && !process.argv.includes('--skip-prompt')) {
      const { version } = await inquirer.prompt([
        {
          type: 'input',
          name: 'version',
          message: `请输入新的版本号（当前版本号: ${pkg.version}）`,
          validate: (val) => {
            if (!/^\d+\.\d+\.\d+$/.test(val)) {
              return '版本号必须满足 x.x.x 格式（例如 1.10.4）'
            }
            if (getVersionCode(val) < getVersionCode(pkg.version)) {
              return `新版本号 ${val} 不能小于旧版本号 ${pkg.version}`
            }
            return true
          },
        },
      ])
      // 更新 package.json
      pkg.version = version
      fs.writeFileSync(pkgPath, jsonc.stringify(pkg, undefined, 2))
    }

    // 更新 public/manifest.json
    manifest.version = {
      name: pkg.version,
      // 必须是数字
      code: getVersionCode(pkg.version),
    }

    consola.info('正在将 package.json 中的版本号写入 manifest.json')
    fs.writeFileSync(manifestPath, jsonc.stringify(manifest, undefined, 2))
    consola.success('写入版本号完毕')
  } catch (error) {
    consola.error(error)
    process.exit(1)
  }
}

function getVersionCode(versionName: string): number {
  // '1.0.3' => 10003
  // '1.1.5' => 10105
  // '1.10.12' => 11012
  return ~~versionName
    .split('.')
    .map((s) => s.padStart(2, '0'))
    .join('')
}
