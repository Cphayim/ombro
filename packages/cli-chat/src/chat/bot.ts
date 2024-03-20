import { colors } from '@ombro/logger'
import OpenAI from 'openai'

import { getConfig } from '../config.js'
import { ROLES, UNCONFIG_WARN } from '../constants.js'
import { startLoading, stopLoading } from '../loading.js'
import { execExtensionTaskQueue } from './extensions.js'
import { addBotMessage, getLastMessage, messages } from './message.js'
import { getCurrentModel } from './model.js'

let openAI: OpenAI

export function initBot() {
  const config = getConfig()

  if (!config) {
    console.warn(UNCONFIG_WARN)
    process.exit()
  }
  openAI = new OpenAI(config)
}

export async function botAnswer(stream = true) {
  // 如果命中了扩展任务则跳过回答
  const flag = await execExtensionTaskQueue(getLastMessage().content as string)
  if (flag) return

  if (stream) {
    await streamAnswer()
  } else {
    await defaultAnswer()
  }
}

async function defaultAnswer() {
  try {
    // 在返回结果前显示 loading
    startLoading(` ${ROLES.BOT.NAME} ${colors.gray('loading...')}`)
    const completion = await openAI.chat.completions.create({
      messages,
      model: getCurrentModel().value,
    })
    stopLoading()

    const answer = completion.choices[0].message.content

    botOutput(answer)
    addBotMessage(answer!)
  } catch ({ error }) {
    botOutput(error.message, { isError: true })
  }
}

async function streamAnswer() {
  try {
    let answer = ''
    // 在返回结果前显示 loading
    startLoading(` ${ROLES.BOT.NAME} ${colors.gray('loading...')}`)
    const completion = await openAI.chat.completions.create({
      messages,
      model: getCurrentModel().value,
      stream: true,
    })
    stopLoading()

    process.stdout.write(`${ROLES.BOT.PREFIX} ${ROLES.BOT.NAME} `)
    for await (const chunk of completion) {
      answer += chunk.choices[0].delta.content || ''
      process.stdout.write(chunk.choices[0].delta.content || '')
    }
    process.stdout.write('\n\n')

    addBotMessage(answer)
  } catch ({ error }) {
    botOutput(error.message, { isError: true })
  }
}

export function botOutput(content: any, { isError = false, nowrap = false } = {}) {
  if (isError) {
    content = colors.red('[ERROR] ' + content)
  }
  console.log(`${ROLES.BOT.PREFIX} ${ROLES.BOT.NAME} ${content}` + (nowrap ? '' : '\n'))
}
