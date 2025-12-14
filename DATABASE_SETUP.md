# Database Setup & Authentication

This guide ensures your authentication credentials are properly set up and persist across database resets.

## 🚀 Quick Setup

Run this command to set up everything automatically:

```bash
npm run setup
```

This will:
1. Reset the Supabase database
2. Create all necessary tables (Better Auth + Application tables)
3. Seed default users
4. Generate Prisma client

## 📝 Default Login Credentials

After setup, you can log in with these accounts:

### 👤 Admin User
- **Email**: `admin@nutriwell.com`
- **Password**: `password123`
- **Role**: `admin`

### 👤 Patient User
- **Email**: `patient@nutriwell.com`
- **Password**: `password123`
- **Role**: `patient`

## 🔧 Manual Setup (if needed)

If the automatic setup fails, you can run these commands individually:

```bash
# 1. Reset Supabase database
npx supabase db reset

# 2. Create authentication tables
npm run db:setup

# 3. Generate Prisma client
npx prisma generate
```

## 🛡️ Authentication Tables

The setup creates these Better Auth tables:
- `user` - User accounts
- `account` - Authentication providers
- `session` - User sessions
- `verification` - Email verification tokens

## 📊 Application Tables

Additional application tables:
- `questionnaires` - Health profile data
- `appointments` - Appointment bookings
- `chat_messages` - Real-time chat messages

## 🔄 Keeping Credentials Persistent

The setup script ensures:
- ✅ Users are created with hashed passwords
- ✅ Roles are properly assigned
- ✅ Email verification is bypassed for development
- ✅ Accounts are linked correctly

## 🚨 Troubleshooting

### "Table does not exist" errors:
```bash
npm run db:reset
```

### Authentication not working:
```bash
npm run setup
```

### Database not running:
```bash
npx supabase start
```

### Check database status:
```bash
npx supabase status
```

## 🔐 Environment Variables

Make sure these are set in your `.env` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🎯 Development Workflow

1. **First time setup**: `npm run setup`
2. **After database changes**: `npm run db:reset`
3. **Regular development**: Just run `npm run dev`

The authentication system will now persist across restarts and database resets! 🎉
