"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { LEAD_STATUSES } from "@/lib/leads";

export type SaveState = { ok?: boolean; error?: string } | undefined;

export async function updateLead(_: SaveState, f: FormData): Promise<SaveState> {
  await requireUser("sales");
  const id = Number(f.get("id"));
  const status = String(f.get("status"));
  if (!id || !(LEAD_STATUSES as readonly string[]).includes(status)) return { error: "Invalid update." };
  const followUp = String(f.get("follow_up") || "") || null;
  const notes = String(f.get("notes") ?? "").slice(0, 5000);
  await sql()`UPDATE leads SET status = ${status}, follow_up = ${followUp}, notes = ${notes}, updated_at = now() WHERE id = ${id}`;
  revalidatePath("/admin/sales");
  revalidatePath(`/admin/sales/${id}`);
  return { ok: true };
}
