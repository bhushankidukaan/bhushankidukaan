// Cookie consent stored in the browser. "unset" means the visitor hasn't chosen yet.
export type Consent = "analytics" | "essential" | "unset";

const KEY = "bkd-cookie-consent";
const EVENT = "bkd-consent-change";

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "analytics" || v === "essential" ? v : "unset";
  } catch {
    return "unset";
  }
}

export function setConsent(value: Consent) {
  try {
    if (value === "unset") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page view only
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
