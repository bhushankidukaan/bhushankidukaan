export const WHATSAPP_NUMBER = "919740639809";
export const PHONE_DISPLAY = "+91 97406 39809";
export const PHONE_HREF = "tel:+919740639809";
export const ADDRESS = "3rd Floor, Mahatma Phule Rd, near Goaves Circle, above Bluestone Jewellers, Shastri Nagar, Shahapur, Belagavi, Karnataka 590003";

export type Tier = "mass" | "premium" | "luxury";
export type Size = "kids" | "adult" | "custom";
export type Style = "traditional" | "folk" | "festive" | "bridal";
// rent: rental only, both: rent or buy, buy: purchase, bespoke: made to order
export type SaleType = "rent" | "both" | "buy" | "bespoke";

export type Product = {
  id: number;
  name: string;
  tier: Tier;
  size: Size;
  style: Style;
  type: SaleType;
  price: number;
  perDay: boolean;
  desc: string;
};

export const TIER_LABEL: Record<Tier, string> = {
  mass: "Festivals & School",
  premium: "Family Ceremonies",
  luxury: "Weddings & Bridal",
};

export const TYPE_BADGE: Record<SaleType, { label: string; icon: string; className: string }> = {
  rent: { label: "On Rent", icon: "verified", className: "bg-emerald text-white" },
  both: { label: "Rent or Buy", icon: "military_tech", className: "bg-gold text-white" },
  buy: { label: "Purchase", icon: "check_circle", className: "bg-emerald text-white" },
  bespoke: { label: "Bespoke", icon: "diamond", className: "bg-maroon-dark text-gold-light" },
};

export const PRODUCTS: Product[] = [
  { id: 1, name: "Kids Folk Dance Costume Set", tier: "mass", size: "kids", style: "folk", type: "rent", price: 499, perDay: true, desc: "Bright folk troupe wear for school annual days and dance performances." },
  { id: 2, name: "Navratri Garba Chaniya Choli", tier: "mass", size: "adult", style: "festive", type: "both", price: 899, perDay: false, desc: "Mirror-work Garba attire for Navratri pandals and cultural days." },
  { id: 3, name: "School Annual Day Historical Costume", tier: "mass", size: "kids", style: "traditional", type: "rent", price: 399, perDay: true, desc: "Kings, queens, freedom fighters and saints for school stage plays." },
  { id: 4, name: "Dhol-Tasha Troupe Festive Vest", tier: "mass", size: "adult", style: "festive", type: "rent", price: 299, perDay: true, desc: "Matching vests and safas for dhol-tasha pathaks - bulk rental welcome." },
  { id: 5, name: "Father-Son Matching Kurta Combo", tier: "premium", size: "adult", style: "festive", type: "buy", price: 3499, perDay: false, desc: "Coordinated silk-blend kurtas for weddings and family functions." },
  { id: 6, name: "Mother-Daughter Paithani Silk Set", tier: "premium", size: "adult", style: "traditional", type: "buy", price: 6999, perDay: false, desc: "Paithani-bordered silk saree with a matching pavadai for the little one." },
  { id: 7, name: "Upanayanam Silk Dhoti Set", tier: "premium", size: "kids", style: "traditional", type: "buy", price: 1899, perDay: false, desc: "Traditional silk dhoti and angavastram for the thread ceremony." },
  { id: 8, name: "Festive Silk Kurta & Nehru Jacket", tier: "premium", size: "adult", style: "festive", type: "both", price: 2499, perDay: false, desc: "Elegant kurta with a brocade Nehru jacket for sangeet and receptions." },
  { id: 9, name: "Royal Peshwai Sherwani with Safa", tier: "luxury", size: "adult", style: "traditional", type: "both", price: 8999, perDay: false, desc: "Peshwai-style sherwani with hand-tied safa and accessories." },
  { id: 10, name: "Pure Kanjeevaram Bridal Silk Saree", tier: "luxury", size: "custom", style: "bridal", type: "bespoke", price: 24999, perDay: false, desc: "Handwoven pure zari Kanjeevaram for the bride, with blouse tailoring." },
  { id: 11, name: "Handloom Banarasi Heirloom Lehenga", tier: "luxury", size: "custom", style: "bridal", type: "bespoke", price: 18500, perDay: false, desc: "Banarasi brocade lehenga made to measure in our atelier." },
  { id: 12, name: "Groom Velvet Jodhpuri Suit Set", tier: "luxury", size: "custom", style: "bridal", type: "buy", price: 12999, perDay: false, desc: "Velvet bandhgala with embroidered detailing, tailored to fit." },
];

export const PACKAGES = ["Community & Festival Events", "Family Ceremonies", "Grand Weddings"] as const;

export const rupees = (n: number) => "₹" + n.toLocaleString("en-IN");

export function priceLabel(p: Product) {
  if (p.perDay) return `${rupees(p.price)} / day`;
  if (p.type === "both" || p.type === "bespoke") return `${rupees(p.price)} onwards`;
  return rupees(p.price);
}

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}` + (text ? `?text=${encodeURIComponent(text)}` : "");
