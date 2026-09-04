import { Product } from './types';

// Real Moon Spices & Groceries catalog — matches moonmarket.in.
// Only products with a confirmed real price are listed here (cart requires a fixed price).
export const PRODUCTS: Product[] = [
  {
    id: 'almonds',
    name: 'Premium Almonds',
    category: 'Dry Fruits',
    description:
      "Our Premium Almonds are sourced from the finest orchards and hand-sorted for size and quality. Naturally rich in protein, fibre, and healthy fats, they make a wholesome everyday snack or a thoughtful gift for the ones you love.",
    price: 550,
    weightOptions: ['250g'],
    image: '/products/almonds.jpg',
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
    weightOptions: ['250g'],
    image: '/products/cashews.jpg',
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
    weightOptions: ['100g'],
    image: '/products/chia-seeds.jpg',
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
    weightOptions: ['100g'],
    image: '/products/til-kala.jpg',
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
    weightOptions: ['100g'],
    image: '/products/pumpkin-seeds.jpg',
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
    id: 'turmeric-powder',
    name: 'Turmeric Powder',
    category: 'Spices',
    description:
      'Our Turmeric Powder is ground from premium turmeric roots for a deep golden colour and warm, earthy aroma. An everyday kitchen essential, it adds colour, flavour, and goodness to curries, dals, and more.',
    price: 90,
    weightOptions: ['100g'],
    image: '/products/haldi.jpg',
    rating: 4.8,
    additionalInfo: [
      'Rich in curcumin & antioxidants',
      'Naturally vibrant colour',
      'Cleaned & finely ground',
      'No fillers or artificial colour',
    ],
  },
  {
    id: 'red-chilli-powder',
    name: 'Red Chilli Powder',
    category: 'Spices',
    description:
      'Our Red Chilli Powder is ground from handpicked red chillies for a rich colour and bold heat. A staple in every Indian kitchen, it brings authentic spice and depth to curries, marinades, and snacks.',
    price: 150,
    weightOptions: ['100g'],
    image: '/products/mircha.jpg',
    rating: 4.8,
    isBestseller: true,
    additionalInfo: [
      'Rich, natural red colour',
      'Bold, authentic heat',
      'Cleaned & finely ground',
      'No fillers or artificial colour',
    ],
  },
  {
    id: 'coriander-powder',
    name: 'Coriander Powder',
    category: 'Spices',
    description:
      'Our Coriander Powder is ground from quality coriander seeds for a warm, citrusy aroma and mellow flavour. A base spice in Indian cooking, it rounds out curries, gravies, and masalas beautifully.',
    price: 80,
    weightOptions: ['100g'],
    image: '/products/daniya.jpg',
    rating: 4.8,
    additionalInfo: [
      'Warm, citrusy aroma',
      'Good source of dietary fibre',
      'Cleaned & finely ground',
      'No fillers or additives',
    ],
  },
  {
    id: 'amchur-powder',
    name: 'Amchur Powder',
    category: 'Spices',
    description:
      'Our Amchur Powder (dry mango powder) is ground from sun-dried raw mangoes for a tangy, fruity sourness. A pantry favourite for finishing chaats, curries, and snacks with a burst of natural tang.',
    price: 100,
    weightOptions: ['100g'],
    image: '/products/khatai.jpg',
    rating: 4.8,
    additionalInfo: [
      'Bold, tangy flavour',
      'Cleaned & finely ground',
      'No fillers or artificial additives',
      '100% natural',
    ],
  },
  {
    id: 'kuttu-atta',
    name: 'Kuttu Atta',
    category: 'Speciality Flours',
    description:
      "Our Kuttu Atta (buckwheat flour) is milled from premium buckwheat for a fine, soft texture — perfect for vrat/fasting recipes like puris and parathas, or as a gluten-free flour for everyday cooking.",
    price: 180,
    weightOptions: ['500g'],
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
    weightOptions: ['500g'],
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

// Cumin Seeds (Jeera) exists in the catalog but has no confirmed price yet,
// so it's intentionally left out of this cart-based shop until pricing is set.

export const CATEGORIES = [
  { name: 'Dry Fruits', image: '/products/almonds.jpg' },
  { name: 'Spices', image: '/products/haldi.jpg' },
  { name: 'Dry Dates', image: '/products/dry-dates.jpg' },
  { name: 'Speciality Flours', image: '/products/kuttu-atta.jpg' },
  { name: 'Seeds', image: '/products/pumpkin-seeds.jpg' },
];
