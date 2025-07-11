import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToGetIdmConfig extends Schema.TaggedError<FailedToGetIdmConfig>()(
  'FailedToGetIdmConfig',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

const CreateUser = AiTool.make('create_user', {
  description: 'create a new user',
  success: Schema.Any,
  failure: FailedToGetIdmConfig,
  parameters: {
    username: Schema.String,
    password: Schema.String,
    email: Schema.String,
  },
});

export const IdmToolkit = AiToolkit.make(CreateUser);

export const IdmTools = pipe(
  IdmToolkit.toLayer(
    Effect.gen(function* () {
      yield* Login;
      const frodo = yield* Frodo;
      return IdmToolkit.of({
        create_user: ({ email, password, username }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () =>
                frodo.idm.managed.createManagedObject('managed_user', {
                  username,
                  password,
                  email,
                }),
              catch: (error: unknown) =>
                new FailedToGetIdmConfig({
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
