import { Activity, ArrowUpRight, BarChart3, Database, Search, ShieldCheck, Users } from "lucide-react";
import { GameSlug, gameHref, games, getGame } from "../../lib/games";
import { getSteamCurrentPlayers } from "../../lib/steam";

function lookupLink(slug: GameSlug, player: string): { href: string; label: string } | null {
  if (slug === "master-duel") return null;
  const source = slug === "rainbow-six-siege" ? "r6.tracker.network/r6siege/profile"
    : "csstats.gg/player";
  const query = `site:${source} ${player}`;
  return { href: `https://www.google.com/search?q=${encodeURIComponent(query)}`, label: "FIND PUBLIC PROFILE RESULTS" };
}

export async function GamePage({ slug, player = "" }: { slug: GameSlug; player?: string }) {
  const game = getGame(slug);
  const name = typeof player === "string" ? player.trim().slice(0, 80) : "";
  const result = name ? lookupLink(slug, name) : null;
  const steamCount = await getSteamCurrentPlayers(game.steamAppId);
  const palette = {
    "--game-accent": game.accent, "--game-bg": game.background, "--game-surface": game.surface,
    "--game-surface2": game.surface2, "--game-line": game.line, "--game-glow": game.glow,
  } as React.CSSProperties;
  return <main className="game-page" style={palette}>
    <section className="game-hero"><div className="shell game-hero-inner">
      <div><div className="eyebrow">{game.tag} / PLAYER SEARCH</div><h1>{game.name.toUpperCase()}</h1><p>{game.description}</p></div>
      <div className="game-monogram" aria-hidden="true">{game.shortName}</div>
    </div></section>
    <div className="shell game-content">
      <section className="player-lookup" aria-labelledby="player-lookup-title">
        <div><div className="eyebrow">PLAYER LOOKUP</div><h2 id="player-lookup-title">FIND A PLAYER</h2><p>{slug === "cs2" ? "Enter a Steam name or ID. Exact IDs are more reliable." : slug === "master-duel" ? "Public player records are not connected for this game." : "Enter a Ubisoft account name. Confirm the platform on the matching profile."}</p></div>
        <form action={gameHref(game)} method="get" className="player-search"><label htmlFor="player-name">{slug === "cs2" ? "STEAM NAME OR ID" : slug === "rainbow-six-siege" ? "UBISOFT NAME" : "DUEL NAME"}</label><div className="player-search-controls"><input id="player-name" name="player" defaultValue={name} placeholder="Type a player's name" maxLength={80} required autoComplete="off"/><button type="submit"><Search size={18}/> FIND PLAYER</button></div></form>
        {name && <div className="lookup-result" role="status"><strong>{slug === "master-duel" ? "No public player lookup connected" : `Profile search: ${name}`}</strong><p>{slug === "master-duel" ? "Master Duel does not provide this site with a public player directory. A name cannot return verified match statistics here." : "View the matching profile on the external tracker for stats and rank history, when available. This site has no connected personal-stat feed and cannot display verified player numbers yet."}</p>{result && <a href={result.href} target="_blank" rel="noopener noreferrer">{result.label} <ArrowUpRight size={16}/></a>}</div>}
      </section>
      <div className="section-heading"><div><div className="eyebrow">PLAYER PROFILE</div><h2>{name || "SEARCH TO START"}</h2></div><span className="subtle">Verified account data only</span></div>
      <div className="metric-grid">
        <div className="metric-card"><span className="metric-icon"><ShieldCheck size={20}/></span><span className="metric-label">CURRENT RANK</span><strong>—</strong><small>Player data not connected</small></div>
        <div className="metric-card"><span className="metric-icon"><Activity size={20}/></span><span className="metric-label">PREVIOUS RANKS</span><strong>—</strong><small>Season history not connected</small></div>
        <div className="metric-card"><span className="metric-icon"><BarChart3 size={20}/></span><span className="metric-label">PERFORMANCE</span><strong>—</strong><small>Match data not connected</small></div>
        <div className="metric-card"><span className="metric-icon"><Users size={20}/></span><span className="metric-label">CURRENTLY ON STEAM</span><strong>{game.steamAppId ? steamCount?.toLocaleString("en-US") ?? "—" : "N/A"}</strong><small>{game.steamAppId ? "All Steam users · not this player" : "This game is not on Steam"}</small></div>
      </div>
      <div className="content-grid"><section className="panel"><div className="panel-heading"><div><span className="tiny-label">PLAYER TRACKING</span><h3>YOUR STATS, WHEN CONNECTED</h3></div></div>
        <div className="game-empty"><div className="empty-icon"><Database size={27}/></div><h3>No verified player record connected</h3><p>{game.coverage}</p></div>
      </section><aside className="panel"><div className="panel-heading"><div><span className="tiny-label">DATA SOURCES</span><h3>EXPLORE THIS GAME</h3></div></div>
        <div className="game-source-list">{game.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16}/></a>)}
          {game.steamAppId && <a href={`https://store.steampowered.com/app/${game.steamAppId}/`} target="_blank" rel="noopener noreferrer">View on Steam<ArrowUpRight size={16}/></a>}
        </div><div className="panel-foot">EXTERNAL LINKS OPEN THEIR OWN SERVICE · NO ACCOUNTS ARE LINKED HERE</div>
      </aside></div>
      <div className="game-endnote"><ShieldCheck size={18}/><span>Steam's count covers all Steam users, not the searched player. Individual ranks and previous seasons require a permitted account source.</span><a href="/">ALL GAMES →</a></div>
      <nav className="other-games" aria-label="Other games">{games.filter((other) => other.slug !== game.slug).map((other) => <a href={gameHref(other)} key={other.slug} style={{ "--game-accent": other.accent } as React.CSSProperties}>{other.shortName} →</a>)}</nav>
    </div>
  </main>;
}
