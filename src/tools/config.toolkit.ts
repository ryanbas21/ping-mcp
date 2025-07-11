import { AiToolkit, AiTool } from '@effect/ai';
//import type { Record } from 'effect';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
// import { error } from 'console';
//import { Login } from './utils/login.js';

export class FailedToGetOAuth2Client extends Schema.TaggedError<FailedToGetOAuth2Client>()(
  'FailedToGetOAuth2Client',
  {
    error: Schema.Any,
  },
) {}

export class FailedToGetBaseUrl extends Schema.TaggedError<FailedToGetBaseUrl>()(
  'FailedToGetBaseUrl',
  {
    error: Schema.Any,
  },
) {}

const JSConfigOutput = Schema.Struct({
  timeout: Schema.Number,
  logger: Schema.Any,
  realm: Schema.String,
  cookie: Schema.String,
  module: Schema.Struct({
    clientId: Schema.String,
    scopes: Schema.String,
    redirectUri: Schema.String,
  }),
});

const AndroidConfigOutput = Schema.Struct({
  timeout: Schema.Number,
  logger: Schema.Any,
  realm: Schema.String,
  cookie: Schema.String,
  module: Schema.Struct({
    clientId: Schema.String,
    scopes: Schema.String,
    redirectUri: Schema.String,
  }),
});

const IOSConfigOutput = Schema.Struct({
  timeout: Schema.Number,
  logger: Schema.Any,
  realm: Schema.String,
  cookie: Schema.String,
  module: Schema.Struct({
    clientId: Schema.String,
    scopes: Schema.String,
    redirectUri: Schema.String,
  }),
});

const GenerateJSConfig = AiTool.make('generate_js_config', {
  description: 'Get an existing OAuth2 client',
  success: JSConfigOutput,
  failure: FailedToGetOAuth2Client,
  parameters: {
    clientId: Schema.String,
    realm: Schema.optional(Schema.String), // Default 'alpha' or any other value
  },
});

const GenerateAndroidConfig = AiTool.make('generate_android_config', {
  description: 'Generate string-resource values for the Ping SDK for Android',
  success: AndroidConfigOutput,
  failure: FailedToGetOAuth2Client,
  parameters: {
    clientId: Schema.String,
    realm: Schema.optional(Schema.String), // Default 'alpha' or any other value
  },
});

const GenerateIOSConfig = AiTool.make('generate_ios_config', {
  description: 'Generate string-resource values for the Ping SDK for iOS',
  success: IOSConfigOutput,
  failure: FailedToGetOAuth2Client,
  parameters: {
    clientId: Schema.String,
    realm: Schema.optional(Schema.String), // Default 'alpha' or any other value
  },
});

export const CreateConfigToolKit = AiToolkit.make(
  GenerateJSConfig,
  GenerateAndroidConfig,
  GenerateIOSConfig
);

export const CreateConfigTools = pipe(
  CreateConfigToolKit.toLayer(
    Effect.gen(function* () {
      const frodo = yield* Frodo;

      const common = ({ clientId, realm }: { clientId: string; realm: string }) =>
        Effect.gen(function* () {
          yield* Effect.tryPromise({
            try: () => frodo.login.getTokens(),
            catch: error => new FailedToGetOAuth2Client({ error }),
          });

          const host = yield* Effect.tryPromise({
            try: () => frodo.info.getInfo(),
            catch: error => new FailedToGetOAuth2Client({ error }),
          }).pipe(Effect.map(response => response.host));

          const client = yield* Effect.tryPromise({
            try: () => frodo.oauth2oidc.client.readOAuth2Client(clientId),
            catch: error => new FailedToGetOAuth2Client({ error }),
          });

          const pltaformInfo = yield* Effect.tryPromise({
            try: () => frodo.info.getInfo(),
            catch: error => new FailedToGetOAuth2Client({ error }),
          });
          


          return {
            host,
            realm: realm as string,
            scopes: (client.coreOAuth2ClientConfig?.scopes as { value: string[] }).value.join(' '),
            redirectUri: (client.coreOAuth2ClientConfig?.redirectionUris as { value: string[] }).value[0],
            cookieName: pltaformInfo.cookieName, // Default value if not provided
          };
        });

      return CreateConfigToolKit.of({
        // existing JS output
        generate_js_config: ({ clientId, realm = 'alpha' }) =>
          common({ clientId, realm }).pipe(
            Effect.map(c => ({
              timeout: 30,
              logger: 'Logger.STANDARD',
              realm,
              cookie: c.cookieName,
              module: {
                clientId,
                scopes: c.scopes,
                redirectUri: c.redirectUri,
              },
            })),
          ),

        // new Android output
        generate_android_config: ({ clientId, realm = 'alpha' }) =>
          common({ clientId, realm }).pipe(
            Effect.map(c => ({
              timeout: 30,
              logger: 'Logger.STANDARD',
              realm,
              cookie: c.cookieName,
              module: {
                clientId,
                scopes: c.scopes,
                redirectUri: c.redirectUri,
              },
            })),
          ),
          generate_ios_config: ({ clientId, realm = 'alpha' }) =>
            common({ clientId, realm }).pipe(
              Effect.map(c => ({
                timeout: 30,
                logger: 'Logger.STANDARD',
                realm,
                cookie: c.cookieName,
                module: {
                  clientId,
                  scopes: c.scopes,
                  redirectUri: c.redirectUri,
                },
              })),
            ),
      });
    }),
  ),
);


