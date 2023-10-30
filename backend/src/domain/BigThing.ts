import ValueObject from "./core/ValueObject";

export default class BigThing extends ValueObject {
  static create({ text }: { text: string }): BigThing {
    return new BigThing(text);
  }

  constructor(public readonly text: string) {
    super();
  }
}
