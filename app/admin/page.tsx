"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { BarChart3, KeyRound, MousePointerClick, PackageSearch, Plus, RefreshCw, Save, Star, Trash2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { adminCategoryOptions, type Product } from "@/lib/products";

const emptyProduct: Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  originalPrice: 0,
  discount: 0,
  image: "",
  category: "laptops",
  store: "amazon",
  affiliateLink: "",
  rating: 4.5,
  reviews: 0,
  isNew: false,
  isFeatured: false,
};

const stores: Product["store"][] = ["amazon", "flipkart", "myntra", "ajio", "meesho"];
const adminPasskeyStorageKey = "nexdeal_admin_passkey";

interface AdminMetrics {
  analyticsReady: boolean;
  totalProducts: number;
  featuredProducts: number;
  totalClicks: number;
  todayClicks: number;
  last7DaysClicks: number;
  topProducts: { name: string; clicks: number }[];
  storeClicks: { store: string; clicks: number }[];
  trend: { date: string; clicks: number }[];
  setupHint?: string;
}

function createEmptyTrend() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return {
      date: date.toISOString().slice(0, 10),
      clicks: 0,
    };
  });
}

const emptyMetrics: AdminMetrics = {
  analyticsReady: true,
  totalProducts: 0,
  featuredProducts: 0,
  totalClicks: 0,
  todayClicks: 0,
  last7DaysClicks: 0,
  topProducts: [],
  storeClicks: [],
  trend: createEmptyTrend(),
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [metrics, setMetrics] = useState<AdminMetrics>(emptyMetrics);
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [adminPasskey, setAdminPasskey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState("Enter your admin passkey to continue.");

  useEffect(() => {
    const savedPasskey = window.localStorage.getItem(adminPasskeyStorageKey);

    if (savedPasskey) {
      setAdminPasskey(savedPasskey);
      setAdminKey(savedPasskey);
      loadProducts(savedPasskey);
    }
  }, []);

  async function unlockAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanPasskey = adminPasskey.trim();

    if (!cleanPasskey) {
      setMessage("Paste your admin passkey first.");
      return;
    }

    setMessage("Checking passkey...");
    const ok = await loadProducts(cleanPasskey);

    if (ok) {
      window.localStorage.setItem(adminPasskeyStorageKey, cleanPasskey);
      setAdminKey(cleanPasskey);
      setIsUnlocked(true);
      setMessage("Admin unlocked.");
    }
  }

  async function loadProducts(passkey = adminKey) {
    if (!passkey) {
      setMessage("Enter your admin passkey first.");
      return false;
    }

    setMessage("Loading products...");
    const response = await fetch("/api/admin/products", {
      headers: { Authorization: `Bearer ${passkey}` },
    });
    const data = await response.json();

    if (!response.ok) {
      window.localStorage.removeItem(adminPasskeyStorageKey);
      setIsUnlocked(false);
      setAdminKey(null);
      setMessage([data.error, data.reason].filter(Boolean).join(" - ") || "Could not load products.");
      return false;
    }

    setProducts(data.products);
    setIsUnlocked(true);
    setMessage("Products loaded.");
    await loadMetrics(passkey);
    return true;
  }

  async function loadMetrics(passkey = adminKey) {
    if (!passkey) return;

    const response = await fetch("/api/admin/metrics", {
      headers: { Authorization: `Bearer ${passkey}` },
    });
    const data = await response.json();

    if (!response.ok) {
      setMetrics(emptyMetrics);
      return;
    }

    setMetrics(data);
  }

  async function saveProduct() {
    if (!adminKey) {
      setMessage("Unlock admin first.");
      return;
    }

    setMessage("Saving product...");
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify({
        ...form,
        id: form.id || undefined,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(
        [
          typeof data.error === "string" ? data.error : "Check all product fields.",
          data.reason,
        ]
          .filter(Boolean)
          .join(" - ")
      );
      return;
    }

    setForm(emptyProduct);
    setMessage("Product saved.");
    await loadProducts();
  }

  async function deleteProduct(id: string) {
    if (!adminKey) {
      setMessage("Unlock admin first.");
      return;
    }

    const response = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminKey}` },
    });

    if (!response.ok) {
      const data = await response.json();
      setMessage([data.error, data.reason].filter(Boolean).join(" - ") || "Could not delete product.");
      return;
    }

    setMessage("Product deleted.");
    await loadProducts();
  }

  function lockAdmin() {
    window.localStorage.removeItem(adminPasskeyStorageKey);
    setAdminPasskey("");
    setAdminKey(null);
    setIsUnlocked(false);
    setProducts([]);
    setMetrics(emptyMetrics);
    setMessage("Admin locked.");
  }

  function updateField<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <BrandLogo />
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/">View Site</Link>
            </Button>
            {isUnlocked && <Button variant="outline" onClick={lockAdmin}>Lock Admin</Button>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Private NexDeal Backend</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">Manage products and performance</h1>
            <p className="mt-2 text-muted-foreground">Unlock with your admin passkey to add products and review click trends.</p>
          </div>
          <div className="flex gap-2">
            {isUnlocked && (
              <Button variant="outline" onClick={() => loadProducts()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            )}
          </div>
        </div>

        <p className="mb-6 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          {message}
        </p>

        {!isUnlocked ? (
          <section className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <KeyRound className="h-7 w-7" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Admin passkey</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">Unlock NexDeal backend</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Paste the private `ADMIN_PASSKEY` from Render environment variables. No Google login, email login, or public account is required for admin.
            </p>
            <form onSubmit={unlockAdmin} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-passkey">Admin passkey</Label>
                <Input
                  id="admin-passkey"
                  type="password"
                  value={adminPasskey}
                  onChange={(event) => setAdminPasskey(event.target.value)}
                  placeholder="Paste ADMIN_PASSKEY"
                  autoComplete="current-password"
                  className="h-12"
                />
              </div>
              <Button className="h-12 w-full rounded-full" type="submit">
                <KeyRound className="mr-2 h-4 w-4" />
                Unlock Admin
              </Button>
            </form>
          </section>
        ) : (
          <>
        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <MetricCard
            icon={PackageSearch}
            label="Live Products"
            value={metrics.totalProducts || products.length}
            detail="Products in Supabase"
          />
          <MetricCard
            icon={Star}
            label="Featured"
            value={metrics.featuredProducts || products.filter((product) => product.isFeatured).length}
            detail="Shown in top sections"
          />
          <MetricCard
            icon={MousePointerClick}
            label="Buy Clicks"
            value={metrics.totalClicks}
            detail="Outbound store opens"
          />
          <MetricCard
            icon={TrendingUp}
            label="Today"
            value={metrics.todayClicks}
            detail={`${metrics.last7DaysClicks} in last 7 days`}
          />
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Trend Watch</p>
                <h2 className="text-lg font-bold text-foreground">Last 7 days click activity</h2>
              </div>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex h-40 items-end gap-3">
              {(metrics.trend.length ? metrics.trend : emptyMetrics.trend).map((day) => {
                const maxClicks = Math.max(...(metrics.trend.length ? metrics.trend : [{ clicks: 1 }]).map((item) => item.clicks), 1);
                const height = Math.max((day.clicks / maxClicks) * 100, day.clicks > 0 ? 12 : 4);

                return (
                  <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-28 w-full items-end rounded-full bg-secondary">
                      <div
                        className="w-full rounded-full bg-primary transition-all"
                        style={{ height: `${height}%` }}
                        aria-label={`${day.clicks} clicks on ${day.date}`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      {new Date(day.date).toLocaleDateString("en-IN", { weekday: "short" })}
                    </span>
                  </div>
                );
              })}
            </div>
            {!metrics.analyticsReady && (
              <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {metrics.setupHint}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-5">
              <p className="text-sm font-medium text-primary">Top products</p>
              <h2 className="text-lg font-bold text-foreground">Most opened store links</h2>
            </div>
            <div className="space-y-4">
              {metrics.topProducts.length === 0 && (
                <p className="text-sm text-muted-foreground">No click data yet. Open a public product link once to test tracking.</p>
              )}
              {metrics.topProducts.map((product) => (
                <ProgressRow key={product.name} label={product.name} value={product.clicks} max={metrics.topProducts[0]?.clicks ?? 1} />
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <p className="mb-3 text-sm font-semibold text-foreground">Store split</p>
              <div className="space-y-3">
                {metrics.storeClicks.length === 0 && (
                  <p className="text-sm text-muted-foreground">Store split appears after clicks.</p>
                )}
                {metrics.storeClicks.map((store) => (
                  <ProgressRow key={store.store} label={store.store} value={store.clicks} max={metrics.storeClicks[0]?.clicks ?? 1} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <p className="mb-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Buy clicks mean shoppers opened a store product page from NexDeal. Confirm real orders and commissions inside Amazon Associates, Flipkart, Myntra, or the respective affiliate network dashboard.
        </p>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Product Form</h2>
              <Button variant="ghost" size="sm" onClick={() => setForm(emptyProduct)}>
                <Plus className="mr-2 h-4 w-4" />
                New
              </Button>
            </div>

            <div className="space-y-4">
              <Field label="Name" value={form.name} onChange={(value) => updateField("name", value)} />
              <Field label="Description" value={form.description} onChange={(value) => updateField("description", value)} />
              <Field label="Image URL" value={form.image} onChange={(value) => updateField("image", value)} />
              <Field label="Affiliate Link" value={form.affiliateLink} onChange={(value) => updateField("affiliateLink", value)} />

              <div className="grid grid-cols-2 gap-3">
                <Field label="Price" type="number" value={String(form.price)} onChange={(value) => updateField("price", Number(value))} />
                <Field label="Original Price" type="number" value={String(form.originalPrice)} onChange={(value) => updateField("originalPrice", Number(value))} />
                <Field label="Discount %" type="number" value={String(form.discount)} onChange={(value) => updateField("discount", Number(value))} />
                <Field label="Reviews" type="number" value={String(form.reviews)} onChange={(value) => updateField("reviews", Number(value))} />
                <Field label="Rating" type="number" value={String(form.rating)} onChange={(value) => updateField("rating", Number(value))} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Store" value={form.store} options={stores} onChange={(value) => updateField("store", value as Product["store"])} />
                <SelectField label="Category" value={form.category} options={adminCategoryOptions} onChange={(value) => updateField("category", value)} />
              </div>

              <div className="flex gap-5">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={Boolean(form.isFeatured)} onCheckedChange={(checked) => updateField("isFeatured", Boolean(checked))} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={Boolean(form.isNew)} onCheckedChange={(checked) => updateField("isNew", Boolean(checked))} />
                  New
                </label>
              </div>

              <Button className="w-full" onClick={saveProduct}>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </Button>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-5 font-semibold text-foreground">Database Products</h2>
            <div className="space-y-3">
              {products.length === 0 && (
                <p className="text-sm text-muted-foreground">No database products yet. Add your first affiliate product from the form.</p>
              )}

              {products.map((product) => (
                <div key={product.id} className="flex flex-col gap-3 rounded-lg border border-border p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{product.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{product.store} · {product.category} · Rs.{product.price.toLocaleString("en-IN")}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{product.affiliateLink}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setForm(product)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
          </>
        )}
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<string | { value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
      >
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;

          return (
          <option key={value} value={value}>
            {label}
          </option>
        );
        })}
      </select>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      </div>
      <p className="mt-5 text-3xl font-black text-foreground">{value.toLocaleString("en-IN")}</p>
      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const width = Math.max((value / Math.max(max, 1)) * 100, 8);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
        <span className="line-clamp-1 font-medium capitalize text-foreground">{label}</span>
        <span className="font-bold text-primary">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
