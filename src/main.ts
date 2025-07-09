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
import { Toolkit, ToolkitLayer } from './tools.js';
import { Readmes } from './resources.js';
import { SiteMapperService } from './services/SiteMapper.js';

// purposefully exporting beause it's unused for now.
// this would need to be provided as a tool below.
export const PingSDKMcpServer = McpServer.toolkit(Toolkit).pipe(
  Layer.provide(ToolkitLayer),
);

McpServer.layerStdio({
  name: 'ping-sdk-mcp',
  version: '1.0.0',
  stdin: NodeStream.stdin,
  stdout: NodeSink.stdout,
}).pipe(
  // providing services and tools
  Layer.provide(Readmes),
  Layer.provide(DocsCache.Default),

  // providing dependencies
  Layer.provide(Markdown.Default),
  Layer.provide(NodeHttpClient.layerUndici),
  Layer.provide(SiteMapperService.Default),

  // providing http server related layers
  Layer.provide(Logger.add(Logger.prettyLogger({ stderr: true }))),
  Layer.launch,
  NodeRuntime.runMain,
);
