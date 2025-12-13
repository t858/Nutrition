# Better Auth Setup Guide

This guide will help you set up better-auth with RBAC (Role-Based Access Control) for your NutriWell application.

## Prerequisites

1. **Database**: You'll need a PostgreSQL, MySQL, or SQLite database
2. **Environment Variables**: Set up your `.env` file

## Installation Steps

### 1. Install Dependencies

```bash
npm install @prisma/client prisma
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nutriwell?schema=public"
DATABASE_PROVIDER="postgresql"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-secret-key-here"
```

### 3. Initialize Prisma

```bash
npx prisma generate
npx prisma db push
```

Or if you prefer migrations:

```bash
npx prisma migrate dev --name init
```

### 4. Update Database Provider (if needed)

If you're using MySQL or SQLite instead of PostgreSQL:

1. Update `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "mysql" // or "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `lib/auth.ts`:
   ```typescript
   provider: "mysql"; // or "sqlite"
   ```

### 5. Set Up Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env` file

## RBAC Roles

The following roles are configured:

- **admin**: Full access to all features
- **patient**: Access to patient dashboard and features
- **nutritionist**: Access to nutritionist-specific features
- **guest**: Default role for unauthenticated users

## Usage

### Client-Side Authentication

```typescript
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";

// Sign in
await signIn.email({
  email: "user@example.com",
  password: "password123",
});

// Sign up
await signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});

// Sign out
await signOut();

// Get current session
const { data: session } = useSession();
```

### Server-Side Authentication

```typescript
import { auth } from "@/lib/auth";

// Get session
const session = await auth.api.getSession({
  headers: request.headers,
});
```

### Role-Based Access Control

```typescript
// Check if user has a specific role
if (session?.user?.role === "admin") {
  // Admin-only code
}

// Check if user has permission
if (session?.user?.permissions?.includes("manage_patients")) {
  // Permission-based code
}
```

## Next Steps

1. Update your layout to use the session from better-auth
2. Create middleware for protected routes
3. Add role-based route protection
4. Implement permission checks in your components

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure your database server is running
- Check database credentials

### Prisma Issues

- Run `npx prisma generate` after schema changes
- Run `npx prisma db push` to sync schema with database

### Authentication Not Working

- Check that `NEXT_PUBLIC_APP_URL` matches your app URL
- Verify API routes are accessible at `/api/auth/*`
- Check browser console for errors
