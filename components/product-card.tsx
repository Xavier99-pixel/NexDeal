"use client";

import Image from "next/image";
import { Star, Eye, ShoppingCart } from "lucide-react";
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
    amazon: "bg-orange-500",
    flipkart: "bg-blue-600",
    myntra: "bg-pink-500",
    ajio: "bg-gray-900",
    meesho: "bg-pink-600",
  };

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary/30 p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.discount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs px-2 py-0.5">
              Save Rs.{(product.originalPrice - product.price).toLocaleString()}
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs px-2 py-0.5">
              New
            </Badge>
          )}
        </div>

        {/* Quick Look Button */}
        <button className="absolute top-3 right-3 z-10 bg-card/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card text-muted-foreground hover:text-foreground">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Quick look</span>
        </button>

        {/* Store Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className={`${storeColors[product.store]} text-white text-xs px-2 py-1 rounded-full capitalize`}>
            {product.store}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="absolute bottom-3 right-3 z-10 bg-primary text-primary-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/90">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Store Name */}
        <p className="text-xs text-muted-foreground capitalize mb-1">{product.store}</p>
        
        {/* Product Name */}
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 min-h-[2.5rem] text-sm">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
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
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="flex gap-1 mb-3">
          {["bg-foreground", "bg-gray-400", "bg-blue-500", "bg-red-400"].slice(0, 3).map((color, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${color} border border-border cursor-pointer hover:ring-2 ring-primary ring-offset-1`}
            />
          ))}
        </div>

        {/* Buy Button */}
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="sponsored noopener noreferrer"
          >
            Buy Now
          </a>
        </Button>
      </div>
    </div>
  );
}
