import { QueryResult, QueryResultRow } from "pg";

export interface DbService {
  query<R extends QueryResultRow>(
    query: string,
    params: any[],
  ): Promise<QueryResult<R>>;
}
