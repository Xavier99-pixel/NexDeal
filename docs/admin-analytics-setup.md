# NexDeal Admin Analytics Setup

Run this once in Supabase SQL Editor to enable the `/admin` click dashboard.

```sql
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('outbound_click')),
  product_id text,
  product_name text,
  store text,
  path text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table analytics_events enable row level security;
```

No public insert policy is needed because NexDeal records click events through the server using `SUPABASE_SERVICE_ROLE_KEY`.

Important: affiliate networks usually do not send exact order confirmations back to your website automatically. NexDeal tracks “buy clicks” / outbound clicks. Check Amazon Associates, Flipkart, Myntra, or your affiliate network dashboard for confirmed orders and commissions.
