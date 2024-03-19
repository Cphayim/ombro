import { colors } from '@ombro/logger'

import { PACKAGE_NAME, PACKAGE_VERSION } from './constants.js'

export function printVersion() {
  console.log(colors.cyan(`${PACKAGE_NAME} version: ${PACKAGE_VERSION}`))
}
