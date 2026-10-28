"use server";

import { redirect } from "next/navigation";
import { endSession, hashPassword, hasAnyAdmin, startSession, verifyPassword } from "@/lib/auth";
import { sql } from "@/lib/db";

export type FormState = { error?: string } | undefined;

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const rows = (await sql()`SELECT id, password_hash FROM admin_users WHERE email = ${email}`) as { id: number; password_hash: string }[];
  // Same message whether the email or password is wrong
  if (!rows[0] || !(await verifyPassword(password, rows[0].password_hash))) return { error: "Wrong email or password." };
  await startSession(rows[0].id);
  redirect("/admin");
}

/** First-run only: creates the owner account when no staff exist yet. */
export async function setupOwner(_: FormState, form: FormData): Promise<FormState> {
  if (await hasAnyAdmin()) return { error: "Setup is already done. Please sign in." };
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  if (!name || !email.includes("@")) return { error: "Enter your name and a valid email." };
  if (password.length < 10) return { error: "Use a password of at least 10 characters." };
  const [user] = (await sql()`
    INSERT INTO admin_users (email, name, password_hash, roles)
    VALUES (${email}, ${name}, ${await hashPassword(password)}, ${["owner"]})
    RETURNING id`) as { id: number }[];
  await startSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}
