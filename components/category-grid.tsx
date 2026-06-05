"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/products";

interface CategoryGridProps {
  onCategoryClick?: (categoryId: string) => void;
}

export function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  return (
    <section id="collections" className="py-12 bg-background scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Collection</h2>
            <p className="text-muted-foreground mt-1">Top 10 Most Sold This Week, Next Day Delivery</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-accent font-medium hover:underline cursor-pointer">
              View all collections
            </span>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8 bg-primary">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick?.(category.id)}
              className="group flex flex-col items-center p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-medium text-foreground text-sm">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.itemCount} items</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
