# NexDeal Admin Maintenance Guide

## What Supabase Does

Supabase is NexDeal's database. The admin panel is only the screen you use to manage data.

```text
/admin form -> Supabase products table -> public homepage product cards
```

NexDeal uses Supabase for:

- Saving affiliate products permanently.
- Loading products on the public website.
- Saving outbound click analytics for the admin dashboard.

NexDeal no longer uses Supabase email or Google login for admin access. Admin access is protected by `ADMIN_PASSKEY`.

## First-Time Setup

1. Deploy NexDeal on Render.
2. Add these Render environment variables:

```env
NEXT_PUBLIC_SITE_NAME=NexDeal
NEXT_PUBLIC_SITE_URL=https://YOUR-RENDER-URL.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PASSKEY=your_private_admin_passkey
```

3. In Supabase SQL Editor, create the `products` table once:

```sql
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric not null,
  original_price numeric not null,
  discount integer not null default 0,
  image text not null,
  category text not null,
  store text not null check (store in ('amazon', 'flipkart', 'myntra', 'ajio', 'meesho')),
  affiliate_link text not null,
  rating numeric not null default 0 check (rating >= 0 and rating <= 5),
  reviews integer not null default 0,
  is_new boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

drop policy if exists "Anyone can read products" on products;

create policy "Anyone can read products"
on products for select
to anon, authenticated
using (true);
```

4. Run the analytics SQL from `docs/admin-analytics-setup.md`.
5. Open `https://YOUR-RENDER-URL.onrender.com/admin`.
6. Paste your `ADMIN_PASSKEY`.
7. Add your first product.

## Adding Products

Open `/admin`, unlock with the passkey, and fill:

- **Name**: product title, for example `Apple MacBook Air M3 13-inch`.
- **Description**: short useful detail, for example `8GB RAM, 256GB SSD, lightweight laptop`.
- **Image URL**: direct image URL.
- **Affiliate Link**: Amazon/Flipkart/Myntra affiliate product URL.
- **Price**: current selling price.
- **Original Price**: MRP or previous price.
- **Discount %**: visible discount percentage.
- **Reviews**: visible review count.
- **Rating**: rating from 0 to 5.
- **Store**: choose the store.
- **Category**: choose the correct category.
- **Featured**: show in top product sections.
- **New**: show a new badge.

Click `Save Product`. The product saves to Supabase and appears on the website.

## Do You Need To Redeploy Every Time?

No. You do not redeploy when adding, editing, or deleting products from `/admin`.

Redeploy only when you change:

- Website code or UI.
- Render environment variables.
- Database table structure.
- Domain settings.

## Confirmed Orders

NexDeal tracks outbound store clicks. Confirmed purchases, commissions, and order amounts are checked inside Amazon Associates or the relevant affiliate dashboard.
