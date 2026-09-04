export type Category = 'Dry Fruits' | 'Spices' | 'Dry Dates' | 'Whole Spices' | 'Speciality Flours' | 'Seeds';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  originalPrice?: number;
  weightOptions: string[];
  image: string;
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
