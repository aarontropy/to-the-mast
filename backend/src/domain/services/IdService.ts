import { ulid } from "ulid";
import { EntityId } from "../core/Entity";

export function createEntityId(prefix?: string): EntityId {
  const id = ulid();

  return prefix ? `${prefix}_${id}` : id;
}
