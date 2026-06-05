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

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    const matchesCategory = 
      selectedCategory === null || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={handleSearch} />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Collection */}
      <CategoryGrid onCategoryClick={handleCategoryClick} />

      {/* Deals Marquee */}
      <DealsMarquee />

      <section id="affiliate-guide" className="bg-secondary/60 border-y border-border scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              Disclosure: NexDeal may earn a commission when you buy through some product links, at no extra cost to you.
            </p>
            <p className="text-sm font-medium text-primary">
              Backend ready: use Login to Admin Panel to add live affiliate products.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <FeaturedProducts 
        products={searchQuery || selectedCategory ? filteredProducts : visibleFeaturedProducts}
        title={searchQuery ? `Search: "${searchQuery}"` : selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : "Featured Collection"}
        subtitle={searchQuery || selectedCategory ? `${filteredProducts.length} products found` : "Top 10 Most Sold This Week, Next Day Delivery"}
      />

      {/* Deal of the Day */}
      <DealOfTheDay />

      {/* Promo Banners */}
      <PromoBanners />

      {/* All Products */}
      <FeaturedProducts 
        products={siteProducts.slice(5, 13)}
        title="Explore Our Products"
        subtitle="Discover amazing deals across all categories"
      />

      {/* How It Works Section */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            How Affiliate Shopping Works
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Shop from your favorite stores through our platform and enjoy the same great prices
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse Deals",
                description: "Explore our curated collection of deals from Amazon, Flipkart, Myntra & more",
              },
              {
                step: "2",
                title: "Click & Shop",
                description: "Click the Buy Now button to visit the official store page with our affiliate link",
              },
              {
                step: "3",
                title: "Save Money",
                description: "Complete your purchase at the same price while supporting us through small commissions",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
