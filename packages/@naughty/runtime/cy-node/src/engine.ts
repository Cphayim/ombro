/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:44:20
 * @LastEditTime: 2019-08-22 13:07:11
 * @Description: 引擎
 */
import { execSync } from 'child_process'
import { log } from './utils'
import { CUR_ROOT } from './envs';

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
    execSync(`${CUR_ROOT}/node_modules/.bin/babel-node --config-file ${babelConfig} ${entry}`, { stdio: [0, 1, 2] })
  }
}
