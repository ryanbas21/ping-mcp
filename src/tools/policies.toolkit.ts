import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToGetPolicies extends Schema.TaggedError<FailedToGetPolicies>()(
  'FailedToGetPolicies',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetPolicy extends Schema.TaggedError<FailedToGetPolicy>()(
  'FailedToGetPolicy',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToCreatePolicy extends Schema.TaggedError<FailedToCreatePolicy>()(
  'FailedToCreatePolicy',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdatePolicy extends Schema.TaggedError<FailedToUpdatePolicy>()(
  'FailedToUpdatePolicy',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeletePolicy extends Schema.TaggedError<FailedToDeletePolicy>()(
  'FailedToDeletePolicy',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToExportPolicy extends Schema.TaggedError<FailedToExportPolicy>()(
  'FailedToExportPolicy',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToImportPolicy extends Schema.TaggedError<FailedToImportPolicy>()(
  'FailedToImportPolicy',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetPolicySets extends Schema.TaggedError<FailedToGetPolicySets>()(
  'FailedToGetPolicySets',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetPolicySet extends Schema.TaggedError<FailedToGetPolicySet>()(
  'FailedToGetPolicySet',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToCreatePolicySet extends Schema.TaggedError<FailedToCreatePolicySet>()(
  'FailedToCreatePolicySet',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdatePolicySet extends Schema.TaggedError<FailedToUpdatePolicySet>()(
  'FailedToUpdatePolicySet',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeletePolicySet extends Schema.TaggedError<FailedToDeletePolicySet>()(
  'FailedToDeletePolicySet',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetResourceTypes extends Schema.TaggedError<FailedToGetResourceTypes>()(
  'FailedToGetResourceTypes',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetResourceType extends Schema.TaggedError<FailedToGetResourceType>()(
  'FailedToGetResourceType',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToCreateResourceType extends Schema.TaggedError<FailedToCreateResourceType>()(
  'FailedToCreateResourceType',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdateResourceType extends Schema.TaggedError<FailedToUpdateResourceType>()(
  'FailedToUpdateResourceType',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeleteResourceType extends Schema.TaggedError<FailedToDeleteResourceType>()(
  'FailedToDeleteResourceType',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

// Policy Tools
const GetPolicies = AiTool.make('get_policies', {
  description: 'Get all policies',
  success: Schema.Any,
  failure: FailedToGetPolicies,
  parameters: {},
});

const GetPoliciesByPolicySet = AiTool.make('get_policies_by_policy_set', {
  description: 'Get policies by policy set',
  success: Schema.Any,
  failure: FailedToGetPolicies,
  parameters: {
    policySetId: Schema.String,
  },
});

const GetPolicy = AiTool.make('get_policy', {
  description: 'Get policy by ID',
  success: Schema.Any,
  failure: FailedToGetPolicy,
  parameters: {
    policyId: Schema.String,
  },
});

const CreatePolicy = AiTool.make('create_policy', {
  description: 'Create a new policy',
  success: Schema.Any,
  failure: FailedToCreatePolicy,
  parameters: {
    policyId: Schema.String,
    policyData: Schema.Any,
  },
});

const UpdatePolicy = AiTool.make('update_policy', {
  description: 'Update an existing policy',
  success: Schema.Any,
  failure: FailedToUpdatePolicy,
  parameters: {
    policyId: Schema.String,
    policyData: Schema.Any,
  },
});

const DeletePolicy = AiTool.make('delete_policy', {
  description: 'Delete a policy by ID',
  success: Schema.Any,
  failure: FailedToDeletePolicy,
  parameters: {
    policyId: Schema.String,
  },
});

const ExportPolicy = AiTool.make('export_policy', {
  description: 'Export a policy by ID',
  success: Schema.Any,
  failure: FailedToExportPolicy,
  parameters: {
    policyId: Schema.String,
    includeDependencies: Schema.optional(Schema.Boolean),
    includePrerequisites: Schema.optional(Schema.Boolean),
    useStringArrays: Schema.optional(Schema.Boolean),
  },
});

const ExportPolicies = AiTool.make('export_policies', {
  description: 'Export all policies',
  success: Schema.Any,
  failure: FailedToExportPolicy,
  parameters: {
    includeDependencies: Schema.optional(Schema.Boolean),
    includePrerequisites: Schema.optional(Schema.Boolean),
    useStringArrays: Schema.optional(Schema.Boolean),
  },
});

const ExportPoliciesByPolicySet = AiTool.make('export_policies_by_policy_set', {
  description: 'Export policies by policy set',
  success: Schema.Any,
  failure: FailedToExportPolicy,
  parameters: {
    policySetName: Schema.String,
    includeDependencies: Schema.optional(Schema.Boolean),
    includePrerequisites: Schema.optional(Schema.Boolean),
    useStringArrays: Schema.optional(Schema.Boolean),
  },
});

const ImportPolicy = AiTool.make('import_policy', {
  description: 'Import a policy by ID',
  success: Schema.Any,
  failure: FailedToImportPolicy,
  parameters: {
    policyId: Schema.String,
    importData: Schema.Any,
    includeDependencies: Schema.optional(Schema.Boolean),
    includePrerequisites: Schema.optional(Schema.Boolean),
    policySetName: Schema.optional(Schema.String),
  },
});

const ImportFirstPolicy = AiTool.make('import_first_policy', {
  description: 'Import the first policy from import data',
  success: Schema.Any,
  failure: FailedToImportPolicy,
  parameters: {
    importData: Schema.Any,
    includeDependencies: Schema.optional(Schema.Boolean),
    includePrerequisites: Schema.optional(Schema.Boolean),
    policySetName: Schema.optional(Schema.String),
  },
});

const ImportPolicies = AiTool.make('import_policies', {
  description: 'Import policies',
  success: Schema.Any,
  failure: FailedToImportPolicy,
  parameters: {
    importData: Schema.Any,
    includeDependencies: Schema.optional(Schema.Boolean),
    includePrerequisites: Schema.optional(Schema.Boolean),
    policySetName: Schema.optional(Schema.String),
  },
});

// Policy Set Tools
const GetPolicySets = AiTool.make('get_policy_sets', {
  description: 'Get all policy sets',
  success: Schema.Any,
  failure: FailedToGetPolicySets,
  parameters: {},
});

const GetPolicySet = AiTool.make('get_policy_set', {
  description: 'Get policy set by name',
  success: Schema.Any,
  failure: FailedToGetPolicySet,
  parameters: {
    policySetName: Schema.String,
  },
});

const CreatePolicySet = AiTool.make('create_policy_set', {
  description: 'Create a new policy set',
  success: Schema.Any,
  failure: FailedToCreatePolicySet,
  parameters: {
    policySetData: Schema.Any,
  },
});

const UpdatePolicySet = AiTool.make('update_policy_set', {
  description: 'Update an existing policy set',
  success: Schema.Any,
  failure: FailedToUpdatePolicySet,
  parameters: {
    policySetName: Schema.optional(Schema.String),
    policySetData: Schema.Any,
  },
});

const DeletePolicySet = AiTool.make('delete_policy_set', {
  description: 'Delete a policy set by name',
  success: Schema.Any,
  failure: FailedToDeletePolicySet,
  parameters: {
    policySetName: Schema.String,
  },
});

// Resource Type Tools
const GetResourceTypes = AiTool.make('get_resource_types', {
  description: 'Get all resource types',
  success: Schema.Any,
  failure: FailedToGetResourceTypes,
  parameters: {},
});

const GetResourceType = AiTool.make('get_resource_type', {
  description: 'Get resource type by UUID',
  success: Schema.Any,
  failure: FailedToGetResourceType,
  parameters: {
    resourceTypeUuid: Schema.String,
  },
});

const GetResourceTypeByName = AiTool.make('get_resource_type_by_name', {
  description: 'Get resource type by name',
  success: Schema.Any,
  failure: FailedToGetResourceType,
  parameters: {
    resourceTypeName: Schema.String,
  },
});

const CreateResourceType = AiTool.make('create_resource_type', {
  description: 'Create a new resource type',
  success: Schema.Any,
  failure: FailedToCreateResourceType,
  parameters: {
    resourceTypeData: Schema.Any,
  },
});

const UpdateResourceType = AiTool.make('update_resource_type', {
  description: 'Update an existing resource type',
  success: Schema.Any,
  failure: FailedToUpdateResourceType,
  parameters: {
    resourceTypeUuid: Schema.String,
    resourceTypeData: Schema.Any,
    failIfExists: Schema.optional(Schema.Boolean),
  },
});

const DeleteResourceType = AiTool.make('delete_resource_type', {
  description: 'Delete a resource type by UUID',
  success: Schema.Any,
  failure: FailedToDeleteResourceType,
  parameters: {
    resourceTypeUuid: Schema.String,
  },
});

export const PoliciesToolkit = AiToolkit.make(
  GetPolicies,
  GetPoliciesByPolicySet,
  GetPolicy,
  CreatePolicy,
  UpdatePolicy,
  DeletePolicy,
  ExportPolicy,
  ExportPolicies,
  ExportPoliciesByPolicySet,
  ImportPolicy,
  ImportFirstPolicy,
  ImportPolicies,
  GetPolicySets,
  GetPolicySet,
  CreatePolicySet,
  UpdatePolicySet,
  DeletePolicySet,
  GetResourceTypes,
  GetResourceType,
  GetResourceTypeByName,
  CreateResourceType,
  UpdateResourceType,
  DeleteResourceType,
);

export const PoliciesTools = pipe(
  PoliciesToolkit.toLayer(
    Effect.gen(function* () {
      yield* Login;
      const frodo = yield* Frodo;
      return PoliciesToolkit.of({
        get_policies: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.readPolicies(),
              catch: (error: unknown) =>
                new FailedToGetPolicies({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_policies_by_policy_set: ({ policySetId }: { policySetId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.readPoliciesByPolicySet(policySetId),
              catch: (error: unknown) =>
                new FailedToGetPolicies({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_policy: ({ policyId }: { policyId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.readPolicy(policyId),
              catch: (error: unknown) =>
                new FailedToGetPolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_policy: ({ policyData, policyId }: { policyData: any; policyId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.createPolicy(policyId, policyData),
              catch: (error: unknown) =>
                new FailedToCreatePolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_policy: ({ policyData, policyId }: { policyData: any; policyId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.updatePolicy(policyId, policyData),
              catch: (error: unknown) =>
                new FailedToUpdatePolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_policy: ({ policyId }: { policyId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.deletePolicy(policyId),
              catch: (error: unknown) =>
                new FailedToDeletePolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        export_policy: ({ includeDependencies, includePrerequisites, policyId, useStringArrays }: { includeDependencies?: boolean; includePrerequisites?: boolean; policyId: string; useStringArrays?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.exportPolicy(policyId, { deps: includeDependencies || false, prereqs: includePrerequisites || false, useStringArrays: useStringArrays || false }),
              catch: (error: unknown) =>
                new FailedToExportPolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        export_policies: ({ includeDependencies, includePrerequisites, useStringArrays }: { includeDependencies?: boolean; includePrerequisites?: boolean; useStringArrays?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.exportPolicies({ deps: includeDependencies || false, prereqs: includePrerequisites || false, useStringArrays: useStringArrays || false }),
              catch: (error: unknown) =>
                new FailedToExportPolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        export_policies_by_policy_set: ({ includeDependencies, includePrerequisites, policySetName, useStringArrays }: { includeDependencies?: boolean; includePrerequisites?: boolean; policySetName: string; useStringArrays?: boolean }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.exportPoliciesByPolicySet(policySetName, { deps: includeDependencies || false, prereqs: includePrerequisites || false, useStringArrays: useStringArrays || false }),
              catch: (error: unknown) =>
                new FailedToExportPolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        import_policy: ({ importData, includeDependencies, includePrerequisites, policyId, policySetName }: { includeDependencies?: boolean; includePrerequisites?: boolean; importData: any; policyId: string; policySetName?: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.importPolicy(policyId, importData, { deps: includeDependencies || false, prereqs: includePrerequisites || false, policySetName }),
              catch: (error: unknown) =>
                new FailedToImportPolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        import_first_policy: ({ importData, includeDependencies, includePrerequisites, policySetName }: { includeDependencies?: boolean; includePrerequisites?: boolean; importData: any; policySetName?: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.importFirstPolicy(importData, { deps: includeDependencies || false, prereqs: includePrerequisites || false, policySetName }),
              catch: (error: unknown) =>
                new FailedToImportPolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        import_policies: ({ importData, includeDependencies, includePrerequisites, policySetName }: { importData: any; includeDependencies?: boolean; includePrerequisites?: boolean; policySetName?: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policy.importPolicies(importData, { deps: includeDependencies || false, prereqs: includePrerequisites || false, policySetName }),
              catch: (error: unknown) =>
                new FailedToImportPolicy({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_policy_sets: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policySet.readPolicySets(),
              catch: (error: unknown) =>
                new FailedToGetPolicySets({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_policy_set: ({ policySetName }: { policySetName: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policySet.readPolicySet(policySetName),
              catch: (error: unknown) =>
                new FailedToGetPolicySet({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_policy_set: ({ policySetData }: { policySetData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policySet.createPolicySet(policySetData),
              catch: (error: unknown) =>
                new FailedToCreatePolicySet({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_policy_set: ({ policySetData, policySetName }: { policySetData: any; policySetName?: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policySet.updatePolicySet(policySetName, policySetData),
              catch: (error: unknown) =>
                new FailedToUpdatePolicySet({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_policy_set: ({ policySetName }: { policySetName: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.policySet.deletePolicySet(policySetName),
              catch: (error: unknown) =>
                new FailedToDeletePolicySet({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_resource_types: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.resourceType.readResourceTypes(),
              catch: (error: unknown) =>
                new FailedToGetResourceTypes({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_resource_type: ({ resourceTypeUuid }: { resourceTypeUuid: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.resourceType.readResourceType(resourceTypeUuid),
              catch: (error: unknown) =>
                new FailedToGetResourceType({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_resource_type_by_name: ({ resourceTypeName }: { resourceTypeName: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.resourceType.readResourceTypeByName(resourceTypeName),
              catch: (error: unknown) =>
                new FailedToGetResourceType({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_resource_type: ({ resourceTypeData }: { resourceTypeData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.resourceType.createResourceType(resourceTypeData),
              catch: (error: unknown) =>
                new FailedToCreateResourceType({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_resource_type: ({ failIfExists, resourceTypeData, resourceTypeUuid }: { failIfExists?: boolean; resourceTypeData: any; resourceTypeUuid: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.resourceType.updateResourceType(resourceTypeUuid, resourceTypeData, failIfExists),
              catch: (error: unknown) =>
                new FailedToUpdateResourceType({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_resource_type: ({ resourceTypeUuid }: { resourceTypeUuid: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.resourceType.deleteResourceType(resourceTypeUuid),
              catch: (error: unknown) =>
                new FailedToDeleteResourceType({
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