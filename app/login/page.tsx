"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Apple, Chrome, Eye, EyeOff, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/brand-logo";
import { createBrowserSupabaseClient } from "@/lib/supabase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const supabase = createBrowserSupabaseClient();

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

    window.location.href = "/admin";
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

  const handleOAuth = async (provider: "google" | "apple") => {
    if (!supabase) {
      setStatus("Supabase is not configured yet. Add your .env.local keys first.");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f1ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl rounded-[28px] bg-white p-3 shadow-[0_24px_70px_rgba(58,45,130,0.18)]">
        <div className="grid min-h-[620px] lg:grid-cols-[1.05fr_0.95fr] overflow-hidden rounded-[22px]">
          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#e8e1ff] p-8">
            <Image
              src="/nexdeal-intro.png"
              alt="NexDeal intro"
              fill
              priority
              className="object-cover object-center opacity-35"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.85),transparent_30%),linear-gradient(135deg,rgba(18,73,145,0.95),rgba(84,46,220,0.74),rgba(255,132,24,0.42))]" />
            <BrandLogo inverted className="relative z-10" />
            <div className="relative z-10 max-w-md text-white">
              <p className="mb-3 text-sm text-white/80">You can easily</p>
              <h2 className="text-4xl font-bold leading-tight">
                Save smarter with your personal deal hub
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/78">
                Sign in to save favorite products, track niches, and manage future affiliate alerts.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-md">
              <BrandLogo className="mb-8 lg:hidden" />

              <div className="mb-7">
                <Sparkles className="mb-3 h-7 w-7 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">Create an account</h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Access saved products, wishlist deals, and future price alerts from one clean dashboard.
                </p>
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

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-muted-foreground text-xs">or continue with</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Google", icon: Chrome, provider: "google" as const },
                  { name: "Apple", icon: Apple, provider: "apple" as const },
                  { name: "Gmail", icon: Mail, provider: null },
                ].map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <Button
                      key={provider.name}
                      type="button"
                      variant="outline"
                      className="h-12 rounded-lg border-border bg-[#f4f4f7] hover:bg-secondary"
                      aria-label={`Continue with ${provider.name}`}
                      onClick={() => provider.provider && handleOAuth(provider.provider)}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  );
                })}
              </div>

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
