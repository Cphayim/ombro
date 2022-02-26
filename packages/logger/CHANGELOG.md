# @ombro/logger

## 1.5.4

### Patch Changes

Logger_LEVEL is silent, spinner will not be displayed either

## 1.5.3

### Patch Changes

Supplementary test cases

## 1.5.2

### Patch Changes

#### Fixes:

- Compatible with ESM named export

## 1.5.0

### Minor Changes

#### Fetures:

- Loadding support adding additional logs in mid-stream

```ts
logger.startLoading('install images...')

// now using other logs during loading will not affect the loading spinner display
logger.done('1.png')
logger.done('2.png')
logger.done('3.png')

logger.stopLoading()
```

## 1.4.0

### Minor Changes

#### Fetures:

- Log Support object print
  - `logger.info({ name: 'Cphayim' })`
- Custom spinner `createSpinner()`

## 1.3.0

### Minor Changes

#### Fetures:

- Integrated `boxen`
