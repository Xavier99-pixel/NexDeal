import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/lib/products";

export interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  discount: number;
  image: string;
  category: string;
  store: Product["store"];
  affiliate_link: string;
  rating: number;
  reviews: number;
  is_new: boolean;
  is_featured: boolean;
  created_at?: string;
}

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const isSupabaseAdminConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    originalPrice: Number(row.original_price),
    discount: Number(row.discount),
    image: row.image,
    category: row.category,
    store: row.store,
    affiliateLink: row.affiliate_link,
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    isNew: row.is_new,
    isFeatured: row.is_featured,
  };
}

export function productToRow(product: Product): Omit<ProductRow, "created_at"> {
  return {
    id: product.id,
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
  };
}

export async function assertAdminUser(accessToken: string | null) {
  const supabase = createServerSupabaseClient();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!supabase || !adminEmail || !accessToken) {
    return { ok: false, email: null };
  }

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || data.user?.email !== adminEmail) {
    return { ok: false, email: data.user?.email ?? null };
  }

  return { ok: true, email: data.user.email };
}
