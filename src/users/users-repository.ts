import { User } from "./interfaces/user-entity.interface";
import { DbService } from "../database/db.service";
import { PoolClient } from "pg";

export class UsersRepository extends DbService implements UsersRepository {
  constructor() {
    super();
  }

  public async getUserById(
    id: number,
    client?: PoolClient,
  ): Promise<User | null> {
    const result = await (client
      ? client.query<User>("SELECT * FROM users WHERE id = $1", [id])
      : this.query<User>("SELECT * FROM users WHERE id = $1", [id]));
    if (!result.rows.length) return null;
    return result.rows[0];
  }

  public async updateUserBalance(
    id: number,
    newBalance: number,
    client?: PoolClient,
  ): Promise<User | null> {
    const result = await (client
      ? client.query<User>(
          "UPDATE users SET balance = $1 WHERE id = $2 RETURNING *",
          [newBalance, id],
        )
      : this.query<User>(
          "UPDATE users SET balance = $1 WHERE id = $2 RETURNING *",
          [newBalance, id],
        ));

    if (!result.rows.length) return null;
    return result.rows[0];
  }
}
