#!/usr/bin/env node

/**
 * Database Setup Script
 * Ensures all necessary tables and data are created for the application
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting database setup...\n');

try {
  // Check if we're in the right directory
  if (!fs.existsSync('prisma/schema.prisma')) {
    console.error('❌ Error: Please run this script from the project root directory');
    process.exit(1);
  }

  console.log('1. 🔄 Resetting Supabase database...');
  execSync('npx supabase db reset', { stdio: 'inherit' });

  console.log('\n2. 🏗️ Creating Better Auth tables...');
  execSync('npx tsx prisma/create-auth-tables.ts', { stdio: 'inherit' });

  console.log('\n3. 🌱 Seeding database with default users...');
  execSync('npm run db:seed', { stdio: 'inherit' });

  console.log('\n4. ✅ Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('\n5. 🧹 Cleaning up temporary files...');
  // Remove the temporary setup file
  if (fs.existsSync('prisma/create-auth-tables.ts')) {
    fs.unlinkSync('prisma/create-auth-tables.ts');
  }

  console.log('\n🎉 Database setup complete!');
  console.log('\n📝 Default login credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 Admin User:');
  console.log('   Email:    admin@nutriwell.com');
  console.log('   Password: password123');
  console.log('   Role:     admin');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 Patient User:');
  console.log('   Email:    patient@nutriwell.com');
  console.log('   Password: password123');
  console.log('   Role:     patient');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

} catch (error) {
  console.error('\n❌ Database setup failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Make sure Supabase is running: npx supabase status');
  console.log('2. Try running individual commands:');
  console.log('   - npx supabase db reset');
  console.log('   - npm run db:setup');
  console.log('3. Check if ports are available (54322 for database)');
  process.exit(1);
}
