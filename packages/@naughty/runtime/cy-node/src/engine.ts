/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:44:20
 * @LastEditTime: 2020-04-10 10:21:58
 * @Description: 引擎
 */
import fs from 'fs'
import { join } from 'path'

import { execSync } from 'child_process'
import { log } from './utils'
import { CUR_ROOT, USER_ROOT } from './envs'

type BootStrapOptions = {
  entry: string
  babelConfig: string
}

export default class Engine {
  private userRoot: string | null = null
  private moduleRoot: string | null = null

  constructor(userRoot: string, moduleRoot: string) {
    this.userRoot = userRoot
    this.moduleRoot = moduleRoot
  }

  /**
   * 启动
   */
  bootstrap({ entry, babelConfig }: BootStrapOptions) {
    log(`waiting for exec: ${entry}`)
    const babelBinFile = this.getBabelBinFIle()
    execSync(`${babelBinFile} --config-file ${babelConfig} ${entry}`, { stdio: [0, 1, 2] })
  }
  getBabelBinFIle() {
    // 如果当前模块目录下存在 babel-node 执行文件（全局 cy-node 模块执行场景）使用模块内置的依赖
    // 如果当前模块目录下不存在 babel-node 执行文件（项目 cy-node 模块执行场景）使用项目内置的依赖
    const local = join(CUR_ROOT, 'node_modules', '.bin', 'babel-node')
    const outer = join(USER_ROOT, 'node_modules', '.bin', 'babel-node')
    return fs.existsSync(local) ? local : outer
  }
}
