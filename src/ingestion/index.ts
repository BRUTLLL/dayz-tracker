export interface IngestionResult {
  source: string;
  fetchedAt: string;
  records: number;
  warnings: string[];
}

export interface DataSourceAdapter {
  name: string;
  run(): Promise<IngestionResult>;
}

// Server discovery uses the read-only public BattleMetrics feed in src/lib/battlemetrics.ts.
// Player records are imported only from an authorized feed with scripts/import-stats.ts.
// A future scheduled adapter can be registered here when a source is connected.
export const adapters: DataSourceAdapter[] = [];
