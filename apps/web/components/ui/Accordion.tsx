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

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

export default function Accordion({ sections }: AccordionProps) {
  // One open item at a time across the whole accordion.
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-16">
      {sections.map((section, si) => (
        <div key={section.title}>
          <p className={label}>{section.title}</p>
          <div className="border-t border-white/5">
            {section.items.map((item, ii) => {
              const id = `${si}-${ii}`;
              const open = openId === id;
              const panelId = `faq-panel-${id}`;
              const btnId = `faq-btn-${id}`;
              return (
                <div key={id} className="border-b border-white/5">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-fast ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
                  >
                    <span className="font-body font-medium text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 text-bb-blue transition-transform duration-normal ease-out ${
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
                      <p className="pb-5 pr-8 text-gray-300">{item.answer}</p>
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
