"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { dealOfTheDay } from "@/lib/products";

export function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    days: 73,
    hours: 12,
    mins: 43,
    secs: 28,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs } = prev;
        
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const trackClick = (product: (typeof dealOfTheDay)[number]) => {
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
    <section id="spotlight" className="py-12 bg-card border-y border-border scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b77800]">Spotlight board</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground md:text-4xl">Today&apos;s useful picks</h2>
            <p className="mt-2 text-muted-foreground">A quick rail for products shoppers are likely to compare first.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.mins, label: "Mins" },
                { value: timeLeft.secs, label: "Sec" },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center">
                  <div className="bg-[#0b1f44] text-white px-3 py-2 rounded-xl text-center min-w-[50px]">
                    <span className="text-xl font-bold">{item.value}</span>
                    <p className="text-[10px] uppercase">{item.label}</p>
                  </div>
                  {index < 3 && <span className="text-foreground font-bold mx-1">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dealOfTheDay.map((product) => (
            <a
              key={product.id}
              href={product.affiliateLink}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => trackClick(product)}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-background p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground capitalize">{product.store}</p>
                <h3 className="font-medium text-foreground text-sm line-clamp-2">{product.name}</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary">
                  View deal
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
