"use client";

import { PRODUCTS, priceLabel, rupees, waLink } from "@/lib/shop";
import Crest from "./Crest";
import Icon from "./Icon";
import { useShop } from "./ShopProvider";

export default function CartDrawer() {
  const { cart, changeQty, cartOpen, setCartOpen, showToast } = useShop();
  if (!cartOpen) return null;

  const lines = cart.map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id)! }));
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  function checkout() {
    if (!lines.length) {
      showToast("Your bag is empty");
      return;
    }
    const items = lines.map((l) => `- ${l.product.name} x ${l.qty} (${priceLabel(l.product)})`).join("\n");
    window.open(
      waLink(`Hello Bhushan Ki Dukaan, I'd like to order / rent:\n${items}\nEstimated total: ${rupees(total)}`),
      "_blank",
      "noopener",
    );
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between bg-maroon-dark px-6 py-4">
          <h3 className="font-serif text-2xl text-gold-light">Your Bag</h3>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close bag" className="text-white">
            <Icon name="close" />
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-6">
          {!lines.length && (
            <div className="py-10 text-center text-muted">
              <Icon name="shopping_bag" className="text-[40px]" />
              <p className="mt-1 text-sm">Your bag is empty.</p>
            </div>
          )}
          {lines.map(({ product: p, qty }) => (
            <div key={p.id} className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded bg-gradient-to-br from-maroon to-maroon-dark">
                <Crest id={`cart-${p.id}`} className="h-10 w-9" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-maroon-dark">{p.name}</p>
                <p className="text-sm text-muted">{priceLabel(p)}</p>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => changeQty(p.id, -1)} aria-label="Decrease" className="h-7 w-7 rounded bg-cream-dark font-semibold">−</button>
                <span className="w-6 text-center font-semibold">{qty}</span>
                <button type="button" onClick={() => changeQty(p.id, 1)} aria-label="Increase" className="h-7 w-7 rounded bg-cream-dark font-semibold">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 bg-cream-dark p-6">
          <div className="flex justify-between font-semibold text-maroon-dark">
            <span>Estimated total</span>
            <span>{rupees(total)}</span>
          </div>
          <p className="text-sm text-muted">Rental days and sizes are confirmed with you on WhatsApp.</p>
          <button
            type="button"
            onClick={checkout}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 text-xs font-semibold uppercase tracking-wider text-white"
          >
            <Icon name="chat" className="text-[18px]" /> Send Order on WhatsApp
          </button>
        </div>
      </aside>
    </div>
  );
}
