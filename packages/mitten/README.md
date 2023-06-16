# @ombro/mitten

[![npm package](https://badgen.net/npm/v/@ombro/mitten)](https://npmjs.com/package/@ombro/mitten)

Mitten is a lightweight event emitter library for TypeScript that allows you to create, manage, and emit custom events.

## Installation

Use your favorite package manager to install it:

```sh
npm install @ombro/mitten
# or
pnpm add @ombro/mitten
```

## Usage

### Creating an Emitter

To create an emitter, you can use the `mitten` function. It takes an optional `EventHandlerMap` object as an argument, which is a map of event types and their corresponding event object.

```ts
import mitten from '@ombro/mitten'

type MyEvents = {
  foo: string
  bar: number
}

const emitter = mitten<MyEvents>()
```

### Registering Event Handlers

To register an event handler, use the `on` method of the emitter. It takes two arguments: the event type to listen for, and the callback function to execute in response to the event.

```ts
emitter.on('foo', (event) => {
  console.log(`Received event with value: ${event}`)
})
```

To register a wildcard event handler that will execute for all events, use the `on` method with a `'*'` type and a callback that takes two arguments: the event type and the event object.

```ts
emitter.on('*', (type, event) => {
  console.log(`Received ${type} event with value: ${event}`)
})
```

### Emitting Events

To emit an event, use the `emit` method of the emitter. It takes two arguments: the event type to emit, and the event object to pass to the event handlers.

```ts
emitter.emit('foo', 'hello world')
```

If you need to emit an event with an undefined value, pass `undefined` as the second argument to `emit`. You can also omit the second argument entirely if the event type has an optional value.

```ts
type MyEvents = {
  foo: string
  bar?: number
}

emitter.emit('foo', 'hello world')
emitter.emit('bar')
```

### Unregistering Event Handlers

To unregister an event handler, use the `off` method of the emitter. It takes two arguments: the event type to unregister the handler from, and the optional callback function to remove.

```ts
const handler = (event: string) => {
  console.log(`Received event with value: ${event}`)
}

emitter.on('foo', handler)

// Unregister a specific handler
emitter.off('foo', handler)

// Unregister all handlers for a specific event type
emitter.off('foo')

// Unregister all handlers for wildcard event types
emitter.off('*')
```

## Example

```ts
import mitten from '@ombro/mitten'

type MyEvents = {
  foo: string
  bar?: number
}

const emitter = mitten<MyEvents>()

emitter.on('foo', (event) => {
  console.log(`Received foo event with value: ${event}`)
})

emitter.on('bar', (event) => {
  console.log(`Received bar event with value: ${event}`)
})

emitter.on('*', (type, event) => {
  console.log(`Received ${type} event with value: ${event}`)
})

emitter.emit('foo', 'hello world')
emitter.emit('bar', 42)
emitter.emit('bar')
```
