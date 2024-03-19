import { readOmbroConfig, writeOmbroConfig } from '@ombro/cli-helper'
import { colors } from '@ombro/logger'
import inquirer from 'inquirer'

import { DEFAULT_BASE_URL, PACKAGE_NAME, UNCONFIG_WARN } from './constants.js'

export interface OChatConfig {
  /**
   * OpenAI API base URL
   */
  baseURL: string
  /**
   * OpenAI API key
   */
  apiKey: string
}

export function config() {
  process.argv.includes('set') ? set() : get()
}

function get() {
  const config = readOmbroConfig<OChatConfig>(PACKAGE_NAME)
  if (!config) return console.log(UNCONFIG_WARN)

  console.log(colors.bold('baseURL: ') + colors.gray(config.baseURL))
  console.log(colors.bold('apiKey: ') + colors.gray(config.apiKey))
}

/**
 * 交互修改配置
 */
async function set() {
  configTip()
  const oldConfig = readOmbroConfig<OChatConfig>(PACKAGE_NAME)
  const config: OChatConfig = await inquirer.prompt([
    {
      name: 'baseURL',
      type: 'input',
      message: 'baseURL:',
      default: oldConfig?.baseURL ?? DEFAULT_BASE_URL,
      filter: (input) => input.trim(),
      validate: (input) => (input ? true : 'Please enter baseURL'),
    },
    {
      name: 'apiKey',
      type: 'input',
      message: 'apiKey:',
      filter: (input) => input.trim(),
      validate: (input) => (input ? true : 'Please enter your apiKey'),
    },
  ])
  writeOmbroConfig(PACKAGE_NAME, config)

  console.log(colors.green.bold('Configuration successful!'))
}

export function configTip() {
  console.log() // empty line
  console.log(colors.yellow(`> You need to enter \`baseURL\` and \`apiKey\` to use ochat.`))
  console.log(
    colors.yellow(`> \`baseURL\` is the address of the API, the default is: ${DEFAULT_BASE_URL}`),
  )
  console.log(colors.yellow(`> \`apiKey\` is your OpenAI apiKey`))
  console.log() // empty line
}

export function getConfig() {
  return readOmbroConfig<OChatConfig>(PACKAGE_NAME)
}

export function setConfig(config: OChatConfig) {
  writeOmbroConfig(PACKAGE_NAME, config)
}
