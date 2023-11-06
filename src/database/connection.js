import { Sequelize } from "sequelize";
import config from "../config";

//1# connection string
export const postgresConnection = new Sequelize(
  process.env["CONNECTION_STRING"]
);

// export const postgresConnection = new Sequelize({
//   dialect: "postgres",
//   ...config.postgres,
// });
