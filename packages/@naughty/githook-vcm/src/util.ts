/*
 * @Author: Cphayim
 * @Date: 2019-05-25 11:15:01
 * @LastEditTime: 2019-05-25 13:53:56
 */
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

import { VCMOptions } from './config'

/**
 * 从命令行参数合并选项
 * @export
 * @param {any} argv 命令行参数
 * @param {VCMOptions} defaultOptions 默认配置
 * @returns {VCMOptions}
 */
export function mergeOptions(argv: any, defaultOptions: VCMOptions): VCMOptions {
  const options = { ...defaultOptions }
  if (argv.hasOwnProperty('allowMerge')) {
    options.allowMerge = true
  }
  if (argv.hasOwnProperty('ignoreType')) {
    options.type = false
  }
  if (argv.hasOwnProperty('ignoreScope')) {
    options.scope = false
  }
  if (argv.hasOwnProperty('max') && isInteger(argv.max)) {
    options.max = argv.max
  }
  return options
}

/**
 * 获取本次的 git 的提交消息
 * @export
 * @returns {string}
 */
export function getCommitMessage(): string {
  const filePath = path.join(process.cwd(), '.git/COMMIT_EDITMSG')
  return fs.readFileSync(filePath, 'utf-8').trim()
}

/**
 * 验证合法性
 * @export
 * @param {string} message 提交消息
 * @param {VCMOptions} options 配置
 * @returns {boolean}
 */
export function verify(message: string, options: VCMOptions): boolean {
  process.stdout.write(`\nReady to start verifying commit message...\n\n`)
  process.stdout.write(chalk.blue(`Commit message: ${message}\n\n`))
  // /^(revert: )?(feat|fix|docs|style|refactor|perf|opt|test|workflow|ci|release|chore|types)(\(.+\)): .{1,50}/
  const re = new RegExp(
    '^(revert: )?' +
      '(feat|refactor|fix|docs|style|perf|opt|test|workflow|ci|release|chore|types)' +
      (options.type ? '' : '?') +
      '(\\(.+\\))' +
      (options.scope ? '' : '?') +
      (': .{1,' + options.max + '}')
  )
  let isValid = false
  // 允许合并?是否满足合并头?ok:验证正则?ok:no
  if ((options.allowMerge && /^Merge branch/.test(message)) || re.test(message)) {
    isValid = true
  }

  isValid
    ? process.stdout.write(chalk.green(`Verification passed, good job!\n\n`))
    : process.stdout.write(
        `${chalk.bgRed.white('ERROR')} ${chalk.red(`invalid commit message format.`)}\n\n` +
          chalk.red(
            `Proper commit message format is required for automated changelog generation. \n`
          ) +
          `    <type>(<scope>): <subject> \n` +
          `    type: feat|fix|docs|style|refactor|perf|opt|test|workflow|ci|release|chore|types \n\n` +
          `Examples:\n` +
          `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
          `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n`
      )
  return isValid
}

function isInteger(n: any) {
  return n % 1 === 0
}
