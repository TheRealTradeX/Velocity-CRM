import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login – Velocity Funds",
  description: "Secure login for Velocity Funds traders and admins.",
};

export default function LoginPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
