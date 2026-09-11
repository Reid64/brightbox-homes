'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { faqCategories, sectionCategory } from '@/lib/faq-data';

// The FAQ accordion, decorated per category. Each authored section is a card
// carrying its category's identity: a 12px accent bar, a watermarked icon, and
// - for the two categories that define a backdrop - a ghosted photo behind the
// whole block. Open items take an 8% wash of the same colour.
//
// The category lookup comes from faq-data's light exports (faqCategories and
// sectionCategory). Neither touches faqSections, so this client component does
// not pull the 22 answers into the bundle a second time - they arrive once, as
// the `sections` prop the server page passes in.

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

interface AccordionProps {
  sections: FaqSection[];
  /** Section title -> DOM id, so the hero can deep-link to a category.
   *  Scroll offset is handled globally by html { scroll-padding-top: 80px }. */
  anchors?: Record<string, string>;
}

/** Category colour as an rgba() string - Tailwind cannot build these from a
 *  runtime value, so they reach CSS as custom properties. Mirrors the helper in
 *  FAQHeroGuide; both read the same `hex` field. */
function tint(hex: string, alpha: number): string {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

const label = 'text-xs font-semibold uppercase tracking-[0.15em] text-black/60';

export default function Accordion({ sections, anchors }: AccordionProps) {
  // Multiple items can be open simultaneously.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const categoryById = useMemo(
    () => new Map(faqCategories.map((category) => [category.id, category])),
    [],
  );

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-6">
      {sections.map((section, si) => {
        const category = categoryById.get(sectionCategory[section.title]);
        const Icon = category?.icon;
        const headingId = `faq-section-${si}`;
        // Sections without a category mapping still render - they just fall
        // back to a neutral grey accent rather than disappearing.
        const hex = category?.hex ?? '#9CA3AF';

        return (
          <section
            key={section.title}
            id={anchors?.[section.title]}
            aria-labelledby={headingId}
            style={
              {
                '--cat': hex,
                '--cat-wash': tint(hex, 0.08),
                '--cat-soft': tint(hex, 0.35),
              } as CSSProperties
            }
            className="relative overflow-hidden rounded-lg border border-black/[0.06] border-l-[12px] border-l-[color:var(--cat)] bg-white/50 px-4 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:px-6"
          >
            {/* Ghosted category photo. Lazy by default through next/image and
                explicitly so here; at 10% under the translucent item cards it
                never competes with the copy. */}
            {category?.backdrop && (
              <Image
                src={category.backdrop}
                alt=""
                aria-hidden="true"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
                className="pointer-events-none select-none object-cover object-center opacity-10"
              />
            )}

            {/* Watermarked category icon, top right. */}
            {Icon && (
              <Icon
                aria-hidden="true"
                size={148}
                strokeWidth={1}
                className="pointer-events-none absolute -right-6 -top-8 text-[color:var(--cat)] opacity-[0.06]"
              />
            )}

            <div className="relative">
              <p id={headingId} className={label}>
                {section.title}
              </p>

              <div className="mt-4 space-y-2">
                {section.items.map((item, ii) => {
                  const id = `${si}-${ii}`;
                  const open = openIds.has(id);
                  const panelId = `faq-panel-${id}`;
                  const btnId = `faq-btn-${id}`;
                  return (
                    <div
                      key={id}
                      className={`rounded-lg border transition-all duration-normal ease-out hover:-translate-y-1 hover:shadow-sm ${
                        open
                          ? 'border-[color:var(--cat-soft)] bg-[color:var(--cat-wash)] shadow-sm'
                          : 'border-black/[0.07] bg-white/70'
                      }`}
                    >
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => toggle(id)}
                        className="flex w-full items-center justify-between gap-4 rounded-lg px-4 py-4 text-left transition-colors duration-200 ease-out hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
                      >
                        <span className="font-body font-medium text-[#111827]">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className={`shrink-0 text-[color:var(--cat)] transition-transform duration-normal ease-out ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {/* Height is animated by the 0fr -> 1fr grid row; the copy
                          fades separately over 300ms, a beat behind the opening
                          so it arrives rather than snapping in with the box. */}
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className={`grid transition-[grid-template-rows] duration-normal ease-out ${
                          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`px-4 pb-4 text-[#4B5563] transition-opacity duration-300 ease-out ${
                              open ? 'opacity-100 delay-100' : 'opacity-0'
                            }`}
                          >
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
