import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToGetSaml2Providers extends Schema.TaggedError<FailedToGetSaml2Providers>()(
  'FailedToGetSaml2Providers',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetSaml2Provider extends Schema.TaggedError<FailedToGetSaml2Provider>()(
  'FailedToGetSaml2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToCreateSaml2Provider extends Schema.TaggedError<FailedToCreateSaml2Provider>()(
  'FailedToCreateSaml2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdateSaml2Provider extends Schema.TaggedError<FailedToUpdateSaml2Provider>()(
  'FailedToUpdateSaml2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeleteSaml2Provider extends Schema.TaggedError<FailedToDeleteSaml2Provider>()(
  'FailedToDeleteSaml2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetSaml2Metadata extends Schema.TaggedError<FailedToGetSaml2Metadata>()(
  'FailedToGetSaml2Metadata',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToExportSaml2Provider extends Schema.TaggedError<FailedToExportSaml2Provider>()(
  'FailedToExportSaml2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToImportSaml2Provider extends Schema.TaggedError<FailedToImportSaml2Provider>()(
  'FailedToImportSaml2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetCirclesOfTrust extends Schema.TaggedError<FailedToGetCirclesOfTrust>()(
  'FailedToGetCirclesOfTrust',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetCircleOfTrust extends Schema.TaggedError<FailedToGetCircleOfTrust>()(
  'FailedToGetCircleOfTrust',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToCreateCircleOfTrust extends Schema.TaggedError<FailedToCreateCircleOfTrust>()(
  'FailedToCreateCircleOfTrust',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdateCircleOfTrust extends Schema.TaggedError<FailedToUpdateCircleOfTrust>()(
  'FailedToUpdateCircleOfTrust',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeleteCircleOfTrust extends Schema.TaggedError<FailedToDeleteCircleOfTrust>()(
  'FailedToDeleteCircleOfTrust',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToExportCircleOfTrust extends Schema.TaggedError<FailedToExportCircleOfTrust>()(
  'FailedToExportCircleOfTrust',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToImportCircleOfTrust extends Schema.TaggedError<FailedToImportCircleOfTrust>()(
  'FailedToImportCircleOfTrust',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

// SAML2 Provider Tools
const GetSaml2Providers = AiTool.make('get_saml2_providers', {
  description: 'Get all SAML2 entity providers',
  success: Schema.Any,
  failure: FailedToGetSaml2Providers,
  parameters: {},
});

const GetSaml2Provider = AiTool.make('get_saml2_provider', {
  description: 'Get SAML2 entity provider by entity ID',
  success: Schema.Any,
  failure: FailedToGetSaml2Provider,
  parameters: {
    entityId: Schema.String,
  },
});

const CreateSaml2Provider = AiTool.make('create_saml2_provider', {
  description: 'Create a new SAML2 entity provider',
  success: Schema.Any,
  failure: FailedToCreateSaml2Provider,
  parameters: {
    location: Schema.String, // 'hosted' or 'remote'
    providerData: Schema.Any,
    metadata: Schema.optional(Schema.String), // Base64-encoded metadata XML for remote providers
  },
});

const UpdateSaml2Provider = AiTool.make('update_saml2_provider', {
  description: 'Update an existing SAML2 entity provider',
  success: Schema.Any,
  failure: FailedToUpdateSaml2Provider,
  parameters: {
    location: Schema.String, // 'hosted' or 'remote'
    entityId: Schema.String,
    providerData: Schema.Any,
  },
});

const DeleteSaml2Provider = AiTool.make('delete_saml2_provider', {
  description: 'Delete a SAML2 entity provider',
  success: Schema.Any,
  failure: FailedToDeleteSaml2Provider,
  parameters: {
    entityId: Schema.String,
  },
});

const GetSaml2Metadata = AiTool.make('get_saml2_metadata', {
  description: 'Get SAML2 entity provider metadata',
  success: Schema.Any,
  failure: FailedToGetSaml2Metadata,
  parameters: {
    entityId: Schema.String,
  },
});

const ExportSaml2Provider = AiTool.make('export_saml2_provider', {
  description: 'Export a SAML2 entity provider',
  success: Schema.Any,
  failure: FailedToExportSaml2Provider,
  parameters: {
    entityId: Schema.String,
    includeDependencies: Schema.optional(Schema.Boolean),
  },
});

const ImportSaml2Provider = AiTool.make('import_saml2_provider', {
  description: 'Import a SAML2 entity provider',
  success: Schema.Any,
  failure: FailedToImportSaml2Provider,
  parameters: {
    entityId: Schema.String,
    importData: Schema.Any,
    includeDependencies: Schema.optional(Schema.Boolean),
  },
});

// Circles of Trust Tools
const GetCirclesOfTrust = AiTool.make('get_circles_of_trust', {
  description: 'Get all circles of trust',
  success: Schema.Any,
  failure: FailedToGetCirclesOfTrust,
  parameters: {
    entityProviders: Schema.optional(Schema.Array(Schema.String)),
  },
});

const GetCircleOfTrust = AiTool.make('get_circle_of_trust', {
  description: 'Get circle of trust by ID',
  success: Schema.Any,
  failure: FailedToGetCircleOfTrust,
  parameters: {
    cotId: Schema.String,
  },
});

const CreateCircleOfTrust = AiTool.make('create_circle_of_trust', {
  description: 'Create a new circle of trust',
  success: Schema.Any,
  failure: FailedToCreateCircleOfTrust,
  parameters: {
    cotId: Schema.String,
    cotData: Schema.optional(Schema.Any),
  },
});

const UpdateCircleOfTrust = AiTool.make('update_circle_of_trust', {
  description: 'Update an existing circle of trust',
  success: Schema.Any,
  failure: FailedToUpdateCircleOfTrust,
  parameters: {
    cotId: Schema.String,
    cotData: Schema.Any,
  },
});

const DeleteCircleOfTrust = AiTool.make('delete_circle_of_trust', {
  description: 'Delete a circle of trust',
  success: Schema.Any,
  failure: FailedToDeleteCircleOfTrust,
  parameters: {
    cotId: Schema.String,
  },
});

const ExportCircleOfTrust = AiTool.make('export_circle_of_trust', {
  description: 'Export a circle of trust',
  success: Schema.Any,
  failure: FailedToExportCircleOfTrust,
  parameters: {
    cotId: Schema.String,
  },
});

const ImportCircleOfTrust = AiTool.make('import_circle_of_trust', {
  description: 'Import a circle of trust',
  success: Schema.Any,
  failure: FailedToImportCircleOfTrust,
  parameters: {
    cotId: Schema.String,
    importData: Schema.Any,
  },
});

export const Saml2Toolkit = AiToolkit.make(
  GetSaml2Providers,
  GetSaml2Provider,
  CreateSaml2Provider,
  UpdateSaml2Provider,
  DeleteSaml2Provider,
  GetSaml2Metadata,
  ExportSaml2Provider,
  ImportSaml2Provider,
  GetCirclesOfTrust,
  GetCircleOfTrust,
  CreateCircleOfTrust,
  UpdateCircleOfTrust,
  DeleteCircleOfTrust,
  ExportCircleOfTrust,
  ImportCircleOfTrust,
);

export const Saml2Tools = pipe(
  Saml2Toolkit.toLayer(
    Effect.gen(function* () {
      yield* Login;
      const frodo = yield* Frodo;
      return Saml2Toolkit.of({
        get_saml2_providers: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.entityProvider.readSaml2ProviderStubs(),
              catch: (error: unknown) =>
                new FailedToGetSaml2Providers({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_saml2_provider: ({ entityId }: { entityId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.entityProvider.readSaml2Provider(entityId),
              catch: (error: unknown) =>
                new FailedToGetSaml2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_saml2_provider: ({ location, metadata, providerData }: { location: string; providerData: any; metadata?: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.entityProvider.createSaml2Provider(location as any, providerData, metadata || ''),
              catch: (error: unknown) =>
                new FailedToCreateSaml2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_saml2_provider: ({ entityId, location, providerData }: { location: string; entityId: string; providerData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.entityProvider.updateSaml2Provider(location as any, providerData, entityId),
              catch: (error: unknown) =>
                new FailedToUpdateSaml2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_saml2_provider: ({ entityId }: { entityId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.entityProvider.deleteSaml2Provider(entityId),
              catch: (error: unknown) =>
                new FailedToDeleteSaml2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_saml2_metadata: ({ entityId }: { entityId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.entityProvider.getSaml2ProviderMetadata(entityId),
              catch: (error: unknown) =>
                new FailedToGetSaml2Metadata({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        export_saml2_provider: ({ entityId, includeDependencies }: { entityId: string; includeDependencies?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.entityProvider.exportSaml2Provider(entityId, { deps: includeDependencies || false }),
              catch: (error: unknown) =>
                new FailedToExportSaml2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        import_saml2_provider: ({ entityId, importData, includeDependencies }: { entityId: string; importData: any; includeDependencies?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.entityProvider.importSaml2Provider(entityId, importData, { deps: includeDependencies || false }),
              catch: (error: unknown) =>
                new FailedToImportSaml2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_circles_of_trust: ({ entityProviders }: { entityProviders?: Array<string> }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.circlesOfTrust.readCirclesOfTrust(entityProviders),
              catch: (error: unknown) =>
                new FailedToGetCirclesOfTrust({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_circle_of_trust: ({ cotId }: { cotId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.circlesOfTrust.readCircleOfTrust(cotId),
              catch: (error: unknown) =>
                new FailedToGetCircleOfTrust({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_circle_of_trust: ({ cotData, cotId }: { cotId: string; cotData?: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.circlesOfTrust.createCircleOfTrust(cotId, cotData),
              catch: (error: unknown) =>
                new FailedToCreateCircleOfTrust({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_circle_of_trust: ({ cotData, cotId }: { cotId: string; cotData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.circlesOfTrust.updateCircleOfTrust(cotId, cotData),
              catch: (error: unknown) =>
                new FailedToUpdateCircleOfTrust({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_circle_of_trust: ({ cotId }: { cotId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.circlesOfTrust.deleteCircleOfTrust(cotId),
              catch: (error: unknown) =>
                new FailedToDeleteCircleOfTrust({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        export_circle_of_trust: ({ cotId }: { cotId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.circlesOfTrust.exportCircleOfTrust(cotId),
              catch: (error: unknown) =>
                new FailedToExportCircleOfTrust({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        import_circle_of_trust: ({ cotId, importData }: { cotId: string; importData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.saml2.circlesOfTrust.importCircleOfTrust(cotId, importData),
              catch: (error: unknown) =>
                new FailedToImportCircleOfTrust({
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