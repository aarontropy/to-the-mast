const requiredEnv = (prop: string, defaultValue?: string) => {
  const val = process.env[prop] || defaultValue;
  if (val == null) {
    throw Error(`Missing required env '${prop}'`);
  }

  return val;
};

const Settings = Object.freeze({
  env: requiredEnv("NODE_ENV", "development"),
  database: {
    host: requiredEnv("DB_HOST"),
    port: requiredEnv("DB_PORT"),
    user: requiredEnv("DB_USER"),
    password: requiredEnv("DB_PASS"),
    database: requiredEnv("DB_NAME"),
  },
});

type Settings = typeof Settings;

export default Settings;
