import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToCreateUser extends Schema.TaggedError<FailedToCreateUser>()(
  'FailedToCreateUser',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

const ReadUsers = AiTool.make('read_users', {
  description: 'Read a user',
  success: Schema.Any,
  failure: FailedToCreateUser,
  parameters: {
    name: Schema.String,
  },
});

export const UsersToolkit = AiToolkit.make(ReadUsers);

export const UsersTools = pipe(
  UsersToolkit.toLayer(
    Effect.gen(function* () {
      yield* Login;

      const frodo = yield* Frodo;
      return UsersToolkit.of({
        read_users: ({ name }: { name: string }) =>
          Effect.gen(function* () {
            yield* Effect.tryPromise({
              try: () => frodo.user.readUser(name),
              catch: (error: unknown) =>
                new FailedToCreateUser({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
          }),
      });
    }),
  ),
);
