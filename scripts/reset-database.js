#!/usr/bin/env node

/**
 * Database Reset Script
 *
 * This script resets the game database by deleting all records.
 *
 * Usage:
 *   node scripts/reset-database.js
 *
 * Or add to package.json scripts:
 *   npm run reset-db
 */

const readline = require('readline');

// Check for DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL environment variable is not set');
  console.error('\nPlease set DATABASE_URL in your .env.local file or environment variables.');
  console.error('Example: DATABASE_URL=postgres://[user]:[password]@[host]/[database]');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🗑️  Database Reset Script');
console.log('=' .repeat(50));
console.log('\n⚠️  WARNING: This will DELETE ALL game data!');
console.log('\nThis includes:');
console.log('  • All game sessions');
console.log('  • Player statistics');
console.log('  • Historical records');
console.log('  • Reward codes');
console.log('\n💥 This action CANNOT be undone!\n');

rl.question('Are you sure you want to continue? (type "yes" to confirm): ', async (answer) => {
  if (answer.toLowerCase() !== 'yes') {
    console.log('\n❌ Reset cancelled.');
    rl.close();
    process.exit(0);
  }

  console.log('\n🔄 Connecting to database...');

  try {
    // Dynamically import the ES module
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    // Get count before deletion
    console.log('📊 Counting existing records...');
    const beforeCount = await sql`SELECT COUNT(*) as count FROM game_sessions`;
    const recordCount = parseInt(beforeCount[0]?.count || 0);

    console.log(`\n📦 Found ${recordCount} records`);

    if (recordCount === 0) {
      console.log('\n✅ Database is already empty. Nothing to reset.');
      rl.close();
      process.exit(0);
    }

    // Confirm one more time
    rl.question(`\nType "DELETE ${recordCount}" to confirm deletion: `, async (confirmAnswer) => {
      if (confirmAnswer !== `DELETE ${recordCount}`) {
        console.log('\n❌ Confirmation failed. Reset cancelled.');
        rl.close();
        process.exit(0);
      }

      try {
        console.log('\n🗑️  Deleting all records...');
        await sql`TRUNCATE TABLE game_sessions RESTART IDENTITY CASCADE`;

        console.log('🔄 Resetting auto-increment counter...');
        await sql`ALTER SEQUENCE game_sessions_id_seq RESTART WITH 1`;

        console.log('\n✅ Database reset successfully!');
        console.log(`   Deleted ${recordCount} records`);
        console.log('   Auto-increment counter reset to 1');
        console.log('\n🎉 Database is now clean and ready for new data!\n');

        rl.close();
        process.exit(0);
      } catch (error) {
        console.error('\n❌ Error during reset:', error.message);
        rl.close();
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('\n❌ Database connection error:', error.message);
    console.error('\nPlease check:');
    console.error('  1. DATABASE_URL is correctly set');
    console.error('  2. Database is accessible');
    console.error('  3. Table "game_sessions" exists (run npm run init-db first)');
    rl.close();
    process.exit(1);
  }
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n❌ Reset cancelled by user.');
  rl.close();
  process.exit(0);
});
