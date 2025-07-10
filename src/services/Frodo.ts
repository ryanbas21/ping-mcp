/* eslint-disable require-yield */
import { Config, Effect } from 'effect';
import { frodo } from '@rockcarver/frodo-lib';

export class Frodo extends Effect.Service<Frodo>()('Frodo', {
  effect: Effect.gen(function* () {
    const username = yield* Config.string('AM_USERNAME');
    const password = yield* Config.string('AM_PASSWORD');
    const host = yield* Config.string('AM_URL');
    const logApiKey = yield* Config.string('LOGS_API_KEY');
    const logApiSecret = yield* Config.string('LOGS_API_SECRET');

    const instance = frodo.createInstanceWithAdminAccount(
      host,
      username,
      password,
    );

    instance.state.setLogApiKey(logApiKey);
    instance.state.setLogApiSecret(logApiSecret);
    
    return instance;
  }),
}) {}
