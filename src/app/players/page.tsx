"use client";

import { useSearchParams } from "next/navigation";

export default function Players() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  return <main className="container page">
    <a className="back" href="/">← DAYZ TRACKER</a>
    <h1>Player search</h1>
    <p className="muted">Search: <strong>{query || "—"}</strong></p>
    <div className="card notice">
      <span className="badge">DATA COLLECTION PENDING</span>
      <h3>No player data indexed yet</h3>
      <p>The search interface is ready. Players will appear here once legitimate data sources are connected and indexed.</p>
    </div>
  </main>;
}
