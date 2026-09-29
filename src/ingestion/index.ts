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

// Add only legitimate, accessible data sources here.
export const adapters: DataSourceAdapter[] = [];
