import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm font-medium text-primary">About NexDeal</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground">We help shoppers find better product choices.</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            NexDeal is a curated affiliate shopping website that organizes useful products by niche, store, and deal value. Our goal is to make online shopping easier by helping visitors compare products and open the official store page when they are ready to buy.
          </p>
          <p className="mt-5 leading-7 text-muted-foreground">
            Some links on NexDeal may be affiliate links. When visitors buy through those links, we may earn a small commission at no extra cost to them. We aim to keep recommendations useful, clear, and easy to understand.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Explore Deals</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
