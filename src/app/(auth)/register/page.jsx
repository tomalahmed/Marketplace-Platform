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

const inputClassName =
  "block w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest py-3 pl-10 pr-3 text-[16px] text-on-surface outline-none transition-shadow focus:border-primary-container focus:ring-1 focus:ring-primary-container auth-input-focus";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading, register, googleLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
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
      const data = await register({
        name,
        email,
        password,
        photoURL: photoURL.trim(),
      });
      toast.success("Account created successfully!");
      router.push(getDashboardPath(data.data.role));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    try {
      const data = await googleLogin();
      toast.success("Signed up with Google!");
      router.push(getDashboardPath(data.data.role));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-[480px] text-center">
        <p className="text-on-surface-variant">Loading...</p>
      </main>
    );
  }

  return (
    <main className="auth-fade-in mx-auto w-full max-w-[480px]">
      <div className="mb-8 text-center">
        <h1 className="text-[32px] font-bold leading-[1.25] tracking-tight text-primary md:text-[48px] md:leading-[1.2]">
          PromptGrowth
        </h1>
        <p className="mt-2 text-[16px] leading-[1.5] text-on-surface-variant">
          Join the leading AI prompt marketplace.
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-[24px] border border-outline-variant/30 bg-surface-container-lowest p-8 auth-card-soft">
        <div className="mb-8 text-center">
          <h2 className="text-[24px] font-semibold leading-[1.4] text-on-surface">
            Create an Account
          </h2>
        </div>

        <GoogleAuthButton
          label="Sign up with Google"
          onClick={handleGoogleSignup}
          disabled={googleLoading || submitting}
        />

        <div className="relative mb-8 mt-8 flex items-center">
          <div className="flex-grow border-t border-outline-variant/50" />
          <span className="mx-4 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Or register with email
          </span>
          <div className="flex-grow border-t border-outline-variant/50" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-[14px] font-medium text-on-surface"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  person
                </span>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-[14px] font-medium text-on-surface"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  mail
                </span>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-[14px] font-medium text-on-surface"
              htmlFor="photo"
            >
              Photo URL (Optional)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  image
                </span>
              </div>
              <input
                id="photo"
                name="photo"
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-[14px] font-medium text-on-surface"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  lock
                </span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClassName}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 w-full rounded-xl bg-primary-container px-6 py-3 text-[14px] font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[16px] leading-[1.5] text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary-container hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary-container/5 blur-2xl transition-colors duration-500 group-hover:bg-primary-container/10" />
      </div>

      <div className="mt-8 flex justify-center gap-4 text-[12px] font-semibold text-on-surface-variant">
        <span className="cursor-not-allowed hover:text-primary">Privacy Policy</span>
        <span>•</span>
        <span className="cursor-not-allowed hover:text-primary">Terms of Service</span>
      </div>
    </main>
  );
}
