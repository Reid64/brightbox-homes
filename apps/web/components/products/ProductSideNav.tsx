'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

export interface NavSection {
  id: string;
  label: string;
}

// Sticky side navigation with scroll-spy. Desktop: vertical sidebar.
// Mobile (below lg): horizontal sticky tab bar.
export default function ProductSideNav({
  productName,
  sections,
}: {
  productName: string;
  sections: NavSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Desktop sticky sidebar (lg+) - a real panel, flush to the content's left edge */}
      <aside className="hidden lg:block lg:w-60 lg:shrink-0">
        <div className="sticky top-20 rounded-2xl border border-white/10 bg-bb-surface-dark p-5">
          <p className="font-heading text-lg font-bold text-white">{productName}</p>
          <nav className="mt-5 flex flex-col gap-1" aria-label="Section navigation">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={`rounded-md border-l-4 px-3 py-2 text-base font-semibold transition-colors duration-fast ease-out ${
                  active === s.id
                    ? 'border-bb-blue bg-bb-blue/15 text-white'
                    : 'border-transparent text-gray-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="mt-6">
            <BookConsultation className="w-full">Get a Custom Quote</BookConsultation>
            <Link
              href="/reserve"
              className="mt-2 block w-full rounded-sm bg-red-500 px-4 py-2.5 text-center text-sm font-bold text-white transition-colors duration-fast ease-out hover:bg-red-600"
            >
              Reserve - $500
            </Link>
            <a
              href="tel:8002591745"
              className="mt-3 flex items-center justify-center gap-2 px-3 text-base font-semibold text-gray-200 transition-colors duration-fast ease-out hover:text-white"
            >
              <Phone size={18} aria-hidden="true" className="text-red-500" />
              800-259-1745
            </a>
            <div className="mt-4 flex flex-row items-center justify-center gap-4">
              <Image
                src="/images/badges/faith-foundation-partnership.png"
                alt="FAITH Foundation Partner"
                width={140}
                height={140}
                className="h-14 w-auto"
              />
              <Image
                src="/images/badges/faith-2500-donation.png"
                alt="$2,500 donated per home sold"
                width={140}
                height={140}
                className="h-14 w-auto"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sticky tab bar (below lg) */}
      <div className="sticky top-16 z-30 -mx-6 mb-4 border-b border-white/10 bg-bb-charcoal/90 backdrop-blur lg:hidden">
        <nav
          className="flex gap-1 overflow-x-auto px-6 py-2"
          aria-label="Section navigation"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors duration-fast ease-out ${
                active === s.id ? 'bg-bb-blue/20 font-semibold text-white' : 'text-gray-200'
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
