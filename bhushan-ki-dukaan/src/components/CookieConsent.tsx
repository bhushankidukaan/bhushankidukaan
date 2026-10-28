"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getConsent, setConsent, subscribeConsent, type Consent } from "@/lib/consent";

// Cloudflare Web Analytics site token (public). Nothing loads until it is set.
const CF_ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

// During server render we don't know the choice yet; "pending" hides the banner until hydration
const getServerConsent = (): Consent | "pending" => "pending";

/** Cookie banner plus the analytics beacon, which loads only after the visitor accepts. */
export default function CookieConsent() {
  const consent = useSyncExternalStore<Consent | "pending">(subscribeConsent, getConsent, getServerConsent);

  return (
    <>
      {consent === "analytics" && CF_ANALYTICS_TOKEN && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: CF_ANALYTICS_TOKEN })}
          strategy="afterInteractive"
        />
      )}
      {consent === "unset" && (
        <div
          role="dialog"
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-20 z-[55] mx-auto max-w-xl rounded-xl bg-maroon-dark p-4 text-sm text-white/85 shadow-2xl ring-1 ring-gold/40 sm:bottom-4"
        >
          <p>
            We use essential cookies to run this site. With your permission we also count visits using privacy-friendly analytics (no
            tracking across sites).{" "}
            <Link href="/cookie-policy" className="text-gold-light underline">
              Cookie Policy
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => setConsent("essential")}
              className="rounded-lg border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-white/10"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => setConsent("analytics")}
              className="rounded-lg bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-gold-light"
            >
              Accept analytics
            </button>
          </div>
        </div>
      )}
    </>
  );
}
