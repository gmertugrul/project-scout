import { sql } from "@vercel/postgres";
import { Pool } from "pg";
import { drizzle as localDrizzle } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const db = localDrizzle(pool, { schema, logger: true });

let prm: Promise<typeof db>;

export function getDb(): Promise<typeof db> {
  if (!prm) {
    prm = getDbInternal();
  }

  return Promise.resolve(prm);
}

async function getDbInternal() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  return db;
}
