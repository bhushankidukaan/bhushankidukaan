import Link from "next/link";
import { PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/auth";
import { LEAD_STATUSES, STATUS_LABEL, STATUS_STYLE, formatWhen, leadCounts, leadSummary, listLeads, type LeadStatus } from "@/lib/leads";

const KIND_LABEL = { booking: "Event booking", order: "Bag order", enquiry: "Enquiry" };

export default async function SalesPage({ searchParams }: PageProps<"/admin/sales">) {
  await requireUser("sales");
  const { status: raw } = await searchParams;
  const status = (LEAD_STATUSES as readonly string[]).includes(String(raw)) ? (raw as LeadStatus) : undefined;
  const [leads, counts] = await Promise.all([listLeads(status), leadCounts()]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <PageTitle title="Sales" subtitle="Every event booking request and bag order sent from the website." />

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Link href="/admin/sales" className={`rounded-full px-3 py-1 text-xs font-semibold ${!status ? "bg-maroon-dark text-white" : "bg-white text-muted"}`}>
          All ({total})
        </Link>
        {LEAD_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/sales?status=${s}`}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${status === s ? "bg-maroon-dark text-white" : "bg-white text-muted"}`}
          >
            {STATUS_LABEL[s]} ({counts[s]})
          </Link>
        ))}
      </div>

      {leads.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-sm text-muted shadow-sm">
          No inquiries here yet. They appear as soon as a customer sends a booking or order from the website.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-champagne/70">
          {leads.map((l) => (
            <Link key={l.id} href={`/admin/sales/${l.id}`} className="flex flex-col gap-1 border-b border-champagne/60 p-4 last:border-0 hover:bg-cream sm:flex-row sm:items-center sm:gap-4">
              <span className={`w-fit rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${STATUS_STYLE[l.status]}`}>{STATUS_LABEL[l.status]}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-maroon-dark">
                  {l.name || "Website visitor"} <span className="font-normal text-muted">· {KIND_LABEL[l.kind]}</span>
                </span>
                <span className="block truncate text-sm text-ink/70">{leadSummary(l)}</span>
              </span>
              <span className="text-xs text-muted">
                {formatWhen(l.created_at)}
                {l.follow_up && <> · follow up {l.follow_up}</>}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
