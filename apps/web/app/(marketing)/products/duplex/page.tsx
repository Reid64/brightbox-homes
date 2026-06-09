import type { Metadata } from 'next';
import DuplexSection from '@/components/products/DuplexSection';
import { BookConsultation } from '@/components/ui/BookConsultation';
import { duplexImages } from '@/components/products/expandableData';

export const metadata: Metadata = {
  title: '20x20 Duplex | Bright Box Homes',
  description:
    'The Bright Box 20x20 Duplex - two expandable container homes stacked into one two-story footprint. Live in one, rent the other. Rental-ready in weeks, at a fraction of traditional duplex construction cost.',
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

export default function ExpandableDuplexPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bb-surface-dark py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Bright Box Homes</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            20x20 Duplex
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Two homes, one footprint. The smartest way to turn a purchase into an
            income-producing asset.
          </p>
          <p className="mt-4 font-mono text-2xl text-bb-blue">
            Starting at $59,995
          </p>
          <div className="mt-8">
            <BookConsultation size="lg" />
          </div>
        </div>
      </section>

      {/* Investment section + gallery */}
      <DuplexSection
        images={duplexImages}
        heroImage={{
          src: '/images/products/duplex/hero.png',
          alt: 'Two-story Bright Box duplex with balconies and a family in the backyard.',
        }}
      />

      {/* CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to make your home pay for itself?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Talk to our team about duplex pricing, financing, and placement on your
            lot.
          </p>
          <div className="mt-8 flex justify-center">
            <BookConsultation size="lg" />
          </div>
          <p className="mt-6 text-sm text-gray-500">Call us at 800-259-1745</p>
        </div>
      </section>
    </>
  );
}
