export type ProductCategory =
  | "Dry Fruits"
  | "Spices"
  | "Dry Dates"
  | "Whole Spices"
  | "Speciality Flours"
  | "Seeds";

export interface PackOption {
  weight: string;
  /** Omit when the price hasn't been confirmed yet — the UI shows "Price on Enquiry". */
  price?: number;
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
