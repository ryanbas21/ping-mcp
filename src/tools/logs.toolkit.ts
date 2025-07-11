import 'dotenv/config';
import { AiToolkit, AiTool } from '@effect/ai';
import { Config, Effect, pipe, Schema } from 'effect';
import { HttpClient, HttpClientRequest } from '@effect/platform';

export class FailedToGetLogs extends Schema.TaggedError<FailedToGetLogs>()(
  'FailedToGetLogs',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

const GetLogs = AiTool.make('get_logs', {
  description: 'Get logs for a transaction',
  success: Schema.Any,
  failure: FailedToGetLogs,
  parameters: {
    transactionId: Schema.String,
  },
});

export const LogsToolkit = AiToolkit.make(GetLogs);

export const LogsTools = pipe(
  LogsToolkit.toLayer(
    Effect.gen(function* () {
      const LOGS_API_KEY = yield* Config.string('LOGS_API_KEY');
      const LOGS_API_SECRET = yield* Config.string('LOGS_API_SECRET');
      const LOGS_API_URL = yield* Config.string('LOGS_API_URL');

      const client = yield* HttpClient.HttpClient;
      const logsBaseRequest = HttpClientRequest.get(LOGS_API_URL).pipe(
        HttpClientRequest.acceptJson,
        HttpClientRequest.setHeader('x-api-key', LOGS_API_KEY),
        HttpClientRequest.setHeader('x-api-secret', LOGS_API_SECRET),
      );

      return LogsToolkit.of({
        get_logs: ({ transactionId }) =>
          Effect.gen(function* () {
            const req = logsBaseRequest.pipe(
              HttpClientRequest.appendUrl(
                `?source=am-everything&_pageSize=10&_prettyPrint=true&transactionId=${encodeURIComponent(
                  transactionId,
                )}`,
              ),
            );
            const response = yield* client.execute(req).pipe(
              Effect.flatMap(response => response.json),
              Effect.catchTags({
                ResponseError: error =>
                  new FailedToGetLogs({
                    message: error.message,
                    cause: error,
                  }),
                RequestError: error =>
                  new FailedToGetLogs({
                    message: error.message,
                    cause: error,
                  }),
              }),
            );
            return response;
          }),
      });
    }),
  ),
);
