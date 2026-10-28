"use client";

import { waLink } from "@/lib/shop";
import { saveLead } from "@/lib/leads-client";
import Icon from "./Icon";
import { useShop } from "./ShopProvider";

const EVENT_TYPES = ["Traditional Wedding", "Upanayanam Ceremony", "Sangeet & Cultural Night", "Community Ganesh Utsav", "School Annual Day"];

const inputClass = "mt-1 w-full rounded-lg bg-white px-3 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold";
const labelClass = "block text-[11px] font-semibold uppercase tracking-wider text-muted";

export default function BookingModal() {
  const { packages, bookingPackage, closeBooking, showToast } = useShop();
  if (bookingPackage === undefined) return null;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      "Hello Bhushan Ki Dukaan, I'd like to book an event consultation.",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Event: ${f.get("event")}`,
      `Date: ${f.get("date")}`,
      `Package: ${f.get("package")}`,
      `Location: ${f.get("location")}`,
    ].join("\n");
    saveLead({
      kind: "booking",
      name: String(f.get("name")),
      phone: String(f.get("phone")),
      details: { event: f.get("event"), date: f.get("date"), package: f.get("package"), location: f.get("location") },
    });
    window.open(waLink(msg), "_blank", "noopener");
    closeBooking();
    showToast("Opening WhatsApp with your request…");
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={closeBooking} />
      <form onSubmit={submit} className="relative max-h-[90vh] w-full max-w-md space-y-3 overflow-y-auto rounded-xl bg-cream p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">Bhushan Ki Dukaan Events</span>
            <h3 className="font-serif text-3xl text-maroon-dark">Book Consultation</h3>
          </div>
          <button type="button" onClick={closeBooking} aria-label="Close" className="text-muted">
            <Icon name="close" />
          </button>
        </div>
        <label className={labelClass}>
          Your Name
          <input name="name" required className={inputClass} placeholder="e.g., Rajesh Patil" />
        </label>
        <label className={labelClass}>
          Phone
          <input name="phone" type="tel" required className={inputClass} placeholder="+91 XXXXX XXXXX" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className={labelClass}>
            Event
            <select name="event" className={inputClass}>
              {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className={labelClass}>
            Date
            <input name="date" type="date" required min={today} className={inputClass} />
          </label>
        </div>
        <label className={labelClass}>
          Package
          <select name="package" defaultValue={bookingPackage || "Not sure yet"} className={inputClass}>
            {packages.map((p) => <option key={p}>{p}</option>)}
            <option>Not sure yet</option>
          </select>
        </label>
        <label className={labelClass}>
          Location in Belagavi
          <input name="location" required className={inputClass} placeholder="e.g., Tilakwadi, Angol, Khade Bazar" />
        </label>
        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-maroon-dark py-3 text-xs font-semibold uppercase tracking-wider text-gold-light">
          <Icon name="chat" className="text-[18px]" /> Send Request on WhatsApp
        </button>
      </form>
    </div>
  );
}
