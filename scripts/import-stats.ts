import { readFile } from "node:fs/promises";
import { Pool } from "pg";

type RecordInput = {
  id: string;
  steamId?: string;
  displayName: string;
  aliases?: string[];
  observedAt: string;
  source: string;
  sourceUrl?: string;
  coverage: "verified" | "imported" | "partial";
  stats?: Partial<Record<"playtimeSeconds" | "kills" | "deaths" | "headshots" | "longestKillMeters" | "zombiesKilled", number>>;
};

const filename = process.argv[2];
if (!filename || !process.env.DATABASE_URL) {
  throw new Error("Usage: DATABASE_URL=... npm run data:import -- path/to/authorized-data.json");
}

const records: unknown = JSON.parse(await readFile(filename, "utf8"));
if (!Array.isArray(records)) throw new Error("Import must be a JSON array.");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  for (const raw of records) {
    const item = raw as RecordInput;
    if (!item || typeof item.id !== "string" || !item.id.trim() || typeof item.displayName !== "string" || !item.displayName.trim()
      || typeof item.source !== "string" || !item.source.trim() || !["verified", "imported", "partial"].includes(item.coverage)
      || !item.observedAt || Number.isNaN(Date.parse(item.observedAt))
      || (item.aliases && (!Array.isArray(item.aliases) || item.aliases.some((alias) => typeof alias !== "string")))) {
      throw new Error("Invalid player record: id, displayName, source, coverage and observedAt are required.");
    }
    if (item.stats && (typeof item.stats !== "object" || Object.values(item.stats).some((value) => !Number.isSafeInteger(value) || value < 0))) {
      throw new Error(`Invalid non-negative integer statistic for ${item.id}.`);
    }
    await client.query(
      `INSERT INTO players (id, steam_id, display_name, aliases, coverage, source, source_url, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (id) DO UPDATE SET steam_id=EXCLUDED.steam_id, display_name=EXCLUDED.display_name,
         aliases=EXCLUDED.aliases, coverage=EXCLUDED.coverage, source=EXCLUDED.source,
         source_url=EXCLUDED.source_url, updated_at=EXCLUDED.updated_at`,
      [item.id, item.steamId || null, item.displayName, item.aliases || [], item.coverage, item.source, item.sourceUrl || null, item.observedAt]
    );
    if (item.stats) {
      const stats = item.stats;
      await client.query(
        `INSERT INTO player_stats (player_id, playtime_seconds, kills, deaths, headshots, longest_kill_meters,
          zombies_killed, observed_at, source, source_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (player_id) DO UPDATE SET playtime_seconds=EXCLUDED.playtime_seconds, kills=EXCLUDED.kills,
           deaths=EXCLUDED.deaths, headshots=EXCLUDED.headshots, longest_kill_meters=EXCLUDED.longest_kill_meters,
           zombies_killed=EXCLUDED.zombies_killed, observed_at=EXCLUDED.observed_at,
           source=EXCLUDED.source, source_url=EXCLUDED.source_url`,
        [item.id, stats.playtimeSeconds ?? null, stats.kills ?? null, stats.deaths ?? null,
          stats.headshots ?? null, stats.longestKillMeters ?? null, stats.zombiesKilled ?? null,
          item.observedAt, item.source, item.sourceUrl || null]
      );
      await client.query(
        "INSERT INTO stat_snapshots (player_id, observed_at, source, source_url, stats) VALUES ($1,$2,$3,$4,$5)",
        [item.id, item.observedAt, item.source, item.sourceUrl || null, stats]
      );
    }
  }
  await client.query("COMMIT");
  console.log(`Imported ${records.length} source-backed player records.`);
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
