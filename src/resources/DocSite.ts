import { McpServer } from '@effect/ai';
import { Console, Effect, Layer } from 'effect';

import {
  SiteMapFetchFailure,
  SiteMapperService,
} from '../services/SiteMapper.js';
import { HttpClient } from '@effect/platform';
import { type SitemapperResponse } from 'sitemapper';

const GatherSitemap = Effect.gen(function* () {
  const { sitemap } = yield* SiteMapperService;

  const result = yield* Effect.tryPromise<
    SitemapperResponse,
    SiteMapFetchFailure
  >({
    try: () =>
      sitemap.fetch('https://docs.pingidentity.com/sdks/sitemap-sdks.xml'),
    catch: e =>
      new SiteMapFetchFailure({
        message: 'Failure to fetch sitemaps',
        error: e,
      }),
  }).pipe(Effect.map(res => res.sites));
  return result;
});

export const Sitemap = Effect.gen(function* () {
  const result = yield* GatherSitemap;

  const layers: [Layer.Layer<never, never, HttpClient.HttpClient>] = result.map(
    siteData => {
      if ('loc' in siteData) {
        return McpServer.resource({
          uri: `pingidentity://DOCS/sitemap/${siteData.loc}`,
          name: siteData.loc,
          content: Effect.gen(function* () {
            const client = yield* HttpClient.HttpClient;

            const res = yield* client
              .get(siteData.loc)
              .pipe(Effect.flatMap(response => response.text));
            yield* Console.log(res);

            return res;
          }),
        });
      }
    },
  ) as any;

  return Layer.mergeAll(...layers);
});
