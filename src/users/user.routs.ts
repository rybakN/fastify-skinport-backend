import { FastifyInstance } from "fastify";
import { schema } from "../validation/validate-schema";
import { UsersService } from "./users.service";

export const userRouts = (fastify: FastifyInstance) => {
  const userService: UsersService = new UsersService();

  fastify.put("/users/:id/withdraw", { schema }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { price } = request.body as { price: number };

    try {
      await userService.withdrawMoney(parseInt(id), price);
      reply.send({ message: "Balance updated successfully" });
    } catch (err: any) {
      reply
        .status(400)
        .send({ message: err.message || "Failed to withdraw money" });
    }
  });
};
