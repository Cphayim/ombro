# @ombro/stylelint-config

![npm package](https://badgen.net/npm/v/@ombro/stylelint-config)

Shared stylelint config for CSS/SCSS

## Install

```sh
$ npm install -D @ombro/stylelint-config
```

> If your package manager does not automatically install `peerDependencies`, you need to install it yourself according to the warning message

## Usage

Create `.stylelintrc.js` in the project root directory and add the following content:

```js
module.exports = {
  extends: ['@ombro/stylelint-config'],
}
```

This configuration already integrates with `stylelint-config-prettier`, you can go ahead and configure `.prettierrc`, `stylelint` rules will be consistent with it
