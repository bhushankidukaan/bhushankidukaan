"use client";

import { useActionState } from "react";
import { buttonClass } from "./ui";

type State = { ok?: boolean; error?: string } | undefined;

/** Form wrapper for admin server actions: shows a Save button with saved / error feedback. */
export default function SaveForm({
  action,
  children,
  submitLabel = "Save changes",
  className = "",
}: {
  action: (state: State, form: FormData) => Promise<State>;
  children: React.ReactNode;
  submitLabel?: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className={className}>
      {children}
      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? "Saving…" : submitLabel}
        </button>
        {state?.ok && !pending && <span className="text-sm text-emerald">Saved.</span>}
        {state?.error && !pending && <span className="text-sm text-red-700">{state.error}</span>}
      </div>
    </form>
  );
}
