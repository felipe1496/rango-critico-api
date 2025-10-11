import { Pool, PoolClient } from "pg";
import { env } from "../utils/env";
import { replacePlaceholders } from "../utils/functions";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const query = async <TData = unknown>(
  sql: string,
  values: unknown[],
  db?: PoolClient
) => {
  const client = db || (await pool.connect());
  return new Promise<{ ok: false; err: Error } | { ok: true; data: TData[] }>(
    (resolve) => {
      client.query(replacePlaceholders(sql), values, (err, res) => {
        if (err) {
          console.error(`Error running query: ${sql} [${values}]`, err);
          resolve({ ok: false, err });
        } else {
          console.log(`Query executed: ${sql} [${values}]`);
          resolve({ ok: true, data: res.rows as TData[] });
        }
        if (!db) client.release();
      });
    }
  );
};

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});
