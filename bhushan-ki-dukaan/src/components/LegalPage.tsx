import Link from "next/link";
import { POLICY } from "@/lib/policies";
import Crest from "./Crest";
import SiteLegalLinks from "./SiteLegalLinks";

/** Shared layout for the policy pages: small header, readable text column, policy links. */
export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-champagne bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-3xl items-center px-5">
          <Link href="/" className="flex items-center gap-2">
            <Crest id="legal-header" title="Bhushan Ki Dukaan crest" className="h-12 w-10" />
            <span className="flex flex-col">
              <span className="font-serif text-xl leading-none text-maroon-dark">BHUSHAN KI DUKAAN</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gold">Event Management & Costumes</span>
            </span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-10">
        <Link href="/" className="text-xs font-semibold uppercase tracking-wider text-gold hover:text-maroon-dark">← Back to home</Link>
        <h1 className="mt-3 font-serif text-4xl text-maroon-dark md:text-5xl">{title}</h1>
        <p className="mt-1 text-sm text-muted">Last updated: {POLICY.lastUpdated}</p>
        <div className="mt-8 space-y-4 text-[15px] leading-7 text-ink/85 [&_a]:text-maroon [&_a]:underline [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-maroon-dark [&_li+li]:mt-1 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <footer className="border-t border-champagne px-5 py-8">
        <div className="mx-auto max-w-3xl">
          <SiteLegalLinks className="text-muted" />
        </div>
      </footer>
    </div>
  );
}
