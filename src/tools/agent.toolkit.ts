import { AiToolkit, AiTool } from '@effect/ai';
import { Effect, pipe, Schema } from 'effect';
import { Frodo } from '../services/Frodo';
import { Login } from './utils/login.js';

export class FailedToGetAgents extends Schema.TaggedError<FailedToGetAgents>()(
  'FailedToGetAgents',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetAgent extends Schema.TaggedError<FailedToGetAgent>()(
  'FailedToGetAgent',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

export class FailedToGetAgentGroups extends Schema.TaggedError<FailedToGetAgentGroups>()(
  'FailedToGetAgentGroups',
  {
    message: Schema.String,
    cause: Schema.Any,
  },
) {}

const GetAgents = AiTool.make('get_agents', {
  description: 'Get all agents',
  success: Schema.Any,
  failure: FailedToGetAgents,
  parameters: {},
});

const GetAgentByTypeAndId = AiTool.make('get_agent_by_type_and_id', {
  description: 'Get agent by type and ID',
  success: Schema.Any,
  failure: FailedToGetAgent,
  parameters: {
    agentType: Schema.String,
    agentId: Schema.String,
  },
});

const GetAgentGroups = AiTool.make('get_agent_groups', {
  description: 'Get all agent groups',
  success: Schema.Any,
  failure: FailedToGetAgentGroups,
  parameters: {},
});

export const AgentToolkit = AiToolkit.make(
  GetAgents,
  GetAgentByTypeAndId,
  GetAgentGroups,
);

export const AgentTools = pipe(
  AgentToolkit.toLayer(
    Effect.gen(function* () {
      yield* Login;

      const frodo = yield* Frodo;
      return AgentToolkit.of({
        get_agents: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.agent.getAgents(),
              catch: (error: unknown) =>
                new FailedToGetAgents({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_agent_by_type_and_id: ({ agentId, agentType }: { agentType: string; agentId: string }) =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.agent.getAgentByTypeAndId(agentType as any, agentId),
              catch: (error: unknown) =>
                new FailedToGetAgent({
                  message:
                    error instanceof Error ? error.message : 'unknown error',
                  cause: error,
                }),
            });
            return value;
          }),
        get_agent_groups: () =>
          Effect.gen(function* () {
            const value = yield* Effect.tryPromise({
              try: () => frodo.agent.readAgentGroups(),
              catch: (error: unknown) =>
                new FailedToGetAgentGroups({
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
