import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm font-medium text-primary">Contact</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground">Contact NexDeal</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            For product corrections, partnership requests, or affiliate-related questions, contact the NexDeal team.
          </p>
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-1 font-semibold text-foreground">support@nexdeal.com</p>
            <p className="mt-5 text-sm text-muted-foreground">
              Replace this email with your real business email before final launch.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
