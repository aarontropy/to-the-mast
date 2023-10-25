import Knex from "knex";
import Settings from "../../../src/settings";

const knex = Knex({
  client: "pg",
  connection: Settings.database,
});

export type Db = Knex.Knex;

export default knex;
