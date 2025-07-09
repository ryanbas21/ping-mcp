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
import { JourneyTools, ListJourneyToolkit } from './tools/create-oauth-app.js';
import { Frodo } from './services/Frodo.js';

// purposefully exporting beause it's unused for now.
// this would need to be provided as a tool below.
export const PingSDKMcpServer = McpServer.toolkit(ListJourneyToolkit).pipe(
  Layer.provide(JourneyTools),
);

McpServer.layerStdio({
  name: 'ping-sdk-mcp',
  version: '1.0.0',
  stdin: NodeStream.stdin,
  stdout: NodeSink.stdout,
}).pipe(
  // providing services and tools
  Layer.provide(PingSDKMcpServer),
  Layer.provide(Readmes),
  Layer.provide(DocsCache.Default),

  // providing dependencies
  Layer.provide(Frodo.Default),
  Layer.provide(Markdown.Default),
  Layer.provide(NodeHttpClient.layerUndici),
  Layer.provide(SiteMapperService.Default),

  // providing http server related layers
  Layer.provide(Logger.add(Logger.prettyLogger({ stderr: true }))),
  Layer.launch,
  NodeRuntime.runMain,
);
