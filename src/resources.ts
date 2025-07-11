import { McpServer } from '@effect/ai';
import { Array, Effect, Layer } from 'effect';

import { pingReadmes } from './doc-urls.js';
import { DocsCache } from './services/DocsCache.js';
// import { Sitemap } from './resources/DocSite.js';

export const Readmes = Layer.mergeAll(
  ...Array.map(pingReadmes, readme =>
    McpServer.resource({
      uri: `pingidentity://readme/${readme.package}`,
      name: readme.package,
      description: readme.description,
      content: Effect.gen(function* () {
        const { cache } = yield* DocsCache;

        const uri = `pingidentity://readme/${readme.package}`;
        return yield* cache.get(uri);
      }),
    }),
  ),
  // Layer.unwrapEffect(Sitemap),
);
