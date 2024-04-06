import { migrate } from "drizzle-orm/libsql/migrator";
import pg from "pg";
import { drizzle as localDrizzle } from "drizzle-orm/node-postgres/driver";

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_PROD_URL,
  });

  const db = localDrizzle(pool, { logger: true });
  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Migration completed");

  process.exit(0);
}

main().catch((error) => {
  console.error("Migration failed");
  console.log(error);
  process.exit(1);
});
