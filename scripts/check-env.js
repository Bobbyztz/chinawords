// Simple script to check if environment variables are loaded correctly
require('dotenv').config();

console.log('Checking environment variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Defined ✅' : 'Undefined ❌');
console.log('DIRECT_URL:', process.env.DIRECT_URL ? 'Defined ✅' : 'Undefined ❌');

if (process.env.DATABASE_URL) {
  console.log('\nDATABASE_URL preview (first 20 chars):', process.env.DATABASE_URL.substring(0, 20) + '...');
}

if (process.env.DIRECT_URL) {
  console.log('DIRECT_URL preview (first 20 chars):', process.env.DIRECT_URL.substring(0, 20) + '...');
}

console.log('\nMake sure your .env file contains both DATABASE_URL and DIRECT_URL variables.');
console.log('DATABASE_URL should be your pooled Neon connection string (with -pooler in the hostname)');
console.log('DIRECT_URL should be your direct Neon connection string (without -pooler)');
