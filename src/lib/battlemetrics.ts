import type { PublicServer } from "./types";

type BMServer = {
  id?: string;
  attributes?: {
    name?: string;
    players?: number;
    maxPlayers?: number;
    status?: string;
    country?: string;
    details?: { map?: string };
    updatedAt?: string;
  };
};

export async function getPublicServers(query = ""): Promise<{ servers: PublicServer[]; error?: string }> {
  const url = new URL("https://api.battlemetrics.com/servers");
  url.searchParams.set("filter[game]", "dayz");
  url.searchParams.set("page[size]", "20");
  url.searchParams.set("sort", "-players");
  if (query.trim()) url.searchParams.set("filter[search]", query.trim().slice(0, 80));

  try {
    const headers: HeadersInit = { Accept: "application/json" };
    if (process.env.BATTLEMETRICS_API_TOKEN) {
      headers.Authorization = `Bearer ${process.env.BATTLEMETRICS_API_TOKEN}`;
    }
    const response = await fetch(url, { headers, next: { revalidate: 300 }, signal: AbortSignal.timeout(7000) });
    if (!response.ok) throw new Error(`Source returned ${response.status}`);
    const body: unknown = await response.json();
    if (!body || typeof body !== "object" || !("data" in body) || !Array.isArray(body.data)) {
      throw new Error("Unexpected source response");
    }
    const servers = (body.data as BMServer[]).filter((item) => item.id && item.attributes?.name).map((item) => ({
      id: item.id!,
      name: item.attributes!.name!,
      players: Number.isFinite(item.attributes?.players) ? item.attributes!.players! : null,
      maxPlayers: Number.isFinite(item.attributes?.maxPlayers) ? item.attributes!.maxPlayers! : null,
      map: item.attributes?.details?.map || null,
      status: item.attributes?.status || "unknown",
      country: item.attributes?.country || null,
      sourceUrl: `https://www.battlemetrics.com/servers/dayz/${item.id}`,
      observedAt: item.attributes?.updatedAt || null,
    }));
    return { servers };
  } catch {
    return { servers: [], error: "Live server data is temporarily unavailable from BattleMetrics." };
  }
}
