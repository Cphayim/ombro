export const PKG_NAME = 'fetcin'

const LOG_PREFIX = `[${PKG_NAME}]`

export const logger = {
  log: (...arg: unknown[]) => console.log(LOG_PREFIX, ...arg),
  debug: (...arg: unknown[]) => console.debug(LOG_PREFIX, ...arg),
  info: (...arg: unknown[]) => console.info(LOG_PREFIX, ...arg),
  warn: (...arg: unknown[]) => console.warn(LOG_PREFIX, ...arg),
  error: (...arg: unknown[]) => console.error(LOG_PREFIX, ...arg),
}

export function createErrorMessage(message: string) {
  return `${LOG_PREFIX} ${message}`
}

export function createThrowErrorFunction(message: string) {
  return () => {
    throw new Error(createErrorMessage(message))
  }
}

export function hasOwnProperty(context: object, prop: string) {
  return Object.prototype.hasOwnProperty.call(context, prop)
}
