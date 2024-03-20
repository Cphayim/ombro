import { MODELS } from '../constants.js'

let currentModel = process.argv.includes('--gpt-4') ? MODELS.GPT_4 : MODELS.GPT_3_5

export function getCurrentModel() {
  return currentModel
}

export function toggleCurrentModel(model: (typeof MODELS)[keyof typeof MODELS]) {
  currentModel = model
}
