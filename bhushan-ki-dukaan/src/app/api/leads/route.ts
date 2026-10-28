import { hasDatabase, sql } from "@/lib/db";

const KINDS = new Set(["booking", "order", "enquiry"]);
const MAX_BODY = 8_000;
const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

/** Public endpoint: stores a booking request or bag order from the website as a lead. */
export async function POST(request: Request) {
  if (!hasDatabase()) return Response.json({ ok: false }, { status: 503 });

  const text = await request.text();
  if (text.length > MAX_BODY) return Response.json({ ok: false }, { status: 413 });

  let body: { kind?: string; name?: unknown; phone?: unknown; details?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (!body.kind || !KINDS.has(body.kind)) return Response.json({ ok: false }, { status: 400 });
  const details = body.details && typeof body.details === "object" ? body.details : {};

  await sql()`
    INSERT INTO leads (kind, name, phone, details)
    VALUES (${body.kind}, ${clip(body.name, 120)}, ${clip(body.phone, 30)}, ${JSON.stringify(details)}::jsonb)`;
  return Response.json({ ok: true });
}
