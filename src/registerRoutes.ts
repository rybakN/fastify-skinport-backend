import { FastifyInstance } from "fastify";
import { userRouts } from "./users/user.routs";
import { skinportRoutes } from "./skinport/skinport.routs";

export const registerRoutes = (fastify: FastifyInstance) => {
  userRouts(fastify);
  skinportRoutes(fastify);
};
