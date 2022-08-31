import { isMain } from '../dist/index.js'

export function b() {
  console.log('called b')
}

if (isMain(import.meta)) {
  console.log('b is main')
}
