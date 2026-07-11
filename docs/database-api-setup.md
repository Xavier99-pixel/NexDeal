# NexDeal Database And API Setup

Start with `lib/products.ts`. Move to a database only when you need an admin dashboard, many products, saved user accounts, or automatic product updates.

## Current API

The project now has a basic product API:

```txt
GET /api/products
```

It returns categories, stores, and products from `lib/products.ts`.

Use it locally:

```bash
curl http://localhost:3000/api/products
```

## Recommended Database

Use Supabase first because it gives you:

- Postgres database
- Row-level security
- Free starter tier

## Supabase Tables

Create these tables in Supabase SQL editor:

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric not null,
  original_price numeric not null,
  discount integer not null default 0,
  image text not null,
  category text not null,
  store text not null,
  affiliate_link text not null,
  rating numeric not null default 0,
  reviews integer not null default 0,
  is_new boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table saved_products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz not null default now()
);
```

## Environment Variables

Copy `.env.example` to `.env.local`, then add:

```txt
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSKEY=your_private_admin_passkey
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
Never expose `ADMIN_PASSKEY` publicly. It is only typed into `/admin` by the site owner.

## Domain Plan For www.nexdeal.com

1. Buy `nexdeal.com` from a registrar.
2. Deploy this project to Vercel.
3. In Vercel, open Project Settings > Domains.
4. Add `nexdeal.com` and `www.nexdeal.com`.
5. In your domain registrar DNS, add the DNS records Vercel gives you.
6. Set `NEXT_PUBLIC_SITE_URL=https://www.nexdeal.com` in Vercel environment variables.
7. Add `https://www.nexdeal.com` to Amazon Associates and other affiliate dashboards.

You cannot publish to `www.nexdeal.com` until the domain is purchased and DNS is connected.
