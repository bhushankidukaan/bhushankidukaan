// Small shared building blocks for admin screens.

export const inputClass =
  "mt-1 w-full rounded-lg border border-champagne bg-white px-3 py-2 text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Card({ title, children, actions }: { title?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-champagne/70">
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-serif text-2xl text-maroon-dark">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-serif text-4xl text-maroon-dark">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

export const buttonClass =
  "inline-flex items-center justify-center gap-1 rounded-lg bg-maroon-dark px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-light hover:bg-maroon disabled:opacity-60";
export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-1 rounded-lg bg-cream-dark px-4 py-2 text-xs font-semibold uppercase tracking-wider text-maroon-dark hover:bg-champagne";
