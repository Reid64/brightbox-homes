'use client';

import { Phone } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

interface SidebarProps {
  steps: string[];
  active: number;
  onSelect: (index: number) => void;
}

// Solid red down-pointing arrow (stem + head).
function DownArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 16 20"
      fill="#EF4444"
      aria-hidden="true"
      className={className}
    >
      <polygon points="8,20 0,8 4,8 4,0 12,0 12,8 16,8" />
    </svg>
  );
}

export default function DesignJourneySidebar({ steps, active, onSelect }: SidebarProps) {
  return (
    <>
      {/* Desktop: vertical step indicator */}
      <aside className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="sticky top-20">
          <h2 className="font-heading text-2xl font-bold text-white">Design Your Home</h2>

          <ol className="mt-8">
            {steps.map((label, i) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white transition-transform duration-fast ease-out ${
                      active === i ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-bb-charcoal' : ''
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`transition-colors duration-fast ease-out ${
                      active === i ? 'font-semibold text-white' : 'text-gray-400'
                    }`}
                  >
                    {label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="ml-[7px] py-1.5" aria-hidden="true">
                    <DownArrow />
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <BookConsultation className="w-full" />
            <a
              href="tel:8002591745"
              className="mt-3 flex items-center justify-center gap-2 text-base font-semibold text-gray-200 transition-colors duration-fast ease-out hover:text-white"
            >
              <Phone size={18} aria-hidden="true" className="text-red-500" />
              800-259-1745
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile: horizontal scrollable step bar */}
      <div className="sticky top-16 z-30 -mx-4 mb-2 border-b border-white/10 bg-bb-charcoal/90 backdrop-blur sm:-mx-6 lg:hidden">
        <div className="flex items-center gap-1 overflow-x-auto px-4 py-3 sm:px-6" role="tablist" aria-label="Design steps">
          {steps.map((label, i) => (
            <div key={label} className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Step ${i + 1}: ${label}`}
                aria-current={active === i ? 'step' : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white transition-transform duration-fast ease-out ${
                  active === i ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-bb-charcoal' : ''
                }`}
              >
                {i + 1}
              </button>
              {i < steps.length - 1 && <DownArrow className="mx-0.5 -rotate-90" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
