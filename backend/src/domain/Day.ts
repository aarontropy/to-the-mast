import DayJS from "dayjs";
import ValueObject from "./core/ValueObject";

export default class Day extends ValueObject {
  public readonly value: string;

  static create(value: string): Day {
    /** @todo MAKE THIS TIMEZONE AWARE */
    return new Day(value);
  }

  static today(): Day {
    /** @todo MAKE THIS TIMEZONE AWARE */
    return Day.create(DayJS().format("YYYY-MM-DD"));
  }

  constructor(value: string) {
    super();

    if (!/\d{4}-\d{2}-\d{2}/.test(value)) {
      throw Error("NEED A DOMAIN INVARIANT THINGY");
    }
    this.value = value;
  }
}
