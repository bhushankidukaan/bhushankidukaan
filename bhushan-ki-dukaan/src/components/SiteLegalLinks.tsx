import Link from "next/link";

export const LEGAL_LINKS = [
  ["/privacy-policy", "Privacy Policy"],
  ["/terms", "Terms & Conditions"],
  ["/refund-policy", "Refund & Cancellation"],
  ["/shipping-policy", "Delivery & Rentals"],
  ["/cookie-policy", "Cookie Policy"],
  ["/contact", "Contact Us"],
] as const;

export default function SiteLegalLinks({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="Policies" className={`flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm ${className}`}>
      {LEGAL_LINKS.map(([href, label]) => (
        <Link key={href} href={href} className="hover:text-gold">
          {label}
        </Link>
      ))}
    </nav>
  );
}
