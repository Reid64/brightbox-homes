import type { Metadata } from 'next';
import Image from 'next/image';
import { BookConsultation } from '@/components/ui/BookConsultation';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About | Bright Box Homes',
  description:
    'Bright Box Homes is an American-owned company delivering premium, globally-sourced expandable container homes across the US - with vetted factory partners and buyer-friendly payments.',
};

const labelDark = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#D4A853]';
const labelLight = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-black/60';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: 'linear-gradient(180deg, #1C1C1E, #1C1C1E)' }}>
        <Image
          src="/images/about-hero.png"
          alt=""
          aria-hidden="true"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(13,21,38,0.85) 0%, rgba(13,21,38,0.5) 60%, rgba(13,21,38,0.3) 100%)',
            zIndex: 1,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="mx-auto max-w-[1280px] px-6">
            <p className={labelDark}>About</p>
            <h1 className="font-heading text-4xl font-bold text-[#FFFFFF] md:text-5xl lg:text-6xl">
              American Owned. Globally Sourced. US Delivered.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#D1D5DB]">
              Bright Box Homes brings premium expandable container homes to American buyers -
              built by vetted factory partners, inspected before shipping, and delivered to
              your property with a buyer-friendly payment plan.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#F5F0E8] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-6 text-lg text-[#4B5563]">
          <p>
            We started Bright Box Homes on a simple belief: a well-built home should not
            cost a fortune or take a year to build. Expandable container homes deliver real,
            finished living space at a fraction of traditional construction costs - and we
            wanted to bring them to the US market the right way.
          </p>
          <p>
            That means working only with vetted, factory-authorized manufacturers,
            photo-documenting every unit during production, and backing each home with a
            7-day no-defect inspection window on delivery. It means our 25/25/25/25 payment
            plan, so you never pay more than 25% at once. And it means giving back - for
            every home sold, we donate $2,500 to the FAITH Foundation. Bright Box Homes is
            currently pursuing UL certification for all electrical components, reinforcing
            our commitment to safety and quality standards.
          </p>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-[#252527] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <p className={labelDark}>Why Trust Bright Box</p>
          <h2 className="font-heading text-3xl font-bold text-[#FFFFFF] md:text-4xl">
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

      {/* Payment Plan */}
      <section className="bg-[#F5F0E8] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className={labelLight}>Payments</p>
          <h2 className="font-heading text-3xl font-bold text-[#111827] md:text-4xl">
            Our 25/25/25/25 Payment Plan
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              ['25%', 'Due at order confirmation to secure your build slot'],
              ['25%', 'Due at production start'],
              ['25%', 'Due at shipping'],
              ['25%', 'Due on delivery'],
            ].map(([pct, when], i) => (
              <li key={i} className="flex items-start gap-4 rounded-lg bg-[#FFFFFF] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                <span className="font-heading text-2xl font-bold text-[#1C1C1E]">{pct}</span>
                <span className="pt-1 text-[#374151]">{when}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg text-[#374151]">
            This structure keeps your investment protected at every stage - you pay as your
            home progresses from order to your doorstep.
          </p>

          <div className="mt-10">
            <p className="text-[#374151]">
              Prefer monthly payments? Flexible financing options available.
            </p>
            <Button href="/financing" size="lg" tone="light" className="mt-4">
              Apply for Financing
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C1C1E] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#FFFFFF] md:text-4xl">
            Let&apos;s build your home.
          </h2>
          <p className="mt-4 text-lg text-[#D1D5DB]">
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
