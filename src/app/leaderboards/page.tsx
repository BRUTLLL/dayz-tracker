import { BarChart3 } from "lucide-react";

export default function Leaderboards() {
  return <main className="shell interior"><div className="page-intro"><div className="eyebrow">RANKINGS / 03</div><h1>LEADERBOARDS</h1><p>Rankings will cover only comparable, source-backed records from authorized servers.</p></div>
    <div className="filter-row"><span className="active-filter">KILLS</span><span>K/D</span><span>PLAYTIME</span><span>SURVIVAL</span></div>
    <div className="empty-state large"><div className="empty-icon"><BarChart3 size={32}/></div><span className="tiny-label">AWAITING COMPARABLE DATA</span><h3>No rankings yet</h3><p>There is no authorized combat dataset connected. Showing a global leaderboard from a partial server list would be misleading.</p></div>
    <div className="info-strip"><span>When data is connected, each leaderboard will show its server scope, time period, source and coverage level.</span></div>
  </main>;
}
