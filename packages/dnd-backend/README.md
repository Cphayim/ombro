# @ombro/dnd-backend

![npm package](https://badgen.net/npm/v/@ombro/dnd-backend)

English | [简体中文](README_zh.md)

Integrate the following 3 dnd-backends to support on-demand import

- [react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend)
- [react-dnd-touch-backend](https://www.npmjs.com/package/react-dnd-touch-backend)
- [react-dnd-test-backend](https://www.npmjs.com/package/react-dnd-test-backend)

## Install

```sh
$ npm install @ombro/dnd-backend
# or
$ pnpm install @ombro/dnd-backend
```

## Usage

```ts
import { HTML5Backend, TouchBackend, TestBackend } from '@ombro/dnd-backend'
```

Only import required backends

```ts
import { HTML5Backend } from '@ombro/dnd-backend/html5'
// or
import { TouchBackend } from '@ombro/dnd-backend/touch'
// or
import { TestBackend } from '@ombro/dnd-backend/test'
```

## License

MIT
