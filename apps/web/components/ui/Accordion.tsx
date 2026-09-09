'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
}

const label = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-black/60';

export default function Accordion({ sections }: AccordionProps) {
  // Multiple items can be open simultaneously.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-16">
      {sections.map((section, si) => (
        <div key={section.title}>
          <p className={label}>{section.title}</p>
          <div className="border-t border-black/10">
            {section.items.map((item, ii) => {
              const id = `${si}-${ii}`;
              const open = openIds.has(id);
              const panelId = `faq-panel-${id}`;
              const btnId = `faq-btn-${id}`;
              return (
                <div key={id} className="border-b border-black/10">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 ease-out hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
                  >
                    <span className="font-body font-medium text-[#111827]">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 text-[#D4A853] transition-transform duration-normal ease-out ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-all duration-normal ease-out ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-8 text-[#4B5563]">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
