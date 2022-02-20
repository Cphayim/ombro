const { logger } = require('../dist')

console.log('\n')

logger.setLevel('verbose')

logger.verbose('verbose message')
logger.debug('debug message')
logger.info('info message')
logger.done('success message')
logger.warn('warning message')
logger.error('error message')

const obj = {
  name: 'Cphayim',
  age: 18,
}

logger.done(obj)

logger.startLoading('正在下载')
setTimeout(() => {
  logger.done('插入')
  setTimeout(() => {
    logger.stopLoading()
  }, 1000)
}, 1000)
