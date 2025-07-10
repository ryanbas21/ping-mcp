import 'dotenv/config';
import { Effect } from 'effect';
import { Frodo } from '../src/services/Frodo.js';
import { FailedToCreateRealm } from '../src/tools/journey.toolkit.errors';

const getTokens = Effect.gen(function* () {
  const frodo = yield* Frodo;
  return yield* Effect.tryPromise({
    try: () => frodo.login.getTokens(),
    catch: () => new Error('failure logging in'),
  });
});

const createRealm = Effect.fn(function* (name: string) {
  const frodo = yield* Frodo;
  yield* Effect.tryPromise({
    try: () =>
      frodo.realm.createRealm(name, {
        description: 'test realm',
        active: true,
        parentPath: '/',
        aliases: [],
        name,
      }),
    catch: (error: unknown) =>
      new FailedToCreateRealm({
        message: error instanceof Error ? error.message : 'unknown error',
        cause: error,
      }),
  });
});

const deleteRealm = Effect.fn(function* (name: string) {
  const frodo = yield* Frodo;
  yield* Effect.tryPromise({
    try: () => frodo.realm.deleteRealm(name),
    catch: (error: unknown) =>
      new FailedToCreateRealm({
        message: error instanceof Error ? error.message : 'unknown error',
        cause: error,
      }),
  });
});

const program = Effect.gen(function* () {
  const tokens = yield* getTokens;
  console.log('tokens', tokens);

  const realm = yield* createRealm('test-realm');
  console.log('realm', realm);

  // yield* deleteRealm('test-realm');
});

const eff = program.pipe(Effect.provide(Frodo.Default));

Effect.runPromise(eff);
