"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryGrid } from "@/components/category-grid";
import { DealsMarquee } from "@/components/deals-marquee";
import { FeaturedProducts } from "@/components/featured-products";
import { DealOfTheDay } from "@/components/deal-of-the-day";
import { PromoBanners } from "@/components/promo-banners";
import { Footer } from "@/components/footer";
import { products as staticProducts, featuredProducts as staticFeaturedProducts, type Product } from "@/lib/products";
import { ShieldCheck, Sparkles, Store } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [siteProducts, setSiteProducts] = useState<Product[]>(staticProducts);

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

  const featuredProducts = siteProducts.filter((product) => product.isFeatured);
  const visibleFeaturedProducts = featuredProducts.length > 0 ? featuredProducts : staticFeaturedProducts;

  const filteredProducts = siteProducts.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={handleSearch} />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Collection */}
      <CategoryGrid />

      {/* Deals Marquee */}
      <DealsMarquee />

      <section className="bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid gap-3 text-sm md:grid-cols-3">
            {[
              { icon: Sparkles, text: "Fresh picks organized by category" },
              { icon: Store, text: "Open products on trusted store pages" },
              { icon: ShieldCheck, text: "Clear price, rating and store context" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-2 font-semibold text-foreground/80">
                  <Icon className="h-4 w-4 text-primary" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <FeaturedProducts 
        products={searchQuery ? filteredProducts : visibleFeaturedProducts}
        title={searchQuery ? `Search: "${searchQuery}"` : "Trending picks"}
        subtitle={searchQuery ? `${filteredProducts.length} products found` : "Products selected for useful savings, ratings and trusted store checkout."}
      />

      {/* Deal of the Day */}
      <DealOfTheDay />

      {/* Promo Banners */}
      <PromoBanners />

      {/* All Products */}
      <FeaturedProducts 
        products={siteProducts.slice(5, 13)}
        title="More to compare"
        subtitle="Keep exploring products across every active collection."
      />

      <Footer />
    </div>
  );
}
