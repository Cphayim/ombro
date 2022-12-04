#!/usr/bin/env node

/*
 * @Author: Cphayim
 * @Date: 2019-06-11 09:13:09
 * @Description:
 */
import path from 'path'

import { Engine, createEngine } from './engine'
import { log } from './utils'

// Outside API call
export { createEngine, Engine }

// Command line call
if (require.main === module) {
  const entry = process.argv[2]
  if (!entry || entry === '-h' || entry === '--help') {
    printHelp()
  } else {
    createEngine().boot({ entry })
  }
}

function printHelp() {
  const pkg = require(path.resolve(__dirname, '..', 'package.json'))
  log(`${pkg.name} v${pkg.version}\n`)
  log(`Usage: onode index.js`)
}
