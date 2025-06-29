# Effect Package Template

This template provides a solid foundation for building scalable and maintainable TypeScript package with Effect.

## Running Code

   ## Usage

   Start the MCP server:

   ```sh
   pnpm start
   ```

   This will launch the server, which listens for MCP requests on stdio.

   ### Example: Search Documentation

   Send a `ping_doc_search` request:

   ```json
   {
     "tool": "ping_doc_search",
     "parameters": { "query": "authentication" }
}
```

Response:

```json
{
  "results": [
    {
      "documentId": 0,
      "title": "Ping JavaScript SDK - Main README",
      "description": "Core SDK setup, installation, and basic usage examples",
      "source": "readme",
      "score": 1.23
    },
    ...
  ]
}
```

### Example: Retrieve Document Content

Send a `get_ping_doc` request:

```json
{
  "tool": "get_ping_doc",
  "parameters": { "documentId": 0 }
}
```

Response:

```json
{
  "content": "# Ping JavaScript SDK - Main README\\n..."
}
```

**Building**

To build the package:

```sh
pnpm build
```

**Testing**

To test the package:

```sh
pnpm test
```
