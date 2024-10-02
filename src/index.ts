import Fastify from "fastify";
import NodeCache from "node-cache";
import { Pool } from "pg";
import { appHost, appPort, dbName } from "./constants/constants";
import { createDatabase } from "./database/create-database";
import { createMockUsers } from "./database/create-mock-data";
import { createUsersTable } from "./database/create-users-table";

const fastify = Fastify({ logger: true });
const cache = new NodeCache();
const pool = new Pool();

const start = async () => {
  if (!dbName) throw new Error("Database name is not provided");
  await createDatabase(dbName!);
  await createUsersTable();
  await createMockUsers();

  try {
    await fastify.listen({
      port: +appPort! || 3000,
      host: appHost,
    });
    console.log(`Server is running on http://localhost:${appPort}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
