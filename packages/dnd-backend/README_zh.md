# @ombro/dnd-backend

![npm package](https://badgen.net/npm/v/@ombro/dnd-backend)

[English](./README.md) | 简体中文

集成以下 3 个 dnd-backend，支持按需导入

- [react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend)
- [react-dnd-touch-backend](https://www.npmjs.com/package/react-dnd-touch-backend)
- [react-dnd-test-backend](https://www.npmjs.com/package/react-dnd-test-backend)

## 安装

```sh
$ npm install @ombro/dnd-backend
# or
$ pnpm install @ombro/dnd-backend
```

## 使用

```ts
import { HTML5Backend, TouchBackend, TestBackend } from '@ombro/dnd-backend'
```

仅导入需要的 backend

```ts
import { HTML5Backend } from '@ombro/dnd-backend/html5'
// or
import { TouchBackend } from '@ombro/dnd-backend/touch'
// or
import { TestBackend } from '@ombro/dnd-backend/test'
```

## License

MIT
