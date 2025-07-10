import { AiToolkit, AiTool } from '@effect/ai';
import type { Record } from 'effect';
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

export class FailedToGetJourneys extends Schema.TaggedError<FailedToGetJourneys>()(
  'FailedToGetJourneys',
  {
    error: Schema.Any,
  },
) {}

export class FailedToDeleteJourney extends Schema.TaggedError<FailedToDeleteJourney>()(
  'FailedToDeleteJourney',
  {
    error: Schema.Any,
  },
) {}

export class FailedToExportJourney extends Schema.TaggedError<FailedToExportJourney>()(
  'FailedToExportJourney',
  {
    error: Schema.Any,
  },
) {}

export class FailedToUpdateJourney extends Schema.TaggedError<FailedToUpdateJourney>()(
  'FailedToUpdateJourney',
  {
    error: Schema.Any,
  },
) {}

const ExportJourney = AiTool.make('export_journey', {
  description: 'Export a journey',
  success: Schema.Any,
  failure: FailedToExportJourney,
  parameters: {
    journeyId: Schema.String,
  },
});

const ListJourneyTool = AiTool.make('list_journey', {
  description: 'List all journeys',
  success: Schema.Any,
  failure: FailedToGetJourneys,
  parameters: {
    realm: Schema.optional(Schema.String),
  },
});

const GetJourney = AiTool.make('get_journey', {
  description: 'Get information about a journey',
  success: Schema.Any,
  failure: FailedToGetJourneys,
  parameters: {
    journeyId: Schema.String,
  },
});

const DeleteJourney = AiTool.make('delete_journey', {
  description: 'Delete a journey',
  success: Schema.Any,
  failure: FailedToDeleteJourney,
  parameters: {
    journeyId: Schema.String,
  },
});

const UpdateJourney = AiTool.make('update_journey', {
  description: 'Update a journey',
  success: Schema.Any,
  failure: FailedToUpdateJourney,
  parameters: {
    journeyId: Schema.String,
    entryNodeId: Schema.String,
    nodes: Schema.Record({ key: Schema.String, value: Schema.Any }),
  },
});

export const JourneyToolkit = AiToolkit.make(
  ListJourneyTool,
  GetJourney,
  DeleteJourney,
  ExportJourney,
  UpdateJourney,
);

export const JourneyTools = pipe(
  JourneyToolkit.toLayer(
    Effect.gen(function* () {
      const frodo = yield* Frodo;
      yield* Login;
      return JourneyToolkit.of({
        export_journey: ({ journeyId }: { journeyId: string }) =>
          Effect.gen(function* () {
            const info = yield* Effect.tryPromise({
              try: () => frodo.authn.journey.exportJourney(journeyId),
              catch: error => new FailedToExportJourney({ error }),
            });
            return info;
          }),
        delete_journey: ({ journeyId }: { journeyId: string }) =>
          Effect.gen(function* () {
            const info = yield* Effect.tryPromise({
              try: () =>
                frodo.authn.journey.deleteJourney(journeyId, {
                  deep: false,
                  verbose: false,
                }),
              catch: error => new FailedToDeleteJourney({ error }),
            });
            return info;
          }),
        get_journey: ({ journeyId }: { journeyId: string }) =>
          Effect.gen(function* () {
            const info = yield* Effect.tryPromise({
              try: () => frodo.authn.journey.readJourney(journeyId),
              catch: error => new FailedToGetJourneys({ error }),
            });
            return info;
          }),
        list_journey: () =>
          Effect.gen(function* () {
            const journeyObjects = yield* Effect.tryPromise({
              try: () => frodo.authn.journey.readJourneys(),
              catch: error => new FailedToGetJourneys({ error }),
            }).pipe(
              Effect.map(journeyArr => journeyArr.map(journey => journey._id)),
              Effect.catchAll(error => Effect.succeed({ error })),
            );

            return journeyObjects;
          }),
        update_journey: ({
          entryNodeId,
          journeyId,
          nodes,
        }: {
          journeyId: string;
          entryNodeId: string;
          nodes: Record<
            string,
            Parameters<
              typeof frodo.authn.journey.updateJourney
            >[1]['nodes'][string]
          >;
        }) =>
          Effect.gen(function* () {
            const info = yield* Effect.tryPromise({
              try: () =>
                frodo.authn.journey.updateJourney(journeyId, {
                  entryNodeId,
                  nodes,
                }),
              catch: error => new FailedToUpdateJourney({ error }),
            });
            return info;
          }),
      });
    }),
  ),
);
