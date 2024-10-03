import { FastifyInstance } from "fastify";
import { getFormatedSkinportItems } from "./skinport.service";

export const skinportRoutes = (fastify: FastifyInstance) => {
  fastify.get("/skinport/items", async (request, reply) => {
    try {
      const items = await getFormatedSkinportItems();
      reply.send(items);
    } catch (err) {
      reply.status(500).send({ message: "Error retrieving items" });
    }
  });
};
