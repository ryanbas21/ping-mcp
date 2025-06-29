// Documentation Sources Configuration
export const pingReadmes = [
  /** Client facing packages **/
  {
    package: "@forgerock/javascript-sdk",
    title: "ForgeRock JavaScript SDK - Main README",
    description: "Core SDK setup, installation, and basic usage examples",
    url: "https://raw.githubusercontent.com/ForgeRock/forgerock-javascript-sdk/master/packages/javascript-sdk/README.md",
  },
  {
    package: "@forgerock/davinci-client",
    title: "Ping JavaScript SDK - Core Package README",
    description: "Detailed core package documentation with authentication flows",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/davinci-client/README.md",
  },
  {
    package: "@pingidentity/device-client",
    title : "Ping Identity Device Client",
    description: "Ping Identity device client documentation",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/device-client/README.md"
  },
  {
    package: "@pingidentity/ping-protect",
    title: "Ping Protect README",
    description: "PingOne Protect integration for fraud detection and behavioral analytics",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/protect/README.md",
  },
  {
    package: "@forgerock/login-widget",
    title: "Login Widget README",
    description: "Complete authentication UI component for web applications",
    url: "https://raw.githubusercontent.com/ForgeRock/forgerock-web-login-framework/main/README.md",
  },

  /** SDK Effects **/ 
  {
    package: "@forgerock/oidc",
    title: "OIDC README",
    description: "OIDC utiltiies package",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/sdk-effects/oidc/README.md",
  },
  {
    package: "@forgerock/sdk-logger",
    title: "SDK Logger README",
    description: "SDK Logger docs",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/sdk-effects/logger/README.md"
  },
  {
    package: "@forgerock/sdk-storage",
    title: "SDK Storage README",
    description: "SDK storage README",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/sdk-effects/storage/README.md"
  },
  {
    package: "@forgerock/iframe-manager",
    title: "SDK Utilities README",
    description: "SDK Utilities readme information",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/sdk-effects/iframe-manager/README.md"
  },
  {
    package: "@forgerock/token-vault",
    title: "Token Vault README",
    description: "Advanced token security using origin isolation and service workers",
    url: "https://raw.githubusercontent.com/ForgeRock/forgerock-javascript-sdk/master/packages/token-vault/README.md",
  },
  /** Utilities**/
  {
    package: "@forgerock/sdk-request-middleware",
    title: "sdk-request-middleware README",
    description: "SDK Utilities readme information",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/sdk-effects/sdk-request-middleware/README.md",
  },
  {
    package: "@forgerock/sdk-utilities",
    title: "SDK Utilities README",
    description: "SDK Utilities readme information",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/sdk-utilities/README.md",
  }

  ] as const;

export const pingSamples = [
  {
    title: "Embedded Login Sample",
    description: "Complete embedded authentication flow implementation",
    url: "https://raw.githubusercontent.com/ForgeRock/sdk-sample-apps/main/javascript/embedded-login/README.md",
  },
  {
    title: "React.js Todo Sample",
    description: "React.js integration with authentication and protected routes",
    url: "https://raw.githubusercontent.com/ForgeRock/sdk-sample-apps/main/javascript/reactjs-todo/README.md",
  },
  {
    title: "Angular Todo Sample",
    description: "Angular integration with Ping SDK authentication",
    url: "https://raw.githubusercontent.com/ForgeRock/sdk-sample-apps/main/javascript/angular-todo/README.md",
  },
] as const;

// API Documentation URLs
export const apiDocUrls = [
  "https://forgerock.github.io/ping-javascript-sdk/", // Main API docs page
];
