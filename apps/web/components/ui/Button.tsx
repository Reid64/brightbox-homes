import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

// Three-tier button system per DESIGN_LANGUAGE.md Section 5.3.
// Renders a next/link anchor when `href` is provided, otherwise a <button>.

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'default' | 'sm' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

// Base: 44px min touch target (WCAG 2.5.8), radius-sm, body font, fast ease-out
// transition, visible focus ring, and a non-interactive disabled state.
const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-body font-medium ' +
  'transition-colors duration-fast ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-bb-blue text-white font-semibold hover:bg-bb-blue-dark',
  secondary: 'border border-white/40 text-white bg-transparent hover:bg-white/10',
  ghost: 'text-white bg-transparent hover:text-bb-blue',
};

// Horizontal padding space-6 (px-6), vertical padding space-3 (py-3) per spec.
// All sizes keep a >=44px height.
const sizeClasses: Record<Size, string> = {
  default: 'min-h-11 px-6 py-3 text-base',
  sm: 'min-h-11 px-4 py-3 text-sm',
  lg: 'min-h-12 px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'default', href, className, children, ...rest },
    ref,
  ) {
    const classes = cx(base, variantClasses[variant], sizeClasses[size], className);

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
