"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/auth-actions";
import Crest from "../Crest";
import { Field, buttonClass, inputClass } from "./ui";

type Props = {
  title: string;
  intro?: string;
  action: (state: FormState, form: FormData) => Promise<FormState>;
  withName?: boolean;
  submitLabel: string;
};

/** Login and first-run setup form. */
export default function AuthForm({ title, intro, action, withName, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-4">
      <form action={formAction} className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow-xl ring-1 ring-champagne">
        <div className="flex flex-col items-center text-center">
          <Crest id="auth" className="h-16 w-14" />
          <h1 className="mt-2 font-serif text-3xl text-maroon-dark">{title}</h1>
          {intro && <p className="mt-1 text-sm text-muted">{intro}</p>}
        </div>
        {withName && (
          <Field label="Your name">
            <input name="name" required autoComplete="name" className={inputClass} />
          </Field>
        )}
        <Field label="Email">
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </Field>
        <Field label="Password" hint={withName ? "At least 10 characters." : undefined}>
          <input
            name="password"
            type="password"
            required
            minLength={withName ? 10 : undefined}
            autoComplete={withName ? "new-password" : "current-password"}
            className={inputClass}
          />
        </Field>
        {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
        <button type="submit" disabled={pending} className={`${buttonClass} w-full py-3`}>
          {pending ? "Please wait…" : submitLabel}
        </button>
      </form>
    </div>
  );
}
