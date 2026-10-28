import "server-only";
import { hasDatabase, sql } from "./db";
import { PRODUCTS, type Product, type Tier } from "./shop";

// Everything on the homepage that staff can edit from Admin → Website.
export type HomepageContent = {
  pill: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  stats: { label: string; value: string; sub: string }[];
  occasions: { heading: string; eyebrow: string; intro: string; cards: { tier: Tier; tagline: string; title: string; text: string }[] };
  services: { heading: string; eyebrow: string; intro: string; packages: { name: string; tag: string; text: string; items: string[]; cta: string; featured: boolean }[] };
  about: { heading: string; text: string; hours: string };
};

export const DEFAULT_HOMEPAGE: HomepageContent = {
  pill: "Belagavi's Event Management & Costume Specialists",
  hero: {
    eyebrow: "Flagship Collection 2026",
    title: "From Timeless Traditions to Grand Celebrations.",
    subtitle: "Rent or buy authentic traditional costumes and book full-scale event management for weddings, festivals and cultural ceremonies in Belagavi.",
  },
  stats: [
    { label: "Curated Costumes", value: "500+ Pieces", sub: "Available on rent & buy" },
    { label: "Events Delivered", value: "120+ Events", sub: "Weddings & cultural fests" },
    { label: "Family Collections", value: "100% Bespoke", sub: "Matching family sets" },
    { label: "Consultation", value: "24 Hours", sub: "Direct studio callback" },
  ],
  occasions: {
    eyebrow: "Something for Every Celebration",
    heading: "Shop by Occasion",
    intro: "From a school stage play to your wedding day - wear it once on rent, or make it yours to keep.",
    cards: [
      { tier: "mass", tagline: "Festivals · School · Stage", title: "Festivals & School Events", text: "Annual day outfits, fancy dress, folk dance and dhol-tasha troupe wear - easy to rent by the day." },
      { tier: "premium", tagline: "Upanayanam · Baby Showers · Family Functions", title: "Family Ceremonies", text: "Matching family sets and regional silks for weddings, Upanayanam and baby showers." },
      { tier: "luxury", tagline: "Weddings · Receptions · Sangeet", title: "Weddings & Bridal", text: "Bridal silks, Peshwai sherwanis, hand-tied safas and made-to-measure wedding wear." },
    ],
  },
  services: {
    eyebrow: "End-to-End Curation",
    heading: "Event Management Packages",
    intro: "Traditional weddings, thread ceremonies, Ganesh Utsav pandals and sangeet nights across Belagavi.",
    packages: [
      { name: "Community & Festival Events", tag: "Ganesh Utsav · Navratri · School Days", text: "Society Ganesh Utsav, Navratri pandals and school cultural days.", items: ["Marigold & mango-leaf decor", "Sound system & mic set", "Bulk costume supply & management"], cta: "Plan My Event", featured: false },
      { name: "Family Ceremonies", tag: "Upanayanam · Weddings at Home · Most Booked", text: "Belagavi traditional weddings and Upanayanam ceremonies.", items: ["Mandap decor with brass elements", "Bride & groom styling + costumes", "Shehnai / dhol-tasha arrangement"], cta: "Book Consultation", featured: true },
      { name: "Grand Weddings", tag: "Destination · Palace Themes · Processions", text: "Destination weddings, palace themes and wedding processions.", items: ["Palace-grade floral decor", "Custom heirloom attire tailoring", "Dedicated wedding concierge"], cta: "Plan My Wedding", featured: false },
    ],
  },
  about: {
    heading: "Visit Our Flagship Studio",
    text: "Find us in the heart of Belagavi at Khade Bazar & Maruti Galli. Touch the fabrics, try on rentals, or plan your event with our team.",
    hours: "Open Mon – Sun, 10:00 AM – 9:00 PM",
  },
};

/** Saved homepage content merged over the defaults, so new fields always have a value. */
export async function getHomepage(): Promise<HomepageContent> {
  if (!hasDatabase()) return DEFAULT_HOMEPAGE;
  try {
    const rows = (await sql()`SELECT value FROM site_content WHERE key = 'homepage'`) as { value: Partial<HomepageContent> }[];
    return { ...DEFAULT_HOMEPAGE, ...(rows[0]?.value ?? {}) };
  } catch (err) {
    console.error("getHomepage failed, using defaults", err);
    return DEFAULT_HOMEPAGE;
  }
}

type ProductRow = {
  id: number; name: string; tier: Product["tier"]; size: Product["size"]; style: Product["style"];
  sale_type: Product["type"]; price: number; per_day: boolean; description: string; active: boolean; sort_order: number;
};

const toProduct = (r: ProductRow): Product => ({
  id: r.id, name: r.name, tier: r.tier, size: r.size, style: r.style, type: r.sale_type, price: r.price, perDay: r.per_day, desc: r.description,
});

/** Active costumes for the public catalog; falls back to the built-in list without a database. */
export async function getActiveProducts(): Promise<Product[]> {
  if (!hasDatabase()) return PRODUCTS;
  try {
    const rows = (await sql()`SELECT * FROM products WHERE active ORDER BY sort_order, id`) as ProductRow[];
    return rows.map(toProduct);
  } catch (err) {
    console.error("getActiveProducts failed, using built-in list", err);
    return PRODUCTS;
  }
}

export type AdminProduct = Product & { active: boolean; sortOrder: number };

export async function getAllProducts(): Promise<AdminProduct[]> {
  const rows = (await sql()`SELECT * FROM products ORDER BY sort_order, id`) as ProductRow[];
  return rows.map((r) => ({ ...toProduct(r), active: r.active, sortOrder: r.sort_order }));
}
