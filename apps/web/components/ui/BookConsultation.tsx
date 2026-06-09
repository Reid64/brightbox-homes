'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { getCalApi } from '@calcom/embed-react';

// Opens the Cal.com booking modal on click (no navigation). Styling mirrors
// the Button component's primary/secondary tiers.

const CAL_LINK = 'reid-whitesides-bcg38n/30min';
const CAL_NAMESPACE = '30min';

type Variant = 'primary' | 'secondary';
type Size = 'default' | 'sm' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-body font-medium ' +
  'transition-colors duration-fast ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue focus-visible:ring-offset-2';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-bb-blue text-white font-semibold hover:bg-bb-blue-dark',
  secondary: 'border border-white/40 text-white bg-transparent hover:bg-white/10',
};

const sizeClasses: Record<Size, string> = {
  default: 'min-h-11 px-6 py-3 text-base',
  sm: 'min-h-11 px-4 py-3 text-sm',
  lg: 'min-h-12 px-8 py-4 text-lg',
};

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

interface BookConsultationProps {
  size?: Size;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export function BookConsultation({
  size = 'default',
  variant = 'primary',
  className,
  onClick,
  children = 'Book a Consultation',
}: BookConsultationProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#4A9BD9' },
          dark: { 'cal-brand': '#4A9BD9' },
        },
      });
    })();
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className={cx(base, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </button>
  );
}
