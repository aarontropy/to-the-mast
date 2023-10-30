import Knex from "knex";
import Settings from "../settings";

const knex = Knex({
  client: "mysql",
  connection: Settings.database,
});

export type Db = Knex.Knex;

export default knex;
