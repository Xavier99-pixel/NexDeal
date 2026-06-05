import { NextResponse } from "next/server";
import { categories, products, stores } from "@/lib/products";
import { createServerSupabaseClient, rowToProduct } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerSupabaseClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return NextResponse.json({
        site: "NexDeal",
        source: "supabase",
        categories,
        stores,
        products: data.map(rowToProduct),
      });
    }
  }

  return NextResponse.json({
    site: "NexDeal",
    source: "static",
    categories,
    stores,
    products,
  });
}
