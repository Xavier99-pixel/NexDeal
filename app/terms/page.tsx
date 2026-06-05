import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm font-medium text-primary">Terms</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground">Terms And Affiliate Disclosure</h1>
          <div className="mt-6 space-y-5 leading-7 text-muted-foreground">
            <p>
              NexDeal is an affiliate product discovery website. We do not sell products directly, process payments, ship products, or provide ecommerce customer support.
            </p>
            <p>
              Product prices, availability, discounts, ratings, and reviews may change on the official store website. Visitors should confirm final details before purchasing.
            </p>
            <p>
              As an affiliate website, NexDeal may earn from qualifying purchases through some outbound links, at no extra cost to visitors.
            </p>
            <p>
              Product names, logos, and store names belong to their respective owners. NexDeal is not owned by Amazon, Flipkart, Myntra, or any listed ecommerce platform.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
