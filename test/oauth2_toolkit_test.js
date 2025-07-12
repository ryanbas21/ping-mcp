#!/usr/bin/env node

// Simple test to verify OAuth2 toolkit implementation
const { spawn } = require('child_process');

console.log('Testing OAuth2 Toolkit Implementation...');

// Test the server startup
const server = spawn('node', ['dist/main.js'], {
  env: {
    ...process.env,
    AM_USERNAME: 'admin',
    AM_PASSWORD: 'password', 
    AM_HOST: 'localhost',
    AM_PORT: '8443',
    AM_REALM: 'alpha',
    AM_PROTOCOL: 'https',
    AM_URL: 'https://localhost:8443'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
let errorOutput = '';

server.stdout.on('data', (data) => {
  output += data.toString();
  console.log('Server output:', data.toString());
});

server.stderr.on('data', (data) => {
  errorOutput += data.toString();
  console.log('Server error:', data.toString());
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  console.log('Final output:', output);
  console.log('Final error output:', errorOutput);
  
  if (code === 0) {
    console.log('✅ OAuth2 toolkit implementation appears to be working correctly');
  } else {
    console.log('❌ OAuth2 toolkit implementation has issues');
  }
});

// Kill the server after 5 seconds
setTimeout(() => {
  server.kill();
}, 5000); 