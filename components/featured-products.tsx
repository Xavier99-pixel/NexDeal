import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function FeaturedProducts({ 
  products, 
  title = "Featured Collection",
  subtitle = "Sharp picks selected for value, ratings and store trust."
}: FeaturedProductsProps) {
  return (
    <section id="trending" className="py-12 bg-background scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">NexDeal shortlist</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground md:text-4xl">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <p className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-muted-foreground">
            {products.length} products
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
