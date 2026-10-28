"use client";

import { useState } from "react";
import { TIER_LABEL, TYPE_BADGE, priceLabel, waLink, type Product, type Tier } from "@/lib/shop";
import Crest from "./Crest";
import Icon from "./Icon";
import ScrollRow from "./ScrollRow";
import { useShop } from "./ShopProvider";

type Filters = { size: string; style: string; budget: string; type: string };
const NO_FILTERS: Filters = { size: "all", style: "all", budget: "all", type: "all" };

const SELECTS: { key: keyof Filters; label: string; icon: string; options: [string, string][] }[] = [
  { key: "size", label: "Size / Fit", icon: "straighten", options: [["all", "Any Size"], ["kids", "Kids"], ["adult", "Adult"], ["custom", "Custom Tailoring"]] },
  { key: "style", label: "Style", icon: "explore", options: [["all", "All Styles"], ["traditional", "Traditional / Royal"], ["folk", "Folk / Dance"], ["festive", "Festive Wear"], ["bridal", "Bridal Wear"]] },
  { key: "budget", label: "Price Range", icon: "payments", options: [["all", "Any Price"], ["under-1k", "Under ₹1,000"], ["1k-5k", "₹1,000 - ₹5,000"], ["5k-15k", "₹5,000 - ₹15,000"], ["above-15k", "₹15,000+"]] },
  { key: "type", label: "Rent or Buy", icon: "sell", options: [["all", "Rent or Buy"], ["rent", "Rent"], ["buy", "Buy"], ["bespoke", "Made to Measure"]] },
];

const TIERS: (Tier | "all")[] = ["all", "mass", "premium", "luxury"];

function matches(p: Product, tier: Tier | "all", f: Filters) {
  if (tier !== "all" && p.tier !== tier) return false;
  if (f.size !== "all" && p.size !== f.size) return false;
  if (f.style !== "all" && p.style !== f.style) return false;
  const v = p.price;
  if (f.budget === "under-1k" && v >= 1000) return false;
  if (f.budget === "1k-5k" && (v < 1000 || v > 5000)) return false;
  if (f.budget === "5k-15k" && (v < 5000 || v > 15000)) return false;
  if (f.budget === "above-15k" && v < 15000) return false;
  if (f.type === "rent" && p.type !== "rent" && p.type !== "both") return false;
  if (f.type === "buy" && p.type !== "buy" && p.type !== "both") return false;
  if (f.type === "bespoke" && p.type !== "bespoke") return false;
  return true;
}

export default function Catalog() {
  const { products, tier, setTier } = useShop();
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const list = products.filter((p) => matches(p, tier, filters));
  const browsing = tier === "all" && Object.values(filters).every((v) => v === "all");
  const count = (t: Tier | "all") => (t === "all" ? products.length : products.filter((p) => p.tier === t).length);

  return (
    <section id="catalog" className="scroll-mt-24 bg-cream px-5 py-14 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
          <div>
            <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gold">
              <Icon name="tune" className="text-[16px]" /> Costume Finder
            </span>
            <h2 className="font-serif text-4xl tracking-tight text-maroon-dark md:text-5xl">Traditional Costumes Catalog</h2>
          </div>
          <p className="text-sm text-muted">
            Showing {list.length} of {products.length} pieces
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 rounded-xl bg-white p-4 shadow-md sm:p-6">
          <div className="flex flex-wrap gap-1.5 pb-4">
            {TIERS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  tier === t ? "bg-maroon-dark text-white shadow-sm" : "bg-cream-dark text-muted hover:text-maroon-dark"
                }`}
              >
                {t === "all" ? "All" : TIER_LABEL[t]} ({count(t)})
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {SELECTS.map((s) => (
              <label key={s.key} className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{s.label}</span>
                <span className="relative rounded-lg bg-cream shadow-sm">
                  <select
                    value={filters[s.key]}
                    onChange={(e) => setFilters({ ...filters, [s.key]: e.target.value })}
                    className="w-full cursor-pointer appearance-none bg-transparent px-3 py-2.5 pr-8 text-sm text-maroon-dark focus:outline-none"
                  >
                    {s.options.map(([value, text]) => (
                      <option key={value} value={value}>{text}</option>
                    ))}
                  </select>
                  <Icon name={s.icon} className="pointer-events-none absolute right-2.5 top-2.5 text-[18px] text-muted" />
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setFilters(NO_FILTERS);
                setTier("all");
              }}
              className="text-xs font-semibold uppercase tracking-wider text-gold underline hover:text-maroon-dark"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Grid */}
        {browsing ? (
          // No filters: one sideways row per occasion, like a store shelf
          TIERS.slice(1).map((t) => {
            const row = products.filter((p) => p.tier === t);
            if (!row.length) return null;
            return (
              <ScrollRow
                key={t}
                title={TIER_LABEL[t as Tier]}
                eyebrow={`${row.length} pieces`}
                action={
                  <button type="button" onClick={() => setTier(t)} className="text-xs font-semibold uppercase tracking-wider text-gold underline hover:text-maroon-dark">
                    View all
                  </button>
                }
              >
                {row.map((p) => (
                  <div key={p.id} className="flex w-[78%] flex-shrink-0 snap-start sm:w-[45%] lg:w-[30%]">
                    <ProductCard p={p} />
                  </div>
                ))}
              </ScrollRow>
            );
          })
        ) : list.length === 0 ? (
          <div className="py-12 text-center">
            <Icon name="search_off" className="text-[40px] text-muted" />
            <p className="mt-2 font-semibold text-maroon-dark">No costumes match these filters</p>
            <p className="text-sm text-muted">Try resetting the filters, or ask us on WhatsApp - we may have it in the studio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  const { addToCart } = useShop();
  const badge = TYPE_BADGE[p.type];
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-xl">
    {/* Photo slot: crest tile until real costume photos are added */}
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-maroon-light via-maroon to-maroon-dark">
      {p.image ? (
          // Photos are plain links set in Admin, so no Next image optimisation
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <Crest id={`card-${p.id}`} className="h-28 w-24 opacity-90 transition-transform duration-500 group-hover:scale-105" />
        )}
      <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-sm ${badge.className}`}>
        <Icon name={badge.icon} className="text-[13px]" /> {badge.label}
      </span>
      <span className="absolute bottom-3 right-3 rounded bg-cream/95 px-2 py-0.5 text-[11px] font-semibold uppercase text-maroon-dark shadow-sm">
        {TIER_LABEL[p.tier]}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <h3 className="font-serif text-2xl leading-tight text-maroon-dark transition-colors group-hover:text-gold">{p.name}</h3>
      <p className="mt-1 flex-1 text-sm text-ink/70">{p.desc}</p>
      <div className="mt-4">
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted">{p.perDay ? "Rental Price" : "Price"}</span>
        <span className="font-serif text-2xl font-semibold text-maroon-dark">{priceLabel(p)}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-1.5">
        <a
          href={waLink(`Hello Bhushan Ki Dukaan, I want to inquire about: ${p.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 rounded bg-whatsapp px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
        >
          <Icon name="chat" className="text-[15px]" /> WhatsApp
        </a>
        <button
          type="button"
          onClick={() => addToCart(p.id)}
          className="rounded bg-maroon-dark px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-maroon"
        >
          Add to Bag
        </button>
      </div>
    </div>
  </article>
  );
}
