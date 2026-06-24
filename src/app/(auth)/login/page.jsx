"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import useAuth from "@/hooks/useAuth";
import { getDashboardPath } from "@/utils/roleRedirect";

function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace(getDashboardPath(user.role));
    }
  }, [loading, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = await login({ email, password });
      toast.success("Welcome back!");
      router.push(getDashboardPath(data.data.role));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const data = await googleLogin();
      toast.success("Signed in with Google!");
      router.push(getDashboardPath(data.data.role));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-[440px] text-center">
        <p className="text-on-surface-variant">Loading...</p>
      </main>
    );
  }

  return (
    <main className="auth-fade-in mx-auto w-full max-w-[440px]">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-[32px] font-bold leading-[1.25] tracking-tight text-primary">
          PromptGrowth
        </h1>
        <p className="text-[16px] leading-[1.5] text-on-surface-variant">
          Welcome back. Please enter your details.
        </p>
      </div>

      <div className="auth-card rounded-2xl border border-transparent bg-surface-container-lowest p-6 transition-shadow duration-300 md:p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="block text-[14px] font-medium leading-[1.4] text-on-surface-variant"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                mail
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest py-3 pl-10 pr-4 text-[16px] text-on-surface outline-none transition-colors placeholder:text-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="block text-[14px] font-medium leading-[1.4] text-on-surface-variant"
                htmlFor="password"
              >
                Password
              </label>
              <span className="cursor-not-allowed text-[12px] font-semibold leading-[1.2] text-primary opacity-60">
                Forgot Password?
              </span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                lock
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest py-3 pl-10 pr-10 text-[16px] text-on-surface outline-none transition-colors placeholder:text-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant transition-colors hover:text-on-surface-variant focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-3 text-[14px] font-medium text-on-primary shadow-sm transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{submitting ? "Logging in..." : "Login"}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="mb-4 mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-outline-variant/30" />
          <span className="text-[12px] font-semibold leading-[1.2] text-outline">or</span>
          <div className="h-px flex-1 bg-outline-variant/30" />
        </div>

        <GoogleAuthButton
          label="Sign in with Google"
          onClick={handleGoogleLogin}
          disabled={googleLoading || submitting}
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-[16px] leading-[1.5] text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[14px] font-semibold text-primary underline-offset-4 transition-all hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
