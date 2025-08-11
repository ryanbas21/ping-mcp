# Ping Identity MCP Server

This is an initial start of an MCP server for the Ping Identity / ForgeRock SDK packages.

The MCP provides resources which source documentation from Github for packages.

Tools are under development

## Installation

```
npm install ... [package not published yet]
```

```json
{
  "ping-mcp": {
    "type": "stdio",
    "command": "npx",
    "args": ["ping-mcp", "-y"],
    "env": {
      "AM_USERNAME": "",
      "AM_PASSWORD": "",
      "AM_URL": "",
      "IDM_URL": "",

      // required for log api's
      "LOGS_API_URL": "",
      "LOGS_API_KEY": "",
      "LOGS_API_SECRET": ""
    }
  }
}
```

## API (Still in progress, not fully functional)

| Tool Name               | Description                                | Parameters                    |
| ----------------------- | ------------------------------------------ | ----------------------------- |
| generate_js_config      | Generate OAuth2 client config for JS SDK   | clientId, realm?              |
| generate_android_config | Generate config for Ping SDK for Android   | clientId, realm?              |
| generate_ios_config     | Generate config for Ping SDK for iOS       | clientId, realm?              |
| list_journey            | List all journeys (OAuth apps for PingOne) | –                             |
| get_journey             | Get information about a journey            | journeyId                     |
| export_journey          | Export a journey                           | journeyId                     |
| delete_journey          | Delete a journey                           | journeyId                     |
| update_journey          | Update a journey                           | journeyId, entryNodeId, nodes |
| get_webauthn_device     | Get a user's WebAuthn device               | realm, user                   |
| create_user             | Create a new user                          | email, password, username     |
| create_realm            | Create a new realm                         | name                          |
| read_realm_by_name      | Read a realm by its name                   | name                          |
| read_users              | Read a user by name                        | name                          |
| get_logs                | Get logs for a transaction                 | transactionId                 |
