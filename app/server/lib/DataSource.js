/* Import statements */
import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
});

export default DS;
