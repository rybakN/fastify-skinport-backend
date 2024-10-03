import { User } from "./interfaces/user-entity.interface";
import { DbService } from "../database/db.service";

export class UsersRepository extends DbService implements UsersRepository {
  constructor() {
    super();
  }

  public async getUserById(id: number): Promise<User | null> {
    const result = await this.query<User>("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (!result.rows.length) return null;
    return result.rows[0];
  }

  public async updateUserBalance(
    id: number,
    newBalance: number,
  ): Promise<User | null> {
    const result = await this.query<User>(
      "UPDATE users SET balance = $1 WHERE id = $2",
      [newBalance, id],
    );
    if (!result.rows.length) return null;
    return result.rows[0];
  }
}
