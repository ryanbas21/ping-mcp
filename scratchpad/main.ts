import 'dotenv/config';
import { Config, Effect, Layer } from 'effect';
import { Frodo } from '../src/services/Frodo.js';
import { HttpClient, HttpClientRequest } from '@effect/platform';
import { NodeHttpClient } from '@effect/platform-node';

const getTokens = Effect.gen(function* () {
  const frodo = yield* Frodo;
  return yield* Effect.tryPromise({
    try: () => frodo.login.getTokens(),
    catch: () => new Error('failure logging in'),
  });
});

const getPlatformInfo = Effect.gen(function* () {
  const frodo = yield* Frodo;
  return yield* Effect.tryPromise({
    try: () => frodo.info.getInfo(),
    catch: () => new Error('failure logging in'),
  });
});

const getWebAuthnDevice = (
  session: string,
  user: string,
  cookieName: string,
  realm: string = 'alpha',
) =>
  Effect.gen(function* () {
    const base_url = yield* Config.string('AM_URL');
    const client = yield* HttpClient.HttpClient;
    const request = HttpClientRequest.get(base_url).pipe(
      HttpClientRequest.appendUrl(
        `/json/realms/root/realms/${realm}/users/${user}/devices/2fa/webauthn?_prettyPrint=true&_queryFilter=true`,
      ),
      HttpClientRequest.acceptJson,
      HttpClientRequest.setHeader('Accept-API-Version', 'resource=1.0'),
      HttpClientRequest.setHeader(cookieName, session), // header name?
    );

    const response = yield* client.execute(request);

    return yield* response.json;
  });

const program = Effect.gen(function* () {
  const tokens = yield* getTokens;
  console.log('tokens', tokens);

  const session = tokens?.userSessionToken?.tokenId || '';
  const user = 'demo';

  const platformInfo = yield* getPlatformInfo;
  const cookieName = platformInfo.cookieName;
  const webAuthDevice = yield* getWebAuthnDevice(session, user, cookieName);
  console.log('webAuthDevice', webAuthDevice);
});

const eff = program.pipe(
  Effect.provide(Layer.mergeAll(NodeHttpClient.layer, Frodo.Default)),
);

Effect.runPromise(eff);
