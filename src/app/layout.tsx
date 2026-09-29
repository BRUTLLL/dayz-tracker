import type { Metadata } from "next";
import { Crosshair } from "lucide-react";
import { GameSwitcher } from "./components/GameSwitcher";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAME TRACKER | Siege, Master Duel & CS2",
  description: "Explore four game hubs with clear, source-backed data coverage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <div className="utility-bar"><div className="shell utility-inner"><span>GAME TRACKER <b>/</b> THREE GAMES, ONE HUB</span><span><span className="live-dot"/> SOURCE-LED DATA</span></div></div>
    <header className="site-header"><div className="shell header-inner">
      <a href="/" className="brand"><span className="brand-mark"><Crosshair size={24} strokeWidth={2.5}/></span><span>GAME<span className="brand-accent">TRACKER</span><small>PLAYER INTELLIGENCE</small></span></a>
      <a href="/" className="header-info">ALL GAMES <span>↗</span></a>
    </div></header>
    <GameSwitcher/>
    {children}
    <footer className="site-footer"><div className="shell footer-inner"><span><b>GAME TRACKER</b> / Independent community project</span><span>Statistics appear only when supported by an identified source.</span></div></footer>
  </body></html>;
}
