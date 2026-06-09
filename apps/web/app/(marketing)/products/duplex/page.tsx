import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import DuplexSection from '@/components/products/DuplexSection';
import { BookConsultation } from '@/components/ui/BookConsultation';
import { duplexImages } from '@/components/products/expandableData';

export const metadata: Metadata = {
  title: '20x20 Duplex | Bright Box Homes',
  description:
    'The Bright Box 20x20 Duplex - two expandable container homes stacked into one two-story footprint. Live in one, rent the other. Rental-ready in weeks, at a fraction of traditional duplex construction cost.',
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

const included = [
  'Full metal truss and metal roof system',
  'Covered front porch and deck',
  'Railing and staircase to upper unit',
  'Mini-split HVAC in each unit',
  'Independent electrical, plumbing, and climate control per unit',
];

export default function ExpandableDuplexPage() {
  return (
    <div className="bg-bb-charcoal">
      {/* Full-width hero image - first thing visible */}
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src="/images/products/duplex/hero.png"
          alt="Two-story Bright Box duplex with balconies and a family in the backyard."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Title + price + features + CTAs */}
      <section className="bg-bb-surface-dark py-10 lg:py-12">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Bright Box Homes</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            20x20 Duplex
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            Two homes, one footprint - an income property from day one.
          </p>
          <p className="mt-3 font-mono text-2xl text-bb-blue">Starting at $59,995</p>

          <div className="mt-6">
            <p className="font-heading font-semibold text-white">Every duplex includes:</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {included.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-bb-blue" />
                  <span className="text-sm text-gray-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <BookConsultation size="lg">Get a Custom Quote</BookConsultation>
            <Link
              href="/reserve"
              className="rounded-lg bg-red-500 px-8 py-4 text-center text-lg font-bold text-white transition-colors duration-fast ease-out hover:bg-red-600"
            >
              Reserve - $500
            </Link>
          </div>
        </div>
      </section>

      {/* Investment section + gallery (image now lives at top) */}
      <DuplexSection images={duplexImages} />

      {/* Reserve CTA */}
      <section className="bg-gradient-to-br from-bb-navy to-bb-surface-dark py-16 text-center lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to make your home pay for itself?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Secure your duplex with a fully refundable $500 deposit. We&apos;ll contact you
            within 24 hours to finalize your configuration.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/reserve"
              className="rounded-lg bg-red-500 px-8 py-4 text-lg font-bold text-white transition-colors duration-fast ease-out hover:bg-red-600"
            >
              Reserve Your Home - $500
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">Call us at 800-259-1745</p>
        </div>
      </section>
    </div>
  );
}
