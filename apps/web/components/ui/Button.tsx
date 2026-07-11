import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
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
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9BF7] focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none';

const variantClasses: Record<Variant, string> = {
  primary: 'font-semibold text-white',
  secondary: 'text-white',
  ghost: 'text-white bg-transparent hover:text-[#6B9BF7]',
};

// Literal hex styling for the redesign (linear gradients + glow can't be a
// Tailwind class here, so applied inline). ghost keeps class-based styling.
const variantStyle: Record<Variant, CSSProperties | undefined> = {
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
  ghost: undefined,
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
    { variant = 'primary', size = 'default', href, className, children, style, ...rest },
    ref,
  ) {
    const classes = cx(base, variantClasses[variant], sizeClasses[size], className);
    const mergedStyle: CSSProperties | undefined =
      variantStyle[variant] || style ? { ...variantStyle[variant], ...style } : undefined;

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          style={mergedStyle}
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
        style={mergedStyle}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);
