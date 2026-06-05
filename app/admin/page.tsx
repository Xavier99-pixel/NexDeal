"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import type { Product } from "@/lib/products";

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
const categories = ["earbuds", "headphones", "keyboards", "mobiles", "laptops", "tablets", "cameras", "smartwatches", "speakers", "gaming"];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [message, setMessage] = useState("Checking login...");
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);

  useEffect(() => {
    async function loadSession() {
      if (!supabase) {
        setMessage("Supabase is not configured. Add .env.local keys before using admin.");
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setMessage("Please sign in to manage NexDeal products.");
        return;
      }

      setAccessToken(data.session.access_token);
      await loadProducts(data.session.access_token);
    }

    loadSession();
  }, [supabase]);

  async function loadProducts(token = accessToken) {
    if (!token) return;

    setMessage("Loading products...");
    const response = await fetch("/api/admin/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Could not load products.");
      return;
    }

    setProducts(data.products);
    setMessage("Products loaded.");
  }

  async function saveProduct() {
    if (!accessToken) {
      setMessage("Sign in first.");
      return;
    }

    setMessage("Saving product...");
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...form,
        id: form.id || undefined,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(typeof data.error === "string" ? data.error : "Check all product fields.");
      return;
    }

    setForm(emptyProduct);
    setMessage("Product saved.");
    await loadProducts();
  }

  async function deleteProduct(id: string) {
    if (!accessToken) {
      setMessage("Sign in first.");
      return;
    }

    const response = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      const data = await response.json();
      setMessage(data.error || "Could not delete product.");
      return;
    }

    setMessage("Product deleted.");
    await loadProducts();
  }

  async function signOut() {
    await supabase?.auth.signOut();
    window.location.href = "/login";
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
            <Button variant="outline" onClick={signOut}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Creator Backend</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">Manage Affiliate Products</h1>
            <p className="mt-2 text-muted-foreground">Add Amazon, Flipkart, Myntra and other affiliate products from one dashboard.</p>
          </div>
          <Button variant="outline" onClick={() => loadProducts()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <p className="mb-6 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          {message}
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
                <SelectField label="Category" value={form.category} options={categories} onChange={(value) => updateField("category", value)} />
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
  options: string[];
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
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
