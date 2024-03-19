import { colors } from '@ombro/logger'
import OpenAI from 'openai'

import { getConfig } from '../config.js'
import { ROLES, UNCONFIG_WARN } from '../constants.js'
import { startLoading, stopLoading } from '../loading.js'
import { addBotMessage, messages } from './message.js'

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
      model: getModel(),
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
      model: getModel(),
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

function getModel() {
  return process.argv.includes('--gpt-4') ? 'gpt-4-1106-preview' : 'gpt-3.5-turbo'
}

export function getModelDescription() {
  const model = getModel()
  return model === 'gpt-4-1106-preview' ? 'GPT-4' : 'GPT-3.5 Turbo'
}

export function botOutput(content: any, { isError = false, nowrap = false } = {}) {
  if (isError) {
    content = colors.red('[ERROR] ' + content)
  }
  console.log(`${ROLES.BOT.PREFIX} ${ROLES.BOT.NAME} ${content}` + (nowrap ? '' : '\n'))
}
