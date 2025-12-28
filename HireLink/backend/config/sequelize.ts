import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });

const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    port: Number(process.env.DATABASE_PORT),
    logging: console.log,
  }
);

export default sequelize;
