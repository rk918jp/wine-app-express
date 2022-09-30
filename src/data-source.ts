import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Wine } from "./entities/Wine";
// import { Winery } from "./entities/Winery";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "wine_app",
  synchronize: true,
  logging: false,
  entities: [
    "src/entities/*.ts",
],
  migrations: [
    "src/db/migrations/*.ts",
  ],
  subscribers: [],
});