import { AiTool } from "@effect/ai";
import { Schema } from "effect";

// Tools Schema
export const PingDocSearchTool = AiTool.make("ping_doc_search", {
  description:
    "Search across all Ping JavaScript SDK documentation including READMEs, API docs, tutorials, and samples.",
  parameters: {
    query: Schema.String,
  },
  success: Schema.Struct({
    results: Schema.Array(Schema.Struct({
      documentId: Schema.Number,
      title: Schema.String,
      description: Schema.String,
      source: Schema.String,
      score: Schema.Number,
    })),
  }),
});

export const GetPingDocTool = AiTool.make("get_ping_doc", {
  description: "Retrieve the full content of a specific Ping SDK document by ID.",
  parameters: {
    documentId: Schema.Number,
  },
  success: Schema.Struct({
    content: Schema.String,
  }),
});

