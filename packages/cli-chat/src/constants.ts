import fs from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { colors } from '@ombro/logger'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, '../package.json'), 'utf8'))

export const PACKAGE_NAME = pkg.name
export const PACKAGE_ALIAS = 'ochat'
export const PACKAGE_VERSION = pkg.version

export const HELP_ARGS = ['--help', '-h']
export const VERSION_ARGS = ['--version', '-v']

// ochat command
export const CONFIG_COMMANDS = ['config']

// ochat question command
export const EXIT_COMMANDS = ['exit', 'quit', 'q']
export const TOGGLE_MODEL_COMMANDS = ['model', 'm']

// 默认的服务地址
export const DEFAULT_BASE_URL = 'https://api.openai.com/v1'

// 未配置警告内容
export const UNCONFIG_WARN = `
> ${colors.yellow("You don't seem to have configured ochat yet, please execute first: ")}
  ${colors.bold(`ochat config set`)}
`.trim()

// 角色对应的属性
export const ROLES = {
  USER: {
    PREFIX: '🤗',
    NAME: colors.cyan.bold('YOU:'),
  },
  BOT: {
    PREFIX: '🤖',
    NAME: colors.magenta.bold('BOT:'),
  },
}

// 支持的模型
export const MODELS = {
  GPT_3_5: {
    name: 'GPT-3.5',
    value: 'gpt-3.5-turbo',
  },
  GPT_4: {
    name: 'GPT-4',
    value: 'gpt-4-1106-preview',
  },
} as const
