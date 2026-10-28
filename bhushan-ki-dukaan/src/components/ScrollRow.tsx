"use client";

import { useRef } from "react";
import Icon from "./Icon";

type Props = { eyebrow?: string; title: string; action?: React.ReactNode; children: React.ReactNode };

/** A titled row of cards that scrolls sideways: swipe on phones, arrow buttons on desktop. */
export default function ScrollRow({ eyebrow, title, action, children }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });
  const arrow = "hidden h-9 w-9 items-center justify-center rounded-full bg-white text-maroon-dark shadow-md transition-colors hover:bg-maroon-dark hover:text-white md:inline-flex";

  return (
    <div className="mb-10 last:mb-0">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          {eyebrow && <span className="block text-[11px] font-semibold uppercase tracking-widest text-gold">{eyebrow}</span>}
          <h3 className="font-serif text-2xl text-maroon-dark md:text-3xl">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {action}
          <button type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`} className={arrow}>
            <Icon name="chevron_left" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={`Scroll ${title} right`} className={arrow}>
            <Icon name="chevron_right" />
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-3 [scrollbar-width:none] lg:-mx-16 lg:scroll-px-16 lg:px-16 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
