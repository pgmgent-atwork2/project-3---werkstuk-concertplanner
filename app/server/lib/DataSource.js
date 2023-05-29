import dotenv from "dotenv";
import { DataSource } from "typeorm";

import entities from "../models/index.js";

dotenv.config();

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities,
});

export default DS;
