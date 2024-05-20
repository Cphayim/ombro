import { MODELS } from '../constants.js'

type M = typeof MODELS

let currentModel: M[keyof M] = process.argv.includes('--gpt-4')
  ? MODELS.GPT_4
  : process.argv.includes('--gpt-4o')
    ? MODELS.GPT_4O
    : MODELS.GPT_3_5

export function getCurrentModel() {
  return currentModel
}

export function toggleCurrentModel(model: (typeof MODELS)[keyof typeof MODELS]) {
  currentModel = model
}
