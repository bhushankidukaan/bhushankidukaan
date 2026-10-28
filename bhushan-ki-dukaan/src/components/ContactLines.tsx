import { BUSINESS } from "@/lib/policies";
import { ADDRESS, PHONE_DISPLAY, PHONE_HREF, waLink } from "@/lib/shop";

/** Business contact details, reused across the policy pages. Empty fields are skipped. */
export default function ContactLines() {
  return (
    <ul>
      <li>
        <strong>{BUSINESS.legalName}</strong>
        {BUSINESS.gstin && <> · GSTIN {BUSINESS.gstin}</>}
      </li>
      <li>{ADDRESS}</li>
      <li>
        Phone / WhatsApp: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> (<a href={waLink()} target="_blank" rel="noopener noreferrer">chat on WhatsApp</a>)
      </li>
      {BUSINESS.email && (
        <li>
          Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
      )}
      <li>Hours: {BUSINESS.hours}</li>
    </ul>
  );
}
