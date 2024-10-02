import Fastify from "fastify";
import NodeCache from "node-cache";
import { appHost, appPort, dbName } from "./constants/constants";
import { createDatabase } from "./database/create-database";
import { createMockUsers } from "./database/create-mock-data";
import { createUsersTable } from "./database/create-users-table";
import { UsersService } from "./users/users.service";
import { schema } from "./validation/validate-schema";

const fastify = Fastify({ logger: true });
const cache = new NodeCache();

fastify.put("/users/:id/withdraw", { schema }, async (request, reply) => {
  const { id } = request.params as { id: string };
  const { price } = request.body as { price: number };

  const userRepo = new UsersService();
  await userRepo.withdrawMoney(parseInt(id), price);
  reply.send({ message: "Balance updated successfully" });
});

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
