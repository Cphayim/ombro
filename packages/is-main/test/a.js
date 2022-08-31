import { isMain } from '../dist/index.js'
import { b } from './b.js'

if (isMain(import.meta)) {
  console.log('a is main')
  b()
}
