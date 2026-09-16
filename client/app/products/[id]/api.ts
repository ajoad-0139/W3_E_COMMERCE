import type { Product } from "@/lib/types/product";

const API_BASE = "https://api.escuelajs.co/api/v1";

export async function getProductById(
  id: string | number
): Promise<Product | null> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${id}`);
  }

  return response.json();
}

export async function getRelatedProducts(
  id: string | number
): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products/${id}/related`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export async function getProductsByCategory(
  categoryId: string | number,
  excludeProductId?: string | number,
  limit = 8
): Promise<Product[]> {
  const response = await fetch(
    `${API_BASE}/categories/${categoryId}/products`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    return [];
  }

  const products: Product[] = await response.json();

  return products
    .filter(
      (product) =>
        String(product.id) !== String(excludeProductId)
    )
    .slice(0, limit);
}