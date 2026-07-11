"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    category: "Mobiles",
    title: "Premium phone picks",
    subtitle: "Camera, battery and value compared",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
    bgColor: "bg-red-500",
  },
  {
    id: 2,
    category: "Audio",
    title: "Sound worth checking",
    subtitle: "Earbuds, speakers and headphones",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=400&fit=crop",
    bgColor: "bg-primary",
  },
  {
    id: 3,
    category: "Work setup",
    title: "Portable productivity",
    subtitle: "Tablets and accessories that fit daily use",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop",
    bgColor: "bg-orange-400",
  },
];

export function PromoBanners() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} rounded-[28px] overflow-hidden relative h-[250px] group shadow-sm`}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <p className="text-white/80 text-xs uppercase tracking-wider mb-1">
                  {banner.category}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                  {banner.title}
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  {banner.subtitle}
                </p>
                <Button 
                  asChild
                  variant="secondary" 
                  size="sm"
                  className="w-fit rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  <a href="#collections">Explore picks</a>
                </Button>
              </div>
              
              {/* Background Image */}
              <div className="absolute right-0 bottom-0 w-2/3 h-full">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
