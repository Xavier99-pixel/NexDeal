import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm font-medium text-primary">Privacy Policy</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground">Privacy Policy</h1>
          <div className="mt-6 space-y-5 leading-7 text-muted-foreground">
            <p>
              NexDeal may collect basic information such as contact details, account details, and website usage data when visitors use our website or future login features.
            </p>
            <p>
              We may use analytics tools to understand website traffic, improve product recommendations, and measure page performance.
            </p>
            <p>
              NexDeal contains outbound links to third-party ecommerce websites. Those websites have their own privacy policies and checkout processes.
            </p>
            <p>
              Some links may be affiliate links. If a visitor clicks and purchases through those links, NexDeal may earn a commission at no extra cost to the visitor.
            </p>
            <p>
              Replace this starter policy with a lawyer-reviewed privacy policy before scaling the website commercially.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
