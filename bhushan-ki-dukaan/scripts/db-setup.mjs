// Creates the tables in db/schema.sql and seeds the costume catalog if it is empty.
// Usage: npm run db:setup   (reads DATABASE_URL from .env.local)
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}
const sql = neon(url);

const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8")
  .replace(/--.*$/gm, "")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of schema) await sql.query(statement);
console.log(`Applied ${schema.length} schema statements.`);

// Seed the catalog the site launched with
const [{ count }] = await sql`SELECT count(*)::int AS count FROM products`;
if (count === 0) {
  const seed = [
    ["Kids Folk Dance Costume Set", "mass", "kids", "folk", "rent", 499, true, "Bright folk troupe wear for school annual days and dance performances."],
    ["Navratri Garba Chaniya Choli", "mass", "adult", "festive", "both", 899, false, "Mirror-work Garba attire for Navratri pandals and cultural days."],
    ["School Annual Day Historical Costume", "mass", "kids", "traditional", "rent", 399, true, "Kings, queens, freedom fighters and saints for school stage plays."],
    ["Dhol-Tasha Troupe Festive Vest", "mass", "adult", "festive", "rent", 299, true, "Matching vests and safas for dhol-tasha pathaks - bulk rental welcome."],
    ["Father-Son Matching Kurta Combo", "premium", "adult", "festive", "buy", 3499, false, "Coordinated silk-blend kurtas for weddings and family functions."],
    ["Mother-Daughter Paithani Silk Set", "premium", "adult", "traditional", "buy", 6999, false, "Paithani-bordered silk saree with a matching pavadai for the little one."],
    ["Upanayanam Silk Dhoti Set", "premium", "kids", "traditional", "buy", 1899, false, "Traditional silk dhoti and angavastram for the thread ceremony."],
    ["Festive Silk Kurta & Nehru Jacket", "premium", "adult", "festive", "both", 2499, false, "Elegant kurta with a brocade Nehru jacket for sangeet and receptions."],
    ["Royal Peshwai Sherwani with Safa", "luxury", "adult", "traditional", "both", 8999, false, "Peshwai-style sherwani with hand-tied safa and accessories."],
    ["Pure Kanjeevaram Bridal Silk Saree", "luxury", "custom", "bridal", "bespoke", 24999, false, "Handwoven pure zari Kanjeevaram for the bride, with blouse tailoring."],
    ["Handloom Banarasi Heirloom Lehenga", "luxury", "custom", "bridal", "bespoke", 18500, false, "Banarasi brocade lehenga made to measure in our atelier."],
    ["Groom Velvet Jodhpuri Suit Set", "luxury", "custom", "bridal", "buy", 12999, false, "Velvet bandhgala with embroidered detailing, tailored to fit."],
  ];
  for (const [i, [name, tier, size, style, saleType, price, perDay, description]] of seed.entries()) {
    // Placeholder photo until real ones are added in Admin
    const image = `https://picsum.photos/seed/bkd-costume-${i + 1}/800/500`;
    await sql`INSERT INTO products (name, tier, size, style, sale_type, price, per_day, description, sort_order, image)
              VALUES (${name}, ${tier}, ${size}, ${style}, ${saleType}, ${price}, ${perDay}, ${description}, ${i}, ${image})`;
  }
  console.log(`Seeded ${seed.length} costumes.`);
} else {
  console.log(`Catalog already has ${count} costumes; not seeding.`);
}
