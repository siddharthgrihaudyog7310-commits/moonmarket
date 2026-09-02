export type ProductCategory =
  | "Dry Fruits"
  | "Spices"
  | "Dry Dates"
  | "Whole Spices"
  | "Flour (Atta)"
  | "Seeds";

export interface PackOption {
  weight: string;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  image: string;
  shortDescription: string;
  description: string;
  nutritionalHighlights: string[];
  packs: PackOption[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}
