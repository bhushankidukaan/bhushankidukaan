import "server-only";
import { hasDatabase, sql } from "./db";
import { PRODUCTS, dummyPhoto, type Product, type Tier } from "./shop";

// Everything on the homepage that staff can edit from Admin → Website.
export type HomepageContent = {
  pill: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  stats: { label: string; value: string; sub: string }[];
  occasions: { heading: string; eyebrow: string; intro: string; cards: { tier: Tier; tagline: string; title: string; text: string }[] };
  services: { heading: string; eyebrow: string; intro: string; packages: { name: string; tag: string; text: string; items: string[]; cta: string; featured: boolean }[] };
  about: { heading: string; text: string; hours: string };
  gallery: { eyebrow: string; heading: string; intro: string; rows: GalleryRow[] };
};

export type GalleryItem = { title: string; caption: string; image: string };
export type GalleryRow = { eyebrow: string; title: string; icon: string; items: GalleryItem[] };

/** Most rows a gallery shows, and most photos per row (fixed so the admin form stays simple). */
export const GALLERY_ROWS = 6;
export const GALLERY_ITEMS = 8;

const g = (title: string, caption: string): GalleryItem => ({
  title,
  caption,
  image: dummyPhoto("bkd-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
});

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
    text: "Find us on Mahatma Phule Road, Shahapur, near Goaves Circle, above Bluestone Jewellers. Touch the fabrics, try on rentals, or plan your event with our team.",
    hours: "Open Mon – Sun, 10:00 AM – 9:00 PM",
  },
  gallery: {
    eyebrow: "Our Work",
    heading: "Moments We Have Styled",
    intro: "Swipe through weddings, ceremonies, festivals and stage shows we have dressed and decorated across Belagavi.",
    rows: [
      {
        eyebrow: "Weddings", title: "Wedding Decor & Rituals", icon: "favorite",
        items: [g("Mandap Decor", "Brass, marigold & drapes"), g("Haldi", "Yellow florals & seating"), g("Mehendi", "Colourful lounge setups"), g("Sangeet Night", "Stage, lights & sound"), g("Varmala Stage", "Floral entry & backdrop"), g("Reception", "Royal stage & lighting")],
      },
      {
        eyebrow: "Family Ceremonies", title: "Traditional Ceremonies", icon: "temple_hindu",
        items: [g("Upanayanam", "Thread ceremony setup"), g("Seemantha", "Baby shower decor"), g("Naamkaran", "Naming ceremony cradle"), g("Engagement", "Ring ceremony stage"), g("Griha Pravesh", "Housewarming toran & rangoli")],
      },
      {
        eyebrow: "Festivals & Community", title: "Festivals & Processions", icon: "celebration",
        items: [g("Ganesh Utsav", "Society pandals"), g("Navratri Garba", "Dandiya nights"), g("Shiv Jayanti", "Procession costumes"), g("Rajyotsava", "Kannada cultural shows"), g("Dhol-Tasha Troupes", "Matching troupe wear")],
      },
      {
        eyebrow: "Costumes", title: "Costumes in Action", icon: "checkroom",
        items: [g("Peshwai Sherwani", "Groom & procession"), g("Nauvari Saree", "Maharashtrian bridal"), g("Ilkal Silk", "North Karnataka classic"), g("Lavani", "Folk dance sets"), g("Yakshagana", "Stage & theatre"), g("Matching Family Sets", "Coordinated outfits")],
      },
      {
        eyebrow: "Kids & Schools", title: "School & Stage Shows", icon: "theater_comedy",
        items: [g("Annual Day", "Group dance costumes"), g("Fancy Dress", "Freedom fighters & heroes"), g("Krishna Janmashtami", "Little Krishna & Radha"), g("Independence Day", "Tricolour themes"), g("Folk Dance", "Regional dance wear")],
      },
    ],
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
  sale_type: Product["type"]; price: number; per_day: boolean; description: string; active: boolean; sort_order: number; image: string;
};

const toProduct = (r: ProductRow): Product => ({
  id: r.id, name: r.name, tier: r.tier, size: r.size, style: r.style, type: r.sale_type, price: r.price, perDay: r.per_day, desc: r.description, image: r.image ?? "",
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
