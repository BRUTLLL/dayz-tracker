import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Crosshair, RadioTower, Search, Shield } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAYZ TRACKER | Player & server intelligence",
  description: "Source-backed DayZ server discovery and player statistics with transparent coverage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <div className="utility-bar"><div className="shell utility-inner"><span>DAYZ TRACKER <b>/</b> COMMUNITY INTELLIGENCE</span><span className="utility-right"><span className="live-dot"/> PUBLIC DATA ONLY</span></div></div>
    <header className="site-header"><div className="shell header-inner">
      <Link href="/" className="brand"><span className="brand-mark"><Crosshair size={24} strokeWidth={2.5}/></span><span>DAYZ<span className="brand-accent">TRACKER</span><small>PLAYER & SERVER INTELLIGENCE</small></span></Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/"><Activity size={17}/> Overview</Link>
        <Link href="/players"><Search size={17}/> Players</Link>
        <Link href="/servers"><RadioTower size={17}/> Servers</Link>
        <Link href="/leaderboards"><Shield size={17}/> Leaderboards</Link>
      </nav>
      <Link href="/about" className="header-info">DATA & COVERAGE <span>↗</span></Link>
    </div></header>
    {children}
    <footer className="site-footer"><div className="shell footer-inner"><span><b>DAYZ TRACKER</b> <span className="muted">/ Independent community project</span></span><span>Statistics shown only when supported by an identified source. <Link href="/about">How coverage works ↗</Link></span></div></footer>
  </body></html>;
}
