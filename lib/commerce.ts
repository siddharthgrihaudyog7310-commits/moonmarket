/**
 * Commerce data-access layer.
 *
 * Every page/component reads product & catalog data through these functions
 * instead of importing `data/*` directly. Today they read local mock data;
 * swapping to Shopify later means re-implementing this file against the
 * Shopify Storefront API (or a `/api/shopify` proxy route) without touching
 * any component. Field names already mirror Shopify Storefront concepts:
 * `id`/`slug` ~ `id`/`handle`, `price`/`mrp` ~ `priceRange`/`compareAtPriceRange`.
 */
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { productCategories, celebrationCategories, themes } from "@/data/categories";
import { bundles } from "@/data/bundles";
import { Product } from "@/types";

export async function listProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return getProductBySlug(slug);
}

export async function listRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return getRelatedProducts(product, limit);
}

export async function listProductCategories() {
  return productCategories;
}

export async function listCelebrationCategories() {
  return celebrationCategories;
}

export async function listThemes() {
  return themes;
}

export async function listBundles() {
  return bundles;
}
