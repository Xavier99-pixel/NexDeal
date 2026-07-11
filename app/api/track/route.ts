import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase";

const clickSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().optional(),
  store: z.string().optional(),
  path: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const supabase = createAdminSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ ok: false, reason: "analytics_not_configured" });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" });
  }

  const parsed = clickSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, reason: "invalid_payload" });
  }

  const { error } = await supabase.from("analytics_events").insert({
    event_type: "outbound_click",
    product_id: parsed.data.productId ?? null,
    product_name: parsed.data.productName ?? null,
    store: parsed.data.store ?? null,
    path: parsed.data.path ?? null,
    referrer: request.headers.get("referer"),
    user_agent: request.headers.get("user-agent"),
  });

  if (error) {
    return NextResponse.json({
      ok: false,
      reason: error.code === "42P01" ? "analytics_table_missing" : error.message,
    });
  }

  return NextResponse.json({ ok: true });
}
