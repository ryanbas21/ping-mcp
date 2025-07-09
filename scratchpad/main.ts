import 'dotenv/config';
import { Effect } from 'effect';
import { Frodo } from '../src/services/Frodo.js';

const getTokens = Effect.gen(function* () {
  const frodo = yield* Frodo;
  return yield* Effect.tryPromise({
    try: () => frodo.login.getTokens(),
    catch: () => new Error('failure logging in'),
  });
});

const program = Effect.gen(function* () {
  const tokens = yield* getTokens;
  console.log('tokens', tokens);
});

const eff = program.pipe(Effect.provide(Frodo.Default));

Effect.runPromise(eff);
