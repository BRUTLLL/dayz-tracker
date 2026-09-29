import { Pool } from "pg";
import type { TrackedPlayer } from "./types";

let pool: Pool | undefined;

function database(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
  return pool;
}

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export async function searchPlayers(query: string): Promise<TrackedPlayer[]> {
  const db = database();
  if (!db || !query.trim()) return [];
  const term = query.trim().slice(0, 100);
  const result = await db.query(
    `SELECT p.id, p.steam_id, p.display_name, p.aliases, p.coverage,
            p.source, p.source_url, p.updated_at,
            s.playtime_seconds, s.kills, s.deaths, s.headshots, s.longest_kill_meters, s.zombies_killed
       FROM players p LEFT JOIN player_stats s ON s.player_id = p.id
      WHERE p.steam_id = $1 OR p.display_name ILIKE $2
         OR EXISTS (SELECT 1 FROM unnest(p.aliases) alias WHERE alias ILIKE $2)
      ORDER BY p.updated_at DESC LIMIT 25`,
    [term, `%${term.replace(/[\\%_]/g, "\\$&")}%`]
  );
  return result.rows.map((row) => ({
    id: row.id,
    steamId: row.steam_id || "",
    displayName: row.display_name,
    aliases: row.aliases,
    coverage: row.coverage,
    source: row.source,
    sourceUrl: row.source_url || undefined,
    updatedAt: row.updated_at.toISOString(),
    stats: row.playtime_seconds == null && row.kills == null && row.deaths == null ? undefined : {
      playtimeSeconds: row.playtime_seconds ?? undefined,
      kills: row.kills ?? undefined,
      deaths: row.deaths ?? undefined,
      headshots: row.headshots ?? undefined,
      longestKillMeters: row.longest_kill_meters ?? undefined,
      zombiesKilled: row.zombies_killed ?? undefined,
      coverage: row.coverage,
      source: "dayz-server" as const,
    },
  }));
}

export async function playerCount(): Promise<number | null> {
  const db = database();
  if (!db) return null;
  const result = await db.query("SELECT COUNT(*)::int AS count FROM players");
  return result.rows[0].count;
}
