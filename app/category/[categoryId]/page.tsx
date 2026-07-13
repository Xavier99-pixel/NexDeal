import { CategoryProductPage } from "@/components/category-product-page";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  return <CategoryProductPage categoryId={categoryId} />;
}
