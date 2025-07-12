import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToReadUser extends Schema.TaggedError<FailedToReadUser>()(
  'FailedToReadUser',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToListUsers extends Schema.TaggedError<FailedToListUsers>()(
  'FailedToListUsers',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

const ReadUser = AiTool.make('read_user', {
  description: 'Read a user by name',
  success: Schema.Any,
  failure: FailedToReadUser,
  parameters: {
    name: Schema.String,
  },
});

const ListUsers = AiTool.make('list_users', {
  description: 'List all users',
  success: Schema.Any,
  failure: FailedToListUsers,
  parameters: {},
});

export const UsersToolkit = AiToolkit.make(
  ReadUser,
  ListUsers,
);

export const UsersTools = pipe(
  UsersToolkit.toLayer(
    Effect.gen(function* () {
      yield* Login;

      const frodo = yield* Frodo;
      return UsersToolkit.of({
        read_user: ({ name }: { name: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.user.readUser(name),
              catch: (error: unknown) =>
                new FailedToReadUser({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        list_users: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.user.readUsers(),
              catch: (error: unknown) =>
                new FailedToListUsers({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
      });
    }),
  ),
);
