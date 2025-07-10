import { Config, Effect, pipe, Schema } from 'effect';
import { HttpClient, HttpClientRequest } from '@effect/platform';
import { AiTool, AiToolkit } from '@effect/ai';
import { Login, getPlatformInfo } from './utils/login';

export class FailedToGetWebAuthnDevice extends Schema.TaggedError<FailedToGetWebAuthnDevice>()(
  'FailedToGetWebAuthnDevice',
  {
    error: Schema.Any,
  },
) {}

const GetWebAuthnDevice = AiTool.make('get_webauthn_device', {
  description: 'Get a webauthn device',
  success: Schema.Any,
  failure: Schema.Any,
  parameters: {
    realm: Schema.String,
    user: Schema.String,
  },
});

export const DeviceToolkit = AiToolkit.make(GetWebAuthnDevice);

export const DevicesTools = pipe(
  DeviceToolkit.toLayer(
    Effect.gen(function* () {
      const { session = '' } = yield* Login;
      const client = yield* HttpClient.HttpClient;
      const base_url = yield* Config.string('AM_URL');
      const { cookieName } = yield* getPlatformInfo;

      return DeviceToolkit.of({
        get_webauthn_device: ({ realm = 'alpha', user = 'demo' }) =>
          Effect.gen(function* () {
            const request = HttpClientRequest.get(base_url).pipe(
              HttpClientRequest.appendUrl(
                `/json/realms/root/realms/${realm}/users/${user}/devices/2fa/webauthn?_prettyPrint=true&_queryFilter=true`,
              ),
              HttpClientRequest.acceptJson,
              HttpClientRequest.setHeader('Accept-API-Version', 'resource=1.0'),
              HttpClientRequest.setHeader(cookieName, session),
            );

            const response = yield* client.execute(request);

            return yield* response.json;
          }),
      });
    }),
  ),
);
