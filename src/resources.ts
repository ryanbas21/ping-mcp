import { McpServer } from '@effect/ai';
import { HttpClient } from '@effect/platform';
import { NodeHttpClient } from '@effect/platform-node';
import { Array, Effect, Layer  } from 'effect';
import { pingReadmes } from './doc-urls.js'

export const Readmes = Layer.mergeAll(
  ...Array.map(pingReadmes, readme =>
    McpServer.resource({
        uri: `pingidentity://readme/${readme.package}`,
        name: readme.package,
        description: readme.description,
        content: HttpClient.get(readme.url).pipe(
          Effect.flatMap(response => response.text),
        ),
    }),
    
  ),
).pipe(Layer.provide(NodeHttpClient.layerUndici));
