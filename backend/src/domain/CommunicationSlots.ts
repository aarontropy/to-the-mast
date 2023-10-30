import ValueObject from "./core/ValueObject";

export class TimeSlot extends ValueObject {
  static create(localHour: number): TimeSlot {
    return new TimeSlot(localHour);
  }

  constructor(public readonly localHour: number) {
    super();
  }
}

export default class CommunicationSlots extends ValueObject {
  static create({
    morning,
    afternoon,
    evening,
  }: {
    morning: TimeSlot;
    afternoon: TimeSlot;
    evening: TimeSlot;
  }): CommunicationSlots {
    return new CommunicationSlots(morning, afternoon, evening);
  }

  constructor(
    public readonly morning: TimeSlot,
    public readonly afternoon: TimeSlot,
    public readonly evening: TimeSlot
  ) {
    super();
  }
}
