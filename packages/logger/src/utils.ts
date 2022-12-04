import util from 'node:util'

import chalk from 'chalk'

export function chalkTag(msg: string): string {
  return !msg ? '' : ' ' + chalk.bgWhite.black(` ${msg} `)
}

export function format(head: string, msg: unknown) {
  // Fill to a fixed length
  return (msg as string)
    .split('\n')
    .map((line) => {
      return `${head} ${line}`
      // return i === 0 ? `${label} ${line}` : line.padStart(stripAnsi(label).length + line.length + 1)
    })
    .join('\n')
}

export function inspect(msg: unknown) {
  return typeof msg !== 'string' ? util.inspect(msg, { depth: 2 }) : msg
}

export function blackBold(color: chalk.Chalk): chalk.Chalk {
  return color.bold.rgb(33, 33, 33)
}
