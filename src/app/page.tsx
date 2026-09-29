"use client";

import { FormEvent, useState } from "react";
import { Search, ShieldCheck, Database, BarChart3 } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = "/players?q=" + encodeURIComponent(query.trim());
    }
  };

  return <>
    <nav className="nav">
      <div className="navin">
        <div className="logo">DAYZ <span>TRACKER</span></div>
        <div className="navlinks">
          <a href="/leaderboards">Leaderboards</a>
          <a href="/servers">Servers</a>
          <a href="/about">Data & Coverage</a>
        </div>
      </div>
    </nav>

    <main className="container">
      <section className="hero">
        <div className="eyebrow">GLOBAL DAYZ PLAYER STATS</div>
        <h1>Find the player.<br/>See the history.</h1>
        <p>Search tracked DayZ players by Steam name or Steam ID. Explore playtime, combat statistics, servers and historical data — with the source shown for every statistic.</p>
        <form className="search" onSubmit={submit}>
          <Search size={20} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Steam name or Steam ID…" aria-label="Search player" />
          <button className="button">Search</button>
        </form>
      </section>

      <section className="grid">
        <div className="card"><ShieldCheck size={24}/><h3>Source-aware</h3><p>Stats are tied to a source and coverage level. Missing data stays missing.</p></div>
        <div className="card"><Database size={24}/><h3>Player history</h3><p>Build timelines of tracked servers, sessions, aliases and stat snapshots.</p></div>
        <div className="card"><BarChart3 size={24}/><h3>Leaderboards</h3><p>Tracked totals with clear coverage indicators instead of pretending the dataset is complete.</p></div>
      </section>

      <section className="section">
        <h2>Data collection</h2>
        <div className="stats">
          <div className="stat"><span className="muted">Players</span><b>—</b><span className="muted">Awaiting source connection</span></div>
          <div className="stat"><span className="muted">Tracked playtime</span><b>—</b><span className="muted">Awaiting source connection</span></div>
          <div className="stat"><span className="muted">Servers</span><b>—</b><span className="muted">Awaiting indexing</span></div>
          <div className="stat"><span className="muted">Coverage</span><b>PARTIAL</b><span className="badge">HONEST DATA</span></div>
        </div>
      </section>
    </main>

    <footer className="footer"><div className="container">DAYZ TRACKER · Public gaming statistics · Statistics are displayed only where supported by available data sources.</div></footer>
  </>;
}
