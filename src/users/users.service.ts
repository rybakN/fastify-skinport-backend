import { UsersRepository } from "./users-repository";

export class UsersService {
  private readonly userRepo: UsersRepository;
  constructor() {
    this.userRepo = new UsersRepository();
  }

  public async withdrawMoney(id: number, amountToDeduct: number) {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const newBalance = user.balance - amountToDeduct;
    if (newBalance < 0) {
      throw new Error("Insufficient balance");
    }
    return this.userRepo.updateUserBalance(id, newBalance);
  }
}
