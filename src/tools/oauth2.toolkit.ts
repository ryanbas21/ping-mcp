import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToGetOAuth2Clients extends Schema.TaggedError<FailedToGetOAuth2Clients>()(
  'FailedToGetOAuth2Clients',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetOAuth2Client extends Schema.TaggedError<FailedToGetOAuth2Client>()(
  'FailedToGetOAuth2Client',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdateOAuth2Client extends Schema.TaggedError<FailedToUpdateOAuth2Client>()(
  'FailedToUpdateOAuth2Client',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeleteOAuth2Client extends Schema.TaggedError<FailedToDeleteOAuth2Client>()(
  'FailedToDeleteOAuth2Client',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetOAuth2Provider extends Schema.TaggedError<FailedToGetOAuth2Provider>()(
  'FailedToGetOAuth2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToCreateOAuth2Provider extends Schema.TaggedError<FailedToCreateOAuth2Provider>()(
  'FailedToCreateOAuth2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdateOAuth2Provider extends Schema.TaggedError<FailedToUpdateOAuth2Provider>()(
  'FailedToUpdateOAuth2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeleteOAuth2Provider extends Schema.TaggedError<FailedToDeleteOAuth2Provider>()(
  'FailedToDeleteOAuth2Provider',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetTrustedJwtIssuers extends Schema.TaggedError<FailedToGetTrustedJwtIssuers>()(
  'FailedToGetTrustedJwtIssuers',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetTrustedJwtIssuer extends Schema.TaggedError<FailedToGetTrustedJwtIssuer>()(
  'FailedToGetTrustedJwtIssuer',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToUpdateTrustedJwtIssuer extends Schema.TaggedError<FailedToUpdateTrustedJwtIssuer>()(
  'FailedToUpdateTrustedJwtIssuer',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToDeleteTrustedJwtIssuer extends Schema.TaggedError<FailedToDeleteTrustedJwtIssuer>()(
  'FailedToDeleteTrustedJwtIssuer',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

// OAuth2 Client Tools
const GetOAuth2Clients = AiTool.make('get_oauth2_clients', {
  description: 'Get all OAuth2 clients',
  success: Schema.Any,
  failure: FailedToGetOAuth2Clients,
  parameters: {},
});

const GetOAuth2Client = AiTool.make('get_oauth2_client', {
  description: 'Get OAuth2 client by ID',
  success: Schema.Any,
  failure: FailedToGetOAuth2Client,
  parameters: {
    clientId: Schema.String,
  },
});

const CreateOAuth2Client = AiTool.make('create_oauth2_client', {
  description: 'Create a new OAuth2 client',
  success: Schema.Any,
  failure: FailedToUpdateOAuth2Client,
  parameters: {
    clientId: Schema.String,
    clientData: Schema.Any,
  },
});

const UpdateOAuth2Client = AiTool.make('update_oauth2_client', {
  description: 'Update an existing OAuth2 client',
  success: Schema.Any,
  failure: FailedToUpdateOAuth2Client,
  parameters: {
    clientId: Schema.String,
    clientData: Schema.Any,
  },
});

const DeleteOAuth2Client = AiTool.make('delete_oauth2_client', {
  description: 'Delete an OAuth2 client',
  success: Schema.Any,
  failure: FailedToDeleteOAuth2Client,
  parameters: {
    clientId: Schema.String,
  },
});

// OAuth2 Provider Tools
const GetOAuth2Provider = AiTool.make('get_oauth2_provider', {
  description: 'Get OAuth2 provider configuration',
  success: Schema.Any,
  failure: FailedToGetOAuth2Provider,
  parameters: {},
});

const CreateOAuth2Provider = AiTool.make('create_oauth2_provider', {
  description: 'Create OAuth2 provider configuration',
  success: Schema.Any,
  failure: FailedToCreateOAuth2Provider,
  parameters: {
    providerData: Schema.optional(Schema.Any),
  },
});

const DeleteOAuth2Provider = AiTool.make('delete_oauth2_provider', {
  description: 'Delete OAuth2 provider configuration',
  success: Schema.Any,
  failure: FailedToDeleteOAuth2Provider,
  parameters: {},
});

// Trusted JWT Issuer Tools
const GetTrustedJwtIssuers = AiTool.make('get_trusted_jwt_issuers', {
  description: 'Get all trusted JWT issuers',
  success: Schema.Any,
  failure: FailedToGetTrustedJwtIssuers,
  parameters: {},
});

const GetTrustedJwtIssuer = AiTool.make('get_trusted_jwt_issuer', {
  description: 'Get trusted JWT issuer by ID',
  success: Schema.Any,
  failure: FailedToGetTrustedJwtIssuer,
  parameters: {
    issuerId: Schema.String,
  },
});

const CreateTrustedJwtIssuer = AiTool.make('create_trusted_jwt_issuer', {
  description: 'Create a new trusted JWT issuer',
  success: Schema.Any,
  failure: FailedToUpdateTrustedJwtIssuer,
  parameters: {
    issuerId: Schema.String,
    issuerData: Schema.Any,
  },
});

const UpdateTrustedJwtIssuer = AiTool.make('update_trusted_jwt_issuer', {
  description: 'Update an existing trusted JWT issuer',
  success: Schema.Any,
  failure: FailedToUpdateTrustedJwtIssuer,
  parameters: {
    issuerId: Schema.String,
    issuerData: Schema.Any,
  },
});

const DeleteTrustedJwtIssuer = AiTool.make('delete_trusted_jwt_issuer', {
  description: 'Delete a trusted JWT issuer',
  success: Schema.Any,
  failure: FailedToDeleteTrustedJwtIssuer,
  parameters: {
    issuerId: Schema.String,
  },
});

export const OAuth2Toolkit = AiToolkit.make(
  GetOAuth2Clients,
  GetOAuth2Client,
  CreateOAuth2Client,
  UpdateOAuth2Client,
  DeleteOAuth2Client,
  GetOAuth2Provider,
  CreateOAuth2Provider,
  DeleteOAuth2Provider,
  GetTrustedJwtIssuers,
  GetTrustedJwtIssuer,
  CreateTrustedJwtIssuer,
  UpdateTrustedJwtIssuer,
  DeleteTrustedJwtIssuer,
);

export const OAuth2Tools = pipe(
  OAuth2Toolkit.toLayer(
    Effect.gen(function* () {
      yield* Login;
      const frodo = yield* Frodo;
      return OAuth2Toolkit.of({
        get_oauth2_clients: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.client.getOAuth2Clients(),
              catch: (error: unknown) =>
                new FailedToGetOAuth2Clients({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_oauth2_client: ({ clientId }: { clientId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.client.getOAuth2Client(clientId),
              catch: (error: unknown) =>
                new FailedToGetOAuth2Client({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_oauth2_client: ({ clientData, clientId }: { clientId: string; clientData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.client.putOAuth2Client(clientId, clientData),
              catch: (error: unknown) =>
                new FailedToUpdateOAuth2Client({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_oauth2_client: ({ clientData, clientId }: { clientId: string; clientData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.client.putOAuth2Client(clientId, clientData),
              catch: (error: unknown) =>
                new FailedToUpdateOAuth2Client({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_oauth2_client: ({ clientId }: { clientId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.client.deleteOAuth2Client(clientId),
              catch: (error: unknown) =>
                new FailedToDeleteOAuth2Client({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_oauth2_provider: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.provider.readOAuth2Provider(),
              catch: (error: unknown) =>
                new FailedToGetOAuth2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_oauth2_provider: ({ providerData }: { providerData?: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.provider.createOAuth2Provider(providerData),
              catch: (error: unknown) =>
                new FailedToCreateOAuth2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_oauth2_provider: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.provider.deleteOAuth2Provider(),
              catch: (error: unknown) =>
                new FailedToDeleteOAuth2Provider({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_trusted_jwt_issuers: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.issuer.readOAuth2TrustedJwtIssuers(),
              catch: (error: unknown) =>
                new FailedToGetTrustedJwtIssuers({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_trusted_jwt_issuer: ({ issuerId }: { issuerId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.issuer.readOAuth2TrustedJwtIssuer(issuerId),
              catch: (error: unknown) =>
                new FailedToGetTrustedJwtIssuer({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        create_trusted_jwt_issuer: ({ issuerData, issuerId }: { issuerId: string; issuerData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.issuer.createOAuth2TrustedJwtIssuer(issuerId, issuerData),
              catch: (error: unknown) =>
                new FailedToUpdateTrustedJwtIssuer({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        update_trusted_jwt_issuer: ({ issuerData, issuerId }: { issuerId: string; issuerData: any }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.issuer.updateOAuth2TrustedJwtIssuer(issuerId, issuerData),
              catch: (error: unknown) =>
                new FailedToUpdateTrustedJwtIssuer({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        delete_trusted_jwt_issuer: ({ issuerId }: { issuerId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.oauth2oidc.issuer.deleteOAuth2TrustedJwtIssuer(issuerId),
              catch: (error: unknown) =>
                new FailedToDeleteTrustedJwtIssuer({
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