# @ombro/logger

[简体中文](./README.zh-CN.md)

Provides preset and custom Node.js log output tools

![](./docs/console.png)

## Install

```sh
$ npm install @ombro/logger
# or
$ yarn add @ombro/logger
```

## Usage

```js
import { logger } from '@ombro/logger'

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
}, 2000)
```

## API

### `logger.setLevel(level: string)`

Sets the lowest level at which printing can be output

- **level**
  - Lowest level
  - type: `'verbose' | 'info' | 'notice' | 'warn' | 'error' | 'silent'`
  - default: `'info'`

### `logger.verbose(message: string, tag = '')`

Print a verbose message

- **message**
  - Message content
  - type: `string`
  -
- **tag**
  - Message prefix
  - type: `string`
  - default: `''`

### `logger.debug(message: string, tag = '')`

Print a debug message

- **message**

  - Message content
  - type: `string`

- **tag**
  - Message prefix
  - type: `string`
  - default: `''`

### `logger.info(message: string, tag = '')`

Print a info message

- **message**

  - Message content
  - type: `string`

- **tag**
  - Message prefix
  - type: `string`
  - default: `''`

### `logger.done(message: string, tag = '', plain = false)`

Print a success message

- **message**

  - Message content
  - type: `string`

- **tag**

  - Message prefix
  - type: `string`
  - default: `''`

- **plain**
  - Is `plain` message, which strips the color of the message itself
  - type: `boolean`
  - default: `false`

### `logger.warn(message: string, tag = '', plain = false)`

Print a warnning message

- **message**

  - Message content
  - type: `string`

- **tag**

  - Message prefix
  - type: `string`
  - default: `''`

- **plain**
  - Is `plain` message, which strips the color of the message itself
  - type: `boolean`
  - default: `false`

### `logger.error(message: string, tag = '', plain = false)`

Print a error message

- **message**

  - Message content
  - type: `string`

- **tag**

  - Message prefix
  - type: `string`
  - default: `''`

- **plain**
  - Is `plain` message, which strips the color of the message itself
  - type: `boolean`
  - default: `false`

### `logger.loadding(options: string | ora.Options): ora.Ora`

Display wait spinner, only one spinner can exist at the same time

- **options**
  - message or options
  - type: `string | ora.Options`

### `logger.clearLoadding()`

Stop and clear spinner

### `logger.clearConsole(title = '')`

Clear the output of the current console，Only valid under tty (macOS, Linux)

- **title**
  - Optionally output text after cleanup
  - type: `string`
  - default: `''`
