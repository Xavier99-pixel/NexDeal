# NexDeal

NexDeal is a Next.js affiliate marketing website for listing deals from stores like Amazon, Flipkart, Myntra, Ajio, and Meesho.

## Run Locally

1. Install Node.js LTS and VS Code.
2. Open this folder in VS Code.
3. Enable pnpm through Corepack:

```bash
corepack enable pnpm
```

4. Install dependencies:

```bash
pnpm install
```

5. Start the website:

```bash
pnpm dev
```

6. Open `http://localhost:3000`.

## Where To Add Products

Edit `lib/products.ts`.

Each product needs:

```ts
{
  id: "21",
  name: "Product name",
  description: "Short useful description",
  price: 999,
  originalPrice: 1499,
  discount: 33,
  image: "https://image-url-here",
  category: "earbuds",
  store: "amazon",
  affiliateLink: "https://your-real-affiliate-link",
  rating: 4.4,
  reviews: 1200,
  isFeatured: true,
}
```

Use the category ids already listed in `lib/products.ts`, or add your own category in the `categories` array.

## Website Flow

1. Visitor opens the NexDeal homepage.
2. Visitor uses the search bar or clicks a niche/category.
3. Visitor sees filtered products.
4. Visitor clicks `Buy Now`.
5. Visitor goes to the official ecommerce website through your affiliate link.
6. If the store approves the sale, you receive commission based on that store's policy.

## Affiliate Link Rules

- Replace every placeholder link like `YOUR_TAG_HERE` or `YOUR_AFFILIATE_ID`.
- Keep the affiliate disclosure visible on your site.
- Do not show fake prices, fake reviews, or fake discounts.
- For Amazon, avoid copying product images manually unless their affiliate tools or policies allow it.
- Recheck each network's rules before publishing because commission rates and approval rules change.

## Recommended Free Tools

- Design: Figma, Canva, Penpot.
- Coding: VS Code, Git, GitHub.
- Hosting: Vercel free tier or Netlify free tier.
- Auth/database: Supabase free tier.
- Analytics: Vercel Analytics, Google Search Console, Microsoft Clarity.
- SEO/content: Google Trends, Google Keyword Planner, AnswerThePublic free searches.

## Auth Base Plan

The current `app/login/page.tsx` is a frontend login screen only. For real authorization:

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Create an admin-only dashboard route later, for example `app/admin/page.tsx`.
5. Store products in Supabase only after the static product list is working well.

Start with static data in `lib/products.ts`; it is simpler and better for your first launch.

## More Guides

- Affiliate link workflow: `docs/affiliate-link-guide.md`
- Amazon product example: `docs/amazon-affiliate-example.md`
- Database/API/Auth setup: `docs/database-api-setup.md`
- Publish from VS Code: `docs/publish-from-vscode.md`
- Creator backend, domain, and Amazon setup: `docs/creator-backend-domain-guide.md`
