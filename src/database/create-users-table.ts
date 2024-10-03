import { createPool } from "./create-database";
import { dbName } from "../constants/constants";

export const createUsersTable = async () => {
  const pool = createPool(dbName);
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      balance NUMERIC(10, 2) NOT NULL DEFAULT 0
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Users table created successfully");
  } catch (err) {
    console.error("Error creating users table:");
    throw err;
  } finally {
    await pool.end();
  }
};
