import { User } from "./user-entity.interface";

export interface UsersRepository {
  getUserById(id: number): Promise<User | null>;
  updateUserBalance(id: number, balance: number): Promise<User>;
}
