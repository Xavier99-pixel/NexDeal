import Image from "next/image";
import { BadgePercent, ShieldCheck, Sparkles, Store, Tags, TrendingUp, SearchCheck, Zap } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const heroStats = [
  { label: "Daily refresh", value: "New picks" },
  { label: "Store handoff", value: "Official checkout" },
  { label: "Smart filters", value: "Niche-first" },
];

const spotlightCards = [
  { title: "Phones", detail: "flagships + value buys", accent: "bg-blue-500" },
  { title: "Fashion", detail: "fresh style drops", accent: "bg-pink-500" },
  { title: "Home", detail: "useful daily upgrades", accent: "bg-amber-500" },
];

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,176,0,0.18),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(0,87,168,0.14),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7f9fc_100%)]" />
        <div className="absolute left-1/2 top-12 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid min-h-[620px] items-center gap-10 py-14 md:py-20 lg:grid-cols-[1fr_500px]">
          <div className="max-w-2xl py-16 md:py-24">
            <BrandLogo className="mb-8" />
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/85 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Curated shopping intelligence for India
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.05em] text-[#07111f] text-balance md:text-7xl">
              Find the right deal faster.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground md:text-xl">
              Browse sharp product picks from trusted stores, compare real value, and move to the official checkout when you are ready.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-sm font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <BadgePercent className="h-4 w-4 text-[#ffb000]" />
                Price-smart collections
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Trusted store checkout
              </span>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative rounded-[32px] border border-white bg-white/80 p-5 shadow-[0_34px_90px_rgba(8,31,68,0.16)] backdrop-blur">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#ffb000]/25 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[24px] bg-[#0b1f44] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">Today&apos;s board</p>
                    <h2 className="mt-2 text-2xl font-bold">Smart shopping radar</h2>
                  </div>
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white">
                    <Image src="/nexdeal-logo-ai.png" alt="" fill sizes="56px" className="object-cover" />
                  </div>
                </div>
                <div className="mt-5 rounded-2xl bg-white p-3 text-[#07111f]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#f4f7fb]">
                    <Image
                      src="/nexdeal-intro.png"
                      alt="NexDeal visual identity"
                      fill
                      className="object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
                      Curated picks, refreshed daily
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-4 grid gap-3">
                {spotlightCards.map((card) => (
                  <div key={card.title} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <span className={`h-10 w-1.5 rounded-full ${card.accent}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground">{card.title}</p>
                      <p className="text-xs text-muted-foreground">{card.detail}</p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                ))}
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <Store className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold text-foreground">Stores</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <Tags className="h-5 w-5 text-[#ffb000]" />
                  <p className="mt-3 text-sm font-semibold text-foreground">Niches</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <SearchCheck className="h-5 w-5 text-[#e63516]" />
                  <p className="mt-3 text-sm font-semibold text-foreground">Compare</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="-mt-8 grid gap-3 pb-10 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Fast discovery", text: "Shortlists made for quick browsing" },
            { icon: Store, title: "Official stores", text: "Open the seller page before payment" },
            { icon: ShieldCheck, title: "Clean product data", text: "Price, ratings and offer context together" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-3 font-bold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
