/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import util from 'util'
import chalk from 'chalk'

export function chalkTag(msg: string): string {
  return !msg ? '' : chalk.bgBlackBright.white(` ${msg} `)
}

export function format(label: string, msg: any) {
  // Fill to a fixed length
  return (msg as string)
    .split('\n')
    .map((line) => {
      return `${label} ${line}`
      // return i === 0 ? `${label} ${line}` : line.padStart(stripAnsi(label).length + line.length + 1)
    })
    .join('\n')
}

export function inspect(msg: any) {
  return typeof msg !== 'string' ? util.inspect(msg, { depth: 2 }) : msg
}
