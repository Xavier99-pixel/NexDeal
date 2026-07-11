"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Chrome, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/brand-logo";
import { createBrowserSupabaseClient } from "@/lib/supabase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTarget, setRedirectTarget] = useState("/");
  const [status, setStatus] = useState("");
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const requestedRedirect = new URLSearchParams(window.location.search).get("redirect");

    if (requestedRedirect?.startsWith("/")) {
      setRedirectTarget(requestedRedirect);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabase) {
      setStatus("Supabase is not configured yet. Add your .env.local keys first.");
      return;
    }

    setStatus("Signing in...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus(error.message);
      return;
    }

    window.location.href = redirectTarget;
  };

  const handleSignup = async () => {
    if (!supabase) {
      setStatus("Supabase is not configured yet. Add your .env.local keys first.");
      return;
    }

    setStatus("Creating account...");
    const { error } = await supabase.auth.signUp({ email, password });
    setStatus(error ? error.message : "Account created. Check email if confirmation is enabled, then sign in.");
  };

  const handleOAuth = async () => {
    if (!supabase) {
      setStatus("Supabase is not configured yet. Add your .env.local keys first.");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${redirectTarget}`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl rounded-[32px] bg-white p-3 shadow-[0_28px_80px_rgba(8,31,68,0.14)]">
        <div className="grid min-h-[640px] overflow-hidden rounded-[26px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0b1f44] p-8 lg:flex">
            <Image
              src="/nexdeal-intro.png"
              alt="NexDeal intro"
              fill
              priority
              className="object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,176,0,0.28),transparent_28%),linear-gradient(135deg,rgba(11,31,68,0.98),rgba(0,87,168,0.82),rgba(230,53,22,0.32))]" />
            <BrandLogo inverted className="relative z-10" />
            <div className="relative z-10 max-w-md text-white">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
                <ShieldCheck className="h-4 w-4 text-amber-300" />
                Secure NexDeal access
              </p>
              <h2 className="text-5xl font-black leading-tight tracking-[-0.04em]">
                Your cleaner shopping workspace.
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/78">
                Sign in to keep browsing smooth today, and unlock saved picks, alerts, and personal collections as NexDeal grows.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-md">
              <BrandLogo className="mb-8 lg:hidden" />

              <div className="mb-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <h1 className="text-3xl font-black tracking-tight text-foreground">Sign in to NexDeal</h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use Google or email access. Admin controls stay private at <span className="font-semibold text-foreground">/admin</span>.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="mb-5 h-12 w-full rounded-full border-border bg-white font-semibold shadow-sm hover:bg-secondary"
                onClick={handleOAuth}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>

              <div className="mb-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold text-muted-foreground">or email</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Your email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-lg bg-white border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-lg bg-white border-border pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-lg bg-[#4f35f5] hover:bg-[#432be0] text-white font-semibold shadow-[0_10px_24px_rgba(79,53,245,0.28)]">
                  Sign In
                </Button>
              </form>

              <Button
                type="button"
                variant="ghost"
                className="mt-3 w-full"
                onClick={handleSignup}
              >
                Create account with email
              </Button>

              {status && (
                <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-sm text-muted-foreground">
                  {status}
                </p>
              )}

              <p className="text-center mt-7 text-sm text-muted-foreground">
                {"Already browsing? "}
                <Link href="/" className="text-primary font-semibold hover:underline">
                  Back to deals
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
