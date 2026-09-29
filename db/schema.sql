CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  steam_id TEXT UNIQUE,
  display_name TEXT NOT NULL,
  aliases TEXT[] NOT NULL DEFAULT '{}',
  coverage TEXT NOT NULL CHECK (coverage IN ('verified', 'imported', 'partial')),
  source TEXT NOT NULL,
  source_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS player_stats (
  player_id TEXT PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
  playtime_seconds BIGINT CHECK (playtime_seconds >= 0),
  kills INTEGER CHECK (kills >= 0),
  deaths INTEGER CHECK (deaths >= 0),
  headshots INTEGER CHECK (headshots >= 0),
  longest_kill_meters INTEGER CHECK (longest_kill_meters >= 0),
  zombies_killed INTEGER CHECK (zombies_killed >= 0),
  observed_at TIMESTAMPTZ NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT
);

CREATE TABLE IF NOT EXISTS stat_snapshots (
  id BIGSERIAL PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  observed_at TIMESTAMPTZ NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT,
  stats JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS players_display_name_idx ON players (lower(display_name));
CREATE INDEX IF NOT EXISTS snapshots_player_time_idx ON stat_snapshots (player_id, observed_at DESC);
