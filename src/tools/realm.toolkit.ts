import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToDeleteRealm extends Schema.TaggedError<FailedToDeleteRealm>()(
  'FailedToDeleteRealm',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

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

export class FailedToExportRealm extends Schema.TaggedError<FailedToExportRealm>()(
  'FailedToExportRealm',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToImportRealm extends Schema.TaggedError<FailedToImportRealm>()(
  'FailedToImportRealm',
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

const DeleteRealm = AiTool.make('delete_realm', {
  description: 'Delete a realm',
  success: Schema.Any,
  failure: FailedToDeleteRealm,
  parameters: {
    realmId: Schema.String,
  },
});

export const RealmToolkit = AiToolkit.make(CreateRealm, ReadRealmByName, DeleteRealm);

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
        delete_realm: ({ realmId }: { realmId: string }) =>
          Effect.gen(function* () {
            yield* Effect.tryPromise({
              try: () => frodo.realm.deleteRealm(realmId),
              catch: (error: unknown) =>
                new FailedToDeleteRealm({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
          }),
        export_realm: ({ realmId }: { realmId: string }) =>
          Effect.tryPromise({
            try: async () => {
              const realms = await frodo.realm.exportRealms();
              const realm = Array.isArray(realms)
                ? realms.find((r: any) => r._id === realmId || r.realmId === realmId || r.name === realmId)
                : undefined;
              if (!realm) {
                throw new FailedToExportRealm({
                  message: `Realm with id ${realmId} not found in export`,
                  cause: null,
                });
              }
              return realm;
            },
            catch: (error: unknown) =>
              new FailedToExportRealm({
                message:
                  error instanceof Error ? error.message : 'unknown error',
                cause: error,
              }),
          }),
        import_realm: ({ realmData }: { realmData: any }) =>
          Effect.tryPromise({
            try: () => frodo.realm.importRealms(realmData),
            catch: (error: unknown) =>
              new FailedToImportRealm({
                message:
                  error instanceof Error ? error.message : 'unknown error',
                cause: error,
              }),
          }),
      });
    }),
  ),
);
