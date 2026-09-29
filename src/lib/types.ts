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
