import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

// Three-tier button system per DESIGN_LANGUAGE.md Section 5.3, carrying the
// approved amber-gold direction:
//
//   primary   solid bb-gold with a charcoal label (7.7:1) - one per band
//   secondary 1.5px outline in the band's own text colour
//   ghost     text only, gold on hover
//
// `tone` says which band the button sits on, so the outline, hover wash and
// focus ring resolve against the right ground. There are no inline styles and
// no gradient: the retired blue primary duplicated its gradient and glow in
// this file and in BookConsultation, which is how the two drifted apart.

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'default' | 'sm' | 'lg';
export type ButtonTone = 'dark' | 'light';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  href?: string;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;

export function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

// Base: 44px min touch target (WCAG 2.5.8), radius-md (10px), body font, fast
// ease-out transition, and a 2px focus ring at >=3:1 against its own ground
// (WCAG 2.2 Focus Appearance).
const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-body ' +
  'transition-colors duration-fast ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none';

const toneClasses: Record<ButtonTone, string> = {
  dark: 'focus-visible:ring-bb-gold focus-visible:ring-offset-bb-charcoal',
  light: 'focus-visible:ring-bb-charcoal focus-visible:ring-offset-bb-cream',
};

const variantClasses: Record<ButtonTone, Record<ButtonVariant, string>> = {
  dark: {
    primary: 'bg-bb-gold text-bb-charcoal font-semibold hover:bg-bb-gold-press',
    secondary:
      'border-[1.5px] border-white/25 font-medium text-white hover:bg-white/10 hover:border-white/40',
    ghost: 'font-medium text-white hover:text-bb-gold',
  },
  light: {
    primary: 'bg-bb-gold text-bb-charcoal font-semibold hover:bg-bb-gold-press',
    secondary:
      'border-[1.5px] border-bb-charcoal/30 font-medium text-bb-charcoal hover:bg-bb-charcoal/5 hover:border-bb-charcoal/50',
    ghost: 'font-medium text-bb-charcoal hover:underline underline-offset-4',
  },
};

// Horizontal padding space-6 (px-6), vertical padding space-3 (py-3) per spec.
// All sizes keep a >=44px height.
const sizeClasses: Record<ButtonSize, string> = {
  default: 'min-h-11 px-6 py-3 text-base',
  sm: 'min-h-11 px-4 py-3 text-sm',
  lg: 'min-h-12 px-8 py-4 text-lg',
};

// Shared so BookConsultation renders an identical button without restating it.
export function buttonClasses({
  variant = 'primary',
  size = 'default',
  tone = 'dark',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  className?: string;
} = {}): string {
  return cx(base, toneClasses[tone], variantClasses[tone][variant], sizeClasses[size], className);
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'default', tone = 'dark', href, className, children, ...rest },
    ref,
  ) {
    const classes = buttonClasses({ variant, size, tone, className });

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);
