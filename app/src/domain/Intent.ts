import BigThing from "./BigThing";
import CommunicationSlots, { TimeSlot } from "./CommunicationSlots";
import Day from "./Day";
import Schedule, { ScheduleFrequency } from "./Schedule";
import SmallThing from "./SmallThing";
import TouchpointCollection, { Touchpoint } from "./TouchpointCollection";
import AggregateRoot from "./core/AggregateRoot";
import { EntityId } from "./core/Entity";
import { createEntityId } from "./services/IdService";

export const IntentActiveState = {
  ACTIVE: "active",
  PAUSED: "paused",
  COMPLETE: "complete",
  CANCELLED: "cancelled",
} as const;

type IntentId = EntityId;

export type IntentActiveState = (typeof IntentActiveState)[keyof typeof IntentActiveState];

export type IntentModelProps = {
  id: IntentId;
  user_id?: string;
  activeState: IntentActiveState;
  bigThing: BigThing;
  smallThing: SmallThing;
  schedule: Schedule;
  touchpoints: TouchpointCollection;
  communicationSlots: CommunicationSlots;
};

export default class Intent extends AggregateRoot {
  public readonly id: IntentId;
  public readonly user_id?: string;
  public readonly activeState: IntentActiveState;
  public readonly bigThing: BigThing;
  public readonly smallThing: SmallThing;
  public readonly schedule: Schedule;
  public readonly touchpoints: TouchpointCollection;
  public readonly communicationSlots: CommunicationSlots;

  static createNew(): Intent {
    return new Intent({
      id: createEntityId("int"),
      user_id: undefined,
      activeState: IntentActiveState.PAUSED,
      bigThing: BigThing.create({ text: "a big thing" }),
      smallThing: SmallThing.create({ text: "a small thing" }),
      schedule: Schedule.create({
        kind: ScheduleFrequency.DAILY,
        startDate: Day.today(),
        endDate: null,
      }),
      touchpoints: TouchpointCollection.create({
        recommit: Touchpoint.create({ when: Touchpoint.When.MORNING }),
        checkin: Touchpoint.create({ when: Touchpoint.When.EVENING }),
      }),
      communicationSlots: CommunicationSlots.create({
        morning: TimeSlot.create(7),
        afternoon: TimeSlot.create(13),
        evening: TimeSlot.create(19),
      }),
    });
  }

  constructor(props: IntentModelProps) {
    super();

    this.id = props.id;
    this.user_id = props.user_id;
    this.activeState = props.activeState;
    this.bigThing = props.bigThing;
    this.smallThing = props.smallThing;
    this.schedule = props.schedule;
    this.touchpoints = props.touchpoints;
    this.communicationSlots = props.communicationSlots;
  }
}
