import "./globals.css";

export const metadata = {
  title: "DAYZ TRACKER — Global Player Stats",
  description: "Search and explore tracked DayZ player statistics, servers and history."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
