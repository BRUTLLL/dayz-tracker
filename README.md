# GAME TRACKER

A four-game tracker hub for Rainbow Six Siege, Yu-Gi-Oh! Master Duel, VALORANT, and Counter-Strike 2. Each game has a dedicated route and color scheme. The menu and game cards use ordinary links so navigation works without client-side JavaScript.

## Data coverage

- Rainbow Six Siege, Master Duel, and CS2 request a public Steam current-player count. This is limited to Steam users and shows as unavailable when the public endpoint cannot be reached.
- VALORANT is not on Steam. Its personal stats require Riot production access and player opt-in. No account data is connected.
- Player rank, match history, and personal performance for the other games also require authorized data sources. Missing values stay unavailable rather than being invented.

The hosted Site at https://dayz-tracker.cheeky-raven-1631.chatgpt.site is private to its owner. GitHub changes do not automatically republish the Site.

## Run locally

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` to check the production build.
