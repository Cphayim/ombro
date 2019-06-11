/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:44:20
 * @LastEditTime: 2019-06-11 10:37:53
 * @Description: 引擎
 */
import { execSync } from 'child_process'
import { log } from './utils'

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
    log(`cy-node executing: ${entry}`)
    execSync(`babel-node --config-file ${babelConfig} ${entry}`, { stdio: [0, 1, 2] })
  }
}
