import { Database, Eye, LockKeyhole, RadioTower } from "lucide-react";

export default function About() {
  return <main className="shell interior"><div className="page-intro"><div className="eyebrow">TRANSPARENCY / 04</div><h1>DATA & COVERAGE</h1><p>Know exactly what the tracker can show and what it cannot.</p></div>
    <div className="about-grid"><article className="about-card"><RadioTower/><span className="tiny-label">AVAILABLE NOW</span><h3>PUBLIC SERVER DIRECTORY</h3><p>Server names, map, population and status are requested from BattleMetrics. These are point-in-time observations, not guaranteed real-time measurements.</p></article>
    <article className="about-card"><Database/><span className="tiny-label">READY FOR CONNECTION</span><h3>AUTHORIZED PLAYER DATA</h3><p>The database and importer accept records from a server or feed you are entitled to use. Each record stores its source and observation time.</p></article>
    <article className="about-card"><Eye/><span className="tiny-label">SCOPE MATTERS</span><h3>PARTIAL IS PARTIAL</h3><p>One server’s observations cannot prove a player’s global kills, deaths, playtime or complete history. Unknown statistics display as dashes.</p></article>
    <article className="about-card"><LockKeyhole/><span className="tiny-label">PLAYER PRIVACY</span><h3>NO PRIVATE ID SEARCH</h3><p>Steam ID lookup is limited to records supplied by an authorized source. We do not bypass the data provider’s access controls.</p></article></div>
    <section className="panel definitions"><div className="panel-heading"><div><span className="tiny-label">READ THE LABEL</span><h3>COVERAGE LEVELS</h3></div></div><div><b>VERIFIED</b><span>Directly supported by an authorized source with a strong player identity match.</span></div><div><b>IMPORTED</b><span>Supplied by a named external dataset with its source retained.</span></div><div><b>PARTIAL</b><span>Useful observations limited by server, time period, or player identity.</span></div><div><b>UNAVAILABLE</b><span>No supported value exists; the tracker shows a dash.</span></div></section>
  </main>;
}
