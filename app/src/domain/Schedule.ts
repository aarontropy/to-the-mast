import Day from "./Day";
import ValueObject from "./core/ValueObject";

export const ScheduleFrequency = {
  DAILY: "daily",
} as const;
export type ScheduleFrequency = (typeof ScheduleFrequency)[keyof typeof ScheduleFrequency];

type CreateArgs = {
  kind: ScheduleFrequency;
  startDate: Day | null;
  endDate: Day | null;
};

export default class Schedule extends ValueObject {
  static create({ kind, startDate, endDate }: CreateArgs): Schedule {
    return new Schedule(kind, startDate, endDate);
  }

  constructor(
    public readonly kind: ScheduleFrequency,
    public readonly startDate: Day | null,
    public readonly endDate: Day | null
  ) {
    super();
  }
}
