import { Product } from "@/types";

// Seed catalog for Moon Spices & Groceries.
// Swap `image` paths with real product photography in /public/products
// (see README.md for naming conventions and recommended image sizes).
export const products: Product[] = [
  {
    slug: "almonds",
    name: "Premium Almonds",
    category: "Dry Fruits",
    image: "/products/almonds.jpg",
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
    image: "/products/cashews.jpg",
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
    slug: "raisins",
    name: "Golden Raisins",
    category: "Dry Fruits",
    image: "/products/raisins.svg",
    shortDescription: "Naturally sweet, plump golden raisins — a pantry staple.",
    description:
      "Our Golden Raisins are sun-dried and hand-cleaned to bring out their natural sweetness and soft, juicy bite. A versatile pantry staple, perfect for snacking, baking, or finishing off your favourite festive dishes.",
    nutritionalHighlights: [
      "Naturally sweet — no added sugar",
      "Good source of iron & potassium",
      "Hand-cleaned, plump kernels",
      "100% natural, sun-dried",
    ],
    packs: [{ weight: "250g", price: 350 }],
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
  {
    slug: "kuttu-atta",
    name: "Kuttu Atta",
    category: "Speciality Flours",
    image: "/products/kuttu-atta.jpg",
    shortDescription: "Buckwheat flour, stone-ground for soft, fasting-friendly rotis.",
    description:
      "Our Kuttu Atta (buckwheat flour) is milled from premium buckwheat for a fine, soft texture — perfect for vrat/fasting recipes like puris and parathas, or as a gluten-free flour for everyday cooking.",
    nutritionalHighlights: [
      "Naturally gluten-free",
      "Good source of protein & fibre",
      "Ideal for vrat/fasting recipes",
      "100% natural, no additives",
    ],
    packs: [{ weight: "500g", price: 180 }],
  },
  {
    slug: "singhara-atta",
    name: "Singhara Atta",
    category: "Speciality Flours",
    image: "/products/singhara-atta.jpg",
    shortDescription: "Water chestnut flour, finely milled for light, crisp puris.",
    description:
      "Our Singhara Atta (water chestnut flour) is ground fresh for a light, delicate texture — a traditional favourite for vrat/fasting meals, giving puris and pakoras their signature crisp bite.",
    nutritionalHighlights: [
      "Naturally gluten-free",
      "Good source of potassium",
      "Ideal for vrat/fasting recipes",
      "100% natural, no additives",
    ],
    packs: [{ weight: "500g", price: 200 }],
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
    image: "/products/almonds.jpg",
    description: "Premium almonds, cashews & more — hand-picked for quality.",
  },
  {
    name: "Spices",
    image: "/products/cloves.svg",
    description: "Everyday ground & blended spices for authentic flavour.",
  },
  {
    name: "Dry Dates",
    image: "/products/dry-dates.svg",
    description: "Naturally sweet, sun-dried dates for a wholesome treat.",
  },
  {
    name: "Whole Spices",
    image: "/products/cloves.svg",
    description: "Aromatic whole spices, hand-sorted for maximum freshness.",
  },
  {
    name: "Speciality Flours",
    image: "/products/kuttu-atta.jpg",
    description: "Kuttu, singhara & more — stone-ground for soft, wholesome rotis.",
  },
  {
    name: "Seeds",
    image: "/products/seeds.svg",
    description: "Nutrient-rich seeds, hand-cleaned for everyday wellness.",
  },
];
