import { Pool } from "pg";
import { dbHost, dbPassword, dbPort, dbUser } from "../constants/constants";

export const createPool = (database?: string) => {
  const config = {
    user: dbUser,
    host: dbHost,
    database: database,
    password: dbPassword,
    port: dbPort,
  };
  return new Pool(config);
};

export const createDatabase = async (dbName: string) => {
  const pool = createPool();
  try {
    const res = await pool.query(
      `SELECT 1 FROM pg_database WHERE datname='${dbName}'`,
    );
    if (res.rowCount) {
      console.log(`Database ${dbName} already exists`);
      return;
    }
    await pool.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database ${dbName} created successfully`);
  } catch (err) {
    console.error("Error creating database:", err);
  } finally {
    await pool.end();
  }
};
