"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  ["/admin/website", "Homepage text"],
  ["/admin/website/costumes", "Costumes"],
];

export default function WebsiteTabs() {
  const path = usePathname();
  return (
    <div className="mb-6 flex gap-1 border-b border-champagne">
      {TABS.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold ${path === href ? "border-gold text-maroon-dark" : "border-transparent text-muted hover:text-maroon-dark"}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
