import DomainObject from "./DomainObject";

export type EntityId = string;

export default abstract class Entity extends DomainObject {
  public abstract id: EntityId;
}
