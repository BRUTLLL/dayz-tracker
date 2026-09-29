# DAYZ TRACKER

A public DayZ player-stat tracking website foundation.

## Features
- Player search by Steam name / Steam ID
- Public player profile structure
- Tracked playtime, kills, deaths, K/D and other stats
- Server history
- Weapon/map statistics
- Historical snapshots
- Source and coverage indicators
- Ingestion adapter architecture

## Important
The site never invents missing statistics. Data is marked by source and coverage level.

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Production data connectors are intentionally separated from the UI so legitimate public/community sources can be added safely.
