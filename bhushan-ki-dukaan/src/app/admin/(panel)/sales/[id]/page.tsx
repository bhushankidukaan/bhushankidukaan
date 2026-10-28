import Link from "next/link";
import { notFound } from "next/navigation";
import SaveForm from "@/components/admin/SaveForm";
import { Card, Field, PageTitle, inputClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/auth";
import { LEAD_STATUSES, STATUS_LABEL, formatWhen, getLead } from "@/lib/leads";
import { updateLead } from "../actions";

const LABELS: Record<string, string> = { event: "Event", date: "Event date", package: "Package", location: "Location", total: "Estimated total" };

export default async function LeadPage({ params }: PageProps<"/admin/sales/[id]">) {
  await requireUser("sales");
  const lead = await getLead(Number((await params).id));
  if (!lead) notFound();

  const d = lead.details as Record<string, unknown> & { items?: { name: string; qty: number; price: string }[] };
  const digits = lead.phone.replace(/\D/g, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;

  return (
    <>
      <Link href="/admin/sales" className="text-xs font-semibold uppercase tracking-wider text-gold hover:text-maroon-dark">← All inquiries</Link>
      <PageTitle
        title={lead.name || "Website visitor"}
        subtitle={`${lead.kind === "order" ? "Bag order" : lead.kind === "booking" ? "Event booking" : "Enquiry"} · received ${formatWhen(lead.created_at)}`}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Request">
          <dl className="space-y-2 text-sm">
            {lead.phone && (
              <div className="flex flex-wrap gap-2">
                <dt className="w-28 text-muted">Phone</dt>
                <dd className="flex gap-3">
                  <a href={`tel:${lead.phone}`} className="text-maroon underline">{lead.phone}</a>
                  {waNumber && <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="text-emerald underline">WhatsApp</a>}
                </dd>
              </div>
            )}
            {Object.entries(LABELS).map(([k, label]) =>
              d[k] ? (
                <div key={k} className="flex flex-wrap gap-2">
                  <dt className="w-28 text-muted">{label}</dt>
                  <dd>{String(d[k])}</dd>
                </div>
              ) : null,
            )}
          </dl>
          {d.items && (
            <ul className="mt-3 space-y-1 border-t border-champagne pt-3 text-sm">
              {d.items.map((i, n) => (
                <li key={n} className="flex justify-between gap-3">
                  <span>{i.name} × {i.qty}</span>
                  <span className="text-muted">{i.price}</span>
                </li>
              ))}
            </ul>
          )}
          {lead.kind === "order" && !lead.phone && (
            <p className="mt-3 text-xs text-muted">Bag orders arrive on WhatsApp; match this one by time and items to get the customer&apos;s number.</p>
          )}
        </Card>

        <Card title="Follow-up">
          <SaveForm action={updateLead}>
            <input type="hidden" name="id" value={lead.id} />
            <div className="grid gap-3">
              <Field label="Status">
                <select name="status" defaultValue={lead.status} className={inputClass}>
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                </select>
              </Field>
              <Field label="Next follow-up date">
                <input type="date" name="follow_up" defaultValue={lead.follow_up ?? ""} className={inputClass} />
              </Field>
              <Field label="Notes">
                <textarea name="notes" defaultValue={lead.notes} className={`${inputClass} min-h-32`} placeholder="Calls, quotes, what the customer said…" />
              </Field>
            </div>
          </SaveForm>
        </Card>
      </div>
    </>
  );
}
