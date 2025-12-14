const fetch = require('node-fetch');

async function testAuth() {
  try {
    console.log('Testing Better Auth sign-in...');

    // First, let's try to get the session endpoint
    const sessionResponse = await fetch('http://localhost:3000/api/auth/get-session');
    console.log('Session endpoint status:', sessionResponse.status);

    if (sessionResponse.status !== 200) {
      console.log('Session endpoint failed, trying sign-in...');

      // Try to sign in with admin credentials
      const signInResponse = await fetch('http://localhost:3000/api/auth/sign-in/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@nutriwell.com',
          password: 'password123',
        }),
      });

      console.log('Sign-in status:', signInResponse.status);
      const signInData = await signInResponse.text();
      console.log('Sign-in response:', signInData);
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAuth();
