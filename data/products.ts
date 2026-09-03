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
    image: "/products/raisins.jpg",
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
    image: "/products/dry-dates.jpg",
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
    slug: "chia-seeds",
    name: "Chia Seeds",
    category: "Seeds",
    image: "/products/chia-seeds.jpg",
    shortDescription: "Nutrient-dense chia seeds for smoothies, drinks & everyday wellness.",
    description:
      "Our Chia Seeds are naturally rich in fibre and omega-3s, with a mild, nutty flavour. Soak them in water or milk, or add to smoothies and salads for a wholesome nutritional boost.",
    nutritionalHighlights: [
      "Rich in omega-3 fatty acids",
      "High in dietary fibre",
      "Good source of plant protein",
      "100% natural, no additives",
    ],
    packs: [{ weight: "100g", price: 120 }],
  },
  {
    slug: "musk-melon-seeds",
    name: "Musk Melon Seeds",
    category: "Seeds",
    image: "/products/musk-melon-seeds.jpg",
    shortDescription: "Light, crunchy musk melon seeds — a wholesome snacking seed.",
    description:
      "Our Musk Melon Seeds are cleaned and hand-sorted for a light, crunchy bite. A nutritious addition to salads, trail mixes, or enjoyed on their own as a healthy snack.",
    nutritionalHighlights: [
      "Good source of healthy fats",
      "Rich in magnesium",
      "Hand-cleaned & sorted",
      "100% natural, no additives",
    ],
    packs: [{ weight: "100g", price: 150 }],
  },
  {
    slug: "melon-seeds",
    name: "Melon Seeds",
    category: "Seeds",
    image: "/products/melon-seeds.jpg",
    shortDescription: "Crunchy melon seeds, hand-cleaned for everyday wellness.",
    description:
      "Our Melon Seeds are naturally cleaned and sorted for a crisp, nutty bite. Perfect for snacking, garnishing, or adding to your favourite recipes for extra crunch and nutrition.",
    nutritionalHighlights: [
      "Good source of healthy fats & protein",
      "Rich in magnesium & zinc",
      "Hand-cleaned & sorted",
      "100% natural, no additives",
    ],
    packs: [{ weight: "100g", price: 130 }],
  },
  {
    slug: "black-sesame-seeds",
    name: "Black Sesame Seeds",
    category: "Seeds",
    image: "/products/til-kala.jpg",
    shortDescription: "Aromatic black sesame seeds for cooking, baking & garnishing.",
    description:
      "Our Black Sesame Seeds are cleaned and hand-sorted for a rich, nutty aroma. A staple in Indian and Asian cooking, perfect for garnishing, baking, or making chikki and laddoos.",
    nutritionalHighlights: [
      "Rich in calcium & iron",
      "Good source of healthy fats",
      "Hand-cleaned & sorted",
      "100% natural, no additives",
    ],
    packs: [{ weight: "100g", price: 60 }],
  },
  {
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    category: "Seeds",
    image: "/products/pumpkin-seeds.jpg",
    shortDescription: "Wholesome pumpkin seeds, hand-cleaned for a nutritious crunch.",
    description:
      "Our Pumpkin Seeds are cleaned and hand-sorted for a satisfying crunch and nutty flavour. Enjoy them as a snack, or add to salads, granola, and baked goods for extra nutrition.",
    nutritionalHighlights: [
      "Rich in magnesium & zinc",
      "Good source of plant protein",
      "Hand-cleaned & sorted",
      "100% natural, no additives",
    ],
    packs: [{ weight: "100g", price: 140 }],
  },
  {
    slug: "flax-seeds",
    name: "Flax Seeds",
    category: "Seeds",
    image: "/products/flax-seeds.jpg",
    shortDescription: "Nutrient-rich flax seeds for everyday wellness.",
    description:
      "Our Flax Seeds are cleaned and hand-sorted, naturally rich in fibre and omega-3s. Add them to rotis, smoothies, or your daily diet for an easy nutritional boost.",
    nutritionalHighlights: [
      "Rich in omega-3 fatty acids",
      "High in dietary fibre",
      "Hand-cleaned & sorted",
      "100% natural, no additives",
    ],
    packs: [{ weight: "100g", price: 70 }],
  },
  {
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "Spices",
    image: "/products/haldi.jpg",
    shortDescription: "Vibrant, aromatic turmeric powder ground fresh for everyday cooking.",
    description:
      "Our Turmeric Powder is ground from premium turmeric roots for a deep golden colour and warm, earthy aroma. An everyday kitchen essential, it adds colour, flavour, and goodness to curries, dals, and more.",
    nutritionalHighlights: [
      "Rich in curcumin & antioxidants",
      "Naturally vibrant colour",
      "Cleaned & finely ground",
      "No fillers or artificial colour",
    ],
    packs: [{ weight: "100g", price: 90 }],
  },
  {
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    category: "Spices",
    image: "/products/mircha.jpg",
    shortDescription: "Bold, vibrant red chilli powder for authentic heat and colour.",
    description:
      "Our Red Chilli Powder is ground from handpicked red chillies for a rich colour and bold heat. A staple in every Indian kitchen, it brings authentic spice and depth to curries, marinades, and snacks.",
    nutritionalHighlights: [
      "Rich, natural red colour",
      "Bold, authentic heat",
      "Cleaned & finely ground",
      "No fillers or artificial colour",
    ],
    packs: [{ weight: "100g", price: 150 }],
  },
  {
    slug: "coriander-powder",
    name: "Coriander Powder",
    category: "Spices",
    image: "/products/daniya.jpg",
    shortDescription: "Freshly ground coriander powder with a warm, citrusy aroma.",
    description:
      "Our Coriander Powder is ground from quality coriander seeds for a warm, citrusy aroma and mellow flavour. A base spice in Indian cooking, it rounds out curries, gravies, and masalas beautifully.",
    nutritionalHighlights: [
      "Warm, citrusy aroma",
      "Good source of dietary fibre",
      "Cleaned & finely ground",
      "No fillers or additives",
    ],
    packs: [{ weight: "100g", price: 80 }],
  },
  {
    slug: "amchur-powder",
    name: "Amchur Powder",
    category: "Spices",
    image: "/products/khatai.jpg",
    shortDescription: "Tangy dry mango powder for that classic sour kick.",
    description:
      "Our Amchur Powder (dry mango powder) is ground from sun-dried raw mangoes for a tangy, fruity sourness. A pantry favourite for finishing chaats, curries, and snacks with a burst of natural tang.",
    nutritionalHighlights: [
      "Bold, tangy flavour",
      "Cleaned & finely ground",
      "No fillers or artificial additives",
      "100% natural",
    ],
    packs: [{ weight: "100g", price: 100 }],
  },
  {
    slug: "cumin-seeds",
    name: "Cumin Seeds (Jeera)",
    category: "Whole Spices",
    image: "/products/cumin-seeds.jpg",
    shortDescription: "Aromatic whole cumin seeds for tempering and everyday cooking.",
    description:
      "Our Cumin Seeds (Jeera) are cleaned and hand-sorted for a rich, earthy aroma and bold flavour. A kitchen essential for tempering dals, curries, and rice, or grinding fresh for your own masalas.",
    nutritionalHighlights: [
      "Rich, earthy aroma",
      "Hand-cleaned & sorted",
      "Hygienically packed",
      "100% natural, no additives",
    ],
    packs: [
      { weight: "50g" },
      { weight: "100g" },
      { weight: "250g" },
    ],
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

export const categories: {
  name: Product["category"];
  image: string;
  description: string;
  accent: string;
}[] = [
  {
    name: "Dry Fruits",
    image: "/products/dryfruits-icon.svg",
    description: "Premium almonds, cashews & more — hand-picked for quality.",
    accent: "#8F4A15",
  },
  {
    name: "Spices",
    image: "/products/spices-icon.svg",
    description: "Everyday ground & blended spices for authentic flavour.",
    accent: "#8B2C3B",
  },
  {
    name: "Dry Dates",
    image: "/products/dry-dates-icon.svg",
    description: "Naturally sweet, sun-dried dates for a wholesome treat.",
    accent: "#6B4226",
  },
  {
    name: "Whole Spices",
    image: "/products/spices-icon.svg",
    description: "Aromatic whole spices, hand-sorted for maximum freshness.",
    accent: "#4A6741",
  },
  {
    name: "Speciality Flours",
    image: "/products/flour-icon.svg",
    description: "Kuttu, singhara & more — stone-ground for soft, wholesome rotis.",
    accent: "#8A6108",
  },
  {
    name: "Seeds",
    image: "/products/seeds-icon.svg",
    description: "Nutrient-rich seeds, hand-cleaned for everyday wellness.",
    accent: "#7A6C3F",
  },
];
