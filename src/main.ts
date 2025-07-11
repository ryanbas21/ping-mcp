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

export const PingSDKMcpServer = McpServer.layerStdio({
  name: 'ping-sdk-mcp',
  version: '1.0.0',
  stdin: NodeStream.stdin,
  stdout: NodeSink.stdout,
}).pipe(
  // Toolkits
  Layer.provide(Journey),
  Layer.provide(Readmes),
  Layer.provide(Realms),
  Layer.provide(Users),
  Layer.provide(Logs),
  Layer.provide(Config),
  Layer.provide(Devices),
  Layer.provide(IDM),

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
