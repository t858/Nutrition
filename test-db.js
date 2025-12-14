require('dotenv').config();
console.log('Environment variables loaded');
console.log('Database URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);
console.log('Auth Secret:', process.env.BETTER_AUTH_SECRET ? 'SET (' + process.env.BETTER_AUTH_SECRET.length + ' chars)' : 'NOT SET');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDB() {
  try {
    console.log('Testing database connection...');
    const users = await prisma.user.findMany();
    console.log('Users found:', users.length);
    users.forEach(user => {
      console.log(' -', user.email, user.role);
    });

    const accounts = await prisma.account.findMany();
    console.log('Accounts found:', accounts.length);
    accounts.forEach(account => {
      console.log(' - Provider:', account.providerId, 'Password:', account.password ? 'SET' : 'NOT SET');
    });

    await prisma.$disconnect();
    console.log('Database test completed successfully');
  } catch (error) {
    console.error('Database error:', error.message);
    console.error('Full error:', error);
  }
}

testDB();
