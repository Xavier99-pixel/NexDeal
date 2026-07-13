import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { fashionAudiences, fashionCategories } from "@/lib/products";

export default function FashionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#080808] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,176,0,0.18),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_24%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
            <div className="flex flex-col justify-center">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-amber-200">
                <Sparkles className="h-4 w-4" />
                NexDeal Fashion
              </p>
              <h1 className="mt-6 text-5xl font-black leading-[0.96] tracking-[-0.06em] md:text-7xl">
                Style routes for men and women.
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/68">
                A fashion-first browsing flow inspired by clean editorial storefronts: pick audience, choose category, then shop a focused product wall.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fashionAudiences.map((audience) => (
                <Link key={audience.id} href={audience.href} className="group relative min-h-[460px] overflow-hidden rounded-[32px] bg-white/10 shadow-2xl">
                  <Image src={audience.image} alt={audience.name} fill priority className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">{audience.eyebrow}</p>
                    <h2 className="mt-2 text-4xl font-black">{audience.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/75">{audience.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                      Explore {audience.name}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Fashion map</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">Available fashion categories</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {fashionCategories.map((category) => (
              <Link key={category.id} href={category.href ?? `/category/${category.id}`} className="rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
                  <Image src={category.image} alt={category.name} fill className="object-cover" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{category.audience}</p>
                <h3 className="mt-1 font-bold text-foreground">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
