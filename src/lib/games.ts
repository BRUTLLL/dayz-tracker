export type GameSlug = "dayz" | "rainbow-six-siege" | "master-duel" | "valorant" | "cs2";

export type Game = {
  slug: GameSlug;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  accent: string;
  steamAppId?: number;
  stats: [string, string, string];
  coverage: string;
  links: { label: string; href: string }[];
};

export const games: Game[] = [
  {
    slug: "dayz", name: "DayZ", shortName: "DAYZ", tag: "SURVIVAL / 01", accent: "#ed613f",
    description: "Public server discovery and source-backed survivor records.", steamAppId: 221100,
    stats: ["Kills", "Deaths", "Survival time"],
    coverage: "Public server listings are available through BattleMetrics when its feed responds. Player combat statistics require authorized server records.",
    links: [{ label: "Browse DayZ servers", href: "/servers" }, { label: "Search player records", href: "/players" }],
  },
  {
    slug: "rainbow-six-siege", name: "Rainbow Six Siege", shortName: "R6 SIEGE", tag: "TACTICAL / 02", accent: "#e6ad5b",
    description: "A home for your Siege rank, performance, and match history when a supported account source is connected.", steamAppId: 359550,
    stats: ["Rank", "K/D", "Win rate"],
    coverage: "Steam activity covers Steam users only. Siege rank, combat statistics, and match history are not connected to this site.",
    links: [{ label: "Official Ubisoft career stats", href: "https://www.ubisoft.com/en-us/game/rainbow-six/siege/services/career" }],
  },
  {
    slug: "master-duel", name: "Yu-Gi-Oh! Master Duel", shortName: "MASTER DUEL", tag: "CARD DUEL / 03", accent: "#9f8cff",
    description: "Duel results, decks, and ranked progress in one place when your match data is available.", steamAppId: 1449850,
    stats: ["Rank", "Win rate", "Deck results"],
    coverage: "Steam activity covers Steam users only. This site has no linked Master Duel match feed. A separate companion app can track opted-in PC matches.",
    links: [{ label: "Explore Master Duel companion", href: "https://ygom.untapped.gg/" }],
  },
  {
    slug: "valorant", name: "VALORANT", shortName: "VALORANT", tag: "TACTICAL / 04", accent: "#ff6674",
    description: "A player-first space for competitive performance and match trends.",
    stats: ["Rank", "K/D", "Match history"],
    coverage: "Personal VALORANT stats require Riot production access and each player's opt-in through Riot Sign On. Neither is connected here.",
    links: [{ label: "Riot data policy", href: "https://developer.riotgames.com/docs/valorant" }],
  },
  {
    slug: "cs2", name: "Counter-Strike 2", shortName: "CS2", tag: "TACTICAL / 05", accent: "#f0b563",
    description: "Counter-Strike activity and a future home for verified competitive records.", steamAppId: 730,
    stats: ["Premier rating", "K/D", "Match history"],
    coverage: "Steam activity is available when its public endpoint responds. Individual stats and match records need a supported account data source.",
    links: [{ label: "Counter-Strike 2 on Steam", href: "https://store.steampowered.com/app/730/CounterStrike_2/" }],
  },
];

export function getGame(slug: string): Game | undefined { return games.find((game) => game.slug === slug); }
export function gameHref(game: Game): string { return game.slug === "dayz" ? "/" : `/games/${game.slug}`; }
