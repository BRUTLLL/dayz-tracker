import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Crosshair, RadioTower, Search, Shield } from "lucide-react";
import { GameSwitcher } from "./components/GameSwitcher";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAME TRACKER | DayZ, Siege, Master Duel, VALORANT & CS2",
  description: "Explore five games with clear, source-backed coverage and a live DayZ server directory.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <div className="utility-bar"><div className="shell utility-inner"><span>GAME TRACKER <b>/</b> FIVE GAMES, ONE HUB</span><span className="utility-right"><span className="live-dot"/> SOURCE-LED DATA</span></div></div>
    <header className="site-header"><div className="shell header-inner">
      <Link href="/" className="brand"><span className="brand-mark"><Crosshair size={24} strokeWidth={2.5}/></span><span>GAME<span className="brand-accent">TRACKER</span><small>PLAYER & SERVER INTELLIGENCE</small></span></Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/"><Activity size={17}/> DayZ Overview</Link>
        <Link href="/players"><Search size={17}/> DayZ Players</Link>
        <Link href="/servers"><RadioTower size={17}/> DayZ Servers</Link>
        <Link href="/leaderboards"><Shield size={17}/> DayZ Rankings</Link>
      </nav>
      <Link href="/about" className="header-info">DATA & COVERAGE <span>↗</span></Link>
    </div></header>
    <GameSwitcher/>
    {children}
    <footer className="site-footer"><div className="shell footer-inner"><span><b>GAME TRACKER</b> <span className="muted">/ Independent community project</span></span><span>Statistics shown only when supported by an identified source. <Link href="/about">How coverage works ↗</Link></span></div></footer>
  </body></html>;
}
