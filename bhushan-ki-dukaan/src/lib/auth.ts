import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasDatabase, sql } from "./db";

export const SECTIONS = ["website", "sales", "operations", "hr", "marketing", "tech"] as const;
export type Section = (typeof SECTIONS)[number];

export type AdminUser = { id: number; email: string; name: string; roles: string[] };

const COOKIE = "bkd_admin";
const SESSION_DAYS = 14;
// Cloudflare Workers caps PBKDF2 at 100,000 iterations
const PBKDF2_ITERATIONS = 100_000;

const enc = new TextEncoder();
const toHex = (buf: ArrayBuffer | Uint8Array) =>
  Array.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
const fromHex = (hex: string) => new Uint8Array(hex.match(/.{2}/g)!.map((h) => parseInt(h, 16)));

async function pbkdf2(password: string, salt: Uint8Array, iterations: number) {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations }, key, 256);
}

/** Returns "pbkdf2$<iterations>$<salt hex>$<hash hex>". */
export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt)}$${toHex(hash)}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, iter, saltHex, hashHex] = stored.split("$");
  if (scheme !== "pbkdf2" || !iter || !saltHex || !hashHex) return false;
  const hash = toHex(await pbkdf2(password, fromHex(saltHex), Number(iter)));
  // Constant-time compare
  let diff = hash.length ^ hashHex.length;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ (hashHex.charCodeAt(i) || 0);
  return diff === 0;
}

const sha256 = async (s: string) => toHex(await crypto.subtle.digest("SHA-256", enc.encode(s)));

export async function startSession(userId: number) {
  const token = toHex(crypto.getRandomValues(new Uint8Array(32)));
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  await sql()`INSERT INTO admin_sessions (token_hash, user_id, expires_at) VALUES (${await sha256(token)}, ${userId}, ${expires})`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function endSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) await sql()`DELETE FROM admin_sessions WHERE token_hash = ${await sha256(token)}`;
  store.delete(COOKIE);
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  if (!hasDatabase()) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const rows = await sql()`
    SELECT u.id, u.email, u.name, u.roles
    FROM admin_sessions s JOIN admin_users u ON u.id = s.user_id
    WHERE s.token_hash = ${await sha256(token)} AND s.expires_at > now()`;
  return (rows[0] as AdminUser | undefined) ?? null;
}

export const canAccess = (user: AdminUser, section: Section) =>
  user.roles.includes("owner") || user.roles.includes(section);

/** For admin pages and server actions: signed-in user with access to the section, else redirect. */
export async function requireUser(section?: Section) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  if (section && !canAccess(user, section)) redirect("/admin?denied=" + section);
  return user;
}

export async function hasAnyAdmin() {
  const [{ count }] = (await sql()`SELECT count(*)::int AS count FROM admin_users`) as { count: number }[];
  return count > 0;
}
