const { logger } = require('../lib')

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

// logger.startLoading('wait a moment')
// setTimeout(() => {
//   logger.stopLoading()
//   logger.done('successful!')
//   console.log('\n')
// }, 2000)

const spinner = logger.createSpinner('正在加载')

setTimeout(() => {
  spinner.done('加载成功')
}, 1000)
