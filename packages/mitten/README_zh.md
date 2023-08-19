# @ombro/mitten

[![npm package](https://badgen.net/npm/v/@ombro/mitten)](https://npmjs.com/package/@ombro/mitten)

[English](./README.md) | 简体中文

Mitten 是一个轻量级的 TypeScript 事件发射器库，允许您创建、管理和触发自定义事件。

## 安装

选择你喜欢的包管理器安装它:

```sh
npm install @ombro/mitten
# or
pnpm add @ombro/mitten
```

## 如何使用？

### 创建一个事件发射器

要创建一个事件发射器，您可以使用 `mitten` 函数。它接受一个可选的 `EventHandlerMap` 对象作为参数，该对象是事件类型及其对应事件对象的映射。

```ts
import mitten from '@ombro/mitten'

type MyEvents = {
  foo: string
  bar: number
}

const emitter = mitten<MyEvents>()
```

### 注册事件处理程序

要注册事件处理程序，请使用发射器的 `on` 方法。它接受两个参数：要监听的事件类型和在响应事件时执行的回调函数。

```ts
emitter.on('foo', (event) => {
  console.log(`接收到值为：${event} 的事件`)
})
```

要注册一个通配符事件处理程序，它将对所有事件执行，请使用带有 `'*'` 类型的 `on` 方法，并使用一个带有两个参数的回调函数：事件类型和事件对象。

```ts
emitter.on('*', (type, event) => {
  console.log(`接收到 ${type} 事件，值为：${event}`)
})
```

### 触发事件

要触发事件，请使用发射器的 `emit` 方法。它接受两个参数：要触发的事件类型和要传递给事件处理程序的事件对象。

```ts
emitter.emit('foo', 'hello world')
```

如果您需要触发一个未定义值的事件，请将 `undefined` 作为第二个参数传递给 `emit`。如果事件类型具有可选值，则也可以完全省略第二个参数。

```ts
type MyEvents = {
  foo: string
  bar?: number
}

emitter.emit('foo', '你好，世界')
emitter.emit('bar')
```

### 注销事件处理程序

要注销事件处理程序，请使用发射器的 `off` 方法。它接受两个参数：要注销处理程序的事件类型和可选的回调函数。

```ts
const handler = (event: string) => {
  console.log(`接收到值为：${event} 的事件`)
}

emitter.on('foo', handler)

// 注销特定的处理程序
emitter.off('foo', handler)

// 注销特定事件类型的所有处理程序
emitter.off('foo')

// 注销 "*" 通配符事件类型的所有处理程序
emitter.off('*')
```

## 示例

```ts
import mitten from '@ombro/mitten'

type MyEvents = {
  foo: string
  bar?: number
}

const emitter = mitten<MyEvents>()

emitter.on('foo', (event) => {
  console.log(`接收到 foo 事件，值为：${event}`)
})

emitter.on('bar', (event) => {
  console.log(`接收到 bar 事件，值为：${event}`)
})

emitter.on('*', (type, event) => {
  console.log(`接收到 ${type} 事件，值为：${event}`)
})

emitter.emit('foo', 'hello world')
emitter.emit('bar', 42)
emitter.emit('bar')
```
