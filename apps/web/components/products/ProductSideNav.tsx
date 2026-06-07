'use client';

import { useEffect, useState } from 'react';
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
      {/* Desktop sticky sidebar (lg+) */}
      <aside className="hidden lg:block lg:w-56 lg:shrink-0">
        <div className="sticky top-20 py-10">
          <p className="font-heading text-lg font-bold text-white">{productName}</p>
          <nav className="mt-6 flex flex-col gap-1" aria-label="Section navigation">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors duration-fast ease-out ${
                  active === s.id
                    ? 'bg-bb-blue/10 text-bb-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="mt-8">
            <BookConsultation className="w-full" />
            <a
              href="tel:8002591745"
              className="mt-3 flex items-center gap-2 px-3 text-sm text-gray-400 transition-colors duration-fast ease-out hover:text-white"
            >
              <Phone size={16} aria-hidden="true" className="text-red-500" />
              800-259-1745
            </a>
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
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors duration-fast ease-out ${
                active === s.id ? 'bg-bb-blue/10 text-bb-blue' : 'text-gray-400'
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
