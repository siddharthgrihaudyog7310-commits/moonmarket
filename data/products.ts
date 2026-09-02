import { Product } from "@/types";

// Seed catalog for Moon Spices & Groceries.
// Swap `image` paths with real product photography in /public/products
// (see README.md for naming conventions and recommended image sizes).
export const products: Product[] = [
  {
    slug: "almonds",
    name: "Premium Almonds",
    category: "Dry Fruits",
    image: "/products/almonds.svg",
    shortDescription: "Hand-picked, sun-ripened almonds with a rich, buttery crunch.",
    description:
      "Our Premium Almonds are sourced from the finest orchards and hand-sorted for size and quality. Naturally rich in protein, fibre, and healthy fats, they make a wholesome everyday snack or a thoughtful gift for the ones you love.",
    nutritionalHighlights: [
      "Rich source of Vitamin E",
      "High in protein & fibre",
      "No added sugar or preservatives",
      "100% natural, sun-dried",
    ],
    packs: [{ weight: "250g", price: 550 }],
  },
  {
    slug: "cashews",
    name: "Whole Cashews",
    category: "Dry Fruits",
    image: "/products/cashews.svg",
    shortDescription: "Creamy, whole cashew kernels roasted to golden perfection.",
    description:
      "Our Whole Cashews (W240 grade) are prized for their smooth, creamy texture and delicate sweetness. Carefully cleaned and graded, each kernel is packed to lock in freshness — perfect for snacking, gifting, or your festive kitchen.",
    nutritionalHighlights: [
      "Good source of healthy fats",
      "Rich in magnesium & copper",
      "Hand-sorted, whole kernels",
      "No added sugar or preservatives",
    ],
    packs: [{ weight: "250g", price: 550 }],
  },
  {
    slug: "moon-dry-dates",
    name: "Moon Dry Fruits Dry Dates",
    category: "Dry Dates",
    image: "/products/dry-dates.svg",
    shortDescription: "Naturally sweet, soft dry dates — a wholesome everyday treat.",
    description:
      "Moon Dry Fruits Dry Dates are naturally sun-dried to preserve their deep caramel sweetness and soft, chewy texture. A traditional favourite, they're perfect for snacking, festive sweets, or adding to your daily diet as a natural energy boost.",
    nutritionalHighlights: [
      "Naturally sweet — no added sugar",
      "Good source of dietary fibre",
      "Rich in iron & potassium",
      "100% natural, sun-dried",
    ],
    packs: [{ weight: "250g", price: 280 }],
  },
  {
    slug: "cloves",
    name: "Cloves (Laung)",
    category: "Spices",
    image: "/products/cloves.svg",
    shortDescription: "Aromatic, whole cloves for authentic flavour in every dish.",
    description:
      "Our whole Cloves (Laung) are handpicked for their strong aroma and essential-oil-rich buds. A staple in Indian cooking, they bring warmth and depth to curries, biryanis, chai, and festive delicacies.",
    nutritionalHighlights: [
      "Rich in antioxidants",
      "Naturally aromatic, high oil content",
      "Cleaned & hand-sorted",
      "No fillers or additives",
    ],
    packs: [{ weight: "100g", price: 150 }],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, limit);
}

export const categories: { name: Product["category"]; image: string; description: string }[] = [
  {
    name: "Dry Fruits",
    image: "/products/almonds.svg",
    description: "Premium almonds, cashews & more — hand-picked for quality.",
  },
  {
    name: "Spices",
    image: "/products/cloves.svg",
    description: "Aromatic whole spices sourced for authentic flavour.",
  },
  {
    name: "Dry Dates",
    image: "/products/dry-dates.svg",
    description: "Naturally sweet, sun-dried dates for a wholesome treat.",
  },
];
