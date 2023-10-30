import ValueObject from "./core/ValueObject";

export const TouchpointTime = {
  NIGHT_BEFORE: "night-before",
  MORNING: "morning",
  AFTERNOON: "afternoon",
  EVENING: "evening",
  NEXT_MORNING: "next-morning",
} as const;
export type TouchpointTime = (typeof TouchpointTime)[keyof typeof TouchpointTime];

export class Touchpoint extends ValueObject {
  static When = TouchpointTime;

  static create({ when }: { when: TouchpointTime }): Touchpoint {
    return new Touchpoint(when);
  }
  constructor(public readonly when: TouchpointTime) {
    super();
  }
}

export type TouchpointCollectionProps = {
  recommit: Touchpoint;
  checkin: Touchpoint;
};

export default class TouchpointCollection extends ValueObject {
  public readonly recommit: Touchpoint;
  public readonly checkin: Touchpoint;

  static create({ recommit, checkin }: TouchpointCollectionProps): TouchpointCollection {
    return new TouchpointCollection({ recommit, checkin });
  }

  constructor({ recommit, checkin }: TouchpointCollectionProps) {
    super();
    this.recommit = recommit;
    this.checkin = checkin;
  }
}
