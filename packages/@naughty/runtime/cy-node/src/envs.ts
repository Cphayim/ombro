/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:43:30
 * @LastEditTime: 2019-08-22 11:24:36
 * @Description: 环境监测
 */
import { join } from 'path'
import { argv } from 'yargs'
import { getBabelConfig } from './utils'
// 导出当前模块根路径
export const CUR_ROOT = join(__dirname, '..')
// 导出用户项目的根路径
export const USER_ROOT = process.cwd()

// 默认的 babel config 文件
const DEFAULT_BABEL_CONFIG = join(CUR_ROOT, 'babel.config.js')

// 导出使用的 babel config 文件
export const BABEL_CONFIG = getBabelConfig({
  userRoot: USER_ROOT,
  defaultConfig: DEFAULT_BABEL_CONFIG
})

export const ENTRY = (argv._[0] as string | undefined) || (argv.entry as string | undefined) || './src'
