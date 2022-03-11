# @ombro/eslint-config

![npm package](https://badgen.net/npm/v/@ombro/eslint-config)

Shared eslint config for JavaScript

## Install

```sh
$ npm install -D @ombro/eslint-config
```

> If your package manager does not automatically install `peerDependencies`, you need to install it yourself according to the warning message

## Usage

Create `.eslintrc.js` in the project root directory and add the following content:

```js
module.exports = {
  root: true,
  extends: ['@ombro/eslint-config'],
}
```

This configuration already integrates with `eslint-config-prettier`, you can go ahead and configure `.prettierrc` and `eslint` rules will be consistent with it
