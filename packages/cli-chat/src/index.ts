#!/usr/bin/env node
import { isMain } from '@ombro/is-main'

import { chat } from './chat/index.js'
import { config } from './config.js'
import { CONFIG_COMMANDS, HELP_ARGS, VERSION_ARGS } from './constants.js'
import { printHelp } from './help.js'
import { printVersion } from './version.js'

if (isMain(import.meta)) {
  launch()
}

export function launch() {
  if (VERSION_ARGS.some((i) => process.argv.includes(i))) {
    printVersion()
  } else if (HELP_ARGS.some((i) => process.argv.includes(i))) {
    printHelp()
  } else if (CONFIG_COMMANDS.some((i) => process.argv.includes(i))) {
    config()
  } else {
    chat()
  }
}
