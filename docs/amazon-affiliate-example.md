# Amazon Affiliate Example: MacBook Or A18 Pro Device

Use this flow for any Amazon India product, including a MacBook, iPhone 16 Pro with A18 Pro, charger, case, keyboard, or laptop accessory.

## Create The Affiliate Link

1. Go to `https://affiliate-program.amazon.in/`.
2. Sign up or log in to Amazon Associates.
3. Add your website, for example `https://www.nexdeal.com`, when your site is live.
4. Open `https://www.amazon.in/` in the same browser while logged in to Associates.
5. Search for the product, for example `MacBook Air M3` or `iPhone 16 Pro`.
6. Open the product detail page.
7. Use the SiteStripe bar at the top of Amazon.in.
8. Click `Text` or link generation option.
9. Copy the affiliate URL that includes your tracking tag.
10. Test the URL in a new private browser window.

## Paste It Into NexDeal

Open `lib/products.ts`.

Add or update a product:

```ts
{
  id: "21",
  name: "MacBook Air M3",
  description: "Lightweight laptop for students, creators, and office work",
  price: 114900,
  originalPrice: 124900,
  discount: 8,
  image: "https://allowed-image-url",
  category: "laptops",
  store: "amazon",
  affiliateLink: "https://www.amazon.in/dp/PRODUCT_ID?tag=yourtag-21",
  rating: 4.7,
  reviews: 5400,
  isFeatured: true,
}
```

For an iPhone A18 Pro product:

```ts
{
  id: "22",
  name: "iPhone 16 Pro",
  description: "A18 Pro chip, Pro camera system, and titanium design",
  price: 119900,
  originalPrice: 129900,
  discount: 8,
  image: "https://allowed-image-url",
  category: "mobiles",
  store: "amazon",
  affiliateLink: "https://www.amazon.in/dp/PRODUCT_ID?tag=yourtag-21",
  rating: 4.6,
  reviews: 3200,
  isFeatured: true,
}
```

## Important Amazon Rules

- Add a clear disclosure near affiliate links.
- Identify yourself as an Amazon Associate on your site.
- Do not fake prices, discounts, or reviews.
- Do not use Amazon product images unless Amazon's tools or policies allow your specific use.
- Recheck Amazon Associates rules before launch because policies can change.
