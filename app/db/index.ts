import { sql } from "@vercel/postgres";
import { Pool } from "pg";
import {
  drizzle as localDrizzle,
  NodePgDatabase,
} from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import * as schema from "./schema";

let db: NodePgDatabase<typeof schema> = null!;

if (process.env.NODE_ENV == "development") {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

  db = localDrizzle(pool, { schema, logger: true });
} else {
  db = localDrizzle(sql, { schema, logger: false });
}

let prm: Promise<typeof db>;

export function getDb(): Promise<typeof db> {
  if (!prm) {
    prm = getDbInternal();
  }

  return Promise.resolve(prm);
}

async function getDbInternal() {
  if (process.env.NODE_ENV == "development") {
    await migrate(db!, { migrationsFolder: "./drizzle" });
  }

  return db;
}
