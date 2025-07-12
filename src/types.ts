import type { Effect } from 'effect';

export interface DocumentEntry {
  id: number;
  title: string;
  description: string;
  content: Effect.Effect<string>;
  source: 'readme' | 'api-docs' | 'sample' | 'tutorial' | string;
  package?: string;
  url: string;
}
