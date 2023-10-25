import knex from "./utils/db";

describe("test infrastructure", () => {
  it("loads a db", async () => {
    const res = await knex.raw("select 1");

    expect(res).toBeTruthy();
  });
});
