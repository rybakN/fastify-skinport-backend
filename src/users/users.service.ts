import { UsersRepository } from "./users-repository";
import { PaymentError } from "./payment.error";
import { PoolClient } from "pg";

export class UsersService {
  private readonly userRepo: UsersRepository;
  constructor() {
    this.userRepo = new UsersRepository();
  }

  public async withdrawMoney(id: number, amountToDeduct: number) {
    const client: PoolClient = await this.userRepo.beginTransaction();
    try {
      const user = await this.userRepo.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }

      const newBalance = user.balance - amountToDeduct;
      if (newBalance < 0) {
        throw new PaymentError(402, "Insufficient balance");
      }

      const updatedUser = this.userRepo.updateUserBalance(id, newBalance);
      await this.userRepo.commitTransaction(client);
      return updatedUser;
    } catch (error) {
      await this.userRepo.rollbackTransaction(client);
      throw error;
    }
  }
}
