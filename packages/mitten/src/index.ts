export type EventType = string | symbol

export type Handle<T = unknown> = (event: T) => void
export type WildcardHandle<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void

// An set of all currently registered event handlers for a type
export type EventHandlerSet<T = unknown> = Set<Handle<T>>
export type WildcardEventHandlerSet<T = Record<string, unknown>> = Set<WildcardHandle<T>>

// A map of event types and their corresponding event handlers.
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events | '*',
  EventHandlerSet<Events[keyof Events]> | WildcardEventHandlerSet<Events>
>

export interface Emitter<Events extends Record<EventType, unknown>> {
  all: EventHandlerMap<Events>

  on<Key extends keyof Events>(type: Key, handler: Handle<Events[Key]>): void
  on(type: '*', handler: WildcardHandle<Events>): void

  off<Key extends keyof Events>(type: Key, handler?: Handle<Events[Key]>): void
  off(type: '*', handler: WildcardHandle<Events>): void

  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
  emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
}

export function mitten<Events extends Record<EventType, unknown>>(
  all?: EventHandlerMap<Events>,
): Emitter<Events> {
  type GenericEventHandler = Handle<Events[keyof Events]> | WildcardHandle<Events>

  all ??= new Map()

  return {
    /**
     * A Map of event types to registered handler functions
     */
    all,

    /**
     * Register an event handler for the given type.
     * @param type type of event to listen for, or '*' for all events
     * @param handler callback in response to given event
     */
    on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
      const handlers = all!.get(type) as Set<GenericEventHandler> | undefined

      if (handlers) {
        handlers.add(handler)
      } else {
        all!.set(type, new Set([handler]) as EventHandlerSet<Events[keyof Events]>)
      }
    },

    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param type type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
     * @param handler callback to remove
     * @returns
     */

    off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
      const handlers = all!.get(type) as Set<GenericEventHandler> | undefined

      if (!handlers) return

      if (handler) {
        handlers.delete(handler)
      } else {
        handlers.clear()
      }
    },

    /**
     * Invoke all handlers for the given event type.
     * If present, `'*'` handlers are invoked for all event types.
     *
     * Note: Manually firing '*' handlers is not supported.
     *
     * @param type the event type to invoke
     * @param event any value (object is recommended and powerful), passed to each handler
     */
    emit<Key extends keyof Events>(type: Key, event?: Events[Key]) {
      const handlers = all!.get(type) as EventHandlerSet<Events[keyof Events]> | undefined
      if (handlers) {
        handlers.forEach((handler) => {
          handler(event!)
        })
      }

      const wildcardHandlers = all!.get('*') as WildcardEventHandlerSet<Events> | undefined
      if (wildcardHandlers) {
        wildcardHandlers.forEach((handler) => {
          handler(type, event!)
        })
      }
    },
  }
}

export default mitten
