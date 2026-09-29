import { gameHref, games } from "../../lib/games";

export function GameSwitcher() {
  return <nav className="game-switcher" aria-label="Choose a game"><div className="shell game-switcher-inner">
    <a className="game-switcher-label" href="/">GAME HUB</a>
    {games.map((game) => <a key={game.slug} href={gameHref(game)} className="game-tab" style={{ "--game-accent": game.accent } as React.CSSProperties}>{game.shortName}</a>)}
  </div></nav>;
}
