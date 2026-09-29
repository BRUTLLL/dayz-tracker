"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { gameHref, games } from "../../lib/games";

export function GameSwitcher() {
  const pathname = usePathname();
  return <nav className="game-switcher" aria-label="Choose a game"><div className="shell game-switcher-inner">
    <span className="game-switcher-label">CHOOSE GAME</span>
    {games.map((game) => {
      const active = game.slug === "dayz" ? !pathname.startsWith("/games/") : pathname === gameHref(game);
      return <Link key={game.slug} href={gameHref(game)} className={active ? "game-tab active" : "game-tab"} aria-current={active ? "page" : undefined} style={{ "--game-accent": game.accent } as React.CSSProperties}>{game.shortName}</Link>;
    })}
  </div></nav>;
}
