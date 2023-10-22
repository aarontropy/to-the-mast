import { PojoOf } from "./types";

export default class DomainObject {
  asDTO<T>(this: T): PojoOf<T> {
    return JSON.parse(JSON.stringify(this));
  }
}
