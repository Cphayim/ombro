import { colors } from '@ombro/logger'
import inquirer from 'inquirer'

import { PACKAGE_ALIAS, ROLES } from '../constants.js'
import { addUserMessage } from './message.js'

/**
 * 交互式获取提问
 * @returns
 */
export async function askQuestion() {
  const { question } = await inquirer.prompt([
    {
      name: 'question',
      type: 'input',
      message: ROLES.USER.NAME,
      filter: (input) => input.trim(),
      validate: (input) => (input ? true : 'Please enter your question'),
      prefix: ROLES.USER.PREFIX,
    },
  ])

  addUserMessage(question)

  return question as string
}

export function chatTip(modelDesc: string) {
  console.log() // empty line
  console.log(`> Welcome to use ${PACKAGE_ALIAS}!`)
  console.log(`> Current model: ${colors.magenta(modelDesc)} `)
  console.log(`> Let's start chatting, communicate in natural language`)
  console.log(`  (enter 'exit' or 'q' to exit program, 'model' or 'm' to switch model)`)
  console.log() // empty line
}
