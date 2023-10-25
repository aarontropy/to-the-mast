import BigThing from "../../domain/BigThing";
import CommunicationSlots, { TimeSlot } from "../../domain/CommunicationSlots";
import Day from "../../domain/Day";
import Intent, { IIntentRepository, IntentActiveState } from "../../domain/Intent";
import Schedule, { ScheduleFrequency } from "../../domain/Schedule";
import SmallThing from "../../domain/SmallThing";
import TouchpointCollection, { Touchpoint, TouchpointTime } from "../../domain/TouchpointCollection";
import { Db } from "../db";

type IntentPersistenceModel = {
  intents: {
    id: string;
    user_id: string;
    active_state: string;
    big_thing_text: string;
    small_thing_text: string;
    schedule_kind: string;
    schedule_start_date: string | null;
    schedule_end_date: string | null;
    tp_recommit_when: string;
    tp_checkin_when: string;
    comm_slot_morning_local_hour: number;
    comm_slot_afternoon_local_hour: number;
    comm_slot_evening_local_hour: number;
  };
};

export default class IntentRepo implements IIntentRepository {
  static intentTablename = "intents";

  static toPersistence(intent: Intent): IntentPersistenceModel {
    if (!intent.userId) {
      throw new Error("Cannot persist Intent without a userId");
    }

    return {
      intents: {
        id: intent.id,
        user_id: intent.userId,
        active_state: intent.activeState,
        big_thing_text: intent.bigThing.text,
        small_thing_text: intent.smallThing.text,
        schedule_kind: intent.schedule.kind,
        schedule_start_date: intent.schedule.startDate?.value || null,
        schedule_end_date: intent.schedule.endDate?.value || null,
        tp_recommit_when: intent.touchpoints.recommit.when,
        tp_checkin_when: intent.touchpoints.checkin.when,
        comm_slot_morning_local_hour: intent.communicationSlots.morning.localHour,
        comm_slot_afternoon_local_hour: intent.communicationSlots.afternoon.localHour,
        comm_slot_evening_local_hour: intent.communicationSlots.evening.localHour,
      },
    };
  }

  static toDomain(data: IntentPersistenceModel): Intent {
    return new Intent({
      id: data.intents.id,
      userId: data.intents.user_id,
      activeState: data.intents.active_state as IntentActiveState,
      bigThing: BigThing.create({ text: data.intents.big_thing_text }),
      smallThing: SmallThing.create({ text: data.intents.small_thing_text }),
      schedule: Schedule.create({
        kind: data.intents.schedule_kind as ScheduleFrequency,
        startDate: data.intents.schedule_start_date ? Day.create(data.intents.schedule_start_date) : null,
        endDate: data.intents.schedule_end_date ? Day.create(data.intents.schedule_end_date) : null,
      }),
      touchpoints: TouchpointCollection.create({
        recommit: Touchpoint.create({ when: data.intents.tp_recommit_when as TouchpointTime }),
        checkin: Touchpoint.create({ when: data.intents.tp_checkin_when as TouchpointTime }),
      }),
      communicationSlots: CommunicationSlots.create({
        morning: TimeSlot.create(data.intents.comm_slot_morning_local_hour),
        afternoon: TimeSlot.create(data.intents.comm_slot_afternoon_local_hour),
        evening: TimeSlot.create(data.intents.comm_slot_evening_local_hour),
      }),
    });
  }

  constructor(public readonly db: Db) {}

  async getById(id: string): Promise<Intent | null> {
    const data = await this.db.first("*").from<IntentPersistenceModel>(IntentRepo.intentTablename).where("id", id);

    return data ? IntentRepo.toDomain(data) : null;
  }

  async save(intent: Intent): Promise<void> {
    const { id, ...intentData } = IntentRepo.toPersistence(intent).intents;

    const existing = await this.db.first("id").from(IntentRepo.intentTablename).where({ id });

    if (existing) {
      await this.db(IntentRepo.intentTablename).where({ id }).update(intentData);
    } else {
      await this.db(IntentRepo.intentTablename).insert({ id, ...intentData });
    }
  }
}
