export type Category = 'Combos' | 'Dry Fruits' | 'Whole Spices' | 'Spices' | 'Dry Dates' | 'Speciality Flours' | 'Seeds';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  /** Price for the default (first) entry in weightOptions. */
  price: number;
  originalPrice?: number;
  weightOptions: string[];
  /**
   * Per-weight pricing for products sold in more than one pack size. Any
   * weight missing here falls back to `price`. Required whenever
   * weightOptions has more than one entry — otherwise every pack size would
   * be charged at the default weight's price.
   */
  pricesByWeight?: Record<string, number>;
  /** Default (first weightOption's) product photo. */
  image: string;
  /**
   * Per-weight product photos, for products whose real pack photo actually
   * differs by size. Any weight missing here falls back to `image`.
   */
  imagesByWeight?: Record<string, string>;
  rating: number;
  /** Omit until real review data exists — never fabricate a review count. */
  reviewsCount?: number;
  isBestseller?: boolean;
  /** Omit unless real nutrition-facts data exists — never fabricate nutrition numbers. */
  nutrition?: {
    calories: string;
    protein: string;
    fats: string;
    carbs: string;
    fiber?: string;
    calcium?: string;
    sodium?: string;
  };
  specifications?: {
    [key: string]: string;
  };
  additionalInfo?: string[];
  minimumOrderQuantity?: string;
  productionCapacity?: string;
  deliveryTime?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedWeight: string;
}
