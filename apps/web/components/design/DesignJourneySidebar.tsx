'use client';

import { useEffect, useRef } from 'react';

interface SidebarProps {
  steps: string[];
  active: number;
  onSelect: (index: number) => void;
}

// Brand tokens (DESIGN_LANGUAGE.md): amber is the primary accent, charcoal the
// dark ground. Blue is reserved for the logo and inline links, so the step bar
// runs entirely on amber.
const AMBER = '#D4A853';
const AMBER_SOFT = 'rgba(212,168,83,0.18)';
const AMBER_FAINT = 'rgba(212,168,83,0.30)';

export default function DesignJourneyStepBar({ steps, active, onSelect }: SidebarProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);

  // Keep the active step visible inside the horizontal scroller on narrow
  // screens. Scoped to the scroller so the page itself never jumps.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const item = activeRef.current;
    if (!scroller || !item) return;

    const itemLeft = item.offsetLeft;
    const itemRight = itemLeft + item.offsetWidth;
    const viewLeft = scroller.scrollLeft;
    const viewRight = viewLeft + scroller.clientWidth;

    if (itemLeft < viewLeft) {
      scroller.scrollTo({ left: Math.max(itemLeft - 16, 0), behavior: 'smooth' });
    } else if (itemRight > viewRight) {
      scroller.scrollTo({ left: itemRight - scroller.clientWidth + 16, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <nav
      aria-label="Design steps"
      className="sticky top-16 z-30 border-b border-white/10 bg-[#0D1526]/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* The scroller owns the overflow so the page never scrolls sideways. */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto px-4 sm:px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <ol className="flex w-max flex-nowrap items-center gap-1 py-3">
            {steps.map((label, i) => {
              const isActive = active === i;
              const isComplete = i < active;
              return (
                <li
                  key={label}
                  ref={isActive ? activeRef : null}
                  className="flex shrink-0 items-center"
                >
                  <button
                    type="button"
                    onClick={() => onSelect(i)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`Step ${i + 1}: ${label}`}
                    className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm transition-all duration-200 sm:pr-4"
                    style={{
                      background: isActive ? AMBER : isComplete ? AMBER_SOFT : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#1C1C1E' : isComplete ? AMBER : '#9CA3AF',
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-black sm:h-14 sm:w-14 sm:text-[22px]"
                      style={{
                        background: isActive
                          ? 'rgba(28,28,30,0.18)'
                          : isComplete
                            ? AMBER
                            : 'rgba(255,255,255,0.10)',
                        color: isActive ? '#1C1C1E' : isComplete ? '#1C1C1E' : '#E5E7EB',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="hidden whitespace-nowrap sm:inline">{label}</span>
                  </button>

                  {i < steps.length - 1 && (
                    <span className="mx-1 hidden shrink-0 items-center sm:flex" aria-hidden="true">
                      <svg width="32" height="24" viewBox="0 0 32 24">
                        <polygon
                          points="0,6 20,6 20,0 32,12 20,24 20,18 0,18"
                          fill={i < active ? AMBER : AMBER_FAINT}
                        />
                      </svg>
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
