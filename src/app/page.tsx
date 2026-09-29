export default function About() {
  return <main className="container page">
    <a className="back" href="/">← DAYZ TRACKER</a>
    <h1>Data & coverage</h1>
    <p className="muted">DAYZ TRACKER combines legitimate public/community data sources without presenting partial observations as complete lifetime records.</p>
    <div className="grid">
      <div className="card"><h3>Verified</h3><p>Directly supported by an authoritative or trusted source.</p></div>
      <div className="card"><h3>Imported</h3><p>Imported from a supported external dataset with its source retained.</p></div>
      <div className="card"><h3>Partial</h3><p>Useful observations that do not represent a player's complete history.</p></div>
    </div>
  </main>;
}
