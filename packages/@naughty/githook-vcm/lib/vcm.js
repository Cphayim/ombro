const path = require('path')
const fs = require('fs')
// =================================================
const chalk = require('chalk')
// =================================================
const config = require('../config')

// 读取命令行参数覆盖默认配置
const args = process.argv.slice(2)
args.forEach((arg, index) => {
  if (arg === '--ignore-type') {
    config.typeRequired = false
  } else if (arg === '--ignore-scope') {
    config.scopeRequired = false
  } else if (arg === '--no-allow-merge') {
    config.allowMerge = false
  } else if (arg === '--max-content') {
    const max = parseInt(args[index + 1])
    if (max > 1) config.maxContent = max
  }
})

// 从 COMMIT_EDITMSG 文件中获取本地提交的 msg
const msgPath = path.join(process.cwd(), process.env.HUSKY_GIT_PARAMS || '.git/COMMIT_EDITMSG')
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

// 根据配置生成正则
// /^(revert: )?(feat|fix|docs|style|refactor|perf|opt|test|workflow|ci|release|chore|types)(\(.+\)): .{1,50}/
const commitRE = new RegExp(
  '^(revert: )?' +
    '(feat|fix|docs|style|refactor|perf|opt|test|workflow|ci|release|chore|types)' +
    (config.typeRequired ? '' : '?') +
    '(\\(.+\\))' +
    (config.scopeRequired ? '' : '?') +
    (': .{1,' + config.maxContent + '}')
)

if ((!config.allowMerge || !/^Merge branch/.test(msg)) && !commitRE.test(msg)) {
  console.log()
  console.error(
    `${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
      chalk.red(`  Proper commit message format is required for automated changelog generation. \n`) +
      `    <type>(<scope>): <subject> \n` +
      `    type: feat|fix|docs|style|refactor|perf|opt|test|workflow|ci|release|chore|types \n\n` +
      `  Examples:\n` +
      `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
      chalk.red(`  See .github/COMMIT_CONVENTION.md for more details.\n`) +
      chalk.red(`  You can also use ${chalk.cyan(`npm run commit`)} to interactively generate a commit message.\n`)
  )
  process.exit(1)
}
