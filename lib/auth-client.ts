"use client";

import { createAuthClient } from "better-auth/react";
import type { Session } from "@/lib/auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  $fetch: authFetch,
} = authClient;

// Export the Session type for use in components
export type { Session };
