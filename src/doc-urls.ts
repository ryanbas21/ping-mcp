// Documentation Sources Configuration
export const pingReadmes = [
  {
    package: "@forgerock/javascript-sdk",
    title: "Ping JavaScript SDK - Main README",
    description: "Core SDK setup, installation, and basic usage examples",
    url: "https://raw.githubusercontent.com/ForgeRock/forgerock-javascript-sdk/master/README.md",
  },
  {
    package: "@forgerock/davinci-client",
    title: "Ping JavaScript SDK - Core Package README",
    description: "Detailed core package documentation with authentication flows",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/davinci-client/README.md",
  },
  {
    package: "@pingidentity/ping-protect",
    title: "Ping Protect README",
    description: "PingOne Protect integration for fraud detection and behavioral analytics",
    url: "https://raw.githubusercontent.com/ForgeRock/ping-javascript-sdk/main/packages/ping-protect/README.md",
  },
  {
    package: "@forgerock/token-vault",
    title: "Token Vault README",
    description: "Advanced token security using origin isolation and service workers",
    url: "https://raw.githubusercontent.com/ForgeRock/forgerock-javascript-sdk/master/packages/token-vault/README.md",
  },
  {
    package: "@forgerock/login-widget",
    title: "Login Widget README",
    description: "Complete authentication UI component for web applications",
    url: "https://raw.githubusercontent.com/ForgeRock/forgerock-web-login-framework/main/README.md",
  },
] as const;

export const pingSamples = [
  {
    title: "Embedded Login Sample",
    description: "Complete embedded authentication flow implementation",
    url: "https://raw.githubusercontent.com/ForgeRock/sdk-sample-apps/blob/main/javascript/embedded-login/README.md",
  },
  {
    title: "React.js Todo Sample",
    description: "React.js integration with authentication and protected routes",
    url: "https://raw.githubusercontent.com/ForgeRock/sdk-sample-apps/blob/main/javascript/reactjs-todo/README.md",
  },
  {
    title: "Angular Todo Sample",
    description: "Angular integration with Ping SDK authentication",
    url: "https://raw.githubusercontent.com/ForgeRock/sdk-sample-apps/blob/main/javascript/angular-todo/README.md",
  },
] as const;

// API Documentation URLs (based on your existing TypeDoc site)
export const apiDocUrls = [
  "https://forgerock.github.io/ping-javascript-sdk/", // Main API docs page
  // Add more specific API doc pages as needed
];

