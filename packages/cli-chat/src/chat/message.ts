import type { ChatCompletionMessageParam } from 'openai/resources'

// 保存提问与回答的上下文
export const messages: ChatCompletionMessageParam[] = []

export function addUserMessage(content: string) {
  messages.push({
    role: 'user',
    content,
  })
}

export function addBotMessage(content: string | null) {
  messages.push({
    role: 'assistant',
    content,
  })
}

// 查看最后一条消息
export function getLastMessage() {
  return messages[messages.length - 1]
}

// 清空消息
export function clearMessages() {
  messages.length = 0
}
