import 'dotenv/config';
import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';
import { frodo } from 'frodo-lib';

const LOGS_API_URL = "https://openam-sdks.forgeblocks.com/monitoring/logs";

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
      const frodo = yield* Frodo;
      yield* Login;
      const logApiKey = frodo.state.getLogApiKey();
      const logApiSecret = frodo.state.getLogApiSecret();

      return LogsToolkit.of({
        get_logs: ({ transactionId }) =>
          Effect.gen(function* () {
            return yield* Effect.tryPromise({
              try: async () => {
                const response = await fetch(
                  `${LOGS_API_URL}?source=am-everything&_pageSize=10&_prettyPrint=true&transactionId=${encodeURIComponent(
                    transactionId
                  )}`,
                  {
                    headers: {
                      'x-api-key': logApiKey ?? (() => { throw new Error('Missing LOGS_API_KEY env variable'); })(),
                      'x-api-secret': logApiSecret ?? (() => { throw new Error('Missing LOGS_API_SECRET env variable'); })(),
                    },
                  }
                );

                if (response.status !== 200) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
              },
              catch: (error: unknown) =>
                new FailedToGetLogs({
                  message:
                    error instanceof Error ? error.message : 'Unknown error',
                  cause: error,
                }),
            });
          }),
      });
    }),
  ),
);

// Standalone function for CLI/script usage
export async function fetchLogs(transactionId: string) {
  const logApiKey = frodo.state.getLogApiKey();
  const logApiSecret = frodo.state.getLogApiSecret();
  const response = await fetch(
    `${LOGS_API_URL}?source=am-access&_pageSize=10&_prettyPrint=true&transactionId=${encodeURIComponent(transactionId)}`,
    {
      headers: {
        'x-api-key': logApiKey ?? (() => { throw new Error('Missing LOGS_API_KEY env variable'); })(),
        'x-api-secret': logApiSecret ?? (() => { throw new Error('Missing LOGS_API_SECRET env variable'); })(),
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

