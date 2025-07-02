import { Cache, Duration, Effect } from 'effect';
import { HttpClient } from '@effect/platform';
import { pingReadmes } from '../doc-urls.js';
import { Markdown } from './Markdown.js';

export class DocsCache extends Effect.Service<DocsCache>()('DocsCache', {
  effect: Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const markdown = yield* Markdown;

    const cache = yield* Cache.make({
      capacity: 100,
      timeToLive: Duration.hours(24),
      lookup: (uri: string) => {
        const readme = pingReadmes.find(
          r => `pingidentity://readme/${r.package}` === uri,
        );
        if (!readme) {
          return Effect.fail(new Error(`Unknown URI: ${uri}`));
        }

        return client.get(readme.url).pipe(
          Effect.flatMap(response => response.text),
          Effect.flatMap(text => markdown.process(text)),
          Effect.map(processed => processed.content),
        );
      },
    });

    return { cache };
  }),
}) {}
