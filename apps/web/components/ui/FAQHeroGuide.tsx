'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { faqCategories, categoriesForQuery } from '@/lib/faq-data';
import type { FaqCategoryId } from '@/lib/faq-data';

// Cinematic hero for /faq, sized to land entirely above the fold: from md up
// the section fills the viewport minus the 64px sticky header (plus its 1px
// rule, rounded to 68) and centres its content in that box, so headline,
// search, route and books are all visible without scrolling. Three staged
// beats, all settled inside ~1.4s:
//   1. the sign  - headline block scales up out of a blur (animate-sign-in)
//   2. the route - a wave is drawn stop to stop, then pulses and runs a spark
//   3. the books - five category cards swing in off the shelf edge, staggered
// The books never wrap: they are a nowrap flex row at every width, trading the
// full category label for `shortLabel` below lg.
//
// Counts arrive as a prop rather than being derived here on purpose: this is a
// client component, and importing faqByCategoryId would drag all 22 answers into
// the client JS bundle on top of the copy the Accordion already receives as RSC
// props. Only the light exports (categories, keyword map) cross the boundary.

interface FAQHeroGuideProps {
  counts: Record<FaqCategoryId, number>;
}

/** Per-category colour as an rgba() string. Tailwind cannot build these from a
 *  runtime value, so the hero hands them to CSS as custom properties instead. */
function tint(hex: string, alpha: number): string {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

// Popular searches, surfaced as pills. Each label must contain a keyword from
// searchKeywordMap (lowercased) or the pill will light up nothing.
const PILLS = ['Cost', 'Financing', 'Permits', 'Delivery', 'Warranty'];

// Dust motes drifting over the plate. Fixed values, not random, so the server
// and client markup match. Absolutely positioned - they cost no layout height.
const MOTES = [
  { left: '11%', top: '24%', size: 3, delay: '0s', duration: '13s' },
  { left: '28%', top: '70%', size: 2, delay: '2.4s', duration: '16s' },
  { left: '47%', top: '16%', size: 3, delay: '1.1s', duration: '11s' },
  { left: '68%', top: '64%', size: 2, delay: '3.2s', duration: '17s' },
  { left: '86%', top: '30%', size: 3, delay: '0.6s', duration: '14s' },
];

// The route: a wave threading the five stop markers, which sit at the centre of
// each column (x = 100, 300, 500, 700, 900 in a 1000-wide viewBox at y = 60).
// Q then three T commands reflect the control point each time, so the line
// alternates crest and trough between stops without hand-tuned handles.
const ROUTE_PATH = 'M 100 60 Q 200 16 300 60 T 500 60 T 700 60 T 900 60';

export default function FAQHeroGuide({ counts }: FAQHeroGuideProps) {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const plateRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => new Set(categoriesForQuery(query)), [query]);
  const hasMatches = matches.size > 0;
  const searched = query.trim().length > 0;

  const status = !searched
    ? 'Search by keyword, or pick a shelf below.'
    : hasMatches
      ? `${matches.size} ${matches.size === 1 ? 'category matches' : 'categories match'} your search`
      : 'No category matches your search - browse all five below';

  // Parallax on the plate. Pointer-coarse and reduced-motion visitors get a
  // static background: the listener is never attached for them, so there is no
  // transform to undo and no scroll work on mobile.
  useEffect(() => {
    const plate = plateRef.current;
    if (!plate) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      // Capped so the plate never drifts past its 110% overscale and exposes
      // the charcoal underneath.
      const shift = Math.min(window.scrollY, 700) * 0.12;
      plate.style.transform = `translate3d(0, ${shift}px, 0) scale(1.1)`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative isolate flex flex-col justify-center overflow-hidden bg-bb-charcoal md:min-h-[calc(100svh-68px)]">
      {/* Plate: the capsule photo carries the hero, so it runs near full
          strength and the scrims only do what text contrast requires. */}
      <div
        ref={plateRef}
        aria-hidden="true"
        className="absolute inset-0 -z-20 scale-110 will-change-transform"
      >
        <Image
          src="/images/space-capsule-faq.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-95"
        />
      </div>

      {/* Overlay stack, deliberately light: a 20% wash that only deepens at the
          very bottom to blend into the cream accordion band, plus a soft pool
          behind the centre column so white type stays legible over the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(28,28,30,0.32)_0%,rgba(28,28,30,0.18)_35%,rgba(28,28,30,0.22)_72%,rgba(28,28,30,0.62)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(58%_48%_at_50%_34%,rgba(28,28,30,0.52)_0%,transparent_72%)]"
      />

      {/* Drifting motes. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {MOTES.map((mote) => (
          <span
            key={mote.left + mote.top}
            className="animate-drift absolute rounded-full bg-bb-gold/70 blur-[1px]"
            style={
              {
                left: mote.left,
                top: mote.top,
                width: mote.size,
                height: mote.size,
                animationDelay: mote.delay,
                '--drift-duration': mote.duration,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 lg:py-12">
        {/* Beat 1 - the sign. */}
        <div className="animate-sign-in mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-bb-gold/50 bg-bb-charcoal/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-bb-gold backdrop-blur-sm">
            FAQ
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold leading-[0.98] text-bb-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] sm:text-4xl lg:text-5xl">
            Everything You
            <span className="block bg-gradient-to-r from-bb-gold via-[#F0D49A] to-bb-gold bg-clip-text text-transparent">
              Need to Know
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-snug text-bb-gray-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-base">
            Honest answers about cost, permits, delivery, off-grid living, financing,
            and finding the right land for your Bright Box Home.
          </p>
        </div>

        {/* Search - centred, translucent, compact. */}
        <div
          style={{ animationDelay: '160ms' }}
          className="animate-fade-up relative mx-auto mt-5 max-w-lg"
        >
          <div
            aria-hidden="true"
            className="animate-halo-pulse pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(closest-side,rgba(212,168,83,0.28),transparent)] blur-xl"
          />
          <div className="relative">
            <label htmlFor={inputId} className="sr-only">
              Search the FAQ by keyword
            </label>
            <Search
              aria-hidden="true"
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-bb-gold"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try septic, loan, delivery, warranty"
              className="relative h-11 w-full rounded-lg border border-white/25 bg-black/55 pl-11 pr-10 text-center font-body text-sm text-bb-white shadow-[0_12px_36px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-normal ease-out placeholder:text-bb-gray-400 hover:border-white/40 hover:bg-black/65 focus-visible:border-bb-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold/70"
            />
            {searched && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-bb-gray-400 transition-colors duration-fast ease-out hover:bg-white/10 hover:text-bb-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold"
              >
                <X aria-hidden="true" size={16} />
              </button>
            )}
          </div>

          {/* Popular searches. */}
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
            {PILLS.map((pill, index) => {
              const active = query.toLowerCase() === pill.toLowerCase();
              return (
                <li key={pill}>
                  <button
                    type="button"
                    onClick={() => setQuery(active ? '' : pill)}
                    aria-pressed={active}
                    style={{ animationDelay: `${240 + index * 60}ms` }}
                    className={`animate-fade-up rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] backdrop-blur-md transition-all duration-normal ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold ${
                      active
                        ? 'border-bb-gold bg-bb-gold text-bb-charcoal shadow-[0_8px_24px_-8px_rgba(212,168,83,0.9)]'
                        : 'border-white/25 bg-black/40 text-bb-gray-200 hover:-translate-y-0.5 hover:border-bb-gold/70 hover:bg-black/55 hover:text-bb-white'
                    }`}
                  >
                    {pill}
                  </button>
                </li>
              );
            })}
          </ul>

          <p
            aria-live="polite"
            className="mt-2 min-h-4 text-center text-xs text-bb-gray-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            {status}
          </p>
        </div>

        {/* Beat 2 - the route. Decorative; its geometry is tied to the five
            columns below, which hold at every width now that the shelf never
            wraps. Hidden on the narrowest screens purely to save height. */}
        <div aria-hidden="true" className="relative mt-5 hidden h-9 sm:block lg:h-11">
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            fill="none"
          >
            <g className="animate-route-pulse" style={{ animationDelay: '1100ms' }}>
              <path
                d={ROUTE_PATH}
                pathLength={1}
                strokeDasharray="1"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: '260ms' }}
                className="animate-route-trace stroke-bb-gold"
              />
            </g>
            {/* The spark: a short dash of the same path, running it on a loop. */}
            <path
              d={ROUTE_PATH}
              pathLength={1}
              strokeDasharray="0.07 0.93"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: '1500ms' }}
              className="animate-route-spark stroke-white/90 drop-shadow-[0_0_8px_rgba(212,168,83,1)]"
            />
          </svg>

          {/* Stop markers, one per column, sitting on the line at y = 50%. */}
          <div className="absolute inset-0 grid grid-cols-5">
            {faqCategories.map((category, index) => {
              const emphasised = hasMatches && matches.has(category.id);
              return (
                <div key={category.id} className="flex items-center justify-center">
                  <span
                    style={
                      {
                        animationDelay: `${420 + index * 90}ms`,
                        '--cat': category.hex,
                        '--cat-glow': tint(category.hex, 0.75),
                      } as CSSProperties
                    }
                    className={`animate-node-pop block h-3 w-3 rounded-full border-2 border-[color:var(--cat)] bg-bb-charcoal transition-all duration-normal ease-out ${
                      emphasised
                        ? 'scale-150 bg-[color:var(--cat)] shadow-[0_0_20px_4px_var(--cat-glow)]'
                        : 'shadow-[0_0_12px_var(--cat-glow)]'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Beat 3 - the books. One nowrap row at every width: each card is a
            flex-1 basis-0 column, so five always fit and simply narrow on
            phones. Real anchors into the accordion; smooth scrolling and the
            80px header offset both come from globals.css (scroll-behavior and
            scroll-padding-top on html), which also means reduced-motion
            visitors get an instant jump for free. */}
        <nav aria-label="Jump to a FAQ category" className="mt-4 sm:mt-3">
          <ul className="flex flex-nowrap items-stretch gap-1.5 sm:gap-3">
            {faqCategories.map((category, index) => {
              const Icon = category.icon;
              const emphasised = hasMatches && matches.has(category.id);
              const dimmed = hasMatches && !emphasised;
              const count = counts[category.id];
              return (
                <li key={category.id} className="min-w-0 flex-1 basis-0">
                  <a
                    href={`#${category.id}`}
                    style={
                      {
                        animationDelay: `${480 + index * 90}ms`,
                        '--cat': category.hex,
                        '--cat-soft': tint(category.hex, 0.45),
                        '--cat-tint': tint(category.hex, 0.14),
                        '--cat-glow': tint(category.hex, 0.55),
                      } as CSSProperties
                    }
                    className={`animate-book-swing group relative flex h-full flex-col items-center gap-1.5 overflow-hidden rounded-lg border-2 border-[color:var(--cat-soft)] bg-black/40 px-1 pb-2.5 pt-3 text-center shadow-[0_14px_34px_-16px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-normal ease-spring hover:-translate-y-2 hover:scale-[1.05] hover:border-[color:var(--cat)] hover:bg-black/55 hover:shadow-[0_22px_50px_-14px_var(--cat-glow)] focus-visible:-translate-y-2 focus-visible:scale-[1.05] focus-visible:border-[color:var(--cat)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold sm:gap-2 sm:px-3 sm:pb-3 sm:pt-4 ${
                      emphasised
                        ? 'ring-2 ring-[color:var(--cat)] ring-offset-2 ring-offset-bb-charcoal'
                        : ''
                    } ${dimmed ? 'opacity-45 saturate-50' : 'opacity-100'}`}
                  >
                    {/* Spine: the coloured top edge of the book. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-[color:var(--cat)]"
                    />
                    {/* Sheen that sweeps the card face on hover. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.16)_50%,transparent_80%)] transition-transform duration-slow ease-out group-hover:translate-x-full"
                    />
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[color:var(--cat-soft)] bg-[color:var(--cat-tint)] transition-transform duration-normal ease-spring group-hover:-rotate-6 group-hover:scale-110 sm:h-9 sm:w-9"
                    >
                      <Icon size={16} className={`${category.color} sm:h-[18px] sm:w-[18px]`} />
                    </span>
                    <span className="hyphens-auto break-words font-heading text-[10px] font-semibold leading-tight text-bb-white sm:text-sm">
                      <span className="lg:hidden">{category.shortLabel}</span>
                      <span className="hidden lg:inline">{category.label}</span>
                    </span>
                    <span className="font-mono text-[10px] text-bb-gray-200 sm:text-xs">
                      {count}
                      <span className="sr-only">
                        {count === 1 ? ' question' : ' questions'}
                      </span>
                      <span aria-hidden="true"> Q</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
