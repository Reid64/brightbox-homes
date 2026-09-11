'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { faqCategories, categoriesForQuery } from '@/lib/faq-data';
import type { FaqCategoryId } from '@/lib/faq-data';

// Cinematic hero for /faq. Three staged beats over a ghosted full-bleed plate:
//   1. the sign  - headline block scales up out of a blur (animate-sign-in)
//   2. the route - a wave is drawn stop to stop, then pulses and runs a spark
//   3. the books - five category cards swing in off the shelf edge, staggered
// Everything below the beats is real navigation: each book is an anchor to its
// accordion section, and the pills drive the keyword search.
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
const PILLS = ['Cost', 'Financing', 'Permits', 'Delivery', 'Off-grid', 'Warranty'];

// Dust motes drifting over the plate. Fixed values, not random, so the server
// and client markup match.
const MOTES = [
  { left: '8%', top: '22%', size: 3, delay: '0s', duration: '13s' },
  { left: '17%', top: '68%', size: 2, delay: '2.4s', duration: '16s' },
  { left: '29%', top: '14%', size: 4, delay: '1.1s', duration: '11s' },
  { left: '41%', top: '78%', size: 2, delay: '3.6s', duration: '18s' },
  { left: '53%', top: '31%', size: 3, delay: '0.7s', duration: '14s' },
  { left: '64%', top: '61%', size: 2, delay: '4.2s', duration: '12s' },
  { left: '73%', top: '18%', size: 4, delay: '1.9s', duration: '17s' },
  { left: '82%', top: '72%', size: 3, delay: '3.1s', duration: '15s' },
  { left: '91%', top: '38%', size: 2, delay: '0.4s', duration: '19s' },
  { left: '96%', top: '12%', size: 3, delay: '2.8s', duration: '13s' },
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
      // Capped so the plate never drifts past its 115% overscale and exposes
      // the charcoal underneath.
      const shift = Math.min(window.scrollY, 900) * 0.16;
      plate.style.transform = `translate3d(0, ${shift}px, 0) scale(1.15)`;
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
    <section className="relative isolate overflow-hidden bg-bb-charcoal">
      {/* Plate: ghosted photo, overscaled so the parallax shift has room. */}
      <div ref={plateRef} aria-hidden="true" className="absolute inset-0 -z-20 scale-[1.15] will-change-transform">
        <Image
          src="/images/space-capsule-faq.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.38]"
        />
      </div>

      {/* Overlay stack: a dark scrim for text contrast, a warm gold bloom from
          the top-left, and a vignette that pins the edges back to charcoal. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(28,28,30,0.92)_0%,rgba(28,28,30,0.74)_38%,rgba(28,28,30,0.88)_78%,rgba(28,28,30,0.98)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_18%_12%,rgba(212,168,83,0.20)_0%,transparent_68%),radial-gradient(70%_60%_at_85%_85%,rgba(74,155,217,0.16)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 shadow-[inset_0_0_180px_60px_rgba(28,28,30,0.95)]"
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

      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:py-28">
        {/* Beat 1 - the sign. */}
        <div className="animate-sign-in mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-bb-gold/40 bg-bb-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-bb-gold backdrop-blur-sm">
            FAQ
          </p>
          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.08] text-bb-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)] md:text-6xl lg:text-7xl">
            Everything You
            <span className="block bg-gradient-to-r from-bb-gold via-[#F0D49A] to-bb-gold bg-clip-text text-transparent">
              Need to Know
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-bb-gray-200 md:text-xl">
            Honest answers about cost, permits, delivery, off-grid living, financing,
            and finding the right land for your Bright Box Home.
          </p>
        </div>

        {/* Search - centred, translucent, with a breathing halo behind it. */}
        <div
          style={{ animationDelay: '420ms' }}
          className="animate-fade-up relative mx-auto mt-10 max-w-xl"
        >
          <div
            aria-hidden="true"
            className="animate-halo-pulse pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgba(212,168,83,0.35),transparent)] blur-2xl"
          />
          <div className="relative">
            <label htmlFor={inputId} className="sr-only">
              Search the FAQ by keyword
            </label>
            <Search
              aria-hidden="true"
              size={20}
              className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-bb-gold"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try septic, loan, delivery, warranty"
              className="relative min-h-14 w-full rounded-lg border border-white/20 bg-black/50 py-4 pl-14 pr-12 text-center font-body text-lg text-bb-white shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-normal ease-out placeholder:text-bb-gray-400 hover:border-white/35 hover:bg-black/60 focus-visible:border-bb-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold/70"
            />
            {searched && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-bb-gray-400 transition-colors duration-fast ease-out hover:bg-white/10 hover:text-bb-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold"
              >
                <X aria-hidden="true" size={18} />
              </button>
            )}
          </div>

          {/* Popular searches. */}
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {PILLS.map((pill, index) => {
              const active = query.toLowerCase() === pill.toLowerCase();
              return (
                <li key={pill}>
                  <button
                    type="button"
                    onClick={() => setQuery(active ? '' : pill)}
                    aria-pressed={active}
                    style={{ animationDelay: `${520 + index * 70}ms` }}
                    className={`animate-fade-up min-h-11 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] backdrop-blur-md transition-all duration-normal ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold ${
                      active
                        ? 'border-bb-gold bg-bb-gold text-bb-charcoal shadow-[0_10px_30px_-8px_rgba(212,168,83,0.9)]'
                        : 'border-white/20 bg-white/5 text-bb-gray-200 hover:-translate-y-0.5 hover:border-bb-gold/70 hover:bg-white/10 hover:text-bb-white'
                    }`}
                  >
                    {pill}
                  </button>
                </li>
              );
            })}
          </ul>

          <p aria-live="polite" className="mt-4 min-h-5 text-center text-sm text-bb-gray-400">
            {status}
          </p>
        </div>

        {/* Beat 2 - the route. Decorative, and the geometry only lines up with
            the five-column grid, so it is desktop-only. */}
        <div aria-hidden="true" className="relative mt-16 hidden h-16 lg:block">
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            fill="none"
          >
            <g className="animate-route-pulse" style={{ animationDelay: '1500ms' }}>
              <path
                d={ROUTE_PATH}
                pathLength={1}
                strokeDasharray="1"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: '700ms' }}
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
              style={{ animationDelay: '2100ms' }}
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
                        animationDelay: `${900 + index * 130}ms`,
                        '--cat': category.hex,
                        '--cat-glow': tint(category.hex, 0.75),
                      } as CSSProperties
                    }
                    className={`animate-node-pop block h-3.5 w-3.5 rounded-full border-2 border-[color:var(--cat)] bg-bb-charcoal transition-all duration-normal ease-out ${
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

        {/* Beat 3 - the books. Real anchors into the accordion; smooth scrolling
            and the 80px header offset both come from globals.css (scroll-behavior
            and scroll-padding-top on html), which also means reduced-motion
            visitors get an instant jump for free. */}
        <nav aria-label="Jump to a FAQ category" className="mt-8 lg:mt-6">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {faqCategories.map((category, index) => {
              const Icon = category.icon;
              const emphasised = hasMatches && matches.has(category.id);
              const dimmed = hasMatches && !emphasised;
              const count = counts[category.id];
              return (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    style={
                      {
                        animationDelay: `${1000 + index * 140}ms`,
                        '--cat': category.hex,
                        '--cat-soft': tint(category.hex, 0.45),
                        '--cat-tint': tint(category.hex, 0.14),
                        '--cat-glow': tint(category.hex, 0.55),
                      } as CSSProperties
                    }
                    className={`animate-book-swing group relative flex h-full flex-row items-center gap-4 overflow-hidden rounded-lg border-2 border-[color:var(--cat-soft)] bg-white/[0.07] px-5 py-5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-normal ease-spring hover:-translate-y-3 hover:scale-[1.04] hover:border-[color:var(--cat)] hover:bg-white/[0.12] hover:shadow-[0_28px_60px_-14px_var(--cat-glow)] focus-visible:-translate-y-3 focus-visible:scale-[1.04] focus-visible:border-[color:var(--cat)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold lg:flex-col lg:items-start lg:gap-5 lg:py-7 ${
                      emphasised ? 'ring-2 ring-[color:var(--cat)] ring-offset-2 ring-offset-bb-charcoal' : ''
                    } ${dimmed ? 'opacity-45 saturate-50' : 'opacity-100'}`}
                  >
                    {/* Spine: the coloured edge of the book. Runs down the left
                        on stacked layouts, across the top on the shelf grid. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1.5 bg-[color:var(--cat)] lg:inset-x-0 lg:inset-y-auto lg:top-0 lg:h-1.5 lg:w-auto"
                    />
                    {/* Sheen that sweeps the card face on hover. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.14)_50%,transparent_80%)] transition-transform duration-slow ease-out group-hover:translate-x-full"
                    />
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[color:var(--cat-soft)] bg-[color:var(--cat-tint)] transition-transform duration-normal ease-spring group-hover:scale-110 group-hover:rotate-[-6deg]"
                    >
                      <Icon size={24} className={category.color} />
                    </span>
                    <span className="flex flex-1 items-center justify-between gap-3 lg:w-full lg:flex-col lg:items-start lg:gap-2">
                      <span className="font-heading text-lg font-semibold leading-tight text-bb-white">
                        {category.label}
                      </span>
                      <span className="font-mono text-sm text-bb-gray-400">
                        {count}
                        <span className="sr-only">
                          {count === 1 ? ' question' : ' questions'}
                        </span>
                        <span aria-hidden="true"> Q</span>
                      </span>
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
