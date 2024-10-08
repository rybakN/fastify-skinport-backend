import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
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
    } finally {
      client.release();
    }
  }

  public async beginTransaction(): Promise<PoolClient> {
    const client = await this.db.connect();
    await client.query("BEGIN");
    return client;
  }

  public async commitTransaction(client: PoolClient): Promise<void> {
    await client.query("COMMIT");
    client.release();
  }

  public async rollbackTransaction(client: PoolClient): Promise<void> {
    await client.query("ROLLBACK");
    client.release();
  }
}
