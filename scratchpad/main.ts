import 'dotenv/config';
import { Effect } from 'effect';
import { Frodo } from '../src/services/Frodo.js';
import { ListJourney } from '../src/tools/create-oauth-app';

const program = Effect.gen(function* () {
  const journeyObjects = yield* ListJourney;

  console.log('journeyObjects', journeyObjects);
});

const eff = program.pipe(Effect.provide(Frodo.Default));

Effect.runPromise(eff);
