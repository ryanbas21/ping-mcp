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
  serverConfig: Schema.Struct({
    wellknown: Schema.String,
  }),
  clientId: Schema.Any,
  scope: Schema.String,
  redirectUri: Schema.String,
  tree: Schema.String,
});

const AndroidConfigOutput = Schema.Struct({
  discoveryEndpoint: Schema.String,
  realm: Schema.String,
  clientId: Schema.String,
  scopes: Schema.String,
  redirectUri: Schema.String,
  serviceName: Schema.String,
});

const IOSConfigOutput = Schema.Struct({
  discoveryEndpoint: Schema.String,
  cookie: Schema.String,
  realm: Schema.String,
  clientId: Schema.String,
  scopes: Schema.String,
  serviceName: Schema.String,
  registrationServiceName: Schema.String,
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
            tree: (
              client.advancedOAuth2ClientConfig?.treeName as { value: string }
            ).value,
            cookieName: platformInfo.cookieName, // Default value if not provided
          };
        });

      return CreateConfigToolKit.of({
        generate_js_config: ({ clientId, realm = 'alpha' }) =>
          common({ clientId, realm }).pipe(
            Effect.map(c => ({
              serverConfig: {
                wellknown: `${c.host}/oauth2/${realm}/.well-known/openid-configuration`,
              },
              clientId,
              scope: c.scopes,
              redirectUri: c.redirectUri,
              tree: c.tree,
            })),
          ),
        generate_android_config: ({ clientId, realm = 'alpha' }) =>
          common({ clientId, realm }).pipe(
            Effect.map(c => ({
              discoveryEndpoint: `${c.host}/oauth2/${realm}/.well-known/openid-configuration`,
              realm,
              clientId,
              scopes: c.scopes,
              redirectUri: c.redirectUri,
              serviceName: c.tree,
            })),
          ),
        generate_ios_config: ({ clientId, realm = 'alpha' }) =>
          common({ clientId, realm }).pipe(
            Effect.map(c => ({
              discoveryEndpoint: `${c.host}/oauth2/${realm}/.well-known/openid-configuration`,
              cookie: c.cookieName,
              realm,
              clientId,
              scopes: c.scopes,
              serviceName: 'Login',
              registrationServiceName: 'Register',
            })),
          ),
      });
    }),
  ),
);
