"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Deal Of The Days</h2>
            <p className="text-muted-foreground mt-1">Deal Of The Day: Unbelievable Savings Await!</p>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.mins, label: "Mins" },
                { value: timeLeft.secs, label: "Sec" },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center">
                  <div className="bg-foreground text-background px-3 py-2 rounded-lg text-center min-w-[50px]">
                    <span className="text-xl font-bold">{item.value}</span>
                    <p className="text-[10px] uppercase">{item.label}</p>
                  </div>
                  {index < 3 && <span className="text-foreground font-bold mx-1">:</span>}
                </div>
              ))}
            </div>
            
            <div className="flex gap-1 ml-4">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8 bg-primary">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Deal Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dealOfTheDay.map((product) => (
            <a
              key={product.id}
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-3 bg-background rounded-xl border border-border hover:border-primary hover:shadow-md transition-all"
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
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
