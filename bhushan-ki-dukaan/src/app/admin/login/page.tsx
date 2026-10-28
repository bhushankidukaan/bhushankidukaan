import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import AuthForm from "@/components/admin/AuthForm";
import NoDatabase from "@/components/admin/NoDatabase";
import { getCurrentUser, hasAnyAdmin } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { login } from "../auth-actions";

export const metadata: Metadata = { title: "Sign in | Bhushan Ki Dukaan Admin", robots: { index: false } };

export default async function LoginPage() {
  await connection();
  if (!hasDatabase()) return <NoDatabase />;
  if (!(await hasAnyAdmin())) redirect("/admin/setup");
  if (await getCurrentUser()) redirect("/admin");
  return <AuthForm title="Staff sign in" action={login} submitLabel="Sign in" />;
}
