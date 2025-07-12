import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToGetScripts extends Schema.TaggedError<FailedToGetScripts>()(
  'FailedToGetScripts',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetScript extends Schema.TaggedError<FailedToGetScript>()(
  'FailedToGetScript',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToCreateScript extends Schema.TaggedError<FailedToCreateScript>()(
  'FailedToCreateScript',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdateScript extends Schema.TaggedError<FailedToUpdateScript>()(
  'FailedToUpdateScript',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeleteScript extends Schema.TaggedError<FailedToDeleteScript>()(
  'FailedToDeleteScript',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToExportScript extends Schema.TaggedError<FailedToExportScript>()(
  'FailedToExportScript',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToImportScript extends Schema.TaggedError<FailedToImportScript>()(
  'FailedToImportScript',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetScriptTypes extends Schema.TaggedError<FailedToGetScriptTypes>()(
  'FailedToGetScriptTypes',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetScriptType extends Schema.TaggedError<FailedToGetScriptType>()(
  'FailedToGetScriptType',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdateScriptType extends Schema.TaggedError<FailedToUpdateScriptType>()(
  'FailedToUpdateScriptType',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

// Script Tools
const GetScripts = AiTool.make('get_scripts', {
  description: 'Get all scripts',
  success: Schema.Any,
  failure: FailedToGetScripts,
  parameters: {},
});

const GetScript = AiTool.make('get_script', {
  description: 'Get script by ID',
  success: Schema.Any,
  failure: FailedToGetScript,
  parameters: {
    scriptId: Schema.String,
  },
});

const GetScriptByName = AiTool.make('get_script_by_name', {
  description: 'Get script by name',
  success: Schema.Any,
  failure: FailedToGetScript,
  parameters: {
    scriptName: Schema.String,
  },
});

const CreateScript = AiTool.make('create_script', {
  description: 'Create a new script',
  success: Schema.Any,
  failure: FailedToCreateScript,
  parameters: {
    scriptId: Schema.String,
    scriptName: Schema.String,
    scriptData: Schema.Any,
  },
});

const UpdateScript = AiTool.make('update_script', {
  description: 'Update an existing script',
  success: Schema.Any,
  failure: FailedToUpdateScript,
  parameters: {
    scriptId: Schema.String,
    scriptData: Schema.Any,
  },
});

const DeleteScript = AiTool.make('delete_script', {
  description: 'Delete a script by ID',
  success: Schema.Any,
  failure: FailedToDeleteScript,
  parameters: {
    scriptId: Schema.String,
  },
});

const DeleteScriptByName = AiTool.make('delete_script_by_name', {
  description: 'Delete a script by name',
  success: Schema.Any,
  failure: FailedToDeleteScript,
  parameters: {
    scriptName: Schema.String,
  },
});

const ExportScript = AiTool.make('export_script', {
  description: 'Export a script by ID',
  success: Schema.Any,
  failure: FailedToExportScript,
  parameters: {
    scriptId: Schema.String,
    includeDependencies: Schema.optional(Schema.Boolean),
    includeDefault: Schema.optional(Schema.Boolean),
    useStringArrays: Schema.optional(Schema.Boolean),
  },
});

const ExportScriptByName = AiTool.make('export_script_by_name', {
  description: 'Export a script by name',
  success: Schema.Any,
  failure: FailedToExportScript,
  parameters: {
    scriptName: Schema.String,
    includeDependencies: Schema.optional(Schema.Boolean),
    includeDefault: Schema.optional(Schema.Boolean),
    useStringArrays: Schema.optional(Schema.Boolean),
  },
});

const ExportScripts = AiTool.make('export_scripts', {
  description: 'Export all scripts',
  success: Schema.Any,
  failure: FailedToExportScript,
  parameters: {
    includeDependencies: Schema.optional(Schema.Boolean),
    includeDefault: Schema.optional(Schema.Boolean),
    useStringArrays: Schema.optional(Schema.Boolean),
  },
});

const ImportScripts = AiTool.make('import_scripts', {
  description: 'Import scripts',
  success: Schema.Any,
  failure: FailedToImportScript,
  parameters: {
    scriptId: Schema.optional(Schema.String),
    scriptName: Schema.optional(Schema.String),
    importData: Schema.Any,
    includeDependencies: Schema.optional(Schema.Boolean),
    reUuid: Schema.optional(Schema.Boolean),
    includeDefault: Schema.optional(Schema.Boolean),
    validate: Schema.optional(Schema.Boolean),
  },
});

// Script Type Tools
const GetScriptTypes = AiTool.make('get_script_types', {
  description: 'Get all script types',
  success: Schema.Any,
  failure: FailedToGetScriptTypes,
  parameters: {},
});

const GetScriptType = AiTool.make('get_script_type', {
  description: 'Get script type by ID',
  success: Schema.Any,
  failure: FailedToGetScriptType,
  parameters: {
    scriptTypeId: Schema.String,
  },
});

const UpdateScriptType = AiTool.make('update_script_type', {
  description: 'Update a script type',
  success: Schema.Any,
  failure: FailedToUpdateScriptType,
  parameters: {
    scriptTypeId: Schema.String,
    scriptTypeData: Schema.Any,
  },
});

export const ScriptsToolkit = AiToolkit.make(
  GetScripts,
  GetScript,
  GetScriptByName,
  CreateScript,
  UpdateScript,
  DeleteScript,
  DeleteScriptByName,
  ExportScript,
  ExportScriptByName,
  ExportScripts,
  ImportScripts,
  GetScriptTypes,
  GetScriptType,
  UpdateScriptType,
);

export const ScriptsTools = pipe(
  ScriptsToolkit.toLayer(
    Effect.gen(function* () {
      yield* Login;
      const frodo = yield* Frodo;
      return ScriptsToolkit.of({
        get_scripts: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.readScripts(),
              catch: (error: unknown) =>
                new FailedToGetScripts({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_script: ({ scriptId }: { scriptId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.readScript(scriptId),
              catch: (error: unknown) =>
                new FailedToGetScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_script_by_name: ({ scriptName }: { scriptName: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.readScriptByName(scriptName),
              catch: (error: unknown) =>
                new FailedToGetScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_script: ({ scriptData, scriptId, scriptName }: { scriptData: any; scriptId: string; scriptName: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.createScript(scriptId, scriptName, scriptData),
              catch: (error: unknown) =>
                new FailedToCreateScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_script: ({ scriptData, scriptId }: { scriptData: any; scriptId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.updateScript(scriptId, scriptData),
              catch: (error: unknown) =>
                new FailedToUpdateScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_script: ({ scriptId }: { scriptId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.deleteScript(scriptId),
              catch: (error: unknown) =>
                new FailedToDeleteScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_script_by_name: ({ scriptName }: { scriptName: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.deleteScriptByName(scriptName),
              catch: (error: unknown) =>
                new FailedToDeleteScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        export_script: ({ includeDefault, includeDependencies, scriptId, useStringArrays }: { includeDefault?: boolean; includeDependencies?: boolean; scriptId: string; useStringArrays?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.exportScript(scriptId, { deps: includeDependencies || false, includeDefault: includeDefault || false, useStringArrays: useStringArrays || false }),
              catch: (error: unknown) =>
                new FailedToExportScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        export_script_by_name: ({ includeDefault, includeDependencies, scriptName, useStringArrays }: { includeDefault?: boolean; includeDependencies?: boolean; scriptName: string; useStringArrays?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.exportScriptByName(scriptName, { deps: includeDependencies || false, includeDefault: includeDefault || false, useStringArrays: useStringArrays || false }),
              catch: (error: unknown) =>
                new FailedToExportScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        export_scripts: ({ includeDefault, includeDependencies, useStringArrays }: { includeDefault?: boolean; includeDependencies?: boolean; useStringArrays?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.exportScripts({ deps: includeDependencies || false, includeDefault: includeDefault || false, useStringArrays: useStringArrays || false }),
              catch: (error: unknown) =>
                new FailedToExportScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        import_scripts: ({ importData, includeDefault, includeDependencies, reUuid, scriptId, scriptName, validate }: { includeDefault?: boolean; includeDependencies?: boolean; importData: any; reUuid?: boolean; scriptId?: string; scriptName?: string; validate?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.script.importScripts(scriptId || '', scriptName || '', importData, { deps: includeDependencies || false, reUuid: reUuid || false, includeDefault: includeDefault || false }, validate || false),
              catch: (error: unknown) =>
                new FailedToImportScript({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_script_types: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.scriptType.readScriptTypes(),
              catch: (error: unknown) =>
                new FailedToGetScriptTypes({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_script_type: ({ scriptTypeId }: { scriptTypeId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.scriptType.readScriptType(scriptTypeId),
              catch: (error: unknown) =>
                new FailedToGetScriptType({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_script_type: ({ scriptTypeData, scriptTypeId }: { scriptTypeData: any; scriptTypeId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.scriptType.updateScriptType(scriptTypeId, scriptTypeData),
              catch: (error: unknown) =>
                new FailedToUpdateScriptType({
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