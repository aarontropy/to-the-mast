require("ts-node/register");
const path = require("path");

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env.test") });
} else {
  require("dotenv").config();
}

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  migrations: {
    extension: "ts",
  },
};
