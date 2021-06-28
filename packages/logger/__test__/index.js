const { logger } = require('../lib')

console.log('\n')

logger.setLevelValue('verbose')
logger.verbose('verbose message')
logger.debug('debug message')
logger.info('info message')
logger.done('success message')
logger.warn('warning message')
logger.error('error message')

logger.loadding('wait a moment')
setTimeout(() => {
  logger.clearLoadding()
  logger.done('successful!')
  console.log('\n')
}, 2000)
