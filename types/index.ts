export type CategorySlug =
  | "balloons"
  | "balloon-decorations"
  | "birthday-accessories"
  | "party-props"
  | "party-kits"
  | "banners"
  | "cake-accessories"
  | "baby-shower"
  | "themed-party";

export type ThemeSlug =
  | "pastel"
  | "rose-gold"
  | "black-gold"
  | "rainbow"
  | "princess"
  | "unicorn"
  | "jungle"
  | "baby-shower";

export type OccasionSlug =
  | "birthday"
  | "anniversary"
  | "baby-shower"
  | "kids-party"
  | "wedding"
  | "valentines"
  | "graduation"
  | "themed-parties";

export interface ProductVariantOption {
  id: string;
  label: string;
  swatch?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  category: CategorySlug;
  themes: ThemeSlug[];
  occasions: OccasionSlug[];
  images: string[];
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  packSize: string;
  colors?: ProductVariantOption[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  description: string;
  whatsIncluded: string[];
  specifications: { label: string; value: string }[];
  howToUse: string[];
  reviews: ProductReview[];
  frequentlyBoughtWith?: string[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  colorId?: string;
  colorLabel?: string;
  quantity: number;
}

export interface CategoryInfo {
  slug: OccasionSlug;
  name: string;
  description: string;
  image: string;
}

export interface ProductCategoryInfo {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface ThemeInfo {
  slug: ThemeSlug;
  name: string;
  image: string;
  gradient: string;
}

export interface BundleInfo {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  price: number;
  mrp: number;
  itemCount: number;
}
