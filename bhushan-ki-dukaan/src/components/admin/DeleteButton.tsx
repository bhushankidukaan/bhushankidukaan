"use client";

import { useFormStatus } from "react-dom";
import Icon from "../Icon";

/** Submit button for a delete form that asks for confirmation first. */
export default function DeleteButton({ label, confirmText }: { label: string; confirmText: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-700 hover:bg-red-50 disabled:opacity-60"
    >
      <Icon name="delete" className="text-[16px]" /> {pending ? "Deleting…" : label}
    </button>
  );
}
