import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Two card roles (proposal item 05), replacing five ad-hoc treatments.
//
// MediaCard   navigates somewhere, so it earns shadow, border and a hover lift
// ContentCard static copy: flat fill, no shadow, no hover
// StatTile    a single figure on a charcoal fill
//
// Border, fill, radius and shadow all say "separate, liftable object". Spending
// them on a paragraph that does nothing flattens the page and teaches visitors
// that lift means nothing - so only MediaCard gets them. Radius is the 16px
// token (rounded-lg) throughout.

interface MediaCardProps {
  href: string;
  title: string;
  image?: string;
  alt?: string;
  price?: string;
  blurb?: string;
  cta?: string;
  sizes?: string;
  aspect?: string;
}

export function MediaCard({
  href,
  title,
  image,
  alt,
  price,
  blurb,
  cta = 'View Model',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  aspect = 'aspect-[4/3]',
}: MediaCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-[0_4px_20px_rgba(28,28,30,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-bb-gold hover:shadow-[0_12px_32px_rgba(28,28,30,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-charcoal focus-visible:ring-offset-2 focus-visible:ring-offset-bb-cream motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {image && (
        <div className={`relative ${aspect} w-full overflow-hidden`}>
          <Image
            src={image}
            alt={alt ?? title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-bb-charcoal">{title}</h3>
        {price && <p className="mt-1 font-mono text-sm text-bb-charcoal">{price}</p>}
        {blurb && <p className="mt-3 text-sm text-[#4B5563]">{blurb}</p>}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bb-link group-hover:underline">
          {cta}
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

interface ContentCardProps {
  tone?: 'charcoal' | 'cream';
  className?: string;
  children: ReactNode;
}

export function ContentCard({ tone = 'charcoal', className, children }: ContentCardProps) {
  const toneClasses =
    tone === 'charcoal'
      ? 'bg-white/[0.04] border border-white/10 text-bb-gray-100'
      : 'bg-bb-cream border border-bb-cream-line text-bb-charcoal';

  return (
    <div className={['rounded-lg p-6', toneClasses, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

interface StatTileProps {
  figure: ReactNode;
  label?: string;
  className?: string;
}

export function StatTile({ figure, label, className }: StatTileProps) {
  return (
    <div className={['rounded-lg bg-bb-charcoal p-6', className].filter(Boolean).join(' ')}>
      <div className="font-heading text-3xl font-extrabold tabular-nums text-bb-cream md:text-4xl">
        {figure}
      </div>
      {label && <p className="mt-1 text-sm text-bb-cream/70">{label}</p>}
    </div>
  );
}
