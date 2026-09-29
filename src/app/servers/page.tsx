import { ArrowUpRight, RadioTower, Search } from "lucide-react";
import { getPublicServers } from "../../lib/battlemetrics";

export const dynamic = "force-dynamic";

export default async function Servers({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = ((await searchParams).q || "").trim().slice(0, 80);
  const result = await getPublicServers(query);
  return <main className="shell interior"><div className="page-intro"><div className="eyebrow">PUBLIC DIRECTORY / 02</div><h1>DAYZ SERVERS</h1><p>Discover public DayZ servers. Population and details come from BattleMetrics and may be delayed or incomplete.</p></div>
    <form className="search-form standalone" action="/servers" method="get"><Search size={21}/><input name="q" defaultValue={query} placeholder="Search server name" aria-label="Search servers" maxLength={80}/><button>SEARCH <span>→</span></button></form>
    <div className="section-heading compact"><div><div className="eyebrow">SERVER BROWSER</div><h2>{query ? `RESULTS FOR “${query}”` : "POPULAR SERVERS"}</h2></div><span className="subtle">{result.servers.length} returned · public feed</span></div>
    {result.error || !result.servers.length ? <div className="empty-state"><div className="empty-icon"><RadioTower size={30}/></div><h3>{result.error ? "Source temporarily unavailable" : "No matching servers"}</h3><p>{result.error || "Try another server name. Public listings depend on the source’s coverage."}</p></div> : <div className="directory-list">{result.servers.map((server, index) => <a className="directory-row" key={server.id} href={server.sourceUrl} target="_blank" rel="noopener noreferrer"><span className="row-rank">{String(index + 1).padStart(2, "0")}</span><span className="directory-name"><b>{server.name}</b><small>{server.map || "Map unknown"} · {server.country || "Region unknown"} · {server.status}</small></span><span className="directory-count"><b>{server.players ?? "—"}<i> / {server.maxPlayers ?? "—"}</i></b><small>PLAYERS</small></span><ArrowUpRight size={18}/></a>)}</div>}
    <p className="source-note">Source: <a href="https://www.battlemetrics.com/servers/dayz" target="_blank" rel="noopener noreferrer">BattleMetrics ↗</a>. Listings refresh approximately every five minutes. This directory does not imply access to player identities or combat stats.</p>
  </main>;
}
