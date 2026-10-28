"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { DEFAULT_HOMEPAGE, GALLERY_ITEMS, GALLERY_ROWS, type GalleryRow, type HomepageContent } from "@/lib/content";
import { sql } from "@/lib/db";

export type SaveState = { ok?: boolean; error?: string } | undefined;

const str = (f: FormData, k: string, max = 400) => String(f.get(k) ?? "").trim().slice(0, max);
// Photo links must be web links or files in /public, never javascript: or data: URLs
const imageUrl = (v: string) => (/^(https:\/\/|\/(?!\/))/.test(v) ? v : "");
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** The gallery editor posts its rows as JSON; rebuild them field by field so nothing unexpected is stored. */
function parseGallery(json: string): GalleryRow[] {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    return DEFAULT_HOMEPAGE.gallery.rows;
  }
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, GALLERY_ROWS).flatMap((row) => {
    const title = clip(row?.title, 60);
    if (!title) return [];
    const items = (Array.isArray(row.items) ? row.items : []).slice(0, GALLERY_ITEMS).flatMap((it: Record<string, unknown>) => {
      const itemTitle = clip(it?.title, 60);
      return itemTitle ? [{ title: itemTitle, caption: clip(it.caption, 80), image: imageUrl(clip(it.image, 600)) }] : [];
    });
    return [{ eyebrow: clip(row.eyebrow, 60), title, icon: clip(row.icon, 40).replace(/[^a-z_]/g, "") || "photo_camera", items }];
  });
}

export async function saveHomepage(_: SaveState, f: FormData): Promise<SaveState> {
  const user = await requireUser("website");
  const d = DEFAULT_HOMEPAGE;
  const content: HomepageContent = {
    pill: str(f, "pill", 120),
    hero: { eyebrow: str(f, "hero.eyebrow", 80), title: str(f, "hero.title", 160), subtitle: str(f, "hero.subtitle", 400) },
    stats: d.stats.map((_, i) => ({ label: str(f, `stats.${i}.label`, 40), value: str(f, `stats.${i}.value`, 40), sub: str(f, `stats.${i}.sub`, 60) })),
    occasions: {
      eyebrow: str(f, "occasions.eyebrow", 80),
      heading: str(f, "occasions.heading", 80),
      intro: str(f, "occasions.intro", 300),
      cards: d.occasions.cards.map((c, i) => ({
        tier: c.tier,
        tagline: str(f, `occasions.${i}.tagline`, 80),
        title: str(f, `occasions.${i}.title`, 60),
        text: str(f, `occasions.${i}.text`, 300),
      })),
    },
    services: {
      eyebrow: str(f, "services.eyebrow", 80),
      heading: str(f, "services.heading", 80),
      intro: str(f, "services.intro", 300),
      packages: d.services.packages.map((_, i) => ({
        name: str(f, `services.${i}.name`, 60),
        tag: str(f, `services.${i}.tag`, 80),
        text: str(f, `services.${i}.text`, 300),
        items: str(f, `services.${i}.items`, 600).split("\n").map((s) => s.trim()).filter(Boolean),
        cta: str(f, `services.${i}.cta`, 30),
        featured: f.get("services.featured") === String(i),
      })),
    },
    about: { heading: str(f, "about.heading", 80), text: str(f, "about.text", 400), hours: str(f, "about.hours", 80) },
    gallery: {
      eyebrow: str(f, "gallery.eyebrow", 80),
      heading: str(f, "gallery.heading", 80),
      intro: str(f, "gallery.intro", 300),
      rows: parseGallery(String(f.get("gallery.rows") ?? "[]")),
    },
  };

  if (!content.hero.title || content.services.packages.some((p) => !p.name)) {
    return { error: "The hero title and every package name are required." };
  }

  await sql()`
    INSERT INTO site_content (key, value, updated_at, updated_by)
    VALUES ('homepage', ${JSON.stringify(content)}::jsonb, now(), ${user.id})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now(), updated_by = EXCLUDED.updated_by`;
  revalidatePath("/");
  return { ok: true };
}

const TIERS = ["mass", "premium", "luxury"];
const SIZES = ["kids", "adult", "custom"];
const STYLES = ["traditional", "folk", "festive", "bridal"];
const TYPES = ["rent", "both", "buy", "bespoke"];
const pick = (v: string, allowed: string[]) => (allowed.includes(v) ? v : allowed[0]);

/** Creates a costume (no id) or updates one. */
export async function saveProduct(_: SaveState, f: FormData): Promise<SaveState> {
  await requireUser("website");
  const id = Number(f.get("id") || 0);
  const name = str(f, "name", 120);
  const price = Math.round(Number(f.get("price")));
  if (!name) return { error: "Name is required." };
  if (!Number.isFinite(price) || price < 0) return { error: "Enter a valid price in rupees." };
  const row = {
    tier: pick(str(f, "tier"), TIERS),
    size: pick(str(f, "size"), SIZES),
    style: pick(str(f, "style"), STYLES),
    saleType: pick(str(f, "sale_type"), TYPES),
    perDay: f.get("per_day") === "on",
    active: f.get("active") === "on",
    description: str(f, "description", 400),
    sortOrder: Math.round(Number(f.get("sort_order") || 0)),
    image: imageUrl(str(f, "image", 600)),
  };
  if (id) {
    await sql()`
      UPDATE products SET name = ${name}, tier = ${row.tier}, size = ${row.size}, style = ${row.style}, sale_type = ${row.saleType},
        price = ${price}, per_day = ${row.perDay}, description = ${row.description}, sort_order = ${row.sortOrder},
        active = ${row.active}, image = ${row.image}, updated_at = now()
      WHERE id = ${id}`;
  } else {
    await sql()`
      INSERT INTO products (name, tier, size, style, sale_type, price, per_day, description, sort_order, active, image)
      VALUES (${name}, ${row.tier}, ${row.size}, ${row.style}, ${row.saleType}, ${price}, ${row.perDay}, ${row.description}, ${row.sortOrder}, ${row.active}, ${row.image})`;
  }
  revalidatePath("/");
  revalidatePath("/admin/website/costumes");
  return { ok: true };
}

/** Permanently removes a costume. Old inquiries keep their own copy of the item names. */
export async function deleteProduct(f: FormData) {
  await requireUser("website");
  const id = Number(f.get("id") || 0);
  if (id) await sql()`DELETE FROM products WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/website/costumes");
}
