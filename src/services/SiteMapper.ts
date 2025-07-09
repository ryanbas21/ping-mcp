import { Data, Effect } from 'effect';

import SiteMapper from 'sitemapper';

export class SiteMapFetchFailure extends Data.TaggedError(
  'SiteMapFetchFailure',
)<{ message: string; error: unknown }> {}

export class SiteMapperService extends Effect.Service<SiteMapperService>()(
  'SiteMapperService',
  {
    // eslint-disable-next-line require-yield
    effect: Effect.gen(function* () {
      const sitemap = new SiteMapper({
        fields: {
          lastmod: true,
          loc: true,
        },
      });

      return { sitemap };
    }),
  },
) {}
