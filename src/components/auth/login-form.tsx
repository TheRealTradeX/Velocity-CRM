"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (!password.trim()) nextErrors.password = "Password is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    console.log("Login attempt:", { email, password });
    toast.success("Signed in successfully (demo)", {
      description: "Auth not wired yet; this is a placeholder action.",
    });
  };

  return (
    <Card className="w-full border-border/60 bg-card/50 shadow-lg">
      <CardHeader className="space-y-3">
        <div className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Velocity</div>
        <CardTitle className="text-2xl">Velocity Funds Portal</CardTitle>
        <CardDescription className="text-base">Sign in to access your dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@velocityfunds.io"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="text-destructive text-xs">{errors.email}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? <p className="text-destructive text-xs">{errors.password}</p> : null}
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Having trouble? Contact <span className="text-foreground font-medium">support@velocityfunds.io</span>
        </p>
      </CardContent>
    </Card>
  );
}
