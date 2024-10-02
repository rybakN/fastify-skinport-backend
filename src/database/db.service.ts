import { Pool, QueryResult, QueryResultRow } from "pg";
import { dbName } from "../constants/constants";
import { createPool } from "./create-database";

export class DbService implements DbService {
  private readonly db: Pool;

  constructor() {
    this.db = createPool(dbName);
  }

  public async query<R extends QueryResultRow>(
    query: string,
    params: any[],
  ): Promise<QueryResult<R>> {
    const client = await this.db.connect();

    try {
      return await client.query<R>(query, params);
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    } finally {
      client.release();
    }
  }
}
