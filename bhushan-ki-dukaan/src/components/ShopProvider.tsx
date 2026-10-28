"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Product, Tier } from "@/lib/shop";
import CartDrawer from "./CartDrawer";
import BookingModal from "./BookingModal";

type CartLine = { id: number; qty: number };

type Shop = {
  products: Product[];
  packages: string[];
  cart: CartLine[];
  cartCount: number;
  addToCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  // undefined = closed, "" = open with no package preselected
  bookingPackage: string | undefined;
  openBooking: (pkg?: string) => void;
  closeBooking: () => void;
  tier: Tier | "all";
  setTier: (tier: Tier | "all") => void;
  showToast: (msg: string) => void;
};

const ShopContext = createContext<Shop | null>(null);

export function useShop() {
  const shop = useContext(ShopContext);
  if (!shop) throw new Error("useShop must be used inside <ShopProvider>");
  return shop;
}

export default function ShopProvider({
  children,
  products,
  packages,
}: {
  children: React.ReactNode;
  products: Product[];
  packages: string[];
}) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState<string | undefined>(undefined);
  const [tier, setTier] = useState<Tier | "all">("all");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = useCallback(
    (id: number) => {
      setCart((c) =>
        c.some((l) => l.id === id) ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...c, { id, qty: 1 }],
      );
      const p = products.find((x) => x.id === id);
      if (p) showToast(`Added "${p.name}" to your bag`);
    },
    [products, showToast],
  );

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((c) => c.map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setBookingPackage(undefined);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const shop: Shop = {
    products,
    packages,
    cart,
    cartCount: cart.reduce((s, l) => s + l.qty, 0),
    addToCart,
    changeQty,
    cartOpen,
    setCartOpen,
    bookingPackage,
    openBooking: (pkg = "") => setBookingPackage(pkg),
    closeBooking: () => setBookingPackage(undefined),
    tier,
    setTier,
    showToast,
  };

  return (
    <ShopContext.Provider value={shop}>
      {children}
      <CartDrawer />
      <BookingModal />
      <div
        role="status"
        className={`fixed top-28 left-1/2 -translate-x-1/2 z-[70] max-w-[90vw] rounded-lg bg-maroon-dark px-4 py-2.5 text-center text-sm text-gold-light shadow-2xl transition-opacity duration-300 pointer-events-none ${toast ? "opacity-100" : "opacity-0"}`}
      >
        {toast}
      </div>
    </ShopContext.Provider>
  );
}
