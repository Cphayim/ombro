<div align="center">

<a href="https://github.com/Cphayim/ombro">
<img src="./docs/assets/logo.png" width="500" alt="ombro - a customized toolbox for js" />
</a>

![GitHub Actions Status](https://github.com/Cphayim/ombro/actions/workflows/ci.yml/badge.svg)
[![Codecov](https://codecov.io/gh/Cphayim/ombro/branch/main/graph/badge.svg?token=HQZZT3GKZF)](https://codecov.io/gh/Cphayim/ombro)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub language](https://img.shields.io/github/languages/top/Cphayim/ombro.svg)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-f49033.svg)](https://pnpm.io/)

<div>
  <span>English</span> | <a href="./README_zh.md">简体中文</a>
</div>
</br>
</div>

OMBRO is a JavaScript toolbox that provides various small libraries containing many useful utility functions and modules, covering multiple domains such as general-purpose, browser-side, server-side, build tool extensions and presets.

These libraries not only exhibit high reusability and composability, but also come with good documentation and test coverage, enabling developers to quickly build high-quality applications. Moreover, OMBRO features a lightweight, easy-to-use, and extensible nature, suitable for projects and teams of various sizes.

## What's in here?

- **General**
  - [@ombro/cli-chat](./packages/cli-chat): A CLI chatGPT tool
  - [@ombro/mitten](./packages/mitten): A tiny functional event emitter
- **Browser**
- **Server**
  - [@ombro/is-main](./packages/is-main): Check if the current module is an entry module for ESM
  - [@ombro/logger](./packages/logger): Provides preset and custom Node.js log output tools
- **Preset**
  - TypeScript
    - [@ombro/tsconfig](./packages/tsconfig): `tsconfig.json` preset config for Typescript
  - ESLint + Prettier
    - [@ombro/eslint-config](./packages/eslint-config): `eslint + prettier` preset config for JavaScript
    - [@ombro/eslint-config-typescript](./packages/eslint-config-typescript): `eslint + prettier` preset config for TypeScript
    - [@ombro/eslint-config-vue3](./packages/eslint-config-vue3): `eslint + prettier` preset config for Vue3
    - [@ombro/eslint-config-vue3-typescript](./packages/eslint-config-vue3-typescript): `eslint + prettier` preset config for Vue3
    - [@ombro/eslint-config-vue2](./packages/eslint-config-vue2): `eslint + prettier` preset config for Vue2
    - [@ombro/eslint-config-vue2-typescript](./packages/eslint-config-vue2-typescript): `eslint + prettier` preset config for Vue2
    - [@ombro/eslint-config-react](./packages/eslint-config-react): `eslint + prettier` preset config for React
    - [@ombro/eslint-config-react-typescript](./packages/eslint-config-react-typescript): `eslint + prettier` preset config for for React
  - StyleLint + Prettier
    - [@ombro/stylelint-config](./packages/stylelint-config): `stylelint + prettier` preset config for CSS/SCSS
- **Runtime**
  - ~~[@ombro/node](./packages/node): A zero-configuration, quick-start ESNext Node.js runtime~~

## Changelogs

Provided in specific package

## License

[MIT](./LICENSE)
