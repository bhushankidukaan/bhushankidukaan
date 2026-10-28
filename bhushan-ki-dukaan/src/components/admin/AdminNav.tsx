"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";

export const NAV_ITEMS = [
  { section: "website", href: "/admin/website", label: "Website", icon: "web" },
  { section: "sales", href: "/admin/sales", label: "Sales", icon: "handshake" },
  { section: "operations", href: "/admin/operations", label: "Operations", icon: "local_shipping" },
  { section: "hr", href: "/admin/hr", label: "HR & Careers", icon: "badge" },
  { section: "marketing", href: "/admin/marketing", label: "Marketing", icon: "campaign" },
  { section: "tech", href: "/admin/tech", label: "Tech", icon: "terminal" },
] as const;

export default function AdminNav({ allowed }: { allowed: string[] }) {
  const path = usePathname();
  const items = [{ section: "home", href: "/admin", label: "Overview", icon: "dashboard" }, ...NAV_ITEMS.filter((i) => allowed.includes(i.section))];
  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col">
      {items.map((item) => {
        const active = item.href === "/admin" ? path === "/admin" : path.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active ? "bg-gold text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon name={item.icon} className="text-[20px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
