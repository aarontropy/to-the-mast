/** @type {import('ts-jest').JestConfigWithTsJest} */
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.test") });

module.exports = {
  displayName: "Integration Tests",
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>"],
};
