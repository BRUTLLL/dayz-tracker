import Link from "next/link";
import { ArrowUpRight, BarChart3, Database, RadioTower, Search, ShieldCheck } from "lucide-react";
import { SearchForm } from "./components/SearchForm";
import { getPublicServers } from "../lib/battlemetrics";
import { hasDatabase, playerCount } from "../lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [directory, count] = await Promise.all([getPublicServers(), playerCount().catch(() => null)]);
  return <main>
    <section className="hero"><div className="shell hero-grid">
      <div className="hero-copy"><div className="eyebrow"><span className="accent-line"/> DAYZ / TRACKER NETWORK</div>
        <h1>EVERY SURVIVOR<br/><em>HAS A STORY.</em></h1>
        <p>Explore DayZ servers and search source-backed player records. See what is known, when it was observed, and where the data came from.</p>
        <SearchForm/>
        <div className="hero-meta"><span><ShieldCheck size={16}/> Source-labelled data</span><span><RadioTower size={16}/> Live server directory</span><span><Database size={16}/> No invented stats</span></div>
      </div>
      <div className="hero-panel"><div className="hero-panel-top"><span className="tiny-label">NETWORK STATUS</span><span className="status-pill"><span className="live-dot"/> SOURCE AWARE</span></div>
        <div className="radar"><div className="radar-ring ring-one"/><div className="radar-ring ring-two"/><div className="radar-ring ring-three"/><ShieldCheck size={43} strokeWidth={1.2}/><i className="ping ping-one"/><i className="ping ping-two"/><i className="ping ping-three"/></div>
        <div className="hero-panel-bottom"><span>DAYZ INTELLIGENCE SYSTEM</span><b>01 / LIVE</b></div>
      </div>
    </div></section>
    <div className="shell main-content">
      <div className="section-heading"><div><div className="eyebrow">THE OVERVIEW</div><h2>TRACKER DASHBOARD</h2></div><span className="subtle">What we can verify right now</span></div>
      <div className="metric-grid">
        <div className="metric-card"><span className="metric-icon"><RadioTower size={20}/></span><span className="metric-label">PUBLIC SERVERS</span><strong>{directory.error ? "—" : directory.servers.length}</strong><small>Shown from current source response</small></div>
        <div className="metric-card"><span className="metric-icon"><Search size={20}/></span><span className="metric-label">INDEXED PLAYERS</span><strong>{count ?? "—"}</strong><small>{hasDatabase() ? "Source-backed records" : "Database not connected"}</small></div>
        <div className="metric-card"><span className="metric-icon"><BarChart3 size={20}/></span><span className="metric-label">COMBAT STATS</span><strong>—</strong><small>Requires authorized server data</small></div>
        <div className="metric-card"><span className="metric-icon"><ShieldCheck size={20}/></span><span className="metric-label">DATA COVERAGE</span><strong className="metric-word">PARTIAL</strong><small>Missing values stay missing</small></div>
      </div>
      <div className="content-grid"><section className="panel"><div className="panel-heading"><div><span className="tiny-label">LIVE DIRECTORY</span><h3>POPULAR DAYZ SERVERS</h3></div><Link href="/servers" className="text-link">VIEW ALL <ArrowUpRight size={16}/></Link></div>
        {directory.error ? <div className="empty-inline">{directory.error}</div> : directory.servers.length ? <div className="server-list">{directory.servers.slice(0, 5).map((server, index) => <a key={server.id} href={server.sourceUrl} target="_blank" rel="noopener noreferrer" className="server-row"><span className="row-rank">{String(index + 1).padStart(2, "0")}</span><span className="server-title"><b>{server.name}</b><small>{server.map || "Map not provided"} · {server.country || "Region unknown"}</small></span><span className="row-population">{server.players ?? "—"}<small>/{server.maxPlayers ?? "—"}</small></span><ArrowUpRight size={16}/></a>)}</div> : <div className="empty-inline">No public server results are available right now.</div>}
        <div className="panel-foot">SOURCE: BATTLEMETRICS · PUBLIC SERVER LIST · REFRESHES APPROX. EVERY 5 MINUTES</div>
      </section><aside className="panel coverage-panel"><div className="panel-heading"><div><span className="tiny-label">BEHIND THE NUMBERS</span><h3>DATA YOU CAN TRUST</h3></div></div>
        <div className="coverage-item"><span className="coverage-number">01</span><div><b>PROVENANCE FIRST</b><p>Every imported stat retains its source and observation time.</p></div></div>
        <div className="coverage-item"><span className="coverage-number">02</span><div><b>NO FALSE GLOBAL TOTALS</b><p>One server’s records never become a player’s lifetime DayZ stats.</p></div></div>
        <div className="coverage-item"><span className="coverage-number">03</span><div><b>PRIVACY BY DESIGN</b><p>Steam ID lookup needs an authorized server dataset.</p></div></div>
        <Link className="coverage-link" href="/about">HOW OUR COVERAGE WORKS <span>→</span></Link>
      </aside></div>
    </div>
  </main>;
}
