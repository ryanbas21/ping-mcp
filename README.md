# Ping Identity MCP Server

This is an initial start of an MCP server for the Ping Identity / ForgeRock SDK packages.

The MCP provides resources which source documentation from Github for packages.

Tools are under development

## Installation

```
npm install ... [package not published yet]
```

```sh
"ping-mcp": {
        "type": "stdio",
        "command": "npx",
        "args": [
          "ping-mcp",
          "-y"
        ],
        "env": {
          "AM_USERNAME" : "username",
          "AM_PASSWORD": "password",
          "AM_URL": "am_url"
        }
    }
```
