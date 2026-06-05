import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgePercent, ShieldCheck, Sparkles, Store, Tags } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Image
          src="/nexdeal-intro.png"
          alt="NexDeal brand intro"
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_42%,rgba(255,255,255,0.58)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="min-h-[560px] md:min-h-[660px] grid items-center gap-10 lg:grid-cols-[1fr_440px]">
          <div className="max-w-2xl py-16 md:py-24">
            <BrandLogo className="mb-8" />
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1 text-sm font-medium text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
              Fast launch affiliate website
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-foreground text-balance">
              NexDeal picks smarter deals before shoppers buy.
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground">
              A polished affiliate storefront with niche tabs, product cards, disclosure pages, and a ready path for Amazon Associates approval.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild className="h-12 px-6 bg-primary hover:bg-primary/90">
                <a href="#collections">
                  Explore niches
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6 bg-white/80">
                <a href="#affiliate-guide">How links work</a>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <BadgePercent className="h-5 w-5 text-accent" />
                Category-wise deal picks
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Clear affiliate disclosure
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-border bg-white/88 p-5 shadow-2xl backdrop-blur">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
                <Image
                  src="/nexdeal-intro.png"
                  alt="NexDeal visual identity"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background p-4">
                  <Store className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold text-foreground">Top Stores</p>
                  <p className="mt-1 text-xs text-muted-foreground">Amazon, Flipkart, Myntra</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <Tags className="h-5 w-5 text-accent" />
                  <p className="mt-3 text-sm font-semibold text-foreground">Live Niches</p>
                  <p className="mt-1 text-xs text-muted-foreground">Mobiles, laptops, gaming</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
