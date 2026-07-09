export interface Location {
  addressLine: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface Socials {
  instagram: string;
  facebook: string;
}

export interface Cycle {
  ordersOpen: string;
  ordersCloseBy: string;
  pickupDay: string;
}

export interface OrderModel {
  type: string;
  orderMethod: string[];
  cycle: Cycle;
  statusOptions: string[];
}

export interface Business {
  name: string;
  tagline: string;
  description: string;
  category: string;
  location: Location;
  phone: string;
  followers: number;
  socials: Socials;
  orderModel: OrderModel;
}

export interface PageSection {
  id: string;
  name: string;
}

export interface Page {
  slug: string;
  sections: string[];
}

export interface PricingPackage {
  id: string;
  label: string;
  price: number;
  currency: string;
  promo?: string;
}

export interface Flavor {
  id: string;
  name: string;
  emoji: string;
  description: string;
  seasonal: boolean;
  image?: string;
}

export interface PreorderItem {
  packageId: string;
  flavors: { [flavorId: string]: number };
  notes?: string;
  name: string;
  contactMethod: "DM" | "text";
  contactHandle: string;
}
