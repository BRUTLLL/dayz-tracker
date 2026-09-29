export async function getSteamCurrentPlayers(appid?: number): Promise<number | null> {
  if (!appid) return null;
  try {
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`, {
      next: { revalidate: 300 }, signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const body: unknown = await response.json();
    if (!body || typeof body !== "object" || !("response" in body)) return null;
    const value = (body as { response?: { player_count?: unknown; result?: number } }).response;
    return value?.result === 1 && typeof value.player_count === "number" && Number.isFinite(value.player_count)
      ? value.player_count : null;
  } catch { return null; }
}
