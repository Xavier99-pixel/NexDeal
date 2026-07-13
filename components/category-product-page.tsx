"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import {
  catalogCategories,
  fashionCategories,
  formatCategoryName,
  getCategoryById,
  products as staticProducts,
  type Product,
} from "@/lib/products";

interface CategoryProductPageProps {
  categoryId: string;
}

export function CategoryProductPage({ categoryId }: CategoryProductPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [siteProducts, setSiteProducts] = useState<Product[]>(staticProducts);
  const category = getCategoryById(categoryId);
  const title = category?.name ?? formatCategoryName(categoryId);
  const relatedCategories = category?.audience
    ? fashionCategories.filter((item) => item.audience === category.audience && item.id !== category.id)
    : catalogCategories.filter((item) => !item.audience && item.id !== categoryId).slice(0, 5);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (Array.isArray(data.products) && data.products.length > 0) {
        setSiteProducts(data.products);
      }
    }

    loadProducts().catch(() => setSiteProducts(staticProducts));
  }, []);

  const categoryProducts = useMemo(() => {
    return siteProducts.filter((product) => {
      const matchesCategory = product.category === categoryId;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [categoryId, searchQuery, siteProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main>
        <section className="relative overflow-hidden bg-[#0b1f44] text-white">
          <div className="absolute inset-0">
            {category?.image && (
              <Image
                src={category.image}
                alt=""
                fill
                priority
                className="object-cover opacity-22"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,68,0.96),rgba(11,31,68,0.76),rgba(11,31,68,0.42))]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
            <Link href={category?.audience ? `/fashion/${category.audience}` : "/"} className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              {category?.audience ? `Back to ${category.audience === "men" ? "Men" : "Women"} fashion` : "Back to home"}
            </Link>
            <div className="mt-8 max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-amber-200">
                <Sparkles className="h-4 w-4" />
                Category collection
              </p>
              <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] md:text-7xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                {category?.description ?? "A focused NexDeal collection with products you add from the private admin panel."}
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4">
            <span className="text-sm font-bold text-muted-foreground">Related:</span>
            {relatedCategories.map((item) => (
              <Link
                key={item.id}
                href={item.href ?? `/category/${item.id}`}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
              >
                {item.name}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Products in this category</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">{title} picks</h2>
              <p className="mt-2 text-muted-foreground">
                {searchQuery ? `Showing results for "${searchQuery}" inside ${title}.` : "Products shown here are controlled from /admin by category slug."}
              </p>
            </div>
            <span className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-muted-foreground">
              {categoryProducts.length} products
            </span>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-white p-10 text-center">
              <p className="text-xl font-bold text-foreground">No products in this category yet.</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Open `/admin`, choose category slug <span className="font-bold text-foreground">{categoryId}</span>, save products, and they will appear here without redeploying.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
