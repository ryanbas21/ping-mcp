/* eslint-disable require-yield */
import { Config, Effect } from 'effect';
import { frodo } from '@rockcarver/frodo-lib';

export class Frodo extends Effect.Service<Frodo>()('Frodo', {
  effect: Effect.gen(function* () {
    const username = yield* Config.string('AM_USERNAME');
    const password = yield* Config.string('AM_PASSWORD');
    const host = yield* Config.string('AM_URL');

    const instance = frodo.createInstanceWithAdminAccount(
      host,
      username,
      password,
    );

    return instance;
  }),
}) {}
