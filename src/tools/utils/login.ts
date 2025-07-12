import { Effect, Schema } from 'effect';
import { Frodo } from '../../services/Frodo';

export class FailedToLogin extends Schema.TaggedError<FailedToLogin>()(
  'FailedToLogin',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetPlatformInfo extends Schema.TaggedError<FailedToGetPlatformInfo>()(
  'FailedToGetPlatformInfo',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export const Login = Frodo.pipe(
  Effect.flatMap(frodo =>
    Effect.tryPromise({
      try: () => frodo.login.getTokens(),
      catch: error =>
        new FailedToLogin({
          message: error instanceof Error ? error.message : 'unknown error',
          cause: error,
        }),
    }).pipe(
      Effect.map(tokens => ({
        accessToken: tokens.bearerToken?.access_token,
        session: tokens.userSessionToken?.tokenId,
      })),
    ),
  ),
  Effect.scoped,
);

export const getPlatformInfo = Effect.gen(function* () {
  const frodo = yield* Frodo;
  return yield* Effect.tryPromise({
    try: () => frodo.info.getInfo(),
    catch: error =>
      new FailedToGetPlatformInfo({
        message: error instanceof Error ? error.message : 'unknown error',
        cause: error,
      }),
  });
});
