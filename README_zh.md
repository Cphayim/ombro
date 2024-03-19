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
  <a href="./README.md">English</a> | <span>简体中文</span>
</div>
</br>
</div>

OMBRO 是一个提供各种小型库的 JavaScript 工具箱，其中包含了许多实用的工具函数和模块，涵盖了通用函数库、浏览器端、服务端、构建工具扩展包及预设配置等多个领域。

这些库不仅具有高度的可重用性和可组合性，而且还具有良好的文档和测试覆盖率，可以帮助开发人员快速构建高质量的应用程序。此外，OMBRO 还具有轻量级、易于使用和可扩展的特点，适用于各种规模的项目和团队。

## 这里有什么?

- **通用**
  - [@ombro/cli-chat](./packages/cli-chat): 一个命令行 chatGPT 工具
  - [@ombro/mitten](./packages/mitten)：一个轻量级的函数式事件发射器
- **浏览器端**
- **服务端**
  - [@ombro/is-main](./packages/is-main)：检查当前模块是否为 ESM 入口模块
  - [@ombro/logger](./packages/logger)：提供预置和自定义 Node.js 日志输出工具
- **预设配置**
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
