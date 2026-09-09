import type { ReactNode } from 'react';

// The approved band system (proposal item 03). Sections alternate charcoal and
// cream; `tone` sets ground, text and eyebrow colour as one set so a band can
// never end up dark-on-dark. Vertical rhythm comes from the existing spacing
// tokens (--space-16 / --space-24 / --space-32), not new numbers.
//
//   feature   96px -> 128px   full marketing sections
//   standard  64px -> 96px    supporting sections
//   strip     40px            dividers: marquees, badge rows

export type SectionTone = 'charcoal' | 'cream';
export type SectionSize = 'feature' | 'standard' | 'strip';

interface SectionProps {
  tone: SectionTone;
  size?: SectionSize;
  width?: 'default' | 'wide';
  className?: string;
  id?: string;
  children: ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  charcoal: 'bg-bb-charcoal text-bb-gray-100',
  cream: 'bg-bb-cream text-bb-charcoal',
};

const sizeClasses: Record<SectionSize, string> = {
  feature: 'py-24 lg:py-32',
  standard: 'py-16 lg:py-24',
  strip: 'py-10',
};

const widthClasses = {
  default: 'max-w-[1280px]',
  wide: 'max-w-[1440px]',
};

// Eyebrow label for each tone: gold on charcoal, charcoal on cream. Gold is
// barred on cream at 1.9:1, which is why the light variant is not gold.
export const eyebrow: Record<SectionTone, string> = {
  charcoal: 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-bb-gold',
  cream: 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-black/60',
};

export default function Section({
  tone,
  size = 'feature',
  width = 'default',
  className,
  id,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[toneClasses[tone], sizeClasses[size], className].filter(Boolean).join(' ')}
    >
      <div className={`mx-auto ${widthClasses[width]} px-6`}>{children}</div>
    </section>
  );
}
