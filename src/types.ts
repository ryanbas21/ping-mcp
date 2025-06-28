import { Effect } from 'effect';

// Document Entry Schema
export interface DocumentEntry {
  id: number;
  title: string;
  description: string;
  content: Effect.Effect<string>;
  source: "readme" | "api-docs" | "sample" | "tutorial";
  package?: string;
  url: string;
}
