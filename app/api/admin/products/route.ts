import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminUser, createAdminSupabaseClient, rowToProduct } from "@/lib/supabase";

const productSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(2),
  description: z.string().min(2),
  price: z.coerce.number().nonnegative(),
  originalPrice: z.coerce.number().nonnegative(),
  discount: z.coerce.number().int().min(0).max(100),
  image: z.string().url(),
  category: z.string().min(1),
  store: z.enum(["amazon", "flipkart", "myntra", "ajio", "meesho"]),
  affiliateLink: z.string().url(),
  rating: z.coerce.number().min(0).max(5),
  reviews: z.coerce.number().int().nonnegative(),
  isNew: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
});

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

export async function GET(request: NextRequest) {
  const supabase = await requireAdmin(request);

  if (supabase instanceof NextResponse) {
    return supabase;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: data.map(rowToProduct) });
}

export async function POST(request: NextRequest) {
  const supabase = await requireAdmin(request);

  if (supabase instanceof NextResponse) {
    return supabase;
  }

  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const product = parsed.data;
  const productId = product.id || crypto.randomUUID();

  const { data, error } = await supabase
    .from("products")
    .upsert({
      id: productId,
      name: product.name,
      description: product.description,
      price: product.price,
      original_price: product.originalPrice,
      discount: product.discount,
      image: product.image,
      category: product.category,
      store: product.store,
      affiliate_link: product.affiliateLink,
      rating: product.rating,
      reviews: product.reviews,
      is_new: Boolean(product.isNew),
      is_featured: Boolean(product.isFeatured),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: rowToProduct(data) });
}

export async function DELETE(request: NextRequest) {
  const supabase = await requireAdmin(request);

  if (supabase instanceof NextResponse) {
    return supabase;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Product id is required" }, { status: 400 });
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
