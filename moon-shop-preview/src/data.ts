import { Product } from './types';

// Real Moon Spices & Groceries catalog — matches moonmarket.in.
// Only products with a confirmed real price are listed here (cart requires a fixed price).
export const PRODUCTS: Product[] = [
  {
    id: 'combo-almonds-cashews',
    name: 'Almonds & Cashews Combo',
    category: 'Combos',
    description:
      "Can't choose between our Premium Almonds and Whole Cashews? Get both in one pack — 250g of each, at a special combo price.",
    price: 880,
    originalPrice: 1100,
    weightOptions: ['250g Each'],
    image: '/products/combo-almonds-cashews.jpg',
    rating: 4.8,
    isBestseller: true,
    additionalInfo: [
      '250g Premium Almonds + 250g Whole Cashews',
      'Best value — save over buying separately',
      'No added sugar or preservatives',
      '100% natural, sun-dried',
    ],
  },
  {
    id: 'almonds',
    name: 'Premium Almonds',
    category: 'Dry Fruits',
    description:
      "Our Premium Almonds are sourced from the finest orchards and hand-sorted for size and quality. Naturally rich in protein, fibre, and healthy fats, they make a wholesome everyday snack or a thoughtful gift for the ones you love.",
    price: 550,
    weightOptions: ['250g', '500g'],
    pricesByWeight: { '250g': 550, '500g': 1100 },
    image: '/products/almonds-250g.jpg',
    imagesByWeight: { '250g': '/products/almonds-250g.jpg', '500g': '/products/almonds-500g.jpg' },
    rating: 4.8,
    isBestseller: true,
    additionalInfo: [
      'Rich source of Vitamin E',
      'High in protein & fibre',
      'No added sugar or preservatives',
      '100% natural, sun-dried',
    ],
  },
  {
    id: 'cashews',
    name: 'Whole Cashews',
    category: 'Dry Fruits',
    description:
      "Our Whole Cashews (W240 grade) are prized for their smooth, creamy texture and delicate sweetness. Carefully cleaned and graded, each kernel is packed to lock in freshness — perfect for snacking, gifting, or your festive kitchen.",
    price: 550,
    weightOptions: ['250g', '500g'],
    pricesByWeight: { '250g': 550, '500g': 1100 },
    image: '/products/cashews-250g.jpg',
    imagesByWeight: { '250g': '/products/cashews-250g.jpg', '500g': '/products/cashews-500g.jpg' },
    rating: 4.8,
    isBestseller: true,
    additionalInfo: [
      'Good source of healthy fats',
      'Rich in magnesium & copper',
      'Hand-sorted, whole kernels',
      'No added sugar or preservatives',
    ],
  },
  {
    id: 'raisins',
    name: 'Golden Raisins',
    category: 'Dry Fruits',
    description:
      "Our Golden Raisins are sun-dried and hand-cleaned to bring out their natural sweetness and soft, juicy bite. A versatile pantry staple, perfect for snacking, baking, or finishing off your favourite festive dishes.",
    price: 350,
    weightOptions: ['250g'],
    image: '/products/raisins.jpg',
    rating: 4.8,
    additionalInfo: [
      'Naturally sweet — no added sugar',
      'Good source of iron & potassium',
      'Hand-cleaned, plump kernels',
      '100% natural, sun-dried',
    ],
  },
  {
    id: 'moon-dry-dates',
    name: 'Moon Dry Fruits Dry Dates',
    category: 'Dry Dates',
    description:
      "Moon Dry Fruits Dry Dates are naturally sun-dried to preserve their deep caramel sweetness and soft, chewy texture. A traditional favourite, they're perfect for snacking, festive sweets, or adding to your daily diet as a natural energy boost.",
    price: 280,
    weightOptions: ['250g'],
    image: '/products/dry-dates.jpg',
    rating: 4.8,
    isBestseller: true,
    additionalInfo: [
      'Naturally sweet — no added sugar',
      'Good source of dietary fibre',
      'Rich in iron & potassium',
      '100% natural, sun-dried',
    ],
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    category: 'Seeds',
    description:
      'Our Chia Seeds are naturally rich in fibre and omega-3s, with a mild, nutty flavour. Soak them in water or milk, or add to smoothies and salads for a wholesome nutritional boost.',
    price: 120,
    weightOptions: ['100g', '250g'],
    pricesByWeight: { '100g': 120, '250g': 300 },
    image: '/products/chia-seeds-100g.jpg',
    imagesByWeight: { '100g': '/products/chia-seeds-100g.jpg', '250g': '/products/chia-seeds-250g.jpg' },
    rating: 4.8,
    additionalInfo: [
      'Rich in omega-3 fatty acids',
      'High in dietary fibre',
      'Good source of plant protein',
      '100% natural, no additives',
    ],
  },
  {
    id: 'musk-melon-seeds',
    name: 'Musk Melon Seeds',
    category: 'Seeds',
    description:
      'Our Musk Melon Seeds are cleaned and hand-sorted for a light, crunchy bite. A nutritious addition to salads, trail mixes, or enjoyed on their own as a healthy snack.',
    price: 150,
    weightOptions: ['100g'],
    image: '/products/musk-melon-seeds.jpg',
    rating: 4.8,
    additionalInfo: [
      'Good source of healthy fats',
      'Rich in magnesium',
      'Hand-cleaned & sorted',
      '100% natural, no additives',
    ],
  },
  {
    id: 'melon-seeds',
    name: 'Melon Seeds',
    category: 'Seeds',
    description:
      'Our Melon Seeds are naturally cleaned and sorted for a crisp, nutty bite. Perfect for snacking, garnishing, or adding to your favourite recipes for extra crunch and nutrition.',
    price: 130,
    weightOptions: ['100g'],
    image: '/products/melon-seeds.jpg',
    rating: 4.8,
    additionalInfo: [
      'Good source of healthy fats & protein',
      'Rich in magnesium & zinc',
      'Hand-cleaned & sorted',
      '100% natural, no additives',
    ],
  },
  {
    id: 'black-sesame-seeds',
    name: 'Black Sesame Seeds',
    category: 'Seeds',
    description:
      'Our Black Sesame Seeds are cleaned and hand-sorted for a rich, nutty aroma. A staple in Indian and Asian cooking, perfect for garnishing, baking, or making chikki and laddoos.',
    price: 60,
    weightOptions: ['100g', '250g'],
    pricesByWeight: { '100g': 60, '250g': 150 },
    image: '/products/til-kala.jpg',
    imagesByWeight: { '100g': '/products/til-kala.jpg', '250g': '/products/til-kala-250g.jpg' },
    rating: 4.8,
    additionalInfo: [
      'Rich in calcium & iron',
      'Good source of healthy fats',
      'Hand-cleaned & sorted',
      '100% natural, no additives',
    ],
  },
  {
    id: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    category: 'Seeds',
    description:
      'Our Pumpkin Seeds are cleaned and hand-sorted for a satisfying crunch and nutty flavour. Enjoy them as a snack, or add to salads, granola, and baked goods for extra nutrition.',
    price: 140,
    weightOptions: ['100g', '250g'],
    pricesByWeight: { '100g': 140, '250g': 350 },
    image: '/products/pumpkin-seeds-100g.jpg',
    imagesByWeight: { '100g': '/products/pumpkin-seeds-100g.jpg', '250g': '/products/pumpkin-seeds-250g.jpg' },
    rating: 4.8,
    additionalInfo: [
      'Rich in magnesium & zinc',
      'Good source of plant protein',
      'Hand-cleaned & sorted',
      '100% natural, no additives',
    ],
  },
  {
    id: 'flax-seeds',
    name: 'Flax Seeds',
    category: 'Seeds',
    description:
      'Our Flax Seeds are cleaned and hand-sorted, naturally rich in fibre and omega-3s. Add them to rotis, smoothies, or your daily diet for an easy nutritional boost.',
    price: 70,
    weightOptions: ['100g'],
    image: '/products/flax-seeds.jpg',
    rating: 4.8,
    additionalInfo: [
      'Rich in omega-3 fatty acids',
      'High in dietary fibre',
      'Hand-cleaned & sorted',
      '100% natural, no additives',
    ],
  },
  {
    // NOTE: the 100g price is a PLACEHOLDER (owner has only confirmed the
    // real 250g price so far) — swap in the real 100g price when known.
    id: 'jeera',
    name: 'Jeera (Cumin Seeds)',
    category: 'Whole Spices',
    description:
      'Our Jeera (Cumin Seeds) has a warm, earthy aroma that forms the base of countless Indian dishes. Essential for tempering dals, curries, and rice.',
    price: 130,
    weightOptions: ['100g', '250g'],
    pricesByWeight: { '250g': 150 },
    image: '/products/jeera-100g.png',
    imagesByWeight: { '250g': '/products/jeera-250g.jpg' },
    rating: 4.8,
    isBestseller: true,
    additionalInfo: ['Warm, earthy aroma', 'Kitchen essential', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'sarso-kali',
    name: 'Sarso Kali (Black Mustard Seeds)',
    category: 'Whole Spices',
    description:
      'Our Sarso Kali (Black Mustard Seeds) has a pungent, nutty bite once tempered in hot oil. A South Indian and Bengali kitchen essential.',
    price: 20,
    weightOptions: ['100g'],
    image: '/products/sarso-kali-100g.png',
    rating: 4.8,
    additionalInfo: ['Pungent, nutty flavour', 'South Indian & Bengali staple', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'rai',
    name: 'Rai (Mustard Seeds)',
    category: 'Whole Spices',
    description:
      'Our Rai (Mustard Seeds) is an everyday tempering spice with a sharp, pungent flavour that mellows into a nutty warmth when cooked in hot oil.',
    price: 40,
    weightOptions: ['100g'],
    image: '/products/rai-100g.png',
    rating: 4.8,
    additionalInfo: ['Sharp, pungent flavour', 'Everyday tempering spice', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'sounf-maheen',
    name: 'Sounf Maheen (Small Fennel Seeds)',
    category: 'Whole Spices',
    description:
      'Our Sounf Maheen (fine fennel seeds) has a sweet, delicate aroma. Enjoyed after meals as a mouth freshener, or used to add gentle sweetness to curries and teas.',
    price: 80,
    weightOptions: ['100g'],
    image: '/products/sounf-maheen-100g.png',
    rating: 4.8,
    additionalInfo: ['Sweet, delicate aroma', 'Popular after-meal freshener', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'sauf-moti',
    name: 'Sauf Moti (Large Fennel Seeds)',
    category: 'Whole Spices',
    description:
      'Our Sauf Moti (large fennel seeds) has a bold, sweet aroma with a bigger, crunchier bite than fine fennel. Popular as a mouth freshener or brewed into a soothing tea.',
    price: 60,
    weightOptions: ['100g'],
    image: '/products/sauf-moti-100g.png',
    rating: 4.8,
    additionalInfo: ['Bold, sweet aroma', 'Large, crunchy seeds', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'sarso-peeli',
    name: 'Sarso Peeli (Yellow Mustard Seeds)',
    category: 'Whole Spices',
    description:
      'Our Sarso Peeli (Yellow Mustard Seeds) brings a sharp, tangy bite. A staple tempering spice across Indian kitchens, essential for pickles, dals, and curries.',
    price: 30,
    weightOptions: ['100g'],
    image: '/products/sarso-peeli-100g.png',
    rating: 4.8,
    additionalInfo: ['Sharp, tangy flavour', 'Essential tempering spice', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'posta-dana',
    name: 'Posta Dana (Poppy Seeds)',
    category: 'Whole Spices',
    description:
      'Our Posta Dana (Poppy Seeds) has a mild, nutty flavour. Used to thicken and enrich gravies, or roasted for garnishing sweets and snacks.',
    price: 300,
    weightOptions: ['100g'],
    image: '/products/posta-dana-100g.png',
    rating: 4.8,
    additionalInfo: ['Mild, nutty flavour', 'Used to enrich gravies', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'ajwain',
    name: 'Ajwain (Carrom Seeds)',
    category: 'Whole Spices',
    description:
      'Our Ajwain (Carrom Seeds) has a sharp, thyme-like aroma and a warm, slightly bitter bite. A classic tempering spice in Indian cooking, and a traditional favourite for digestive teas.',
    price: 60,
    weightOptions: ['100g'],
    image: '/products/ajwain-100g.jpg',
    rating: 4.8,
    additionalInfo: ['Sharp, aromatic flavour', 'Popular in tempering & parathas', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'kali-mirch',
    name: 'Kali Mirch (Black Pepper)',
    category: 'Whole Spices',
    description:
      'Our Kali Mirch (whole black peppercorns) has a sharp, woody heat. A universal kitchen essential for seasoning, tempering, and finishing dishes.',
    price: 160,
    weightOptions: ['100g'],
    image: '/products/kali-mirch.png',
    rating: 4.8,
    additionalInfo: ['Sharp, woody heat', 'Universal seasoning essential', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'coriander-whole',
    name: 'Coriander Whole',
    category: 'Whole Spices',
    description:
      'Our Coriander Whole has a mild, citrusy aroma and is a base spice for countless Indian curries and masalas. Dry roast and grind fresh for the best flavour.',
    price: 100,
    weightOptions: ['250g'],
    image: '/products/coriander-whole-250g.jpg',
    rating: 4.8,
    additionalInfo: ['Mild, citrusy aroma', 'Base spice for curries & masalas', 'Cleaned & sorted', '100% natural'],
  },
  {
    // NOTE: price is a PLACEHOLDER (owner has not confirmed the real
    // 100g price for this product yet) — swap in the real price before
    // relying on this for actual sales.
    id: 'garam-masala-whole',
    name: 'Garam Masala Whole',
    category: 'Whole Spices',
    description:
      'Our Garam Masala Whole is a fragrant blend of whole spices — cinnamon, cloves, star anise, black pepper, cardamom, bay leaf and more — for tempering and slow-cooked dishes.',
    price: 150,
    weightOptions: ['100g'],
    image: '/products/garam-masala-whole-100g.jpg',
    rating: 4.8,
    additionalInfo: ['Fragrant whole-spice blend', 'For tempering & slow cooking', 'Cleaned & sorted', '100% natural'],
  },
  {
    id: 'kuttu-atta',
    name: 'Kuttu Atta',
    category: 'Speciality Flours',
    description:
      "Our Kuttu Atta (buckwheat flour) is milled from premium buckwheat for a fine, soft texture — perfect for vrat/fasting recipes like puris and parathas, or as a gluten-free flour for everyday cooking.",
    price: 180,
    weightOptions: ['250g'],
    image: '/products/kuttu-atta.jpg',
    rating: 4.8,
    additionalInfo: [
      'Naturally gluten-free',
      'Good source of protein & fibre',
      'Ideal for vrat/fasting recipes',
      '100% natural, no additives',
    ],
  },
  {
    id: 'singhara-atta',
    name: 'Singhara Atta',
    category: 'Speciality Flours',
    description:
      "Our Singhara Atta (water chestnut flour) is ground fresh for a light, delicate texture — a traditional favourite for vrat/fasting meals, giving puris and pakoras their signature crisp bite.",
    price: 200,
    weightOptions: ['250g'],
    image: '/products/singhara-atta.jpg',
    rating: 4.8,
    additionalInfo: [
      'Naturally gluten-free',
      'Good source of potassium',
      'Ideal for vrat/fasting recipes',
      '100% natural, no additives',
    ],
  },
];

/**
 * The price actually charged for a given pack size. Used by the storefront
 * and by the serverless order routes, so a customer is never quoted one
 * price and charged another.
 */
export function priceFor(product: Product, weight?: string): number {
  if (!weight) return product.price;
  return product.pricesByWeight?.[weight] ?? product.price;
}

/** The real pack photo for a given weight, when one exists. */
export function imageFor(product: Product, weight?: string): string {
  if (!weight) return product.image;
  return product.imagesByWeight?.[weight] ?? product.image;
}

export const CATEGORIES = [
  { name: 'Combos', image: '/products/combo-almonds-cashews.jpg' },
  { name: 'Dry Fruits', image: '/products/almonds-250g.jpg' },
  { name: 'Whole Spices', image: '/products/jeera-100g.png' },
  { name: 'Spices', image: '/products/haldi.jpg' },
  { name: 'Dry Dates', image: '/products/dry-dates.jpg' },
  { name: 'Speciality Flours', image: '/products/kuttu-atta.jpg' },
  { name: 'Seeds', image: '/products/pumpkin-seeds-100g.jpg' },
];
