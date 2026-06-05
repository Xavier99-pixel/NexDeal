# NexDeal Creator Backend, Domain, And Amazon Setup

This guide shows how to make NexDeal work as a real affiliate website with login, database product management, `www.nexdeal.in`, and Amazon Associates.

## What Is Implemented

- `/login` supports Supabase email/password, Google OAuth, and Apple OAuth when keys are configured.
- `/admin` lets the creator add, edit, and delete affiliate products.
- `/api/products` serves database products to the public website.
- `/api/admin/products` is protected by Supabase login and `ADMIN_EMAIL`.
- If Supabase is not configured, the homepage falls back to sample products in `lib/products.ts`.

## Step 1: Create Supabase Project

1. Go to `https://supabase.com`.
2. Create a new project.
3. Open `Project Settings > API`.
4. Copy:
   - Project URL
   - anon public key
   - service_role key

## Step 2: Create `.env.local`

In the NexDeal folder, create `.env.local`:

```txt
NEXT_PUBLIC_SITE_NAME=NexDeal
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_EMAIL=your_email@gmail.com
```

Important: `ADMIN_EMAIL` must match the email you use to sign in.

## Step 3: Create Supabase Database Table

Open Supabase `SQL Editor`, paste this, and run:

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

create policy "Anyone can read products"
on products for select
to anon, authenticated
using (true);
```

Admin add/edit/delete uses the service-role key from the server API route, so do not expose that key anywhere public.

## Step 4: Enable Supabase Login

For email/password:

1. Open `Authentication > Providers`.
2. Enable `Email`.
3. If you want instant testing, temporarily turn off email confirmation.

For Google login:

1. Create a Google OAuth client in Google Cloud.
2. Add Supabase callback URL from `Authentication > URL Configuration`.
3. Enable Google provider in Supabase.

For Apple login:

1. You need Apple Developer account.
2. Create Sign in with Apple credentials.
3. Add Supabase callback URL.
4. Enable Apple provider in Supabase.

## Step 5: Use Admin Dashboard

1. Run the site:

```bash
pnpm dev
```

2. Open:

```txt
http://localhost:3000/login
```

3. Create account or sign in with `ADMIN_EMAIL`.
4. Open:

```txt
http://localhost:3000/admin
```

5. Add product:
   - Product name
   - Price
   - Original price
   - Category
   - Store
   - Image URL
   - Affiliate link
   - Featured/new status

6. Save product.
7. Open homepage and verify it appears.

## Step 6: Buy `nexdeal.in` From GoDaddy

1. Go to `https://www.godaddy.com`.
2. Search `nexdeal.in`.
3. If available, add it to cart.
4. Choose yearly plan.
5. Avoid buying extra add-ons at the start unless you need them.
6. Complete payment.
7. Open `My Products > Domains > nexdeal.in > Manage DNS`.

If `nexdeal.in` is not available, try:

- `thenexdeal.in`
- `nexdeals.in`
- `nexdealhub.in`
- `shopnexdeal.in`

## Step 7: Deploy To Vercel

1. Push NexDeal to GitHub.
2. Go to `https://vercel.com`.
3. Import your GitHub repo.
4. Add environment variables in Vercel:

```txt
NEXT_PUBLIC_SITE_NAME=NexDeal
NEXT_PUBLIC_SITE_URL=https://www.nexdeal.in
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_EMAIL=your_email@gmail.com
```

5. Deploy.

## Step 8: Connect GoDaddy Domain To Vercel

In Vercel:

1. Open project.
2. Go to `Settings > Domains`.
3. Add:

```txt
nexdeal.in
www.nexdeal.in
```

Vercel will show DNS records. Usually:

- Apex/root domain `nexdeal.in`: `A` record pointing to Vercel IP.
- `www.nexdeal.in`: `CNAME` record pointing to Vercel domain.

In GoDaddy:

1. Open `Manage DNS`.
2. Edit/add the records Vercel gives you.
3. Remove conflicting old `A` or `CNAME` records if Vercel says invalid configuration.
4. Keep default `NS` records unless you choose Vercel nameservers.
5. Wait for DNS. It can take minutes to 24 hours.

## Step 9: Add Site To Amazon Associates

For new signup:

1. Use your live Vercel URL first if domain is not ready.
2. Better final URL:

```txt
https://www.nexdeal.in
```

3. Do not use `localhost`.
4. Do not use an empty coming-soon page.
5. Make sure these public pages work:
   - `/`
   - `/about`
   - `/contact`
   - `/privacy`
   - `/terms`

For existing Associates account:

1. Open Amazon Associates Central.
2. Go to account/settings website list.
3. Add:

```txt
https://www.nexdeal.in
```

4. Save.

## Step 10: Add Affiliate Products

Amazon:

1. Log in to Amazon Associates.
2. Open Amazon.in product page.
3. Use SiteStripe.
4. Copy text affiliate link.
5. Go to NexDeal `/admin`.
6. Paste it into `Affiliate Link`.
7. Save.

Flipkart/Myntra/Ajio/Meesho:

1. Join their direct affiliate program or a network like Cuelinks, Admitad, vCommission, EarnKaro, or INRDeals.
2. Generate product deep link.
3. Paste generated tracking link into NexDeal `/admin`.
4. Save.

## Important Rule

Always use the affiliate link generated by the official program or affiliate network. Do not manually guess tracking parameters.
