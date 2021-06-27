/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:43:30
 * @Description: 环境监测
 */
import { join } from 'path'

// 导出当前模块根路径
export const MODULE_ROOT = join(__dirname, '..')

// 用户执行命令时的路径
export const CWD_ROOT = process.cwd()

// babel 配置文件路径
export const BABEL_CONFIG = join(MODULE_ROOT, 'babel.config.js')
