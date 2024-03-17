/*
 * @Author: Cphayim
 * @Date: 2021-06-18 00:52:24
 * @Description: 日志
 */
import readline from 'node:readline'

import chalk from 'chalk'
import ora, { type Ora } from 'ora'

import './type.js'
import { blackBold, chalkTag, format, inspect } from './utils.js'

type LevelKey = typeof process.env.LOGGER_LEVEL
type LevelValue = number

const enum Label {
  verbose = ' VER ',
  debug = ' DEB ',
  info = ' INFO ',
  done = ' DONE ',
  warn = ' WARN ',
  error = ' ERR ',
}

export const levelMap: Record<LevelKey, LevelValue> = {
  verbose: 1,
  info: 10,
  notice: 100,
  warn: 1_000,
  error: 10_000,
  silent: 100_000,
}

const DEFAULT_LEVEL: LevelKey = 'info'

let currentLevelValue: LevelValue
setLevel(process.env.LOGGER_LEVEL)

export function setLevel(level: LevelKey): void {
  currentLevelValue = normalizeLevelValue(level)
}

function normalizeLevelValue(level: LevelKey) {
  return levelMap[level] ? levelMap[level] : levelMap[DEFAULT_LEVEL]
}

export function verbose(message: unknown, tag = ''): void {
  message = inspect(message)
  const label = blackBold(chalk.bgWhite)(Label.verbose) + chalkTag(tag)
  log(format(label, message), 'verbose')
}

export function debug(message: unknown, tag = ''): void {
  message = inspect(message)
  const label = blackBold(chalk.bgMagenta)(Label.debug) + chalkTag(tag)
  log(format(label, message), 'verbose')
}

export function info(message: unknown, tag = ''): void {
  message = inspect(message)
  const label = blackBold(chalk.bgBlue)(Label.info) + chalkTag(tag)
  log(format(label, message), 'info')
}

export function done(message: unknown, tag = '', plain = false): void {
  message = inspect(message)
  const label = blackBold(chalk.bgGreen)(Label.done) + chalkTag(tag)
  message = plain ? message : chalk.green(message)
  log(format(label, message), 'notice')
}

export function warn(message: unknown, tag = '', plain = false): void {
  message = inspect(message)
  const label = blackBold(chalk.bgYellow)(Label.warn) + chalkTag(tag)
  message = plain ? message : chalk.yellow(message)
  log(format(label, message), 'warn')
}

export function error(message: unknown, tag = '', plain = false): void {
  message = inspect(message)
  const label = blackBold(chalk.bgRed)(Label.error) + chalkTag(tag)
  message = plain ? message : chalk.red(message)
  log(format(label, message), 'error')
}

export function log(message: unknown, level: LevelKey = 'info'): void {
  globalSpinner?.stop()
  // 低于 levelValue 级别的日志将不会打印
  if (normalizeLevelValue(level) < currentLevelValue) return
  console.log(message)
  globalSpinner?.start()
}

// 全局 loading
let globalSpinner: Spinner | null = null
export function startLoading(message: string): void {
  globalSpinner?.stop()
  globalSpinner = new Spinner(message)
}
export function stopLoading(): void {
  globalSpinner?.stop()
  globalSpinner = null
}

export function clearConsole(title = ''): void {
  // 仅在 tty 终端下清屏 (macOS/linux)
  if (!process.stdout.isTTY) return
  const blank = '\n'.repeat(process.stdout.rows)
  console.log(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
  if (title) console.log(title)
}

export function createSpinner(message: string): Spinner {
  return new Spinner(message)
}

// When Logger_LEVEL is silent, spinner will not be displayed either
class Spinner {
  private ora: Ora
  private message: string

  constructor(message: string) {
    this.message = message
    this.ora = ora()
    this.start(message)
  }

  start(message?: string) {
    if (!message) message = this.message
    this.isNotSilent() && this.ora.start(message)
  }

  stop() {
    this.ora.stop()
  }

  success(message?: string) {
    this.isNotSilent() && this.ora.succeed(chalk.green(message))
  }

  warn(message?: string) {
    this.isNotSilent() && this.ora.warn(chalk.yellow(message))
  }

  fail(message?: string) {
    this.isNotSilent() && this.ora.fail(chalk.red(message))
  }

  private isNotSilent(): boolean {
    return currentLevelValue !== levelMap.silent
  }
}
