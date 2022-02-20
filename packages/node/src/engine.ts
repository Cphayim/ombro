/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:44:20
 * @LastEditTime: 2022-02-21 02:38:47
 * @Description: 引擎
 */
import fs from 'fs'
import { join } from 'path'
import execa from 'execa'

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
    this.check(entry)
    logger.info(`waiting for compile exec: ${entry}`)
    const babelBinFile = this.getBabelBinFile()
    execa.commandSync(`${babelBinFile} --config-file ${babelConfig} ${entry}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
  }

  getBabelBinFile(): string {
    // 如果当前模块目录下存在 babel-node 执行文件（全局安装的 @ombro/node 执行场景）使用模块内置的依赖
    // 如果当前模块目录下不存在 babel-node 执行文件（局部安装的 @ombro/node 模块执行场景）使用项目内置的依赖
    const local = join(MODULE_ROOT, 'node_modules', '.bin', 'babel-node')
    const outer = join(CWD_ROOT, 'node_modules', '.bin', 'babel-node')
    return fs.existsSync(local) ? local : outer
  }

  check(entry: string): void {
    if (!fs.existsSync(entry)) {
      logger.error(`entry file ${entry} not exists`)
      process.exit(1)
    }
  }
}
