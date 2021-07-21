const { logger } = require('../lib')

console.log('\n')

logger.setLevel('verbose')

logger.verbose('verbose message')
logger.debug('debug message')
logger.info('info message')
logger.done('success message')
logger.warn('warning message')
logger.error('error message')

logger.startLoading('wait a moment')
setTimeout(() => {
  logger.stopLoading()
  logger.done('successful!')
  console.log('\n')
}, 2000)
