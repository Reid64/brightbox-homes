import type { Metadata } from 'next';
import Image from 'next/image';
import { BookConsultation } from '@/components/ui/BookConsultation';

export const metadata: Metadata = {
  title: 'About | Bright Box Homes',
  description:
    'Bright Box Homes is an American-owned company delivering premium, globally-sourced expandable container homes across the US - with vetted factory partners and buyer-friendly payments.',
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>About</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            American Owned. Globally Sourced. US Delivered.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Bright Box Homes brings premium expandable container homes to American buyers -
            built by vetted factory partners, inspected before shipping, and delivered to
            your property with a buyer-friendly payment plan.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-6 text-lg text-gray-300">
          <p>
            We started Bright Box Homes on a simple belief: a well-built home should not
            cost a fortune or take a year to build. Expandable container homes deliver real,
            finished living space at a fraction of traditional construction cost - and we
            wanted to bring them to the US market the right way.
          </p>
          <p>
            That means working only with vetted, factory-authorized manufacturers,
            photo-documenting every unit during production, and backing each home with a
            7-day no-defect inspection window on delivery. It means our 25/25/25/25 payment
            plan, so you never pay more than 25% at once. And it means giving back - for
            every home sold, we donate $2,500 to the FAITH Foundation.
          </p>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-bb-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <p className={label}>Why Trust Bright Box</p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            A Company Built on Accountability
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
            <Image
              src="/images/badges/exclusive-us-distributor.png"
              alt="Exclusive US Distributor"
              width={320}
              height={320}
              className="h-32 w-auto sm:h-40"
            />
            <Image
              src="/images/badges/american-owned-globally-sourced.png"
              alt="American Owned, Globally Sourced"
              width={320}
              height={320}
              className="h-32 w-auto sm:h-40"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Let&apos;s build your home.
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Talk to our team about models, site requirements, and your budget.
          </p>
          <div className="mt-8 flex justify-center">
            <BookConsultation size="lg" />
          </div>
          <p className="mt-6 text-sm text-gray-400">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
        </div>
      </section>
    </>
  );
}
