import { CategoryInfo, ProductCategoryInfo, ThemeInfo } from "@/types";

export const celebrationCategories: CategoryInfo[] = [
  {
    slug: "birthday",
    name: "Birthday",
    description: "Balloons, banners & decor for the big day",
    image: "/categories/birthday.svg",
  },
  {
    slug: "anniversary",
    name: "Anniversary",
    description: "Elegant setups to celebrate love",
    image: "/categories/anniversary.svg",
  },
  {
    slug: "baby-shower",
    name: "Baby Shower",
    description: "Sweet decor to welcome little ones",
    image: "/categories/baby-shower.svg",
  },
  {
    slug: "kids-party",
    name: "Kids Party",
    description: "Playful themes kids will love",
    image: "/categories/kids-party.svg",
  },
  {
    slug: "wedding",
    name: "Wedding",
    description: "Premium decor for your big day",
    image: "/categories/wedding.svg",
  },
  {
    slug: "valentines",
    name: "Valentine's",
    description: "Romantic decor for two",
    image: "/categories/valentines.svg",
  },
  {
    slug: "graduation",
    name: "Graduation",
    description: "Celebrate every milestone",
    image: "/categories/graduation.svg",
  },
  {
    slug: "themed-parties",
    name: "Themed Parties",
    description: "From jungle to galaxy & beyond",
    image: "/categories/themed-parties.svg",
  },
];

export const productCategories: ProductCategoryInfo[] = [
  { slug: "balloons", name: "Balloons", description: "Latex, foil & chrome balloons in every colour" },
  { slug: "balloon-decorations", name: "Balloon Decorations", description: "Arches, garlands & balloon kits" },
  { slug: "birthday-accessories", name: "Birthday Accessories", description: "Sashes, tiaras, candles & more" },
  { slug: "party-props", name: "Party Props", description: "Photo booth props & fun accessories" },
  { slug: "party-kits", name: "Party Kits", description: "Complete decoration kits, ready to hang" },
  { slug: "banners", name: "Banners", description: "Happy Birthday & custom banners" },
  { slug: "cake-accessories", name: "Cake Accessories", description: "Toppers, candles & cake decor" },
  { slug: "baby-shower", name: "Baby Shower", description: "Decor for welcoming your little one" },
  { slug: "themed-party", name: "Themed Party", description: "Curated theme sets for every celebration" },
];

export const themes: ThemeInfo[] = [
  { slug: "pastel", name: "Pastel", image: "/themes/pastel.svg", gradient: "from-pulse-purple-100 to-pulse-pink-100" },
  { slug: "rose-gold", name: "Rose Gold", image: "/themes/rose-gold.svg", gradient: "from-pulse-pink-200 to-pulse-gold-200" },
  { slug: "black-gold", name: "Black & Gold", image: "/themes/black-gold.svg", gradient: "from-neutral-800 to-pulse-gold-300" },
  { slug: "rainbow", name: "Rainbow", image: "/themes/rainbow.svg", gradient: "from-pulse-pink-200 via-pulse-gold-200 to-pulse-purple-200" },
  { slug: "princess", name: "Princess", image: "/themes/princess.svg", gradient: "from-pulse-pink-100 to-pulse-purple-200" },
  { slug: "unicorn", name: "Unicorn", image: "/themes/unicorn.svg", gradient: "from-pulse-purple-100 to-pulse-pink-200" },
  { slug: "jungle", name: "Jungle", image: "/themes/jungle.svg", gradient: "from-emerald-200 to-pulse-gold-200" },
  { slug: "baby-shower", name: "Baby Shower", image: "/themes/baby-shower.svg", gradient: "from-sky-100 to-pulse-pink-100" },
];
