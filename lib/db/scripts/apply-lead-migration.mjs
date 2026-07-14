import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to apply the lead migration.");
}

const migrationUrl = new URL("../migrations/0001_reliable_lead_delivery.sql", import.meta.url);
const sql = await readFile(fileURLToPath(migrationUrl), "utf8");
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

await client.connect();
try {
  await client.query("BEGIN");
  await client.query(sql);
  await client.query("COMMIT");
  console.log("Reliable lead delivery migration applied.");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}
