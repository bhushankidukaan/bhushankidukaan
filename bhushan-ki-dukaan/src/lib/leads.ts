import "server-only";
import { sql } from "./db";

export const LEAD_STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

export const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-gold/15 text-gold",
  contacted: "bg-sky-100 text-sky-800",
  quoted: "bg-violet-100 text-violet-800",
  won: "bg-emerald/15 text-emerald",
  lost: "bg-cream-dark text-muted",
};

export type Lead = {
  id: number;
  kind: "booking" | "order" | "enquiry";
  name: string;
  phone: string;
  details: Record<string, unknown>;
  status: LeadStatus;
  notes: string;
  follow_up: string | null;
  created_at: string;
};

export async function listLeads(status?: LeadStatus) {
  const rows = status
    ? await sql()`SELECT * FROM leads WHERE status = ${status} ORDER BY created_at DESC LIMIT 200`
    : await sql()`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`;
  return rows as Lead[];
}

export async function getLead(id: number) {
  const rows = (await sql()`SELECT * FROM leads WHERE id = ${id}`) as Lead[];
  return rows[0] ?? null;
}

export async function leadCounts() {
  const rows = (await sql()`SELECT status, count(*)::int AS count FROM leads GROUP BY status`) as { status: LeadStatus; count: number }[];
  const counts = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0])) as Record<LeadStatus, number>;
  for (const r of rows) counts[r.status] = r.count;
  return counts;
}

/** One-line summary of what the lead asked for. */
export function leadSummary(l: Lead) {
  const d = l.details as Record<string, string> & { items?: { name: string; qty: number }[]; total?: string };
  if (l.kind === "order") return `${(d.items ?? []).map((i) => `${i.name} ×${i.qty}`).join(", ")}${d.total ? ` · ${d.total}` : ""}`;
  if (l.kind === "booking") return [d.event, d.package, d.date, d.location].filter(Boolean).join(" · ");
  return String(d.message ?? "");
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
export const formatWhen = (iso: string) => dateFmt.format(new Date(iso));
