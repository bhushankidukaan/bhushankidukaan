import type { Metadata } from "next";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import Crest from "@/components/Crest";
import { SECTIONS, canAccess, requireUser } from "@/lib/auth";
import { logout } from "../auth-actions";

export const metadata: Metadata = { title: "Admin | Bhushan Ki Dukaan", robots: { index: false } };

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireUser();
  const allowed = SECTIONS.filter((s) => canAccess(user, s));
  return (
    <div className="min-h-screen bg-sand lg:flex">
      <aside className="bg-maroon-dark p-3 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-60 lg:flex-col lg:p-4">
        <Link href="/admin" className="mb-3 hidden items-center gap-2 lg:flex">
          <Crest id="admin-nav" className="h-12 w-10" />
          <span className="font-serif text-lg leading-tight text-gold-light">Bhushan Ki Dukaan Admin</span>
        </Link>
        <AdminNav allowed={allowed} />
        <div className="mt-3 hidden border-t border-white/10 pt-3 text-xs text-white/60 lg:mt-auto lg:block">
          <p className="truncate">{user.name}</p>
          <p className="truncate">{user.email}</p>
          <div className="mt-2 flex gap-3">
            <Link href="/" className="hover:text-white">View site</Link>
            <form action={logout}>
              <button type="submit" className="hover:text-white">Sign out</button>
            </form>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-8">
        <div className="mb-4 flex justify-end gap-3 text-xs text-muted lg:hidden">
          <Link href="/">View site</Link>
          <form action={logout}>
            <button type="submit">Sign out</button>
          </form>
        </div>
        {children}
      </main>
    </div>
  );
}
