'use client';

import { ChevronDown, Phone } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

interface SidebarProps {
  steps: string[];
  active: number;
  onSelect: (index: number) => void;
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
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white transition-transform duration-fast ease-out ${
                      active === i ? 'scale-110 bg-red-500' : 'bg-red-500/30'
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
                  <div className="ml-4 flex flex-col items-center py-1" aria-hidden="true">
                    <span className="h-6 w-0.5 bg-red-500" />
                    <ChevronDown size={16} className="-mt-1 text-red-500" />
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
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white transition-transform duration-fast ease-out ${
                  active === i ? 'scale-110 bg-red-500' : 'bg-red-500/30'
                }`}
              >
                {i + 1}
              </button>
              {i < steps.length - 1 && <span className="h-0.5 w-6 bg-red-500" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
