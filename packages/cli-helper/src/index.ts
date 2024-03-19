import os from 'node:os'
import path from 'node:path'

import fs from 'fs-extra'

function ensureOmbroRoot() {
  const home = os.homedir()
  const ombroRoot = path.join(home, '.ombro')
  fs.existsSync(ombroRoot) || fs.mkdirpSync(ombroRoot)
  return ombroRoot
}

/**
 * 读取配置
 * @param pkg 指定包名称
 * @param defaultConfig 默认配置
 */
export function readOmbroConfig<T extends Record<string, any>>(
  pkg: `@ombro/${string}`,
  defaultConfig: T | null = null,
): T | null {
  const ombroRoot = ensureOmbroRoot()
  const configPath = path.join(ombroRoot, `${pkg.split('/')[1]}.json`)
  return fs.existsSync(configPath) ? fs.readJSONSync(configPath) : defaultConfig
}

/**
 * 写入配置
 * @param pkg 指定包名称
 * @param config 配置
 * @param merge 是否合并原先的配置
 */
export function writeOmbroConfig<T extends Record<string, any>>(
  pkg: `@ombro/${string}`,
  config: T,
  merge = false,
) {
  const ombroRoot = ensureOmbroRoot()
  const configPath = path.join(ombroRoot, `${pkg.split('/')[1]}.json`)

  if (merge) {
    const oldConfig = readOmbroConfig<T>(pkg)
    config = { ...oldConfig, ...config }
  }

  fs.writeJSONSync(configPath, config, { spaces: 2 })
}
