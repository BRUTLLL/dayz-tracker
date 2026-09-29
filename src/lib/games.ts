export type GameSlug = "rainbow-six-siege" | "master-duel" | "valorant" | "cs2";

export type Game = {
  slug: GameSlug;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  accent: string;
  background: string;
  surface: string;
  surface2: string;
  line: string;
  glow: string;
  steamAppId?: number;
  stats: [string, string, string];
  coverage: string;
  links: { label: string; href: string }[];
};

export const games: Game[] = [
  {
    slug: "rainbow-six-siege", name: "Rainbow Six Siege", shortName: "R6 SIEGE", tag: "TACTICAL / 01",
    accent: "#f0bd62", background: "#101b23", surface: "#192b36", surface2: "#233947", line: "#39515e", glow: "#3f6a76",
    description: "A home for your Siege rank, performance, and match history when a supported account source is connected.", steamAppId: 359550,
    stats: ["Rank", "K/D", "Win rate"],
    coverage: "Steam activity covers Steam users only. Siege rank, combat statistics, and match history are not connected to this site.",
    links: [{ label: "Official Ubisoft career stats", href: "https://www.ubisoft.com/en-us/game/rainbow-six/siege/services/career" }],
  },
  {
    slug: "master-duel", name: "Yu-Gi-Oh! Master Duel", shortName: "MASTER DUEL", tag: "CARD DUEL / 02",
    accent: "#c0a8ff", background: "#151126", surface: "#231b3b", surface2: "#30244c", line: "#4b3b69", glow: "#65439a",
    description: "Duel results, decks, and ranked progress in one place when your match data is available.", steamAppId: 1449850,
    stats: ["Rank", "Win rate", "Deck results"],
    coverage: "Steam activity covers Steam users only. This site has no linked Master Duel match feed. A separate companion app can track opted-in PC matches.",
    links: [{ label: "Explore Master Duel companion", href: "https://ygom.untapped.gg/" }],
  },
  {
    slug: "valorant", name: "VALORANT", shortName: "VALORANT", tag: "TACTICAL / 03",
    accent: "#ff6f7d", background: "#241417", surface: "#342024", surface2: "#452a30", line: "#684047", glow: "#9f3d50",
    description: "A player-first space for competitive performance and match trends.",
    stats: ["Rank", "K/D", "Match history"],
    coverage: "Personal VALORANT stats require Riot production access and each player's opt-in through Riot Sign On. Neither is connected here.",
    links: [{ label: "Riot data policy", href: "https://developer.riotgames.com/docs/valorant" }],
  },
  {
    slug: "cs2", name: "Counter-Strike 2", shortName: "CS2", tag: "TACTICAL / 04",
    accent: "#ffc774", background: "#24201a", surface: "#342d22", surface2: "#443827", line: "#68543a", glow: "#906532",
    description: "Counter-Strike activity and a future home for verified competitive records.", steamAppId: 730,
    stats: ["Premier rating", "K/D", "Match history"],
    coverage: "Steam activity is available when its public endpoint responds. Individual stats and match records need a supported account data source.",
    links: [{ label: "Counter-Strike 2 on Steam", href: "https://store.steampowered.com/app/730/CounterStrike_2/" }],
  },
];

export function getGame(slug: GameSlug): Game { return games.find((game) => game.slug === slug)!; }
export function gameHref(game: Game): string { return `/games/${game.slug}`; }
