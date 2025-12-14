import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.NODE_ENV === "production",
  },
});

export type Session = typeof auth.$Infer.Session;
