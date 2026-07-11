'use client';

import { useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
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
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9BF7] focus-visible:ring-offset-2';

const variantClasses: Record<Variant, string> = {
  primary: 'font-semibold text-white',
  secondary: 'text-white',
};

// Literal redesign styling (gradient + glow) applied inline.
const variantStyle: Record<Variant, CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #4A7CE5, #6B9BF7)',
    color: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0 0 25px rgba(107,155,247,0.3)',
  },
  secondary: {
    background: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.25)',
    color: '#FFFFFF',
    borderRadius: '10px',
  },
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
      style={variantStyle[variant]}
    >
      {children}
    </button>
  );
}
