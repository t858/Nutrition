import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  // RBAC Configuration
  role: {
    enabled: true,
    roles: ["admin", "patient"],
    defaultRole: "patient",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  plugins: [
    customSession(async ({ user, session }) => {
      // Fetch the user's role from the database
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });

      return {
        user: {
          ...user,
          role: dbUser?.role || "patient", // Include role in session user object
        },
        session,
      };
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;

// Extended session type that includes the role field from customSession
export type SessionWithRole = Session & {
  user: Session["user"] & {
    role: "admin" | "patient";
  };
};
