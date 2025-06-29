#!/usr/bin/env node

import { McpServer } from '@effect/ai';
import { NodeRuntime, NodeSink, NodeStream } from '@effect/platform-node';
import { Layer, Logger } from 'effect';
import { Markdown } from './Markdown.js';

import { Toolkit, ToolkitLayer } from './tools.js';
import { Readmes } from './resources.js';

export const PingSDKMcpServer = McpServer.toolkit(Toolkit).pipe(
  Layer.provide(ToolkitLayer),
  Layer.provide(Markdown.Default),
);

McpServer.layerStdio({
  name: 'ping-sdk-mcp',
  version: '1.0.0',
  stdin: NodeStream.stdin,
  stdout: NodeSink.stdout,
}).pipe(
  Layer.provide([Readmes]),
  Layer.provide(Logger.add(Logger.prettyLogger({ stderr: true }))),
  Layer.launch,
  NodeRuntime.runMain,
);
