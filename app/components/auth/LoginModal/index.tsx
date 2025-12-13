"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/Dialog";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Mail, Lock, User } from "lucide-react";
import { translations } from "@/translations/Translations";
import { signIn, signUp, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import type { LoginModalProps } from "./@types";
import type { SessionWithRole } from "@/lib/auth";

// Zod schema for signup validation
const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function LoginModal({
  isOpen,
  onClose,
  language,
  initialMode = "login",
}: LoginModalProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Helper function to get role-specific dashboard URL
  const getDashboardUrl = (userRole?: string) => {
    const role =
      userRole || (session as SessionWithRole | null)?.user?.role || "patient";
    return `/dashboard/${role}`;
  };

  // Watch for session changes after login to redirect
  useEffect(() => {
    if (shouldRedirect && session?.user) {
      const role = (session as SessionWithRole | null)?.user?.role || "patient";
      const dashboardUrl = `/dashboard/${role}`;
      setShouldRedirect(false);
      window.location.href = dashboardUrl;
    }
  }, [session, shouldRedirect]);

  const langTranslations =
    translations[language as keyof typeof translations] || translations.en;
  const t = (langTranslations as any)?.login || translations.en.login;
  const signupT = (langTranslations as any)?.signup || translations.en.signup;

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      // Default to patient role for Google sign-in (will be set by defaultRole in auth config)
      const dashboardUrl = getDashboardUrl("patient");
      await signIn.social({
        provider: "google",
        callbackURL: dashboardUrl,
      });
      resetForm();
      onClose();
      // Use window.location for a full redirect to avoid 307
      window.location.href = dashboardUrl;
    } catch (err: any) {
      setError(
        err?.message ||
          (isSignUp
            ? "Failed to sign up with Google. Please try again."
            : "Failed to sign in with Google. Please try again.")
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form data with Zod
    const validationResult = signupSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      // Get the first error message
      const firstError = validationResult.error.issues[0];
      setError(firstError.message);
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp.email({
        email: validationResult.data.email,
        password: validationResult.data.password,
        name: validationResult.data.fullName,
      });

      if (result.error) {
        setError(
          result.error.message ||
            signupT.error ||
            "An error occurred. Please try again."
        );
        return;
      }

      resetForm();
      setIsSignUp(false);
      onClose();

      // Trigger redirect when session is available
      setShouldRedirect(true);
    } catch (err: any) {
      setError(
        err?.message || signupT.error || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn.email(
        {
          email,
          password,
        },
        {
          onResponse(context) {},
          onError: (ctx) => {
            console.error(ctx.error.message);
          },
          onSuccess: () => {
            console.log("Login successful!");
            router.replace("/dashboard");
          },
        }
      );

      if (result.error) {
        setError(
          result.error.message ||
            t.error ||
            "Invalid email or password. Please try again."
        );
        return;
      }

      resetForm();
      onClose();

      // Trigger redirect when session is available
      // setShouldRedirect(true);
    } catch (err: any) {
      setError(
        err?.message || t.error || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentT = isSignUp ? signupT : t;

  // Reset form when modal closes
  const handleClose = () => {
    resetForm();
    setIsSignUp(initialMode === "signup");
    onClose();
  };

  // Update isSignUp when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setIsSignUp(initialMode === "signup");
    }
  }, [isOpen, initialMode]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            {currentT.title || (isSignUp ? "Create Account" : "Sign In")}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {currentT.description ||
              (isSignUp
                ? "Sign up to get started with your health journey"
                : "Enter your credentials to access your account")}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="w-full bg-white hover:bg-gray-50 text-black font-medium py-2.5 border border-gray-300 rounded-full cursor-pointer flex items-center justify-center gap-3 transition-all"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-emerald-600 rounded-full animate-spin" />
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>
                  {isSignUp
                    ? signupT.signUpWithGoogle || "Sign up with Google"
                    : t.signInWithGoogle || "Sign in with Google"}
                </span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {currentT.orContinueWith || "Or continue with"}
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={isSignUp ? handleSignUp : handleLogin}
          className="space-y-4 mt-4"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          {isSignUp && (
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                {signupT.fullName || "Full Name"}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder={signupT.fullNamePlaceholder || "John Doe"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              {currentT.email || "Email Address"}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder={
                  currentT.emailPlaceholder || "your.email@example.com"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              {currentT.password || "Password"}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder={
                  currentT.passwordPlaceholder || "Enter your password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                {signupT.confirmPassword || "Confirm Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={
                    signupT.confirmPasswordPlaceholder ||
                    "Confirm your password"
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">
                  {t.rememberMe || "Remember me"}
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {t.forgotPassword || "Forgot password?"}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8CC63F] hover:bg-emerald-700 text-white font-medium py-2 rounded-full cursor-pointer"
          >
            {isLoading
              ? currentT.loading ||
                (isSignUp ? "Creating account..." : "Signing in...")
              : currentT.submit || (isSignUp ? "Sign Up" : "Sign In")}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp
              ? signupT.hasAccount || "Already have an account?"
              : t.noAccount || "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                resetForm();
              }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {isSignUp ? signupT.signIn || "Sign in" : t.signUp || "Sign up"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
