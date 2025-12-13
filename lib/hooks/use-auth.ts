"use client";

import { useSession } from "@/lib/auth-client";
import type { Role } from "@/@types/app.types";
import type { SessionWithRole } from "@/lib/auth";

export function useAuth() {
  const { data: session, isPending } = useSession();

  // Type assertion to include the role field added by customSession
  const typedSession = session as SessionWithRole | null;
  const user = typedSession?.user;
  const isAuthenticated = !!user;
  // The role is included in the session via customSession plugin in auth.ts
  const role: Role = user?.role || "patient";

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
