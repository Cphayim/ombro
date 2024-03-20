/*
 * BOT 在回答之前执行的扩展任务，用于处理运行时用户输入的一些特殊命令
 */
import { colors } from '@ombro/logger'
import inquirer from 'inquirer'

import { EXIT_COMMANDS, MODELS, TOGGLE_MODEL_COMMANDS } from '../constants.js'
import { botOutput } from './bot.js'
import { clearMessages } from './message.js'
import { getCurrentModel, toggleCurrentModel } from './model.js'

/**
 * 传递用户输入，执行扩展任务
 * 如果执行了某项扩展则返回 true
 */
export async function execExtensionTaskQueue(input: string) {
  const queue = [
    checkExit, // 检查退出
    toggleModel, // 切换模型
  ]

  for (const task of queue) {
    if (await task(input)) return true
  }

  return false
}

/**
 * 检查退出状态
 * - 直接退出进程
 */
function checkExit(input: string) {
  if (EXIT_COMMANDS.includes(input.toLocaleLowerCase())) {
    botOutput('Goodbye!', { nowrap: true })
    process.exit()
  }
  return false
}

async function toggleModel(input: string) {
  if (!TOGGLE_MODEL_COMMANDS.includes(input)) return false

  botOutput(
    'Please choose a model. If switching to a different model will result in losing the chat context.',
  )

  const { model } = await inquirer.prompt([
    {
      name: 'model',
      type: 'list',
      choices: Object.values(MODELS).map((model) => ({ name: model.name, value: model })),
      message: 'Model:',
      default: getCurrentModel(),
    },
  ])

  if (model !== getCurrentModel()) {
    toggleCurrentModel(model)
    clearMessages() // 切换模型后，清空消息上下文
    console.log(`> Successful, current model: ${colors.magenta(getCurrentModel().name)} \n`)
  } else {
    console.log(`> Skipping, Current model: ${colors.magenta(getCurrentModel().name)} \n`)
  }

  return true
}
