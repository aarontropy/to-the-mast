import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("intents", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable();
    table.string("active_state").notNullable();
    table.string("big_thing_text").notNullable();
    table.string("small_thing_text").notNullable();
    table.string("schedule_kind").notNullable();
    table.string("schedule_start_date").nullable();
    table.string("schedule_end_date").nullable();
    table.string("tp_recommit_when").notNullable();
    table.string("tp_checkin_when").notNullable();
    table.integer("comm_slot_morning_local_hour").notNullable();
    table.integer("comm_slot_afternoon_local_hour").notNullable();
    table.integer("comm_slot_evening_local_hour").notNullable();

    table.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime("modified_at", { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("intents");
}
