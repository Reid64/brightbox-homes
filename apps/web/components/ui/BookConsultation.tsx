'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { buttonClasses } from '@/components/ui/Button';
import type { ButtonSize, ButtonTone, ButtonVariant } from '@/components/ui/Button';

// Opens the Cal.com booking modal on click (no navigation). Styling comes from
// Button's shared class map rather than a second copy of it, so the two cannot
// drift apart again.

const CAL_LINK = 'reid-whitesides-bcg38n/30min';
const CAL_NAMESPACE = '30min';

interface BookConsultationProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export function BookConsultation({
  size = 'default',
  variant = 'primary',
  tone = 'dark',
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
          light: { 'cal-brand': '#D4A853' },
          dark: { 'cal-brand': '#D4A853' },
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
      className={buttonClasses({ variant, size, tone, className })}
    >
      {children}
    </button>
  );
}
