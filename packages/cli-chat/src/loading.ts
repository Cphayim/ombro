import { logger } from '@ombro/logger'

let spinner: any

export function startLoading(message = 'loading...') {
  if (spinner) stopLoading()
  // 这里不能使用 \n，否则 loading 消息无法撤回
  spinner = logger.createSpinner(message + '\r')
  spinner.start()
}

export function stopLoading() {
  spinner?.stop()
}
