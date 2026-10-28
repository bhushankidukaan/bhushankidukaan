import SaveForm from "@/components/admin/SaveForm";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/auth";
import { GALLERY_ITEMS, GALLERY_ROWS, getHomepage } from "@/lib/content";
import { TIER_LABEL } from "@/lib/shop";
import { saveHomepage } from "./actions";

export default async function HomepageEditor() {
  await requireUser("website");
  const c = await getHomepage();
  const area = `${inputClass} min-h-20`;
  const range = (n: number) => Array.from({ length: n }, (_, i) => i);

  return (
    <SaveForm action={saveHomepage} className="space-y-6">
      <Card title="Banner">
        <div className="grid gap-4">
          <Field label="Small badge above the banner">
            <input name="pill" defaultValue={c.pill} className={inputClass} />
          </Field>
          <Field label="Banner label">
            <input name="hero.eyebrow" defaultValue={c.hero.eyebrow} className={inputClass} />
          </Field>
          <Field label="Main headline">
            <input name="hero.title" required defaultValue={c.hero.title} className={inputClass} />
          </Field>
          <Field label="Text under the headline">
            <textarea name="hero.subtitle" defaultValue={c.hero.subtitle} className={area} />
          </Field>
        </div>
      </Card>

      <Card title="Numbers strip">
        <div className="grid gap-4 md:grid-cols-2">
          {c.stats.map((s, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 rounded-lg bg-sand p-3">
              <Field label="Label"><input name={`stats.${i}.label`} defaultValue={s.label} className={inputClass} /></Field>
              <Field label="Number"><input name={`stats.${i}.value`} defaultValue={s.value} className={inputClass} /></Field>
              <Field label="Small text"><input name={`stats.${i}.sub`} defaultValue={s.sub} className={inputClass} /></Field>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Shop by Occasion">
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Label"><input name="occasions.eyebrow" defaultValue={c.occasions.eyebrow} className={inputClass} /></Field>
            <Field label="Heading"><input name="occasions.heading" defaultValue={c.occasions.heading} className={inputClass} /></Field>
          </div>
          <Field label="Intro"><textarea name="occasions.intro" defaultValue={c.occasions.intro} className={area} /></Field>
          <div className="grid gap-4 md:grid-cols-3">
            {c.occasions.cards.map((card, i) => (
              <div key={card.tier} className="space-y-2 rounded-lg bg-sand p-3">
                <p className="text-xs font-semibold text-muted">Card {i + 1} · shows the {TIER_LABEL[card.tier]} costumes</p>
                <Field label="Small line"><input name={`occasions.${i}.tagline`} defaultValue={card.tagline} className={inputClass} /></Field>
                <Field label="Title"><input name={`occasions.${i}.title`} defaultValue={card.title} className={inputClass} /></Field>
                <Field label="Text"><textarea name={`occasions.${i}.text`} defaultValue={card.text} className={area} /></Field>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Event packages">
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Label"><input name="services.eyebrow" defaultValue={c.services.eyebrow} className={inputClass} /></Field>
            <Field label="Heading"><input name="services.heading" defaultValue={c.services.heading} className={inputClass} /></Field>
          </div>
          <Field label="Intro"><textarea name="services.intro" defaultValue={c.services.intro} className={area} /></Field>
          <div className="grid gap-4 md:grid-cols-3">
            {c.services.packages.map((p, i) => (
              <div key={i} className="space-y-2 rounded-lg bg-sand p-3">
                <Field label="Package name"><input name={`services.${i}.name`} required defaultValue={p.name} className={inputClass} /></Field>
                <Field label="Small line"><input name={`services.${i}.tag`} defaultValue={p.tag} className={inputClass} /></Field>
                <Field label="Text"><textarea name={`services.${i}.text`} defaultValue={p.text} className={area} /></Field>
                <Field label="What's included" hint="One item per line.">
                  <textarea name={`services.${i}.items`} defaultValue={p.items.join("\n")} className={`${inputClass} min-h-24`} />
                </Field>
                <Field label="Button text"><input name={`services.${i}.cta`} defaultValue={p.cta} className={inputClass} /></Field>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="services.featured" value={i} defaultChecked={p.featured} /> Highlight this package
                </label>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Our Work gallery">
        <div className="grid gap-4">
          <p className="text-sm text-muted">
            Each row scrolls sideways on the homepage. For a photo, paste a link starting with https:// (for example from Cloudinary or ImageKit),
            or put the file in the project&apos;s public folder and enter /gallery/photo.jpg. Without a photo the card shows the row&apos;s icon.
            Clear a title to remove that photo or row.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Label"><input name="gallery.eyebrow" defaultValue={c.gallery.eyebrow} className={inputClass} /></Field>
            <Field label="Heading"><input name="gallery.heading" defaultValue={c.gallery.heading} className={inputClass} /></Field>
          </div>
          <Field label="Intro"><textarea name="gallery.intro" defaultValue={c.gallery.intro} className={area} /></Field>
          {range(GALLERY_ROWS).map((r) => {
            const row = c.gallery.rows[r];
            return (
              <details key={r} open={r === 0} className="rounded-lg bg-sand p-3">
                <summary className="cursor-pointer font-semibold text-maroon-dark">Row {r + 1}{row ? ` · ${row.title}` : " · empty"}</summary>
                <div className="mt-3 grid gap-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field label="Small label"><input name={`gallery.${r}.eyebrow`} defaultValue={row?.eyebrow} className={inputClass} /></Field>
                    <Field label="Row title"><input name={`gallery.${r}.title`} defaultValue={row?.title} className={inputClass} /></Field>
                    <Field label="Icon" hint="A Material Symbols name, e.g. favorite, celebration.">
                      <input name={`gallery.${r}.icon`} defaultValue={row?.icon} className={inputClass} />
                    </Field>
                  </div>
                  {range(GALLERY_ITEMS).map((i) => {
                    const item = row?.items[i];
                    return (
                      <div key={i} className="grid gap-2 rounded bg-white/60 p-2 md:grid-cols-[1fr_1fr_2fr]">
                        <input name={`gallery.${r}.${i}.title`} defaultValue={item?.title} placeholder={`Photo ${i + 1} title`} className={inputClass} />
                        <input name={`gallery.${r}.${i}.caption`} defaultValue={item?.caption} placeholder="Caption" className={inputClass} />
                        <input name={`gallery.${r}.${i}.image`} defaultValue={item?.image} placeholder="Photo link (optional)" className={inputClass} />
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </Card>

      <Card title="Studio section">
        <div className="grid gap-4">
          <Field label="Heading" hint="The last word is shown in gold italics.">
            <input name="about.heading" defaultValue={c.about.heading} className={inputClass} />
          </Field>
          <Field label="Text"><textarea name="about.text" defaultValue={c.about.text} className={area} /></Field>
          <Field label="Opening hours"><input name="about.hours" defaultValue={c.about.hours} className={inputClass} /></Field>
        </div>
      </Card>
    </SaveForm>
  );
}
