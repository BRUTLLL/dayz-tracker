import { Database, Search, ShieldCheck } from "lucide-react";
import { SearchForm } from "../components/SearchForm";
import { hasDatabase, searchPlayers } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function Players({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = ((await searchParams).q || "").trim().slice(0, 100);
  let unavailable = false;
  const players = await searchPlayers(query).catch(() => { unavailable = true; return []; });
  return <main className="shell interior">
    <div className="page-intro"><div className="eyebrow">TRACKED RECORDS / 01</div><h1>PLAYER SEARCH</h1><p>Find players in authorized datasets. A matching name is not proof of a unique Steam identity.</p></div>
    <div className="search-panel"><div className="tiny-label">SEARCH THE INDEX</div><SearchForm initial={query}/><p>Names and Steam IDs only match records provided by authorized sources. We do not search private identifiers on BattleMetrics.</p></div>
    <div className="section-heading compact"><div><div className="eyebrow">RESULTS</div><h2>{query ? `MATCHES FOR “${query}”` : "PLAYER INDEX"}</h2></div><span className="subtle">{players.length} records</span></div>
    {players.length ? <div className="results-list">{players.map((player) => <article className="player-result" key={player.id}>
      <div className="avatar-placeholder">{player.displayName.slice(0, 2).toUpperCase()}</div><div className="player-main"><span className="tiny-label">{player.coverage.toUpperCase()} · {player.source}</span><h3>{player.displayName}</h3><small>{player.steamId ? `Steam ID ${player.steamId}` : "Steam ID not supplied"} · Observed {new Date(player.updatedAt).toLocaleDateString("en-AU")}</small></div>
      <div className="player-stats"><span><small>KILLS</small><b>{player.stats?.kills ?? "—"}</b></span><span><small>DEATHS</small><b>{player.stats?.deaths ?? "—"}</b></span><span><small>K/D</small><b>{player.stats?.kills != null && player.stats?.deaths != null && player.stats.deaths > 0 ? (player.stats.kills / player.stats.deaths).toFixed(2) : "—"}</b></span></div>
      {player.sourceUrl && <a className="source-link" href={player.sourceUrl} target="_blank" rel="noopener noreferrer">SOURCE ↗</a>}
    </article>)}</div> : <div className="empty-state"><div className="empty-icon"><Search size={30}/></div><span className="tiny-label">NO SOURCE-BACKED RECORDS</span><h3>{unavailable ? "Player index unavailable" : query ? "No matches in the current index" : "No players indexed yet"}</h3><p>{unavailable ? "The connected database could not be reached. Try again later." : hasDatabase() ? "This search covers only imported records. A player missing here may still play DayZ." : "An authorized DayZ server dataset must be connected before player records can appear."}</p></div>}
    <div className="info-strip"><ShieldCheck size={19}/><span>Combat and playtime values are shown only when a source actually supplied them.</span><Database size={19}/><span>Global lifetime totals are not inferred from partial server data.</span></div>
  </main>;
}
