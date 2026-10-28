"use client";

import { setConsent } from "@/lib/consent";

/** Clears the saved choice so the cookie banner shows again. */
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => setConsent("unset")}
      className="rounded-lg bg-maroon-dark px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-light"
    >
      Change cookie settings
    </button>
  );
}
