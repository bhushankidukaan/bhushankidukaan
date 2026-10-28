import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import AuthForm from "@/components/admin/AuthForm";
import NoDatabase from "@/components/admin/NoDatabase";
import { hasAnyAdmin } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { setupOwner } from "../auth-actions";

export const metadata: Metadata = { title: "Set up | Bhushan Ki Dukaan Admin", robots: { index: false } };

export default async function SetupPage() {
  await connection();
  if (!hasDatabase()) return <NoDatabase />;
  // Only reachable until the first account exists
  if (await hasAnyAdmin()) redirect("/admin/login");
  return (
    <AuthForm
      title="Create owner account"
      intro="First-time setup. This account can see every section and add other staff."
      action={setupOwner}
      withName
      submitLabel="Create account"
    />
  );
}
