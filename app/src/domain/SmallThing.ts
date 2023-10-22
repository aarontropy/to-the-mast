import ValueObject from "./core/ValueObject";

export type SmallThingProps = {
  text: string;
};

export default class SmallThing extends ValueObject {
  static create({ text }: { text: string }): SmallThing {
    return new SmallThing(text);
  }

  constructor(public readonly text: string) {
    super();
  }
}
