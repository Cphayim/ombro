# @ombro/is-main

![npm package](https://badgen.net/npm/v/@ombro/is-main)

Check if the current module is an entry module for ESM, usually useful in command line scripts.

## Install

```sh
$ npm install @ombro/is-main
```

## Usage

```js
import { isMain } from '@ombro/is-main'

if (isMain(import.meta)) {
  // ...
}
```

If you're using CommonJS modules, then judge directly:

```js
if (require.main === module) {
  // ...
}
```

## Example

Suppose we want to create two tasks, `clean` and `build`. Before `build`, we will pass a parameter `--clean` to determine whether `clean` needs to be performed first, and the `clean` task can also be executed separately

```sh
# Only clean
node clean.js

# Only build
node build.js
# Clean and build
node build.js --clean
```

`clean.js`:

```js
import { isMain } from '@ombro/is-main'

export function clean() {
  // clean...
}

// Executed only when the clean.js is an entry module
if (isMain(import.meta)) {
  clean()
}
```

`build.js`:

```js
import { isMain } from '@ombro/is-main'
import { clean } from './clean.js'

export function build() {
  // build...
}

// Executed only when the build.js is an entry module
if (isMain(import.meta)) {
  process.argv.includes('--clean') && clean()
  build()
}
```

## License

MIT
