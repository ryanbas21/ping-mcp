[![PR Snapshot](https://pkg.pr.new/badge/OWNER/REPO)](https://pkg.pr.new/~/ryanbas21/ping-mcp)
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

## Selecting Tools

There are a lot of tools provided here. It's best to only enable the tools you need, or think you may need. We want to provide as much surface area as we can, but AI models work best when they have a specific toolset they can target and not get lost in the minutia of tools.

It's best to enable what you think you may need and leave the rest disabled, and enable it if you need it later. Remember, chat's often have tool limits of ~100 tools, so choose the ones you need here, and disable when you maybe don't need.


## API Tools

| Tool Name                   | Description                                      | Parameters (main)                       |
|-----------------------------|--------------------------------------------------|------------------------------------------|
| **Journey Tools**           |                                                  |                                          |
| list_journey                | List all journeys                                | –                                        |
| get_journey                 | Get information about a journey                  | journeyId                                |
| export_journey              | Export a journey                                 | journeyId                                |
| delete_journey              | Delete a journey                                 | journeyId                                |
| update_journey              | Update a journey                                 | journeyId, entryNodeId, nodes            |
| **User Tools**              |                                                  |                                          |
| read_user                   | Read a user by name                              | name                                     |
| list_users                  | List all users                                   | –                                        |
| **Realm Tools**             |                                                  |                                          |
| create_realm                | Create a new realm                               | name                                     |
| read_realm_by_name          | Read a realm by its name                         | name                                     |
| delete_realm                | Delete a realm                                   | realmId                                  |
| **Agent Tools**             |                                                  |                                          |
| get_agents                  | Get all agents                                   | –                                        |
| get_agent_by_type_and_id    | Get agent by type and ID                         | agentType, agentId                       |
| get_agent_groups            | Get all agent groups                             | –                                        |
| **OAuth2/OIDC Tools**       |                                                  |                                          |
| get_oauth2_clients          | List all OAuth2 clients                          | –                                        |
| get_oauth2_client           | Get OAuth2 client by ID                          | clientId                                 |
| create_oauth2_client        | Create a new OAuth2 client                       | clientId, clientData                     |
| update_oauth2_client        | Update an OAuth2 client                          | clientId, clientData                     |
| delete_oauth2_client        | Delete an OAuth2 client                          | clientId                                 |
| get_oauth2_provider         | Get OAuth2 provider config                       | –                                        |
| create_oauth2_provider      | Create OAuth2 provider config                    | providerData                             |
| delete_oauth2_provider      | Delete OAuth2 provider config                    | –                                        |
| get_trusted_jwt_issuers     | List all trusted JWT issuers                     | –                                        |
| get_trusted_jwt_issuer      | Get trusted JWT issuer by ID                     | issuerId                                 |
| create_trusted_jwt_issuer   | Create a trusted JWT issuer                      | issuerId, issuerData                     |
| update_trusted_jwt_issuer   | Update a trusted JWT issuer                      | issuerId, issuerData                     |
| delete_trusted_jwt_issuer   | Delete a trusted JWT issuer                      | issuerId                                 |
| **SAML2 Tools**             |                                                  |                                          |
| get_saml2_providers         | List all SAML2 providers                         | –                                        |
| get_saml2_provider          | Get SAML2 provider by entityId                   | entityId                                 |
| create_saml2_provider       | Create a SAML2 provider                          | entityId, providerData                   |
| update_saml2_provider       | Update a SAML2 provider                          | entityId, providerData                   |
| delete_saml2_provider       | Delete a SAML2 provider                          | entityId                                 |
| get_saml2_metadata          | Get SAML2 provider metadata                      | entityId                                 |
| export_saml2_provider       | Export a SAML2 provider                          | entityId                                 |
| import_saml2_provider       | Import a SAML2 provider                          | entityId, importData                     |
| get_circles_of_trust        | List all circles of trust                        | –                                        |
| get_circle_of_trust         | Get a circle of trust by ID                      | cotId                                    |
| create_circle_of_trust      | Create a circle of trust                         | cotId, cotData                           |
| update_circle_of_trust      | Update a circle of trust                         | cotId, cotData                           |
| delete_circle_of_trust      | Delete a circle of trust                         | cotId                                    |
| export_circle_of_trust      | Export a circle of trust                         | cotId                                    |
| import_circle_of_trust      | Import a circle of trust                         | cotId, importData                        |
| **Scripts Tools**           |                                                  |                                          |
| get_scripts                 | List all scripts                                 | –                                        |
| get_script                  | Get script by ID                                 | scriptId                                 |
| get_script_by_name          | Get script by name                               | scriptName                               |
| create_script               | Create a new script                              | scriptId, scriptName, scriptData         |
| update_script               | Update a script                                  | scriptId, scriptData                     |
| delete_script               | Delete a script by ID                            | scriptId                                 |
| delete_script_by_name       | Delete a script by name                          | scriptName                               |
| export_script               | Export a script by ID                            | scriptId, options                        |
| export_script_by_name       | Export a script by name                          | scriptName, options                      |
| export_scripts              | Export all scripts                               | options                                  |
| import_scripts              | Import scripts                                   | importData, options                      |
| get_script_types            | List all script types                            | –                                        |
| get_script_type             | Get script type by ID                            | scriptTypeId                             |
| update_script_type          | Update a script type                             | scriptTypeId, scriptTypeData             |
| **Policies Tools**          |                                                  |                                          |
| get_policies                | List all policies                                | –                                        |
| get_policies_by_policy_set  | List policies by policy set                      | policySetId                              |
| get_policy                  | Get policy by ID                                 | policyId                                 |
| create_policy               | Create a new policy                              | policyId, policyData                     |
| update_policy               | Update a policy                                  | policyId, policyData                     |
| delete_policy               | Delete a policy                                  | policyId                                 |
| export_policy               | Export a policy by ID                            | policyId, options                        |
| export_policies             | Export all policies                              | options                                  |
| export_policies_by_policy_set| Export policies by policy set                   | policySetName, options                   |
| import_policy               | Import a policy by ID                            | policyId, importData, options            |
| import_first_policy         | Import the first policy from import data         | importData, options                      |
| import_policies             | Import multiple policies                         | importData, options                      |
| get_policy_sets             | List all policy sets                             | –                                        |
| get_policy_set              | Get policy set by name                           | policySetName                            |
| create_policy_set           | Create a new policy set                          | policySetData                            |
| update_policy_set           | Update a policy set                              | policySetName, policySetData             |
| delete_policy_set           | Delete a policy set                              | policySetName                            |
| get_resource_types          | List all resource types                          | –                                        |
| get_resource_type           | Get resource type by UUID                        | resourceTypeUuid                         |
| get_resource_type_by_name   | Get resource type by name                        | resourceTypeName                         |
| create_resource_type        | Create a new resource type                       | resourceTypeData                         |
| update_resource_type        | Update a resource type                           | resourceTypeUuid, resourceTypeData       |
| delete_resource_type        | Delete a resource type                           | resourceTypeUuid                         |
| **Logs Tools**              |                                                  |                                          |
| get_logs                    | Get logs for a transaction                       | transactionId                            |
| **Device Tools**            |                                                  |                                          |
| get_webauthn_device         | Get a user's WebAuthn device                     | realm, user                              |
| **IDM Tools**               |                                                  |                                          |
| (see idm.toolkit for details)| IDM advanced operations                         | –                                        |
| **Config Tools**            |                                                  |                                          |
| generate_js_config          | Generate OAuth2 client config for JS SDK         | clientId, realm?                         |
| generate_android_config     | Generate config for Ping SDK for Android         | clientId, realm?                         |
| generate_ios_config         | Generate config for Ping SDK for iOS             | clientId, realm?                         |
