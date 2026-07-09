import { Business, PricingPackage, Flavor, Page } from "./types";

export const BUSINESS_DATA: Business = {
  name: "Cakeload",
  tagline: "Your go-to spot for soft, gooey cinnamon rolls and irresistible sweets",
  description: "Baked fresh, packed with flavor, and made to satisfy every craving. Limited weekly drops, always indulgent.",
  category: "Home Bakery",
  location: {
    addressLine: "9400 N Baltimore Ave",
    city: "Kansas City",
    state: "MO",
    country: "United States",
    zip: "64155"
  },
  phone: "+1 913-882-3711",
  followers: 155,
  socials: {
    instagram: "cakeload.kc",
    facebook: "CakeloadKC"
  },
  orderModel: {
    type: "weekly-preorder",
    orderMethod: ["DM", "text"],
    cycle: {
      ordersOpen: "Sunday/Monday (varies weekly)",
      ordersCloseBy: "Thursday",
      pickupDay: "Sunday"
    },
    statusOptions: ["open", "closed", "on_break", "holiday_special"]
  }
};

export const PRICING_PACKAGES: PricingPackage[] = [
  { id: "price_4pk", label: "4 Rolls", price: 15.00, currency: "USD" },
  { id: "price_6pk", label: "6 Rolls", price: 22.00, currency: "USD" },
  { 
    id: "price_dozen", 
    label: "Dozen", 
    price: 40.00, 
    currency: "USD", 
    promo: "Free 4-Pack with holiday promo (seasonal)" 
  }
];

export const FLAVORS: Flavor[] = [
  {
    id: "flv_001",
    name: "Classic Cinnamon Roll",
    emoji: "⭐",
    description: "The original signature soft, gooey Cakeload roll baked with organic cinnamon, topped with generous brown sugar butter layers, and smothered in our velvety vanilla cream cheese glaze.",
    seasonal: false
  },
  {
    id: "flv_002",
    name: "Star Spangled Strawberry Cheesecake",
    emoji: "🍓",
    description: "Strawberry cheesecake swirl, sweet cream cheese frosting, a fresh strawberry reduction drizzle, and toasted graham cracker crumbs. An indulgent patriotic summer dream!",
    seasonal: true,
    image: "/src/assets/images/strawberry_cheesecake_1783557155627.jpg"
  },
  {
    id: "flv_003",
    name: "Pecan Caramel Sticky Bun",
    emoji: "🥜",
    description: "Sticky caramelized brown sugar glaze baked over our classic fluffy brioche dough, topped with loads of toasted Georgia pecans that crunchy-melt in your mouth.",
    seasonal: false
  },
  {
    id: "flv_004",
    name: "Triple Chocolate Chunk Roll",
    emoji: "🍫",
    description: "For true cocoa lovers: a rich cocoa-infused brown sugar spiral filled with dark chocolate chunks, finished with a smooth chocolate cream glaze and milk chocolate drizzle.",
    seasonal: false
  },
  {
    id: "flv_005",
    name: "Lemon Raspberry Sunrise",
    emoji: "🍋",
    description: "A bright, zesty lemon curd filling rolled in soft dough, topped with a tangy raspberry glaze and fresh lemon zest highlights. Perfect for warm summer mornings.",
    seasonal: true
  },
  {
    id: "flv_006",
    name: "Maple Pecan Bacon (Holiday Special)",
    emoji: "🍁",
    description: "Savory meets sweet! Infused with 100% pure maple glaze, studded with real crispy bacon bits, toasted pecans, and a hint of warm nutmeg spice.",
    seasonal: true
  }
];

export const PAGES: Page[] = [
  {
    slug: "home",
    sections: ["hero", "status_banner", "how_it_works", "flavor_teaser", "social_proof", "cta"]
  },
  {
    slug: "menu",
    sections: ["weekly_flavors", "pricing", "order_deadline", "order_cta"]
  },
  {
    slug: "about-contact",
    sections: ["owner_story", "why_cakeload", "influencer_program", "contact_block", "newsletter_signup"]
  }
];

// Helper to calculate total count from package label
export const getPackageSize = (id: string): number => {
  if (id === "price_4pk") return 4;
  if (id === "price_6pk") return 6;
  if (id === "price_dozen") return 12;
  return 4;
};
