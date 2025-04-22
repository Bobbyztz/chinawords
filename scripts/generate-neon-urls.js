// Script to help generate Neon connection strings
require('dotenv').config();

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Neon Connection String Generator');
console.log('================================\n');
console.log('This script will help you generate the correct DATABASE_URL and DIRECT_URL for Neon.\n');

// Check if we already have connection strings
if (process.env.DATABASE_URL) {
  console.log('Current DATABASE_URL:', process.env.DATABASE_URL);
}

if (process.env.DIRECT_URL) {
  console.log('Current DIRECT_URL:', process.env.DIRECT_URL);
  console.log('\n');
}

// Function to generate connection strings
function generateConnectionStrings(baseUrl) {
  if (!baseUrl) {
    console.log('No base URL provided. Exiting.');
    readline.close();
    return;
  }

  // Parse the base URL
  try {
    const url = new URL(baseUrl);
    
    // Extract components
    const protocol = url.protocol;
    const username = url.username;
    const password = url.password;
    const hostname = url.hostname;
    const port = url.port;
    const database = url.pathname.replace('/', '');
    const searchParams = url.search;
    
    // Check if it's already a pooled URL
    const isPooled = hostname.includes('-pooler');
    
    // Generate the direct URL
    const directHostname = isPooled ? hostname.replace('-pooler', '') : hostname;
    const directUrl = `${protocol}//${username}:${password}@${directHostname}${port ? ':' + port : ''}/${database}${searchParams}`;
    
    // Generate the pooled URL
    const pooledHostname = isPooled ? hostname : hostname.replace(/\.([^.]+\.[^.]+\.[^.]+)$/, '-pooler.$1');
    const pooledUrl = `${protocol}//${username}:${password}@${pooledHostname}${port ? ':' + port : ''}/${database}${searchParams}`;
    
    console.log('\nGenerated Connection Strings:');
    console.log('----------------------------');
    console.log('DATABASE_URL (pooled):', pooledUrl);
    console.log('DIRECT_URL (direct):', directUrl);
    
    console.log('\nAdd these to your .env file:');
    console.log('----------------------------');
    console.log(`DATABASE_URL="${pooledUrl}"`);
    console.log(`DIRECT_URL="${directUrl}"`);
    
  } catch (error) {
    console.error('Error parsing URL:', error.message);
  }
  
  readline.close();
}

// Ask for the base URL
readline.question('\nEnter your Neon connection string: ', (baseUrl) => {
  generateConnectionStrings(baseUrl);
});
