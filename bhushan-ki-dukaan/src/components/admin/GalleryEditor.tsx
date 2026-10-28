"use client";

import { useState } from "react";
import type { GalleryItem, GalleryRow } from "@/lib/content";
import Icon from "../Icon";
import { Field, inputClass, secondaryButtonClass } from "./ui";

const blankItem = (): GalleryItem => ({ title: "New photo", caption: "", image: "" });
const blankRow = (): GalleryRow => ({ eyebrow: "", title: "New row", icon: "photo_camera", items: [blankItem()] });

const iconButton = "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-cream-dark hover:text-maroon-dark disabled:opacity-30";
const deleteButton = "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50";

function move<T>(list: T[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/**
 * Add, edit, reorder and delete gallery rows and photos. The whole list is sent
 * as JSON in one hidden field and checked again on the server when saved.
 */
export default function GalleryEditor({ initial }: { initial: GalleryRow[] }) {
  const [rows, setRows] = useState(initial);

  const setRow = (r: number, patch: Partial<GalleryRow>) => setRows(rows.map((row, i) => (i === r ? { ...row, ...patch } : row)));
  const setItem = (r: number, it: number, patch: Partial<GalleryItem>) =>
    setRow(r, { items: rows[r].items.map((item, i) => (i === it ? { ...item, ...patch } : item)) });

  return (
    <div className="grid gap-3">
      <input type="hidden" name="gallery.rows" value={JSON.stringify(rows)} />

      {rows.map((row, r) => (
        <details key={r} open={r === 0} className="rounded-lg bg-sand p-3">
          <summary className="flex cursor-pointer items-center justify-between gap-2 font-semibold text-maroon-dark">
            <span>Row {r + 1} · {row.title || "Untitled"} <span className="font-normal text-muted">({row.items.length} photos)</span></span>
            <span className="flex items-center gap-1" onClick={(e) => e.preventDefault()}>
              <button type="button" className={iconButton} disabled={r === 0} onClick={() => setRows(move(rows, r, r - 1))} aria-label="Move row up">
                <Icon name="arrow_upward" className="text-[18px]" />
              </button>
              <button type="button" className={iconButton} disabled={r === rows.length - 1} onClick={() => setRows(move(rows, r, r + 1))} aria-label="Move row down">
                <Icon name="arrow_downward" className="text-[18px]" />
              </button>
              <button
                type="button"
                className={deleteButton}
                onClick={() => confirm(`Delete the row "${row.title}" and its photos?`) && setRows(rows.filter((_, i) => i !== r))}
              >
                <Icon name="delete" className="text-[16px]" /> Delete row
              </button>
            </span>
          </summary>

          <div className="mt-3 grid gap-3">
            <div className="grid gap-3 md:grid-cols-3">
              <Field label="Small label"><input value={row.eyebrow} onChange={(e) => setRow(r, { eyebrow: e.target.value })} className={inputClass} /></Field>
              <Field label="Row title"><input value={row.title} onChange={(e) => setRow(r, { title: e.target.value })} className={inputClass} /></Field>
              <Field label="Icon" hint="Shown when a photo has no link. A Material Symbols name, e.g. favorite.">
                <input value={row.icon} onChange={(e) => setRow(r, { icon: e.target.value })} className={inputClass} />
              </Field>
            </div>

            {row.items.map((item, it) => (
              <div key={it} className="flex gap-3 rounded-lg bg-white p-2">
                <div className="flex h-20 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gradient-to-br from-maroon to-espresso">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Icon name={row.icon || "photo_camera"} className="text-[28px] text-gold/50" />
                  )}
                </div>
                <div className="grid flex-1 gap-2 md:grid-cols-[1fr_1fr_2fr]">
                  <input value={item.title} onChange={(e) => setItem(r, it, { title: e.target.value })} placeholder="Title" className={inputClass} />
                  <input value={item.caption} onChange={(e) => setItem(r, it, { caption: e.target.value })} placeholder="Caption" className={inputClass} />
                  <input value={item.image} onChange={(e) => setItem(r, it, { image: e.target.value })} placeholder="Photo link: https://… or /gallery/photo.jpg" className={inputClass} />
                </div>
                <div className="flex flex-col items-center">
                  <button type="button" className={iconButton} disabled={it === 0} onClick={() => setRow(r, { items: move(row.items, it, it - 1) })} aria-label="Move photo left">
                    <Icon name="arrow_upward" className="text-[18px]" />
                  </button>
                  <button
                    type="button"
                    className={iconButton}
                    onClick={() => setRow(r, { items: row.items.filter((_, i) => i !== it) })}
                    aria-label={`Delete photo ${item.title}`}
                  >
                    <Icon name="delete" className="text-[18px] text-red-700" />
                  </button>
                </div>
              </div>
            ))}

            <button type="button" className={`${secondaryButtonClass} justify-self-start`} onClick={() => setRow(r, { items: [...row.items, blankItem()] })}>
              <Icon name="add_photo_alternate" className="text-[16px]" /> Add photo
            </button>
          </div>
        </details>
      ))}

      <button type="button" className={`${secondaryButtonClass} justify-self-start`} onClick={() => setRows([...rows, blankRow()])}>
        <Icon name="add" className="text-[16px]" /> Add row
      </button>
      <p className="text-xs text-muted">Changes go live when you press Save changes at the bottom of the page.</p>
    </div>
  );
}
