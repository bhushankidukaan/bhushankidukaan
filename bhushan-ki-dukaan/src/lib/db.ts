import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);

/** Neon SQL tagged template (HTTP driver, works in Cloudflare Workers). */
export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  client ??= neon(url);
  return client;
}
