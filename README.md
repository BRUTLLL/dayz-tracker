# GAME TRACKER

A source-aware tracker hub for DayZ, Rainbow Six Siege, Yu-Gi-Oh! Master Duel, VALORANT, and Counter-Strike 2. The dashboard uses independent branding and a dense tracker layout.

## Game coverage

- Switch between all five games from the navigation bar. DayZ retains its public BattleMetrics server directory and optional authorized player-record import.
- The Rainbow Six Siege, Master Duel, and CS2 pages request the current Steam player count. This is a Steam-only count, not a total across platforms. The count shows as unavailable if Steam cannot be reached.
- VALORANT personal stats require Riot production access and player opt-in through Riot Sign On. No player accounts or private data feeds are connected for the additional games.
- The game pages link to official or relevant external resources without importing those services' private data or claiming global leaderboards.

The hosted Site at https://dayz-tracker.cheeky-raven-1631.chatgpt.site is private to its owner. GitHub changes do not automatically republish the Site.

## What works

- Public DayZ server directory from BattleMetrics, refreshed approximately every five minutes. If the source is unavailable, the page shows an error instead of fabricated data.
- Player search against an optional PostgreSQL database of authorized, source-backed records.
- Source, observation time and coverage labels for imported player stats.
- Responsive overview, players, servers, leaderboards and coverage pages.

No global DayZ kills, deaths, playtime or Steam ID lookup is claimed without an authorized data source. Leaderboards remain unavailable until comparable combat records exist. Public BattleMetrics server listings do not grant access to private player identifiers.

## Run locally

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` to check the production build.

## Connect authorized player data

1. Set up a PostgreSQL database, and set `DATABASE_URL` in `.env.local` (do not commit this file).
2. Run `npm run db:setup` with `DATABASE_URL` available in the shell.
3. Obtain player stats from a server you own or another feed you are authorized to use. Create a JSON array with records in the following format:

```json
[
  {
    "id": "server-identifier:player-identifier",
    "steamId": "7656119...",
    "displayName": "Example survivor",
    "aliases": [],
    "observedAt": "2026-09-30T00:00:00Z",
    "source": "My DayZ server",
    "sourceUrl": "https://example.com/source",
    "coverage": "partial",
    "stats": { "kills": 4, "deaths": 2, "playtimeSeconds": 3600 }
  }
]
```

This is a **format example**, not real player data. Supply only fields actually provided by your source; omit unknown stats. Use `partial` when the record covers one server or a limited period. Run `npm run data:import -- path/to/authorized-data.json` with `DATABASE_URL` in the shell. The importer validates nonnegative integer values and stores a snapshot and provenance for each import. Do not put private server credentials or data files in the repository.

`BATTLEMETRICS_API_TOKEN` is optional for the public server feed. Only add a token for which you have permission, and keep it server-side in `.env.local` or the eventual hosting environment.

## Data limitations

BattleMetrics states that searching by Steam ID or another unique identifier is available only to server owners and administrators for their own data. This project does not attempt to bypass that restriction. Public server population is a source observation, not an assertion about an individual player's history.
