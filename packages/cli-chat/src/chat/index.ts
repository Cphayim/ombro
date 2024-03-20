import { botAnswer, initBot } from './bot.js'
import { getCurrentModel } from './model.js'
import { askQuestion, chatTip } from './user.js'

export async function chat() {
  initBot()
  chatTip(getCurrentModel().name)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    await askQuestion()
    await botAnswer()
  }
}
