import { EXIT_COMMANDS } from '../constants.js'
import { botAnswer, botOutput, getModelDescription, initBot } from './bot.js'
import { askQuestion, chatTip } from './user.js'

export async function chat() {
  initBot()
  chatTip(getModelDescription())

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const question = await askQuestion()
    checkExit(question)
    await botAnswer()
  }
}

/**
 * 检查退出状态
 */
function checkExit(input: string) {
  if (EXIT_COMMANDS.includes(input.toLocaleLowerCase())) {
    botOutput('Goodbye!', { nowrap: true })
    process.exit()
  }
}
