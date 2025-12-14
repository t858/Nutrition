# 🥗 Nutrition Consultation App

A comprehensive web application for nutrition consultations, featuring real-time chat, appointment booking, health profile management, and role-based access control.

## 🌟 Features

### 👤 Patient Features
- **Health Profile Management** - Complete questionnaire with BMI calculation
- **Appointment Booking** - Schedule consultations with nutritionists
- **Real-time Chat** - Direct messaging with admin/support
- **Dashboard Overview** - Track appointments, health status, and prescriptions
- **Responsive Design** - Works seamlessly on desktop and mobile

### 👨‍⚕️ Admin Features
- **Patient Management** - View and manage patient profiles
- **Appointment Management** - Handle booking requests and schedules
- **Real-time Chat** - Communicate with patients instantly
- **Dashboard Analytics** - Monitor appointments and patient data
- **Role-based Access Control** - Secure admin-only functionality

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Backend & Database
- **Next.js API Routes** - Server-side functionality
- **Supabase** - PostgreSQL database with real-time capabilities
- **Prisma** - Database ORM and migrations
- **Better Auth** - Authentication and session management

### Real-time Features
- **Supabase Real-time** - Live chat and notifications
- **WebSocket Integration** - Instant messaging

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js 18+** - JavaScript runtime
- **npm or yarn** - Package manager
- **Git** - Version control
- **Supabase CLI** - For local development (optional)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/t858/Nutrition.git
cd pavanvalentina
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database Connection (Prisma)
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@localhost:54322/postgres"

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your_better_auth_secret

# Optional: Google OAuth
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Database Setup

#### Option A: Local Supabase (Recommended for Development)

```bash
# Start Supabase locally
npx supabase start

# Run the complete setup script (recommended)
npm run setup
```

#### Option B: Manual Setup

```bash
# Generate Prisma client
npm run db:generate

# Apply database migrations
npm run db:push

# Seed the database with default users
npm run db:seed
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 Default Login Credentials

After running `npm run setup`, you can log in with these accounts:

### 👨‍⚕️ Admin User
- **Email:** `admin@nutriwell.com`
- **Password:** `password123`
- **Role:** Admin

### 👤 Patient User
- **Email:** `patient@nutriwell.com`
- **Password:** `password123`
- **Role:** Patient

## 🏗️ Architecture Overview

### Project Structure

```
pavanvalentina/
├── app/                          # Next.js App Router
│   ├── (root)/                   # Main application pages
│   │   ├── dashboard/           # Dashboard pages for admin/patient
│   │   └── login/               # Login page
│   ├── actions/                 # Server actions
│   │   ├── appointments.ts      # Appointment management
│   │   └── questionnaires.ts    # Health profile management
│   ├── api/                     # API routes
│   │   └── auth/                # Authentication routes
│   └── components/              # React components
│       ├── admin/               # Admin-specific components
│       ├── auth/                # Authentication components
│       ├── patient/             # Patient-specific components
│       └── ui/                  # Reusable UI components
├── lib/                         # Utility libraries
│   ├── auth.ts                  # Better Auth configuration
│   ├── hooks/                   # Custom React hooks
│   ├── strapi/                  # CMS integration (optional)
│   └── supabase-server.ts       # Server-side Supabase client
├── prisma/                      # Database configuration
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Database seeding
│   └── migrations/             # Database migrations
├── supabase/                   # Supabase configuration
│   ├── migrations/             # Supabase migrations
│   └── config.toml            # Supabase local config
└── @types/                     # TypeScript type definitions
```

### Key Components

#### Authentication System (`lib/auth.ts`)
- **Better Auth** integration with Supabase
- Role-based access control (admin/patient)
- Session management and security

#### Real-time Chat (`lib/hooks/use-chat.ts`)
- Supabase real-time subscriptions
- Message sending and receiving
- Room-based chat system

#### Database Schema
```sql
-- Key tables:
- user (Better Auth)
- questionnaires (Health profiles)
- appointments (Booking system)
- chat_messages (Real-time messaging)
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run setup        # Complete database setup (recommended)
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with test data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset and reseed database

# Code Quality
npm run lint         # Run ESLint
```

## 📱 Component Architecture

### Patient Components

#### `PatientOverview`
- Dashboard summary cards
- Quick actions for booking appointments
- Health profile status indicator

#### `QuestionnaireForm`
- Multi-step health profile form
- BMI calculation and display
- Data validation and submission

#### `AppointmentBooking`
- Calendar-based appointment scheduling
- Time slot selection
- Booking confirmation

#### `PatientChat`
- Real-time messaging interface
- Message history display
- File attachment support

### Admin Components

#### `AdminDashboard`
- Patient management overview
- Appointment scheduling
- Analytics and reports

#### `AdminChat`
- Multi-patient chat management
- Message threading
- Admin support interface

### Shared Components

#### `Auth Components`
- Login modal with role detection
- Session management
- Protected route handling

#### `UI Components`
- Reusable form elements
- Loading states
- Error boundaries

## 🔐 Security Features

- **Row Level Security (RLS)** - Database-level access control
- **Server-side Validation** - All data validated on server
- **Secure Authentication** - JWT-based session management
- **Input Sanitization** - XSS protection
- **API Rate Limiting** - Prevent abuse

## 📊 Database Design

### Core Tables

#### `questionnaires`
```sql
- patient_email (unique)
- age, gender, height, weight
- medical_conditions, allergies
- dietary_preferences, goals
- activity_level, medications
- bmi (calculated)
- created_at, updated_at
```

#### `appointments`
```sql
- patient_email, patient_name
- appointment_date, appointment_time
- status (pending/confirmed/completed)
- type (consultation/follow-up)
- notes
```

#### `chat_messages`
```sql
- room_id (for grouping conversations)
- sender_id, sender_name, sender_role
- content, timestamp
- is_read (read status)
```

## 🚀 Deployment

### Environment Variables for Production

```env
# Production Supabase URLs
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# Production Database
DATABASE_URL="your-production-database-url"
DIRECT_URL="your-production-direct-url"

# Production App URL
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Secure Auth Secret
BETTER_AUTH_SECRET=your-secure-random-secret
```

### Deployment Steps

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform:**
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Self-hosted

3. **Set environment variables** in your hosting platform

4. **Run database migrations** in production:
   ```bash
   npx prisma migrate deploy
   ```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Reset and reseed database
npm run db:reset

# Check database status
npm run db:studio
```

#### Authentication Problems
- Ensure `BETTER_AUTH_SECRET` is set
- Check Supabase keys are correct
- Verify database tables exist

#### Real-time Chat Not Working
- Ensure Supabase local instance is running
- Check WebSocket connections in browser dev tools
- Verify `room_id` is consistent

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Logs and Debugging

- **Browser Console** - Client-side logs
- **Terminal** - Server-side logs
- **Supabase Dashboard** - Database queries
- **Prisma Studio** - Database inspection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the database setup guide

---

**Built with ❤️ for nutrition and wellness professionals**