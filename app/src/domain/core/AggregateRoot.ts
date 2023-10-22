import DomainEvent from "./DomainEvent";
import Entity, { EntityId } from "./Entity";

export default abstract class AggregateRoot extends Entity {
  public abstract readonly id: EntityId;
  public domainEvents: DomainEvent[] = [];

  addEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  clearEvents(): void {
    this.domainEvents = [];
  }
}
