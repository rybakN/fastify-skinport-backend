import { createDatabase } from "./create-database";
import { createUsersTable } from "./create-users-table";
import { createMockUsers } from "./create-mock-data";
import { dbName } from "../constants/constants";

export const initializeDatabase = async () => {
  if (!dbName) throw new Error("Database name is not provided");
  try {
    await createDatabase(dbName!);
    await createUsersTable();
    await createMockUsers();
    console.log(`Database ${dbName} initialized successfully`);
  } catch (err: any) {
    console.error(`Failed to initialize database: ${err.message}`);
    throw new Error("Database initialization failed");
  }
};
