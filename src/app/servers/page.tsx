export default function Servers() {
  return <main className="container page">
    <a className="back" href="/">← DAYZ TRACKER</a>
    <h1>Servers</h1>
    <p className="muted">Tracked DayZ servers will appear here as public source data is indexed.</p>
    <div className="card notice"><h3>Server directory</h3><p>Server identity, platform, activity and player history will be added by the ingestion pipeline.</p></div>
  </main>;
}
