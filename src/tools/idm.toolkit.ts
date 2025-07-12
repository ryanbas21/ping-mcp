import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema, Config } from 'effect';
import { FailedToLogin, Login } from './utils/login.js';
import { HttpClient, HttpClientRequest } from '@effect/platform';

export class FailedToCreateUser extends Schema.TaggedError<FailedToCreateUser>()(
  'FailedToCreateUser',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

const CreateUser = AiTool.make('idm_create_user', {
  description: 'create a new user in idm',
  success: Schema.Any,
  failure: FailedToCreateUser,
  parameters: {
    username: Schema.String,
    password: Schema.optional(Schema.String),
    givenName: Schema.String,
    lastName: Schema.String,
    email: Schema.String,
    realm: Schema.optional(Schema.String),
  },
});

export const IdmToolkit = AiToolkit.make(CreateUser);

export const IdmTools = pipe(
  IdmToolkit.toLayer(
    Effect.gen(function* () {
      const login = yield* Login;
      if (!login.accessToken) {
        return yield* Effect.fail(
          new FailedToLogin({
            message: 'Failed to login',
            cause: 'no access token found',
          }),
        );
      }
      const IDM_URL = yield* Config.string('IDM_URL');
      const client = yield* HttpClient.HttpClient;
      const request = HttpClientRequest.post(IDM_URL).pipe(
        HttpClientRequest.acceptJson,
        HttpClientRequest.setHeader('Accept-API-Version', 'resource=1.0'),
        HttpClientRequest.bearerToken(login.accessToken),
      );
      return IdmToolkit.of({
        idm_create_user: ({
          email,
          givenName,
          lastName,
          password,
          realm = 'alpha',
          username,
        }) =>
          Effect.gen(function* () {
            return yield* request.pipe(
              HttpClientRequest.appendUrl(
                `/managed/${realm}_user?_action=create`,
              ),
              HttpClientRequest.bodyJson({
                userName: username,
                mail: email,
                password,
                givenName,
                sn: lastName,
              }),
              Effect.flatMap(client.execute),
              Effect.flatMap(response => response.json),
              Effect.catchTags({
                HttpBodyError: error =>
                  Effect.fail(
                    new FailedToCreateUser({
                      message: 'Failed to create user',
                      cause: error,
                    }),
                  ),
                RequestError: error =>
                  Effect.fail(
                    new FailedToCreateUser({
                      message: 'Failed to create user',
                      cause: error,
                    }),
                  ),
                ResponseError: error =>
                  Effect.fail(
                    new FailedToCreateUser({
                      message: 'Failed to create user',
                      cause: error,
                    }),
                  ),
              }),
            );
          }),
      });
    }),
  ),
);
