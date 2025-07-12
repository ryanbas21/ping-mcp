import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login';

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
  timeout: Schema.optional(Schema.Number),
  logger: Schema.optional(Schema.Any),
  realm: Schema.optional(Schema.String),
  clientId: Schema.String,
  scopes: Schema.optional(Schema.String),
  redirectUri: Schema.optional(Schema.String),
  serverConfig: Schema.Struct({
    wellknown: Schema.String,
  }),
});

const AndroidConfigOutput = Schema.Struct({
  timeout: Schema.optional(Schema.Number),
  logger: Schema.optional(Schema.Any),
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
  GenerateIOSConfig,
);

export const CreateConfigTools = pipe(
  CreateConfigToolKit.toLayer(
    Effect.gen(function* () {
      yield* Login;
      const frodo = yield* Frodo;
      const common = ({
        clientId,
        realm,
      }: {
        clientId: string;
        realm: string;
      }) =>
        Effect.gen(function* () {
          const host = yield* Effect.tryPromise({
            try: () => frodo.info.getInfo(),
            catch: error => new FailedToGetOAuth2Client({ error }),
          }).pipe(Effect.map(response => response.host));

          const client = yield* Effect.tryPromise({
            try: () => frodo.oauth2oidc.client.readOAuth2Client(clientId),
            catch: error => new FailedToGetOAuth2Client({ error }),
          });

          const platformInfo = yield* Effect.tryPromise({
            try: () => frodo.info.getInfo(),
            catch: error => new FailedToGetOAuth2Client({ error }),
          });

          return {
            host,
            realm: realm as string,
            scopes: (
              client.coreOAuth2ClientConfig?.scopes as { value: Array<string> }
            ).value.join(' '),
            redirectUri: (
              client.coreOAuth2ClientConfig?.redirectionUris as {
                value: Array<string>;
              }
            ).value[0],
            cookieName: platformInfo.cookieName, // Default value if not provided
          };
        });

      return CreateConfigToolKit.of({
        generate_js_config: ({ clientId, realm = 'alpha' }) =>
          common({ clientId, realm }).pipe(
            Effect.map(c => ({
              timeout: 30,
              realm,
              clientId,
              scopes: c.scopes,
              redirectUri: c.redirectUri,
              serverConfig: {
                wellknown: `${c.host}/oauth2/.well-known/openid_configuration`,
              },
            })),
          ),
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
