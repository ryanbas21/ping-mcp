import { AiToolkit, AiTool } from '@effect/ai';
import { Console, Data, Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';

class FailedToGetJourneys extends Data.TaggedError('FailedToGetJourneys')<{
  error: unknown;
}> {}

const ListJourneyTool = AiTool.make('list_journey', {
  description: 'Create a new OAuth app for PingOne',
  success: Schema.Any,
  failure: Schema.Any,
});

export const ListJourneyToolkit = AiToolkit.make(ListJourneyTool);

export const JourneyTools = pipe(
  ListJourneyToolkit.toLayer(
    Effect.gen(function* () {
      const frodo = yield* Frodo;
      return ListJourneyToolkit.of({
        list_journey: () =>
          Effect.gen(function* () {
            yield* Effect.tryPromise({
              try: () => frodo.login.getTokens(),
              catch: () => new Error('failure logging in'),
            });

            yield* Console.log('Logged in successfully');

            const journeyObjects = yield* Effect.tryPromise({
              try: () => frodo.authn.journey.readJourneys(),
              catch: error => new FailedToGetJourneys({ error }),
            }).pipe(
              Effect.tap(Console.log),
              Effect.map(journeyArr => journeyArr.map(journey => journey._id)),
              Effect.catchAll(error => Effect.succeed({ error })),
            );

            return journeyObjects;
          }),
      });
    }),
  ),
);
