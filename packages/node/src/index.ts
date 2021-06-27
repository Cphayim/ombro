/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:13:09
 * @Description: 入口
 */
import minimist from 'minimist'

import { BABEL_CONFIG } from './envs'
import Engine from './engine'

const argv = minimist(process.argv.slice(2))

const engine = new Engine()
engine.bootstrap({ entry: argv._[0] ?? './src', babelConfig: BABEL_CONFIG })
