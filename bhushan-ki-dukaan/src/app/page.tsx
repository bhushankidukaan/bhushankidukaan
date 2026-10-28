import Catalog from "@/components/Catalog";
import Crest from "@/components/Crest";
import Icon from "@/components/Icon";
import { BagButton, BookButton, TierButton } from "@/components/ShopButtons";
import ShopProvider from "@/components/ShopProvider";
import { ADDRESS, PHONE_DISPLAY, PHONE_HREF, waLink, type Tier } from "@/lib/shop";

const NAV = [
  ["#tiers", "Collection Tiers"],
  ["#catalog", "Costume Store"],
  ["#services", "Event Services"],
  ["#about", "Belagavi Roots"],
];

const STATS = [
  ["Curated Costumes", "500+ Pieces", "Available on rent & buy"],
  ["Events Delivered", "120+ Events", "Weddings & cultural fests"],
  ["Family Collections", "100% Bespoke", "Matching family sets"],
  ["Consultation", "24 Hours", "Direct studio callback"],
];

const TIERS: { tier: Tier; icon: string; segment: string; title: string; text: string; featured?: boolean }[] = [
  { tier: "mass", icon: "theater_comedy", segment: "Festivals · School · Stage", title: "Festivals & School Events", text: "Annual day outfits, fancy dress, folk dance and dhol-tasha troupe wear - easy to rent by the day." },
  { tier: "premium", icon: "family_restroom", segment: "Upanayanam · Baby Showers · Family Functions", title: "Family Ceremonies", text: "Matching family sets and regional silks for weddings, Upanayanam and baby showers.", featured: true },
  { tier: "luxury", icon: "diamond", segment: "Weddings · Receptions · Sangeet", title: "Weddings & Bridal", text: "Bridal silks, Peshwai sherwanis, hand-tied safas and made-to-measure wedding wear." },
];

const SERVICES = [
  { pkg: "Community & Festival Events", tag: "Ganesh Utsav · Navratri · School Days", text: "Society Ganesh Utsav, Navratri pandals and school cultural days.", items: ["Marigold & mango-leaf decor", "Sound system & mic set", "Bulk costume supply & management"], cta: "Plan My Event" },
  { pkg: "Family Ceremonies", tag: "Upanayanam · Weddings at Home · Most Booked", text: "Belagavi traditional weddings and Upanayanam ceremonies.", items: ["Mandap decor with brass elements", "Bride & groom styling + costumes", "Shehnai / dhol-tasha arrangement"], cta: "Book Consultation", featured: true },
  { pkg: "Grand Weddings", tag: "Destination · Palace Themes · Processions", text: "Destination weddings, palace themes and wedding processions.", items: ["Palace-grade floral decor", "Custom heirloom attire tailoring", "Dedicated wedding concierge"], cta: "Plan My Wedding" },
];

const sectionHead = "font-serif text-4xl tracking-tight md:text-5xl";
const eyebrow = "mb-1 block text-xs font-semibold uppercase tracking-widest text-gold";

export default function Home() {
  return (
    <ShopProvider>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="flex h-24 items-center justify-between px-5 lg:px-16">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2">
              <Crest id="header" title="Bhushan Ki Dukaan crest" className="h-14 w-11 flex-shrink-0 drop-shadow-md" />
              <span className="flex flex-col">
                <span className="font-serif text-lg leading-none tracking-tight text-maroon-dark sm:text-2xl">BHUSHAN KI DUKAAN</span>
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-gold sm:text-[11px]">Traditional Events & Costumes</span>
              </span>
            </a>
            <nav className="hidden items-center gap-1 xl:flex">
              {NAV.map(([href, label]) => (
                <a key={href} href={href} className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-ink/70 transition-colors hover:text-maroon-dark">
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden flex-col text-right md:flex">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">Concierge Hotline</span>
              <a href={PHONE_HREF} className="font-semibold text-maroon-dark hover:text-gold">{PHONE_DISPLAY}</a>
            </div>
            <BookButton className="hidden rounded-lg bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-maroon-dark sm:inline-flex">
              Book Event
            </BookButton>
            <BagButton />
          </div>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-16 pt-8 lg:px-16">
          <div className="pointer-events-none absolute right-1/4 top-0 h-[700px] w-[700px] rounded-full bg-champagne/40 blur-[130px]" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cream-dark px-4 py-1 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-maroon-dark">Belagavi&apos;s Event Management & Costume Specialists</span>
            </div>

            <div className="relative mb-10 flex min-h-[460px] w-full items-end overflow-hidden rounded-xl bg-gradient-to-br from-maroon via-maroon-dark to-espresso shadow-2xl md:min-h-[420px]">
              <Crest id="hero" className="absolute right-4 top-4 h-24 w-20 opacity-90 drop-shadow-2xl md:right-16 md:top-1/2 md:h-60 md:w-52 md:-translate-y-1/2" />
              <div className="relative w-full p-5 sm:p-8 md:p-10">
                <div className="max-w-2xl">
                  <span className="mb-1 inline-block text-[11px] font-semibold uppercase tracking-widest text-champagne">Flagship Collection 2026</span>
                  <h1 className="font-serif text-[40px] leading-[1.1] tracking-tight text-white md:text-6xl">
                    From Timeless Traditions to Grand Celebrations.
                  </h1>
                  <p className="mt-2 max-w-xl text-white/80">
                    Rent or buy authentic traditional costumes and book full-scale event management for weddings, festivals and cultural ceremonies in Belagavi.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href="#catalog" className="inline-flex items-center gap-1 rounded-lg bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-gold-light">
                    <Icon name="search" className="text-[18px]" /> Explore Costumes
                  </a>
                  <BookButton className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-maroon-dark shadow-md transition-colors hover:bg-white">
                    <Icon name="calendar_month" className="text-[18px]" /> Book Consultation
                  </BookButton>
                </div>
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-6 rounded-xl bg-sand p-6 shadow-sm md:grid-cols-4">
              {STATS.map(([label, value, sub]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">{label}</span>
                  <span className="mt-1 font-serif text-3xl text-maroon-dark">{value}</span>
                  <span className="text-sm text-ink/70">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Catalog />

        {/* Tiers */}
        <section id="tiers" className="scroll-mt-24 px-5 py-14 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className={eyebrow}>Something for Every Celebration</span>
              <h2 className={`${sectionHead} text-maroon-dark`}>Shop by Occasion</h2>
              <p className="mt-2 text-muted">From a school stage play to your wedding day - wear it once on rent, or make it yours to keep.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {TIERS.map((t) => (
                <TierButton
                  key={t.tier}
                  tier={t.tier}
                  className={`group rounded-xl bg-white p-6 text-left transition-shadow hover:shadow-xl ${t.featured ? "shadow-md ring-2 ring-gold" : "shadow-sm"}`}
                >
                  <Icon name={t.icon} className="text-[32px] text-gold" />
                  <span className="mt-2 block text-[11px] font-semibold uppercase tracking-widest text-muted">{t.segment}</span>
                  <span className="mt-1 block font-serif text-2xl text-maroon-dark">{t.title}</span>
                  <span className="mt-1 block text-sm text-ink/70">{t.text}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold group-hover:text-maroon-dark">
                    View Collection <Icon name="arrow_forward" className="text-[16px]" />
                  </span>
                </TierButton>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-24 bg-sand px-5 py-14 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className={eyebrow}>End-to-End Curation</span>
              <h2 className={`${sectionHead} text-maroon-dark`}>Event Management Packages</h2>
              <p className="mt-2 text-muted">Traditional weddings, thread ceremonies, Ganesh Utsav pandals and sangeet nights across Belagavi.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <div key={s.pkg} className={`flex flex-col rounded-xl p-6 ${s.featured ? "bg-maroon-dark text-white shadow-xl ring-2 ring-gold" : "bg-white shadow-sm"}`}>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">{s.tag}</span>
                  <h3 className={`mt-1 font-serif text-3xl ${s.featured ? "text-gold-light" : "text-maroon-dark"}`}>{s.pkg}</h3>
                  <p className={`mt-1 text-sm ${s.featured ? "text-white/75" : "text-ink/70"}`}>{s.text}</p>
                  <ul className="mt-4 flex-1 space-y-2 text-sm">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Icon name="check" className="text-[18px] text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <BookButton
                    pkg={s.pkg}
                    className={`mt-6 rounded-lg py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      s.featured ? "bg-gold text-white hover:bg-gold-light" : "bg-cream-dark text-maroon-dark hover:bg-maroon-dark hover:text-white"
                    }`}
                  >
                    {s.cta}
                  </BookButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 bg-maroon-dark px-5 py-14 text-white lg:px-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className={eyebrow}>Proudly Rooted in Belagavi</span>
              <h2 className={sectionHead}>
                Visit Our Flagship <span className="italic text-gold-light">Studio</span>
              </h2>
              <p className="mt-3 text-white/75">
                Find us in the heart of Belagavi at Khade Bazar & Maruti Galli. Touch the fabrics, try on rentals, or plan your event with our team.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="flex items-center gap-2"><Icon name="location_on" className="text-[18px] text-gold" />{ADDRESS}</p>
                <p className="flex items-center gap-2"><Icon name="schedule" className="text-[18px] text-gold" />Open Mon – Sun, 10:00 AM – 9:00 PM</p>
                <p className="flex items-center gap-2"><Icon name="call" className="text-[18px] text-gold" /><a href={PHONE_HREF} className="hover:text-gold">{PHONE_DISPLAY}</a></p>
              </div>
            </div>
            <div className="rounded-xl bg-maroon p-6 shadow-xl ring-1 ring-gold/40">
              <h3 className="font-serif text-2xl text-gold-light">Quick Assistance</h3>
              <p className="mt-1 text-sm text-white/75">Need help with costume sizing or event dates? Talk to our Belagavi team directly.</p>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-gold-light">
                  <Icon name="call" className="text-[18px]" /> Call Us Now
                </a>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:opacity-90">
                  <Icon name="chat" className="text-[18px]" /> WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-espresso px-5 pb-28 pt-12 text-white/70 sm:pb-12 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col items-center gap-1 text-center">
            <Crest id="footer" title="Bhushan Ki Dukaan crest" className="h-20 w-16" />
            <span className="font-serif text-2xl tracking-wide text-gold-light">BHUSHAN KI DUKAAN</span>
            <span className="text-[11px] font-semibold uppercase tracking-widest">Traditional Events & Costumes</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold uppercase tracking-wider sm:grid-cols-4">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 rounded-lg bg-whatsapp py-3 text-white"><Icon name="chat" />WhatsApp</a>
            <BookButton className="flex flex-col items-center gap-1 rounded-lg bg-gold py-3 text-white"><Icon name="calendar_month" />Book Event</BookButton>
            <a href="#catalog" className="flex flex-col items-center gap-1 rounded-lg bg-maroon py-3 text-gold-light"><Icon name="checkroom" />Catalog</a>
            <a href={PHONE_HREF} className="flex flex-col items-center gap-1 rounded-lg bg-maroon-dark py-3 text-white"><Icon name="call" />Call Us</a>
          </div>
          <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-sm sm:flex-row">
            <p>&copy; 2026 Bhushan Ki Dukaan, Belagavi, Karnataka.</p>
            <p>Khade Bazar & Maruti Galli · {PHONE_DISPLAY}</p>
          </div>
        </div>
      </footer>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around bg-cream/95 px-4 py-2 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] backdrop-blur-md sm:hidden">
        <a href="#catalog" className="flex flex-col items-center text-[11px] font-semibold text-maroon-dark"><Icon name="checkroom" />Costumes</a>
        <a href="#services" className="flex flex-col items-center text-[11px] font-semibold text-ink/70"><Icon name="celebration" />Events</a>
        <BookButton className="rounded-lg bg-maroon-dark px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold-light">Book Now</BookButton>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-[11px] font-semibold text-emerald"><Icon name="chat" />WhatsApp</a>
      </div>
    </ShopProvider>
  );
}
