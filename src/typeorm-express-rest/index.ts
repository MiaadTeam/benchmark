import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const createTypeormConnection = () => {
  const ENV = process.env;
  const DB_USER = ENV.TYPEORM_DB_USER;
  const DB_PASS = ENV.TYPEORM_DB_PASS;
  const DB_NAME = ENV.TYPEORM_DB_NAME;
  const DB = ENV.DB;
  const DB_PORT = ENV.TYPEORM_DB_PORT;

  const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    logging: false,
  };

  return new DataSource(config);
  
};
