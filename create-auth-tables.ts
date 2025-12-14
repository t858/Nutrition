import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createAuthTables() {
  console.log("🔧 Creating Better Auth tables...");

  try {
    // Create enum if it doesn't exist
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "UserRole" AS ENUM ('admin', 'patient');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create user table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "emailVerified" BOOLEAN NOT NULL DEFAULT false,
        "name" TEXT,
        "image" TEXT,
        "role" "UserRole" NOT NULL DEFAULT 'patient',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "user_pkey" PRIMARY KEY ("id")
      );
    `);

    // Create account table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "account" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "accountId" TEXT NOT NULL,
        "providerId" TEXT NOT NULL,
        "accessToken" TEXT,
        "refreshToken" TEXT,
        "idToken" TEXT,
        "accessTokenExpiresAt" TIMESTAMP(3),
        "refreshTokenExpiresAt" TIMESTAMP(3),
        "scope" TEXT,
        "password" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "account_pkey" PRIMARY KEY ("id")
      );
    `);

    // Create session table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "session" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "token" TEXT NOT NULL,
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "session_pkey" PRIMARY KEY ("id")
      );
    `);

    // Create verification table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "verification" (
        "id" TEXT NOT NULL,
        "identifier" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
      );
    `);

    // Create permission table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "permission" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "role" "UserRole" NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
      );
    `);

    // Create _PermissionToUser table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "_PermissionToUser" (
        "A" TEXT NOT NULL,
        "B" TEXT NOT NULL,
        CONSTRAINT "_PermissionToUser_AB_pkey" PRIMARY KEY ("A","B")
      );
    `);

    // Create indexes
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "user_email_key" ON "user"("email");`);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "account_providerId_accountId_key" ON "account"("providerId", "accountId");`);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "session_token_key" ON "session"("token");`);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "verification_identifier_value_key" ON "verification"("identifier", "value");`);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "permission_name_key" ON "permission"("name");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "_PermissionToUser_B_index" ON "_PermissionToUser"("B");`);

    // Add foreign keys
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;`);
    } catch (e: any) {
      if (!e.message?.includes("already exists")) console.warn("FK account_userId:", e.message);
    }

    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;`);
    } catch (e: any) {
      if (!e.message?.includes("already exists")) console.warn("FK session_userId:", e.message);
    }

    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;`);
    } catch (e: any) {
      if (!e.message?.includes("already exists")) console.warn("FK _PermissionToUser_A:", e.message);
    }

    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;`);
    } catch (e: any) {
      if (!e.message?.includes("already exists")) console.warn("FK _PermissionToUser_B:", e.message);
    }

    console.log("✅ Better Auth tables created successfully!");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAuthTables();
