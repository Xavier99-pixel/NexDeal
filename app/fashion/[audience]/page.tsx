import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { fashionAudiences, fashionCategories } from "@/lib/products";

interface FashionAudiencePageProps {
  params: Promise<{
    audience: string;
  }>;
}

export default async function FashionAudiencePage({ params }: FashionAudiencePageProps) {
  const { audience: audienceId } = await params;
  const audience = fashionAudiences.find((item) => item.id === audienceId);

  if (!audience) {
    notFound();
  }

  const audienceCategories = fashionCategories.filter((category) => category.audience === audience.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#f7f1ea]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[0.82fr_1.18fr] md:py-16">
            <div className="flex flex-col justify-center">
              <Link href="/fashion" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Fashion home
              </Link>
              <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-[#9b5c00]">{audience.eyebrow}</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-0.06em] text-[#111827] md:text-7xl">
                {audience.name}&apos;s fashion
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{audience.description}</p>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[36px] bg-black shadow-2xl">
              <Image src={audience.image} alt={audience.name} fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Choose category</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">Shop by style need</h2>
              <p className="mt-2 text-muted-foreground">Move from broad style edits into focused collections for easier product discovery.</p>
            </div>
            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-muted-foreground">
              {audienceCategories.length} categories
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {audienceCategories.map((category) => (
              <Link key={category.id} href={category.href ?? `/category/${category.id}`} className="group overflow-hidden rounded-[28px] border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/5] bg-secondary">
                  <Image src={category.image} alt={category.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-black text-foreground">{category.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    View products
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
