import Link from "next/link";
import { NAV_ITEMS } from "@/components/admin/AdminNav";
import { Card, PageTitle } from "@/components/admin/ui";
import Icon from "@/components/Icon";
import { canAccess, requireUser, type Section } from "@/lib/auth";
import { leadCounts } from "@/lib/leads";

const DESCRIPTIONS: Record<Section, string> = {
  website: "Edit homepage text, packages and costumes.",
  sales: "Booking requests and orders from the website.",
  operations: "Orders, rentals, returns and follow-ups.",
  hr: "Job posts and applications.",
  marketing: "Meta ad campaign results.",
  tech: "Site health, analytics and SOPs.",
};

export default async function AdminHome({ searchParams }: PageProps<"/admin">) {
  const user = await requireUser();
  const { denied } = await searchParams;
  const counts = canAccess(user, "sales") ? await leadCounts() : null;

  return (
    <>
      <PageTitle title={`Namaste, ${user.name.split(" ")[0]}`} subtitle="Bhushan Ki Dukaan admin panel." />
      {denied && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">You don&apos;t have access to that section. Ask the owner to add it.</p>}

      {counts && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["New inquiries", counts.new],
            ["Contacted", counts.contacted],
            ["Quoted", counts.quoted],
            ["Won", counts.won],
          ].map(([label, n]) => (
            <Card key={label}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
              <p className="mt-1 font-serif text-4xl text-maroon-dark">{n}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {NAV_ITEMS.filter((i) => canAccess(user, i.section)).map((i) => (
          <Link key={i.href} href={i.href} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-champagne/70 transition-shadow hover:shadow-md">
            <Icon name={i.icon} className="text-[28px] text-gold" />
            <p className="mt-2 font-serif text-2xl text-maroon-dark">{i.label}</p>
            <p className="text-sm text-muted">{DESCRIPTIONS[i.section]}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
