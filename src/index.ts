import Fastify from "fastify";
import { appHost, appPort } from "./constants/constants";
import { initializeDatabase } from "./database/initialize-database";
import { registerRoutes } from "./registerRoutes";

const fastify = Fastify({ logger: true });

const start = async () => {
  try {
    await initializeDatabase();

    registerRoutes(fastify);

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
