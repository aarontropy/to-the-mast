import Intent from "../../src/domain/Intent";
import IntentRepo from "../../src/infrastructure/repositories/intentRepo";
import knex, { clearDb } from "./utils/db";

describe("Intent Repository", () => {
  const repo = new IntentRepo(knex);

  beforeEach(async () => {
    await clearDb();
  });

  it("saves a default intent", async () => {
    const intent = Intent.createNew("fake user");
    await repo.save(intent);

    const res = await knex("intents").first().where({ id: intent.id });
    expect(res).toMatchObject({
      id: intent.id,
      user_id: "fake user",
      active_state: "paused",
      big_thing_text: "a big thing",
      small_thing_text: "a small thing",
      schedule_kind: "daily",
      schedule_start_date: "2023-10-25",
      schedule_end_date: null,
      tp_recommit_when: "morning",
      tp_checkin_when: "evening",
      comm_slot_morning_local_hour: 7,
      comm_slot_afternoon_local_hour: 13,
      comm_slot_evening_local_hour: 19,
    });
  });

  it("retrieves an intent", async () => {
    const data = {
      id: "int_0UNLIKELYRANDOMIDDGDK3GQEY",
      user_id: "fake user",
      active_state: "paused",
      big_thing_text: "my test big thing",
      small_thing_text: "my test small thing",
      schedule_kind: "daily",
      schedule_start_date: "2023-10-25",
      schedule_end_date: null,
      tp_recommit_when: "morning",
      tp_checkin_when: "evening",
      comm_slot_morning_local_hour: 7,
      comm_slot_afternoon_local_hour: 13,
      comm_slot_evening_local_hour: 19,
    };

    await knex("intents").insert(data);

    const intent = await repo.getById(data.id);

    expect(intent).toBeTruthy();
    expect(intent!.id).toBe(intent?.id);
  });
});
