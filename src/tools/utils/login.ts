import { Effect, Schema } from 'effect';
import { Frodo } from '../../services/Frodo';

export class FailedToLogin extends Schema.TaggedError<FailedToLogin>()(
  'FailedToLogin',
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
    }),
  ),
  Effect.scoped,
);
