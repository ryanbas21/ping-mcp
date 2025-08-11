import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToCreateRealm extends Schema.TaggedError<FailedToCreateRealm>()(
  'FailedToCreateRealm',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToReadRealmByName extends Schema.TaggedError<FailedToReadRealmByName>()(
  'FailedToReadRealmByName',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

const CreateRealm = AiTool.make('create_realm', {
  description: 'Create a new realm',
  success: Schema.Any,
  failure: FailedToCreateRealm,
  parameters: {
    name: Schema.String,
  },
});

const ReadRealmByName = AiTool.make('read_realm_by_name', {
  description: 'Read a realm by name',
  success: Schema.Any,
  failure: FailedToReadRealmByName,
  parameters: {
    name: Schema.String,
  },
});

export const RealmToolkit = AiToolkit.make(CreateRealm, ReadRealmByName);

export const RealmsTools = pipe(
  RealmToolkit.toLayer(
    Effect.gen(function* () {
      const frodo = yield* Frodo;
      yield* Login;
      return RealmToolkit.of({
        create_realm: ({ name }: { name: string }) =>
          Effect.gen(function* () {
            yield* Effect.tryPromise({
              try: () => frodo.realm.createRealm(name),
              catch: (error: unknown) =>
                new FailedToCreateRealm({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
          }),
        read_realm_by_name: ({ name }: { name: string }) =>
          Effect.gen(function* () {
            yield* Effect.tryPromise({
              try: () => frodo.realm.readRealmByName(name),
              catch: (error: unknown) =>
                new FailedToReadRealmByName({
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
