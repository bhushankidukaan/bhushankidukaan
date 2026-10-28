import SaveForm from "@/components/admin/SaveForm";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/auth";
import { getAllProducts, type AdminProduct } from "@/lib/content";
import { TIER_LABEL, TYPE_BADGE, priceLabel } from "@/lib/shop";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProduct, saveProduct } from "../actions";

const SIZES = [["kids", "Kids"], ["adult", "Adult"], ["custom", "Custom tailoring"]];
const STYLES = [["traditional", "Traditional / Royal"], ["folk", "Folk / Dance"], ["festive", "Festive"], ["bridal", "Bridal"]];

function ProductFields({ p }: { p?: AdminProduct }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {p && <input type="hidden" name="id" value={p.id} />}
      <div className="md:col-span-2">
        <Field label="Name"><input name="name" required defaultValue={p?.name} className={inputClass} /></Field>
      </div>
      <Field label="Price (₹)"><input name="price" type="number" min={0} required defaultValue={p?.price} className={inputClass} /></Field>
      <Field label="Order on page" hint="Lower shows first.">
        <input name="sort_order" type="number" defaultValue={p?.sortOrder ?? 100} className={inputClass} />
      </Field>
      <Field label="Occasion">
        <select name="tier" defaultValue={p?.tier} className={inputClass}>
          {Object.entries(TIER_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </Field>
      <Field label="Rent or buy">
        <select name="sale_type" defaultValue={p?.type} className={inputClass}>
          {Object.entries(TYPE_BADGE).map(([v, b]) => <option key={v} value={v}>{b.label}</option>)}
        </select>
      </Field>
      <Field label="Size">
        <select name="size" defaultValue={p?.size} className={inputClass}>
          {SIZES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </Field>
      <Field label="Style">
        <select name="style" defaultValue={p?.style} className={inputClass}>
          {STYLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </Field>
      <div className="md:col-span-4">
        <Field label="Photo link" hint="https://… or /costumes/photo.jpg from the public folder. Leave empty to show the crest.">
          <input name="image" defaultValue={p?.image} className={inputClass} />
        </Field>
      </div>
      <div className="md:col-span-4">
        <Field label="Description"><textarea name="description" defaultValue={p?.desc} className={`${inputClass} min-h-16`} /></Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="per_day" defaultChecked={p?.perDay} /> Price is per day
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={p?.active ?? true} /> Show on website
      </label>
    </div>
  );
}

export default async function CostumesEditor() {
  await requireUser("website");
  const products = await getAllProducts();

  return (
    <div className="space-y-4">
      <Card title="Add a costume">
        <SaveForm action={saveProduct} submitLabel="Add costume">
          <ProductFields />
        </SaveForm>
      </Card>

      {products.map((p) => (
        <details key={p.id} className="rounded-xl bg-white shadow-sm ring-1 ring-champagne/70">
          <summary className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 p-4">
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt="" className="h-10 w-14 rounded object-cover" />
            )}
            <span className="font-semibold text-maroon-dark">{p.name}</span>
            <span className="text-sm text-muted">{TIER_LABEL[p.tier]} · {priceLabel(p)}</span>
            {!p.active && <span className="rounded bg-cream-dark px-2 py-0.5 text-xs font-semibold text-muted">Hidden</span>}
          </summary>
          <div className="border-t border-champagne p-4">
            <SaveForm action={saveProduct}>
              <ProductFields p={p} />
            </SaveForm>
            <form action={deleteProduct} className="mt-3 border-t border-champagne pt-3">
              <input type="hidden" name="id" value={p.id} />
              <DeleteButton label="Delete costume" confirmText={`Delete "${p.name}" permanently? To keep it but take it off the website, untick "Show on website" instead.`} />
            </form>
          </div>
        </details>
      ))}
    </div>
  );
}
