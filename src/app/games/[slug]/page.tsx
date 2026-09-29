import Link from "next/link";
import { notFound } from "next/navigation";
import { Activity, ArrowUpRight, BarChart3, Database, ShieldCheck, Users } from "lucide-react";
import { gameHref, games, getGame } from "../../../lib/games";
import { getSteamCurrentPlayers } from "../../../lib/steam";

export const dynamic = "force-dynamic";

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  if (game.slug === "dayz") return <main className="shell interior"><h1>DayZ</h1><Link href="/">Open DayZ tracker →</Link></main>;
  const steamCount = await getSteamCurrentPlayers(game.steamAppId);
  return <main className="game-page" style={{ "--game-accent": game.accent } as React.CSSProperties}>
    <section className="game-hero"><div className="shell game-hero-inner">
      <div><div className="eyebrow">{game.tag} / TRACKER NETWORK</div><h1>{game.name.toUpperCase()}</h1><p>{game.description}</p><span className="coverage-badge"><ShieldCheck size={15}/> SOURCE-LED COVERAGE</span></div>
      <div className="game-monogram" aria-hidden="true">{game.shortName}</div>
    </div></section>
    <div className="shell game-content">
      <div className="section-heading"><div><div className="eyebrow">CURRENT SNAPSHOT</div><h2>{game.shortName} DASHBOARD</h2></div><span className="subtle">Missing data is shown as unavailable</span></div>
      <div className="metric-grid game-metrics">
        <div className="metric-card"><span className="metric-icon"><Users size={20}/></span><span className="metric-label">CURRENTLY ON STEAM</span><strong>{game.steamAppId ? steamCount?.toLocaleString("en-US") ?? "—" : "N/A"}</strong><small>{game.steamAppId ? "Steam players only · public count" : "This game is not on Steam"}</small></div>
        {game.stats.map((label, index) => <div className="metric-card" key={label}><span className="metric-icon">{index === 0 ? <Activity size={20}/> : <BarChart3 size={20}/>}</span><span className="metric-label">{label.toUpperCase()}</span><strong>—</strong><small>Account data not connected</small></div>)}
      </div>
      <div className="content-grid game-details"><section className="panel"><div className="panel-heading"><div><span className="tiny-label">PLAYER TRACKING</span><h3>YOUR STATS, WHEN CONNECTED</h3></div></div>
        <div className="game-empty"><div className="empty-icon"><Database size={27}/></div><h3>No player records available yet</h3><p>{game.coverage}</p></div>
      </section><aside className="panel"><div className="panel-heading"><div><span className="tiny-label">DATA SOURCES</span><h3>EXPLORE THIS GAME</h3></div></div>
        <div className="game-source-list">{game.links.map((link) => link.href.startsWith("/") ? <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight size={16}/></Link> : <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16}/></a>)}
          {game.steamAppId && <a href={`https://store.steampowered.com/app/${game.steamAppId}/`} target="_blank" rel="noopener noreferrer">View on Steam<ArrowUpRight size={16}/></a>}
        </div><div className="panel-foot">EXTERNAL LINKS OPEN THEIR OWN SERVICE · NO ACCOUNTS ARE LINKED HERE</div>
      </aside></div>
      <div className="game-endnote"><ShieldCheck size={18}/><span>Steam's count is for users active through Steam, across all regions. It is not a count of all platforms or a player leaderboard.</span><Link href={gameHref(games[0])}>BACK TO DAYZ →</Link></div>
    </div>
  </main>;
}
