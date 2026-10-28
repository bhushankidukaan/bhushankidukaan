"use client";

import type { Tier } from "@/lib/shop";
import Icon from "./Icon";
import { useShop } from "./ShopProvider";

type ButtonProps = { className?: string; children: React.ReactNode };

/** Opens the consultation form, optionally with a package preselected. */
export function BookButton({ pkg, className, children }: ButtonProps & { pkg?: string }) {
  const { openBooking } = useShop();
  return (
    <button type="button" onClick={() => openBooking(pkg)} className={className}>
      {children}
    </button>
  );
}

/** Selects a tier in the catalog and scrolls to it. */
export function TierButton({ tier, className, children }: ButtonProps & { tier: Tier }) {
  const { setTier } = useShop();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        setTier(tier);
        document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </button>
  );
}

export function BagButton() {
  const { cartCount, setCartOpen } = useShop();
  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label={`Open bag (${cartCount} items)`}
      className="relative flex items-center gap-1 rounded-lg p-1 transition-colors hover:bg-cream-dark lg:pr-2"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon-dark">
        <Icon name="shopping_bag" className="text-[20px] text-gold-light" />
      </span>
      <span className="hidden text-[11px] font-semibold uppercase tracking-wider lg:inline">Your Bag</span>
      {cartCount > 0 && (
        <span className="absolute -top-0.5 left-7 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-white">
          {cartCount}
        </span>
      )}
    </button>
  );
}
