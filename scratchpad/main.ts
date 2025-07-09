import 'dotenv/config';
import { Effect } from 'effect';
import { Frodo } from '../src/services/Frodo.js';

const program = Effect.gen(function* () {
  const frodo = yield* Frodo;

  const tokens = yield* Effect.tryPromise({
    try: () => frodo.login.getTokens(),
    catch: () => new Error('unable to retrieve tokens'),
  });

  console.log('get tokens', tokens);
  return tokens;
});

const eff = program.pipe(Effect.provide(Frodo.Default));

Effect.runPromise(eff);
