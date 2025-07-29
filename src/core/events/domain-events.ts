/** biome-ignore-all lint/complexity/noStaticOnlyClass: This file uses a static-only class (DomainEvents) to encapsulate all logic and state related to domain event handling. 
 All variables and functions are encapsulated as static members of the DomainEvents class, ensuring they are not accessible outside except through the class interface.
 The handlersMap and markedAggregates variables are private static properties, so they cannot be accessed directly from outside the class.
 All methods for marking, dispatching, and managing aggregates and events are static, enforcing encapsulation and preventing instantiation of the class.*/
/** biome-ignore-all lint/suspicious/noExplicitAny: DomainEvents uses 'any' for flexibility in event and aggregate handling */
import type { AggregateRoot } from '~/core/entities/aggregate-root'
import type { UniqueEntityID } from '~/core/entities/unique-entity-id'
import type { DomainEvent } from './domain-event'

type DomainEventCallback = (event: any) => void

export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {}
  private static markedAggregates: AggregateRoot<any>[] = []

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>) {
    const aggregateFound = !!DomainEvents.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      DomainEvents.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>) {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      DomainEvents.dispatch(event)
    )
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>
  ) {
    const index = DomainEvents.markedAggregates.findIndex(a =>
      a.equals(aggregate)
    )

    DomainEvents.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID
  ): AggregateRoot<any> | undefined {
    return DomainEvents.markedAggregates.find(aggregate =>
      aggregate.id.equals(id)
    )
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID) {
    const aggregate = DomainEvents.findMarkedAggregateByID(id)

    if (aggregate) {
      DomainEvents.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      DomainEvents.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string
  ) {
    const wasEventRegisteredBefore = eventClassName in DomainEvents.handlersMap

    if (!wasEventRegisteredBefore) {
      DomainEvents.handlersMap[eventClassName] = []
    }

    DomainEvents.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers() {
    DomainEvents.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    DomainEvents.markedAggregates = []
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name

    const isEventRegistered = eventClassName in DomainEvents.handlersMap

    if (isEventRegistered) {
      const handlers = DomainEvents.handlersMap[eventClassName]

      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
