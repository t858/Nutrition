"use client";

import { useSession } from "@/lib/auth-client";
import type { Role } from "@/@types/app.types";

export function useAuth() {
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const isAuthenticated = !!user;

  // Determine role based on email for default users
  let role: Role = "patient";
  if (user?.email) {
    if (user.email === "admin@nutriwell.com") {
      role = "admin";
    } else if (user.email === "patient@nutriwell.com") {
      role = "patient";
    }
    // For other users, you could fetch from database here
  }

  const hasRole = (requiredRole: Role | Role[]) => {
    if (!isAuthenticated) return false;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(role);
  };

  const isAdmin = hasRole("admin");
  const isPatient = hasRole("patient");

  return {
    user,
    session,
    isAuthenticated,
    role,
    hasRole,
    isAdmin,
    isPatient,
    isLoading: isPending,
  };
}
