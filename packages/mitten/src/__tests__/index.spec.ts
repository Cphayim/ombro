import { beforeEach, describe, expect, it, vi } from 'vitest'

import defaultMitten, { type Emitter, type EventHandlerMap, mitten } from '../index'

describe('mitten', () => {
  it('should contains named export and default export', () => {
    expect(defaultMitten).toBeTypeOf('function')
    expect(mitten).toBeTypeOf('function')
    expect(defaultMitten).toBe(mitten)
  })

  it('should accept an optional event handler map', () => {
    expect(() => mitten()).not.toThrow()
    expect(() => mitten(new Map())).not.toThrow()

    const map = new Map()
    const a = vi.fn()
    const b = vi.fn()
    map.set('foo', new Set([a, b]))

    const emitter = mitten<{ foo: undefined }>(map)

    emitter.emit('foo')

    expect(a).toHaveBeenCalledOnce()
    expect(b).toHaveBeenCalledOnce()
  })
})

describe('mitten#', () => {
  const eventType = Symbol('eventType')
  type Events = {
    foo: unknown
    constructor: unknown
    FOO: unknown
    bar: unknown
    Bar: unknown
    'baz:bat!': unknown
    'baz:baT!': unknown
    Foo: unknown
    [eventType]: unknown
  }

  let events: EventHandlerMap<Events>, inst: Emitter<Events>

  beforeEach(() => {
    events = new Map()
    inst = mitten(events)
  })

  describe('properties', () => {
    it('should expose the event handler map', () => {
      expect(inst).toHaveProperty('all')
      expect(inst.all).toBe(events)
    })
  })

  describe('on()', () => {
    it('should be a function', () => {
      expect(inst).toHaveProperty('on')
      expect(inst.on).toBeTypeOf('function')
    })

    it('should register handler for new type', () => {
      const foo = () => void 0
      inst.on('foo', foo)
      expect(events.get('foo')?.size).toBe(1)
      expect(events.get('foo')?.has(foo)).toBe(true)
    })

    it('should not add duplicate handlers', () => {
      const foo = () => void 0
      inst.on('foo', foo)
      inst.on('foo', foo)
      inst.on('foo', foo)

      // for an event type, the same callback is registered only once
      expect(events.get('foo')?.size).toBe(1)
    })

    it('should register handlers for any type strings', () => {
      const foo = () => void 0
      inst.on('test' as any, foo)
      expect(events.get('test' as any)?.size).toBe(1)
      expect(events.get('test' as any)?.has(foo)).toBe(true)
    })

    it('should append handler for existing type', () => {
      const foo = () => void 0
      const bar = () => void 0
      inst.on('foo', foo)
      inst.on('foo', bar)

      expect(events.get('foo')?.size).toBe(2)
      expect(events.get('foo')?.has(foo)).toBe(true)
      expect(events.get('foo')?.has(bar)).toBe(true)
    })

    it('should NOT normalize case', () => {
      const foo = () => void 0
      inst.on('FOO', foo)
      inst.on('Bar', foo)
      inst.on('baz:baT!', foo)

      expect(events.has('FOO')).toBe(true)
      expect(events.get('FOO')!.has(foo)).toBe(true)
      expect(events.has('foo')).toBe(false)

      expect(events.has('Bar')).toBe(true)
      expect(events.get('Bar')!.has(foo)).toBe(true)
      expect(events.has('bar')).toBe(false)

      expect(events.has('baz:baT!')).toBe(true)
      expect(events.get('baz:baT!')!.has(foo)).toBe(true)
      expect(events.has('baz:bat!')).toBe(false)
    })

    it('can take symbols for event types', () => {
      const foo = () => void 0
      inst.on(eventType, foo)
      expect(events.get(eventType)?.size).toBe(1)
    })
  })

  describe('off()', () => {
    it('should be a function', () => {
      expect(inst).toHaveProperty('off')
      expect(inst.off).toBeTypeOf('function')
    })

    it('should remove handler for type', () => {
      const foo = () => void 0
      inst.on('foo', foo)
      inst.off('foo', foo)

      expect(events.has('foo')).toBe(true)
      expect(events.get('foo')!.size).toBe(0)
    })

    it('should NOT normalize case', () => {
      const foo = () => void 0
      inst.on('FOO', foo)
      inst.on('Bar', foo)
      inst.on('baz:bat!', foo)

      inst.off('FOO', foo)
      inst.off('Bar', foo)
      inst.off('baz:baT!', foo)

      expect(events.get('FOO')?.size).toBe(0)
      expect(events.has('foo')).toBe(false)
      expect(events.get('Bar')?.size).toBe(0)
      expect(events.has('bar')).toBe(false)
      expect(events.get('baz:bat!')?.size).toBe(1)
    })

    it('off("type") should remove all handlers of the given type', () => {
      inst.on('foo', () => void 0)
      inst.on('foo', () => void 0)
      inst.on('bar', () => void 0)

      expect(events.get('foo')?.size).toBe(2)
      inst.off('foo')
      expect(events.get('foo')?.size).toBe(0)

      expect(events.get('bar')?.size).toBe(1)
      inst.off('bar')
      expect(events.get('bar')?.size).toBe(0)
    })
  })

  describe('emit()', () => {
    it('should be a function', () => {
      expect(inst).toHaveProperty('emit')
      expect(inst.emit).toBeTypeOf('function')
    })

    it('should invoke handler for type', () => {
      const event = { a: 'b' }

      inst.on('foo', (one, two?: unknown) => {
        expect(one).toEqual(event)
        expect(two).toBe(undefined)
      })

      inst.emit('foo', event)
    })

    it('should NOT ignore case', () => {
      const onFoo = vi.fn(),
        onFOO = vi.fn()
      events.set('Foo', new Set([onFoo]))
      events.set('FOO', new Set([onFOO]))

      inst.emit('Foo', 'Foo arg')
      inst.emit('FOO', 'FOO arg')

      expect(onFoo).toBeCalledWith('Foo arg')
      expect(onFOO).toBeCalledWith('FOO arg')
    })

    it('should invoke * handlers', () => {
      const star = vi.fn(),
        ea = { a: 'a' },
        eb = { b: 'b' }

      events.set('*', new Set([star]))

      inst.emit('foo', ea)
      expect(star).toHaveBeenCalledOnce()
      expect(star).toHaveBeenCalledWith('foo', ea)

      star.mockReset()

      inst.emit('bar', eb)
      expect(star).toHaveBeenCalledOnce()
      expect(star).toHaveBeenCalledWith('bar', eb)
    })
  })
})
