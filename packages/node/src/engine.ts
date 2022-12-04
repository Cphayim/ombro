/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:44:20
 * @Description:
 */
import execa from 'execa'
import findUp from 'find-up'
import fs from 'fs'
import path from 'path'

import { log } from './utils'

type BootstrapOptions = {
  entry: string
}

export class Engine {
  boot({ entry }: BootstrapOptions): void {
    this.checkEntryExists(entry)

    const babelBinary = this.findBabelBinary()
    const babelConfig = this.findBabelConfig()

    log(`waiting for compile exec: ${entry}`)
    execa.commandSync(`${babelBinary} --config-file ${babelConfig} ${entry}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
  }

  findBabelBinary(): string | undefined {
    return findUp.sync(
      (dir) => {
        const file = path.join(dir, 'node_modules', '.bin', 'babel-node')
        return findUp.sync.exists(file) ? file : dir
      },
      { cwd: __dirname },
    )
  }

  findBabelConfig(): string | undefined {
    return findUp.sync(
      [
        'babel.config.js',
        'babel.config.cjs',
        'babel.config.mjs',
        'babel.config.json',
        '.babelrc',
        '.babelrc.js',
        '.babelrc.cjs',
        '.babelrc.mjs',
      ],
      {
        cwd: __dirname,
      },
    )
  }

  checkEntryExists(entry: string): void {
    if (!fs.existsSync(entry)) {
      throw new Error(`entry file ${entry} not exists`)
    }
  }
}

export const createEngine = () => new Engine()
