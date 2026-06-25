import AuthBackButton from "@/components/auth/AuthBackButton";

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4 antialiased md:p-10">
      <AuthBackButton />
      {children}
    </div>
  );
}
