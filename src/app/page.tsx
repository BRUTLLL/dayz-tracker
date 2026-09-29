import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { gameHref, games } from "../lib/games";

export default function Home() {
  return <main>
    <section className="hub-hero"><div className="shell">
      <div className="eyebrow">GAME TRACKER / THE NETWORK</div>
      <h1>FIND YOUR <em>GAME.</em></h1>
      <p>Explore Rainbow Six Siege, Yu-Gi-Oh! Master Duel, and Counter-Strike 2. Every game has its own space and clear labels for what data is available.</p>
      <div className="hub-note"><ShieldCheck size={17}/> Real sources. Clear limits. No made-up player stats.</div>
    </div></section>
    <section className="shell hub-content"><div className="section-heading"><div><div className="eyebrow">CHOOSE A TRACKER</div><h2>THREE GAMES. THREE WORLDS.</h2></div><span className="subtle">Select a game to search for a player</span></div>
      <div className="game-grid">{games.map((game) => <a href={gameHref(game)} key={game.slug} className="game-card" style={{ "--game-accent": game.accent, "--game-bg": game.background, "--game-surface": game.surface, "--game-line": game.line } as React.CSSProperties}><span className="game-card-top">{game.tag}<ArrowUpRight size={18}/></span><strong>{game.name}</strong><small>{game.description}</small><span className="game-card-action">OPEN TRACKER →</span></a>)}</div>
    </section>
  </main>;
}
