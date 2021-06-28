/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:44:20
 * @LastEditTime: 2021-06-28 01:47:55
 * @Description: 引擎
 */
import fs from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

import { logger } from '@ombro/logger'

import { MODULE_ROOT, CWD_ROOT } from './envs'

type BootstrapOptions = {
  entry: string
  babelConfig: string
}

export default class Engine {
  /**
   * 启动
   */
  bootstrap({ entry, babelConfig }: BootstrapOptions): void {
    logger.info(`waiting for exec: ${entry}`)
    const babelBinFile = this.getBabelBinFile()
    execSync(`${babelBinFile} --config-file ${babelConfig} ${entry}`, { stdio: 'inherit' })
  }
  getBabelBinFile(): string {
    // 如果当前模块目录下存在 babel-node 执行文件（全局 cy-node 模块执行场景）使用模块内置的依赖
    // 如果当前模块目录下不存在 babel-node 执行文件（项目 cy-node 模块执行场景）使用项目内置的依赖
    const local = join(MODULE_ROOT, 'node_modules', '.bin', 'babel-node')
    const outer = join(CWD_ROOT, 'node_modules', '.bin', 'babel-node')
    return fs.existsSync(local) ? local : outer
  }
}
