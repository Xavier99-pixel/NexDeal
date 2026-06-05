# NexDeal Affiliate Link Guide

This guide explains how to go from your raw diagram and Codex-generated code to a published affiliate website.

## Beginning To Ending Steps

1. Keep your raw diagram as the product idea: homepage, niche tabs, product cards, and buy buttons.
2. Use Codex/VS Code to convert the diagram into the NexDeal Next.js website.
3. Run the website locally with `corepack enable pnpm`, `pnpm install`, and `pnpm dev`.
4. Replace sample product data in `lib/products.ts`.
5. Join affiliate programs and generate real links.
6. Paste those links into each product's `affiliateLink` field.
7. Add real product images, prices, category ids, store names, ratings, and descriptions.
8. Build the site with `pnpm build`.
9. Deploy on Vercel or Netlify.
10. Add your live website URL inside each affiliate dashboard if the program asks for your website.
11. Test every `Buy Now` button after deployment.
12. Add content pages, comparison blogs, and SEO pages to grow traffic.

## How NexDeal Looks

The current website opens with:

- A sticky header with the NexDeal logo, search bar, account area, and navigation.
- A hero banner for main offers.
- A category/niche section where users can click categories like earbuds, mobiles, laptops, gaming, cameras, and smartwatches.
- A deals marquee and featured product collection.
- Product cards with store badge, price, discount, rating, and `Buy Now` button.
- A small affiliate disclosure before the product list.
- A footer section.

## Where To Insert Data

Open `lib/products.ts`.

Add categories in:

```ts
export const categories: Category[] = []
```

Add products in:

```ts
export const products: Product[] = []
```

Important fields:

- `category` must match one of your category ids.
- `store` must be one of the allowed store values in the `Product` type.
- `affiliateLink` must be the final affiliate URL from Amazon, Flipkart, Myntra, or another affiliate network.
- `isFeatured: true` makes the product appear in the featured section.

## Amazon India Associates

1. Go to `https://affiliate-program.amazon.in/`.
2. Sign up or log in to Amazon Associates.
3. Add your website URL when asked.
4. After approval/access, open an Amazon product while logged in.
5. Use SiteStripe on Amazon.in to generate a text link.
6. Copy the short or full link that includes your tracking id.
7. Paste it into `affiliateLink`.

Example format:

```ts
affiliateLink: "https://www.amazon.in/dp/PRODUCT_ID?tag=yourtag-21"
```

## Flipkart

1. Check `https://affiliate.flipkart.com/` for current signup/access.
2. If direct signup is available, create an account and add your website details.
3. Use their link/banner/deep-link tools to create product links.
4. Paste the generated deep link into `affiliateLink`.
5. Check the current commission page before choosing categories.

Example placeholder:

```ts
affiliateLink: "https://www.flipkart.com/product-page-url?affid=yourid"
```

## Myntra

Myntra affiliate access may depend on current partner channels. The official Myntra affiliate pages can be unstable, so check current access through:

- Myntra official affiliate pages.
- YouTube Shopping affiliate program if you are an eligible YouTube creator.
- Trusted affiliate networks that list Myntra campaigns.

Once you get a generated Myntra tracking link, paste it into:

```ts
affiliateLink: "https://www.myntra.com/product-url-with-your-tracking"
```

## Other Indian Ecommerce Options

You can also check affiliate networks for Ajio, Meesho, Nykaa, Purplle, Croma, Tata Cliq, and brand-specific programs.

Good networks to research:

- Admitad
- Cuelinks
- vCommission
- EarnKaro
- INRDeals
- Impact

Always verify payouts, cookie period, allowed traffic sources, and product-image rules.

## Best Free Platforms

- Website design: Figma, Canva, Penpot.
- Development: VS Code, GitHub, GitHub Desktop.
- Hosting: Vercel, Netlify, Cloudflare Pages.
- Database/auth: Supabase, Firebase.
- Product content planning: Notion, Google Sheets, Airtable free tier.
- Analytics: Google Search Console, Google Analytics, Microsoft Clarity, Vercel Analytics.

## VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin is not needed for this project.
- GitLens
- Error Lens
- Auto Rename Tag
- Path Intellisense

## Recommended Technologies

- Current stack: Next.js, React, TypeScript, Tailwind CSS, shadcn-style UI components.
- Beginner data setup: keep products in `lib/products.ts`.
- Next step: move products to Supabase when you need an admin dashboard.
- Auth: Supabase Auth or Clerk.
- Deployment: Vercel is easiest for this project.
- SEO: Next.js metadata, sitemap, product comparison blogs, category pages.

## Publishing Checklist

- Replace all placeholder affiliate links.
- Replace generic product images with allowed images.
- Add affiliate disclosure on every page that has affiliate links.
- Add Privacy Policy, Terms, Contact, and About pages.
- Test mobile layout.
- Test every product button.
- Run `pnpm build`.
- Deploy to Vercel.
- Submit the site to Google Search Console.
