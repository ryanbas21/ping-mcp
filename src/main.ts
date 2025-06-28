import { AiToolkit, McpServer } from "@effect/ai";
import { HttpClient } from "@effect/platform";
import { NodeHttpClient, NodeRuntime, NodeSink, NodeStream } from "@effect/platform-node";
import { Array, Cache, Console, Duration, Effect, Layer, Logger, pipe, Schedule } from "effect";
import MiniSearch from "minisearch";
import { apiDocUrls, pingReadmes, pingSamples } from "./doc-urls.js";
import { GetPingDocTool, PingDocSearchTool } from "./pingDocSearchTool.js";
import type { DocumentEntry } from "./types.js";

const Toolkit = AiToolkit.make(PingDocSearchTool, GetPingDocTool);

const ToolkitLayer = pipe(
  Toolkit.toLayer(
    Effect.gen(function*() {
      const client = yield* HttpClient.HttpClient;
      const docsClient = client.pipe(
        HttpClient.filterStatusOk,
        HttpClient.retry(Schedule.spaced(Duration.seconds(3))),
      );

      // Initialize search index
      const docs = Array.empty<DocumentEntry>();
      const minisearch = new MiniSearch<DocumentEntry>({
        fields: ["title", "description"],
        searchOptions: {
          boost: { title: 2 },
          fuzzy: 0.2,
        },
      });

      const addDoc = (doc: Omit<DocumentEntry, "id">) => {
        const entry: DocumentEntry = {
          id: docs.length,
          title: doc.title,
          description: doc.description,
          content: doc.content,
          source: doc.source,
          package: doc.package || "",
          url: doc.url,
        };
        docs.push(entry);
        minisearch.add(entry);
      };


      // Load README documentation
      for (const readme of pingReadmes) {
        addDoc({
          title: readme.title,
          description: readme.description,
          source: "readme",
          package: readme.package,
          url: readme.url,
          content: docsClient.get(readme.url).pipe(
            Effect.flatMap((response) => response.text),
            Effect.catchAll(() => Effect.succeed(`# ${readme.title}\n\nDocumentation not available at ${readme.url}`)),
          ),
        });
      }

      // Load sample documentation
      for (const sample of pingSamples) {
        addDoc({
          title: sample.title,
          description: sample.description,
          source: "sample",
          url: sample.url,
          content: docsClient.get(sample.url).pipe(
            Effect.flatMap((response) => response.text),
            Effect.catchAll(() =>
              Effect.succeed(`# ${sample.title}\n\nSample documentation not available at ${sample.url}`)
            ),
          ),
        });
      }

      // Load API documentation
      for (const apiUrl of apiDocUrls) {
        addDoc({
          title: "Ping JavaScript SDK API Reference",
          description: "Complete TypeDoc API documentation for all SDK modules",
          source: "api-docs",
          url: apiUrl,
          content: docsClient.get(apiUrl).pipe(
            Effect.flatMap((response) => response.text),
            Effect.map(html => {
              // Extract useful content from TypeDoc HTML
              const moduleMatches = html.match(/@[\w-]+\/[\w-]+/g) || [];
              const modules = [...new Set(moduleMatches)];

              return `# Ping JavaScript SDK API Reference

Available Modules:
${modules.map(module => `- ${module}`).join("\n")}

For detailed API documentation, visit: ${apiUrl}

This documentation includes:
- Class definitions and methods
- TypeScript interfaces
- Authentication callback handlers
- Configuration options
- OAuth 2.0 and OIDC implementations
- WebAuthn support
`;
            }),
            Effect.catchAll(() => Effect.succeed(`# API Documentation\n\nAPI documentation available at ${apiUrl}`)),
          ),
        });
      }

      yield* Console.log(`Loaded ${docs.length} documentation sources`);

      // Search function
      const search = (query: string) =>
        Effect.sync(() =>
          minisearch.search(query).map((result: any) => ({
            ...docs[result.id],
            score: result.score,
          }))
        );

      // Content cache for faster retrieval
      const cache = yield* Cache.make({
        lookup: (id: number) => docs[id].content,
        capacity: 100,
        timeToLive: Duration.hours(6),
      });

      return Toolkit.of({
        ping_doc_search: Effect.fn(function*({ query }) {
          yield* Console.log(`Searching Ping SDK docs for: "${query}"`);
          const results = yield* search(query);

          return {
            results: results.slice(0, 10).map((result) => ({
              documentId: result.id,
              title: result.title,
              description: result.description,
              source: result.source,
              score: result.score,
            })),
          };
        }),

        get_ping_doc: ({ documentId }) =>
          Effect.gen(function*() {
            if (documentId < 0 || documentId >= docs.length) {
              return { content: "Document not found" };
            }

            yield* Console.log(`Retrieving document ${documentId}: ${docs[documentId].title}`);
            const content = yield* cache.get(documentId);
            return { content };
          }),
      });
    }),
  ),
  Layer.provide([
    NodeHttpClient.layerUndici,
  ]),
);

// Export the MCP Server
export const PingSDKMcpServer = McpServer.toolkit(Toolkit).pipe(
  Layer.provide(ToolkitLayer),
);

// Main server setup
McpServer.layerStdio({
  name: "ping-sdk-mcp",
  version: "1.0.0",
  stdin: NodeStream.stdin,
  stdout: NodeSink.stdout,
}).pipe(
  Layer.provide(PingSDKMcpServer),
  Layer.provide(Logger.add(Logger.prettyLogger({ stderr: true }))),
  Layer.launch,
  NodeRuntime.runMain,
);
