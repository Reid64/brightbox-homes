'use client';

import { useId, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { faqCategories, categoriesForQuery } from '@/lib/faq-data';
import type { FaqCategoryId } from '@/lib/faq-data';

// Split hero for /faq. The left rail carries the heading, the keyword search and
// the five category stops threaded by an animated "route"; the right panel is a
// decorative shelf of book spines cropped by the panel edges.
//
// Counts arrive as a prop rather than being derived here on purpose: this is a
// client component, and importing faqByCategoryId would drag all 22 answers into
// the client JS bundle on top of the copy the Accordion already receives as RSC
// props. Only the light exports (categories, keyword map) cross the boundary.

interface FAQHeroGuideProps {
  counts: Record<FaqCategoryId, number>;
}

// Decorative spines. Offsets are deliberately negative so the shelf bleeds past
// the panel and crops at its edges rather than sitting neatly inside it.
const SPINES = [
  { color: 'bg-bb-gold', position: 'bottom-[-2rem] left-[-1.5rem] h-64 w-20 rotate-[8deg]' },
  { color: 'bg-bb-blue', position: 'bottom-[-3rem] left-[3.5rem] h-80 w-16 -rotate-3' },
  { color: 'bg-bb-cream', position: 'bottom-[-2.5rem] left-[7.5rem] h-72 w-24 rotate-2' },
  { color: 'bg-bb-success', position: 'bottom-[-3.5rem] right-[5rem] h-96 w-16 rotate-[5deg]' },
  { color: 'bg-bb-warning', position: 'bottom-[-2rem] right-[-1rem] h-60 w-20 -rotate-6' },
  { color: 'bg-bb-link', position: 'top-[-2rem] right-[-2.5rem] h-48 w-16 rotate-12' },
];

export default function FAQHeroGuide({ counts }: FAQHeroGuideProps) {
  const [query, setQuery] = useState('');
  const inputId = useId();

  const matches = useMemo(() => new Set(categoriesForQuery(query)), [query]);
  const hasMatches = matches.size > 0;
  const searched = query.trim().length > 0;

  const status = !searched
    ? ''
    : hasMatches
      ? `${matches.size} ${matches.size === 1 ? 'category matches' : 'categories match'} your search`
      : 'No category matches your search - browse all five below';

  return (
    <section className="relative overflow-hidden bg-bb-charcoal">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:py-28">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: 56% on desktop, full width below lg. */}
          <div className="w-full lg:w-[56%]">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-gold">
              FAQ
            </p>
            <h1 className="font-heading text-4xl font-bold text-bb-white md:text-5xl lg:text-6xl">
              Everything You Need to Know
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-bb-gray-200">
              Honest answers about cost, permits, delivery, off-grid living, financing,
              and finding the right land for your Bright Box Home.
            </p>

            {/* Keyword search. Drives category emphasis only - it never hides a
                category, so the browse list stays stable while typing. */}
            <div className="relative mt-10 max-w-md">
              <label htmlFor={inputId} className="sr-only">
                Search the FAQ by keyword
              </label>
              <Search
                aria-hidden="true"
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bb-gray-400"
              />
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try septic, loan, delivery, warranty"
                className="min-h-11 w-full rounded-md border border-white/15 bg-bb-surface py-3 pl-11 pr-11 font-body text-bb-white transition-colors duration-fast ease-out placeholder:text-bb-gray-400 hover:border-white/25 focus-visible:border-bb-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold"
              />
              {searched && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm text-bb-gray-400 transition-colors duration-fast ease-out hover:text-bb-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold"
                >
                  <X aria-hidden="true" size={16} />
                </button>
              )}
            </div>

            <p aria-live="polite" className="mt-3 min-h-5 text-sm text-bb-gray-400">
              {status}
            </p>

            {/* The five stops. The route rail is desktop-only; below lg this is
                a plain stacked list of cards. */}
            <ol className="relative mt-8 space-y-3">
              <svg
                aria-hidden="true"
                className="absolute bottom-5 left-5 top-5 hidden w-0.5 -translate-x-1/2 lg:block"
                viewBox="0 0 2 100"
                preserveAspectRatio="none"
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  vectorEffect="non-scaling-stroke"
                  className="animate-route-draw stroke-bb-gold/40"
                />
              </svg>

              {faqCategories.map((category) => {
                const Icon = category.icon;
                const emphasised = hasMatches && matches.has(category.id);
                return (
                  <li key={category.id} className="relative flex items-center gap-4">
                    <span
                      className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-bb-charcoal transition-colors duration-normal ease-out ${
                        emphasised ? category.borderColor : 'border-white/15'
                      }`}
                    >
                      <Icon
                        aria-hidden="true"
                        size={18}
                        className={emphasised ? category.color : 'text-bb-gray-400'}
                      />
                    </span>
                    <div
                      className={`flex flex-1 items-center justify-between gap-4 rounded-md border bg-bb-surface px-4 py-3 transition-colors duration-normal ease-out ${
                        emphasised ? category.borderColor : 'border-white/10'
                      }`}
                    >
                      <span className="font-body font-medium text-bb-white">
                        {category.label}
                      </span>
                      <span className="font-mono text-sm text-bb-gray-400">
                        {counts[category.id]}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: 44% on desktop, hidden below lg (mobile is search + cards only). */}
          <div className="hidden w-full lg:block lg:w-[44%]">
            <div
              aria-hidden="true"
              className="relative h-[28rem] overflow-hidden rounded-lg bg-bb-surface"
            >
              {SPINES.map((spine, index) => (
                <span
                  key={spine.position}
                  style={{ animationDelay: `${index * 90}ms` }}
                  className={`animate-book-rise absolute rounded-sm shadow-lg ${spine.color} ${spine.position}`}
                >
                  <span className="absolute inset-y-2 right-1 w-1 rounded-full bg-bb-charcoal/20" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
