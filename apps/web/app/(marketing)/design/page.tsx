import type { Metadata } from 'next';
import Image from 'next/image';
import DesignJourney from '@/components/design/DesignJourney';

export const metadata: Metadata = {
  title: 'Design Your Home | Bright Box Homes',
  description:
    'A guided journey through customizing your Bright Box Home - choose your model, exterior, roof, interior finishes, and upgrades, step by step.',
};

export default function DesignPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: 'linear-gradient(180deg, #1C1C1E, #1C1C1E)' }}
      >
        <Image
          src="/images/design-hero.png"
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
              'linear-gradient(to right, rgba(28,28,30,0.85) 0%, rgba(28,28,30,0.5) 60%, rgba(28,28,30,0.3) 100%)',
            zIndex: 1,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A853]">
              Design Your Home
            </p>
            <h1 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl lg:text-6xl">
              Build It Your Way
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#D1D5DB]">
              Walk through every choice - model, exterior, roof, interior finishes, and
              upgrades - and watch your Bright Box Home come together step by step.
            </p>
          </div>
        </div>
      </section>

      <DesignJourney />
    </>
  );
}
