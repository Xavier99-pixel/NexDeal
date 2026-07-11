"use client";

import Image from "next/image";
import { categories } from "@/lib/products";

interface CategoryGridProps {
  onCategoryClick?: (categoryId: string) => void;
}

export function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  return (
    <section id="collections" className="py-12 bg-background scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b77800]">Shop by interest</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground md:text-4xl">Browse popular categories</h2>
            <p className="mt-2 text-muted-foreground">Pick a niche and instantly narrow the product wall.</p>
          </div>
          <p className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-muted-foreground">
            {categories.length}+ live collections
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick?.(category.id)}
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-2xl bg-[#f6f8fb] p-2 md:h-24 md:w-24">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-foreground text-sm">{category.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{category.itemCount} picks</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
