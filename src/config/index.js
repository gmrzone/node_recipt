import Sequilize from "sequelize";

const DATABASE = process.env["POSTGRES_DB_NAME"];
const USER = process.env["POSTGRES_USER"];
const PASSWORD = process.env["POSTGRES_PASSWORD"];
const HOST = process.env["POSTGRES_DB_HOST"];
const PG_PORT = process.env["PGPORT"];

const POOL_IDLE = process.env["DB_POOL_CLIENT_IDLE_TIMEOUT"];
const POOL_MAX = process.env["DB_POOL_SIZE"];

const sequilize = new Sequilize(DATABASE, USER, PASSWORD, {
  host: HOST || 'localhost',
  dialect: "postgres",
  port: +PG_PORT,
  pool: {
    max: +POOL_MAX,
    min: 0,
    acquire: 30000,
    idle: +POOL_IDLE,
  },
});

export default sequilize
