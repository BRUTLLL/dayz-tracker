export type Coverage = "verified" | "imported" | "partial" | "unavailable";
export type StatSource = "battlemetrics" | "dayz-server" | "community" | "manual";

export interface Player {
  steamId: string;
  displayName: string;
  aliases: string[];
  firstSeen?: string;
  lastSeen?: string;
  coverage: Coverage;
}

export interface TrackedPlayer extends Player {
  id: string;
  source: string;
  sourceUrl?: string;
  updatedAt: string;
  stats?: PlayerStats;
}

export interface PublicServer {
  id: string;
  name: string;
  players: number | null;
  maxPlayers: number | null;
  map: string | null;
  status: string;
  country: string | null;
  sourceUrl: string;
  observedAt: string | null;
}

export interface PlayerStats {
  playtimeSeconds?: number;
  kills?: number;
  deaths?: number;
  headshots?: number;
  longestKillMeters?: number;
  zombiesKilled?: number;
  coverage: Coverage;
  source: StatSource;
}

export interface Server {
  id: string;
  name: string;
  platform: "pc" | "console" | "unknown";
  firstSeen?: string;
  lastSeen?: string;
}
