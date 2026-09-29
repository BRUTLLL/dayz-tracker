import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL before running db:setup.");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
try {
  await pool.query(await readFile(resolve("db/schema.sql"), "utf8"));
  console.log("Database schema ready.");
} finally {
  await pool.end();
}
