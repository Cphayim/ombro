/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:13:09
 * @LastEditTime: 2019-06-11 10:33:26
 * @Description: 入口文件
 */
import { CUR_ROOT, USER_ROOT, BABEL_CONFIG, ENTRY } from './envs'
import Engine from './engine'

const engine = new Engine(CUR_ROOT, USER_ROOT)
engine.bootstrap({ entry: ENTRY, babelConfig: BABEL_CONFIG })
