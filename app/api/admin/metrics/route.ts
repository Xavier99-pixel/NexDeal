import { NextRequest, NextResponse } from "next/server";
import { assertAdminUser, createAdminSupabaseClient } from "@/lib/supabase";

type AnalyticsEvent = {
  event_type: string;
  product_id: string | null;
  product_name: string | null;
  store: string | null;
  created_at: string;
};

function getAccessToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  return authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
}

async function requireAdmin(request: NextRequest) {
  const accessToken = getAccessToken(request);
  const admin = await assertAdminUser(accessToken);

  if (!admin.ok) {
    return NextResponse.json(
      {
        error: "Unauthorized admin request",
        reason: admin.reason,
        signedInEmail: admin.email,
      },
      { status: 401 }
    );
  }

  const supabase = createAdminSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase admin environment is not configured" }, { status: 500 });
  }

  return supabase;
}

function emptyTrend() {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date.toISOString().slice(0, 10);
  });

  return days.map((date) => ({ date, clicks: 0 }));
}

export async function GET(request: NextRequest) {
  const supabase = await requireAdmin(request);

  if (supabase instanceof NextResponse) {
    return supabase;
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id,name,store,is_featured");

  if (productsError) {
    return NextResponse.json({ error: productsError.message }, { status: 500 });
  }

  const productRows = products ?? [];
  const baseMetrics = {
    analyticsReady: true,
    totalProducts: productRows.length,
    featuredProducts: productRows.filter((product) => product.is_featured).length,
    totalClicks: 0,
    todayClicks: 0,
    last7DaysClicks: 0,
    topProducts: [] as { name: string; clicks: number }[],
    storeClicks: [] as { store: string; clicks: number }[],
    trend: emptyTrend(),
    lastUpdated: new Date().toISOString(),
  };

  const { data: events, error: eventsError } = await supabase
    .from("analytics_events")
    .select("event_type,product_id,product_name,store,created_at")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (eventsError) {
    return NextResponse.json({
      ...baseMetrics,
      analyticsReady: false,
      setupHint: eventsError.code === "42P01"
        ? "Run docs/admin-analytics-setup.md SQL in Supabase to enable click analytics."
        : eventsError.message,
    });
  }

  const clickEvents = (events ?? []).filter((event: AnalyticsEvent) => event.event_type === "outbound_click");
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const productNames = new Map(productRows.map((product) => [String(product.id), String(product.name)]));
  const topProducts = new Map<string, number>();
  const storeClicks = new Map<string, number>();
  const trendMap = new Map(baseMetrics.trend.map((day) => [day.date, day.clicks]));

  for (const event of clickEvents) {
    const createdAt = new Date(event.created_at);
    const dateKey = event.created_at.slice(0, 10);
    const productName = event.product_name || (event.product_id ? productNames.get(event.product_id) : null) || "Unknown product";
    const storeName = event.store || "unknown";

    topProducts.set(productName, (topProducts.get(productName) ?? 0) + 1);
    storeClicks.set(storeName, (storeClicks.get(storeName) ?? 0) + 1);

    if (createdAt >= sevenDaysAgo) {
      trendMap.set(dateKey, (trendMap.get(dateKey) ?? 0) + 1);
    }
  }

  return NextResponse.json({
    ...baseMetrics,
    totalClicks: clickEvents.length,
    todayClicks: clickEvents.filter((event) => event.created_at.startsWith(todayKey)).length,
    last7DaysClicks: clickEvents.filter((event) => new Date(event.created_at) >= sevenDaysAgo).length,
    topProducts: Array.from(topProducts.entries())
      .map(([name, clicks]) => ({ name, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5),
    storeClicks: Array.from(storeClicks.entries())
      .map(([store, clicks]) => ({ store, clicks }))
      .sort((a, b) => b.clicks - a.clicks),
    trend: baseMetrics.trend.map((day) => ({ ...day, clicks: trendMap.get(day.date) ?? 0 })),
  });
}
