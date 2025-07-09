import { spawn } from 'child_process';
import * as console from 'console';

const mcp = spawn('node', ['dist/main.cjs'], {
  stdio: ['pipe', 'pipe', 'pipe'],
});

let requestId = 1;
let isInitialized = false;

function sendRequest(method, params = {}) {
  if (!isInitialized && method !== 'initialize') {
    console.log(`Skipping ${method} - not initialized yet`);
    return;
  }

  const request = {
    jsonrpc: '2.0',
    id: (requestId++).toString(),
    method: method,
    params: params,
  };
  console.log('Sending:', JSON.stringify(request));
  mcp.stdin.write(JSON.stringify(request) + '\n');
}

function sendNotification(method, params = {}) {
  const notification = {
    jsonrpc: '2.0',
    method: method,
    params: params,
  };
  console.log('Sending notification:', JSON.stringify(notification));
  mcp.stdin.write(JSON.stringify(notification) + '\n');
}

mcp.stdout.on('data', data => {
  console.log('Raw stdout:', data.toString());
  const lines = data
    .toString()
    .split('\n')
    .filter(line => line.trim());
  lines.forEach(line => {
    try {
      const response = JSON.parse(line);
      console.log('Parsed response:', JSON.stringify(response, null, 2));

      // Handle initialization response
      if (
        response.result &&
        response.result.protocolVersion &&
        !isInitialized
      ) {
        console.log('Initialization successful!');
        isInitialized = true;

        // Send initialized notification
        sendNotification('notifications/initialized');

        // List tools
        setTimeout(() => {
          sendRequest('tools/list');
        }, 500);

        // Test ping_doc_search tool
        setTimeout(() => {
          sendRequest('tools/call', {
            name: 'ping_doc_search',
            arguments: {
              query: 'authentication',
            },
          });
        }, 1000);

        // Test get_ping_doc tool (get document ID 0)
        setTimeout(() => {
          sendRequest('tools/call', {
            name: 'get_ping_doc',
            arguments: {
              documentId: 0,
            },
          });
        }, 1500);
      }
    } catch (e) {
      console.log('Non-JSON output:', line);
    }
  });
});

mcp.stderr.on('data', data => {
  console.error('Stderr:', data.toString());
});

mcp.on('error', error => {
  console.error('Process error:', error);
});

mcp.on('close', (code, signal) => {
  console.log(`Process closed with code ${code}, signal ${signal}`);
});

mcp.on('exit', (code, signal) => {
  console.log(`Process exited with code ${code}, signal ${signal}`);
});

// Start the protocol
console.log('Starting MCP client...');

// Wait a bit for the server to start, then initialize
setTimeout(() => {
  sendRequest('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {
      tools: {},
    },
    clientInfo: {
      name: 'test-client',
      version: '1.0.0',
    },
  });
}, 500);

// Keep the process alive longer to see all responses
setTimeout(() => {
  console.log('Terminating process...');
  mcp.kill('SIGTERM');
}, 10000);
