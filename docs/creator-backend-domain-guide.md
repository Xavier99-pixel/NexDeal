# NexDeal Creator Backend, Domain, And Amazon Setup

This guide matches the current NexDeal setup: Render deployment, Supabase database, and `/admin` protected by `ADMIN_PASSKEY`.

## What Is Implemented

- `/admin` uses a private passkey, not Google/email login.
- `/api/admin/products` lets the creator add, edit, and delete products.
- `/api/products` serves database products to the public website.
- `/api/track` records outbound product clicks.
- If Supabase is not configured, the homepage falls back to sample products in `lib/products.ts`.

## Required Render Environment Variables

```txt
NEXT_PUBLIC_SITE_NAME=NexDeal
NEXT_PUBLIC_SITE_URL=https://your-render-url.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSKEY=your_private_admin_passkey
```

Do not commit real keys to GitHub.

## Supabase Setup

1. Create a Supabase project.
2. Open `Project Settings > API`.
3. Copy the Project URL, anon key, and service role key.
4. Add them to Render environment variables.
5. Create the `products` table using `docs/admin-maintenance-guide.md`.
6. Create the analytics table using `docs/admin-analytics-setup.md`.

Supabase Authentication providers are not required for admin access.

## Admin Dashboard

1. Open:

```txt
https://your-render-url.onrender.com/admin
```

2. Paste `ADMIN_PASSKEY`.
3. Add products from the product form.
4. Click `Save Product`.
5. Open the homepage to verify products appear.

Adding, editing, and deleting products does not require redeployment.

## Domain Setup

1. Buy a domain such as `nexdealshop.in`.
2. In Render, open your NexDeal service.
3. Go to `Settings > Custom Domains`.
4. Add your domain.
5. Copy Render's DNS records.
6. Add those DNS records in your domain registrar.
7. After the domain works, update `NEXT_PUBLIC_SITE_URL` in Render.

## Amazon Associates

Add both your temporary Render URL and final custom domain in Amazon Associates while migrating.

Existing commission history is not removed when you change website domains. Existing affiliate links keep working if you keep using the same Amazon tracking tag.
