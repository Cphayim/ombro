/*
 * @Author: Cphayim
 * @Date: 2019-06-11 10:13:03
 * @LastEditTime: 2019-06-11 10:35:29
 * @Description: 工具函数
 */

import { join } from 'path'
import { existsSync } from 'fs'
import chalk from 'chalk'

/**
 * 检查用户项目根路径下是否存在 babel 配置文件
 * 如果存在，返回用户提供的 babel 配置文件
 * 否则返回默认的配置文件
 * @param {string} options.userRoot 用户根目录
 * @param {string} options.defaultConfig 默认的 babel 配置文件
 * @return
 */
export function getBabelConfig({
  userRoot,
  defaultConfig
}: {
  userRoot: string
  defaultConfig: string
}) {
  const validNames = ['babel.config.js', '.babelrc']
  let file = ''
  for (let name of validNames) {
    const target = join(userRoot, name)
    if (existsSync(target)) {
      file = target
      break
    }
  }
  return file || defaultConfig
}

export function log(msg: string) {
  process.stdout.write(chalk.bgBlue(chalk.black(` ${msg} \n`)))
}
