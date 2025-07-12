#!/usr/bin/env node

import { McpServer } from '@effect/ai';
import {
  NodeHttpClient,
  NodeRuntime,
  NodeSink,
  NodeStream,
} from '@effect/platform-node';
import { Layer, Logger } from 'effect';

import { Markdown } from './services/Markdown.js';
import { DocsCache } from './services/DocsCache.js';
import { Readmes } from './resources.js';

import { SiteMapperService } from './services/SiteMapper.js';
import { JourneyToolkit, JourneyTools } from './tools/journey.toolkit.js';
import { Frodo } from './services/Frodo.js';
import { RealmToolkit, RealmsTools } from './tools/realm.toolkit.js';
import { UsersToolkit, UsersTools } from './tools/users.toolkit.js';
import { LogsToolkit, LogsTools } from './tools/logs.toolkit.js';
import {
  CreateConfigToolKit,
  CreateConfigTools,
} from './tools/config.toolkit.js';
import { DeviceToolkit, DevicesTools } from './tools/devices.toolkit.js';
import { IdmToolkit, IdmTools } from './tools/idm.toolkit.js';
import { AgentToolkit, AgentTools } from './tools/agent.toolkit.js';
import { OAuth2Toolkit, OAuth2Tools } from './tools/oauth2.toolkit.js';
import { Saml2Toolkit, Saml2Tools } from './tools/saml2.toolkit.js';
import { ScriptsToolkit, ScriptsTools } from './tools/scripts.toolkit.js';
import { PoliciesToolkit, PoliciesTools } from './tools/policies.toolkit.js';

export const Logs = McpServer.toolkit(LogsToolkit).pipe(
  Layer.provide(LogsTools),
);
export const Journey = McpServer.toolkit(JourneyToolkit).pipe(
  Layer.provide(JourneyTools),
);
export const Realms = McpServer.toolkit(RealmToolkit).pipe(
  Layer.provide(RealmsTools),
);
export const Users = McpServer.toolkit(UsersToolkit).pipe(
  Layer.provide(UsersTools),
);
export const Config = McpServer.toolkit(CreateConfigToolKit).pipe(
  Layer.provide(CreateConfigTools),
);

export const Devices = McpServer.toolkit(DeviceToolkit).pipe(
  Layer.provide(DevicesTools),
);

export const IDM = McpServer.toolkit(IdmToolkit).pipe(Layer.provide(IdmTools));

export const Agent = McpServer.toolkit(AgentToolkit).pipe(
  Layer.provide(AgentTools),
);

export const OAuth2 = McpServer.toolkit(OAuth2Toolkit).pipe(
  Layer.provide(OAuth2Tools),
);

export const Saml2 = McpServer.toolkit(Saml2Toolkit).pipe(
  Layer.provide(Saml2Tools),
);

export const Scripts = McpServer.toolkit(ScriptsToolkit).pipe(
  Layer.provide(ScriptsTools),
);

export const Policies = McpServer.toolkit(PoliciesToolkit).pipe(
  Layer.provide(PoliciesTools),
);

const ToolLayers = Layer.mergeAll(
  Journey,
  Readmes,
  Realms,
  Users,
  Logs,
  Config,
  Devices,
  IDM,
  Agent,
  OAuth2,
  Saml2,
  Scripts,
  Policies,
);
export const PingSDKMcpServer = McpServer.layerStdio({
  name: 'ping-sdk-mcp',
  version: '1.0.0',
  stdin: NodeStream.stdin,
  stdout: NodeSink.stdout,
}).pipe(
  Layer.provide(ToolLayers),

  // Services
  Layer.provide(DocsCache.Default),
  Layer.provide(Frodo.Default),

  // Dependencies
  Layer.provide(Markdown.Default),
  Layer.provide(NodeHttpClient.layerUndici),
  Layer.provide(SiteMapperService.Default),

  // Http Server
  Layer.provide(Logger.add(Logger.prettyLogger({ stderr: true }))),
  Layer.launch,
  NodeRuntime.runMain,
);

