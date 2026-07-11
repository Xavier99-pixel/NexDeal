"use client";

import Image from "next/image";
import { ExternalLink, Star, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const storeColors: Record<string, string> = {
    amazon: "bg-orange-50 text-orange-700 ring-orange-200",
    flipkart: "bg-blue-50 text-blue-700 ring-blue-200",
    myntra: "bg-pink-50 text-pink-700 ring-pink-200",
    ajio: "bg-gray-100 text-gray-800 ring-gray-200",
    meesho: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
  };

  const trackClick = () => {
    const payload = JSON.stringify({
      productId: product.id,
      productName: product.name,
      store: product.store,
      path: window.location.pathname,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      return;
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(8,31,68,0.12)]">
      <div className="relative aspect-square bg-[#f7f9fc] p-4">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.discount > 0 && (
            <Badge className="bg-[#e63516] hover:bg-[#e63516] text-white text-xs px-2 py-0.5">
              {product.discount}% off
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs px-2 py-0.5">
              New
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          <span className={`${storeColors[product.store]} inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1`}>
            <Store className="h-3 w-3" />
            {product.store}
          </span>
        </div>

        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 min-h-[2.6rem] line-clamp-2 text-sm font-bold leading-snug text-foreground">
          {product.name}
        </h3>

        <p className="mb-3 line-clamp-1 text-xs text-muted-foreground">{product.description}</p>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                }`}
              />
          ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="mb-4 flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-black text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <Button
          asChild
          className="h-10 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={trackClick}
          >
            View deal
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
