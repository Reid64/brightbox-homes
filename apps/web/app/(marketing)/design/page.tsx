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
      <section className="relative overflow-hidden" style={{ background: '#1C1C1E' }}>
        <Image
          src="/images/design-hero.png"
          alt=""
          aria-hidden="true"
          fill
          priority={true}
          sizes="100vw"
          /* object-cover on every breakpoint: object-contain left dead bands
             above and below the image on phones. */
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />

        {/* Legibility scrim. Phones read top-to-bottom, so the gradient runs
            vertically there and horizontally from md up, where the copy sits
            in the left column. */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,21,38,0.94) 0%, rgba(13,21,38,0.86) 55%, rgba(13,21,38,0.62) 100%)',
            zIndex: 1,
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(13,21,38,0.95) 0%, rgba(13,21,38,0.0) 100%)',
            zIndex: 1,
          }}
        />

        <div
          className="relative flex min-h-[380px] flex-col justify-center px-6 py-12 md:min-h-[480px] md:py-16"
          style={{ zIndex: 2 }}
        >
          <div className="w-full md:max-w-[560px]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A853] md:mb-4">
              Design Your Home
            </p>
            <h1 className="font-heading text-[2rem] font-extrabold leading-[1.1] text-[#FFFFFF] sm:text-4xl md:text-5xl lg:text-6xl">
              Build It Your Way
            </h1>
            <p className="mt-4 text-base text-[#D1D5DB] md:text-lg">
              Walk through every choice — model, exterior, roof, interior finishes, and
              upgrades — and watch your Bright Box Home come together step by step.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#D4A853] md:text-sm">
              Six Easy Steps to Your Perfect Home
            </p>
          </div>
        </div>
      </section>

      <DesignJourney />
    </>
  );
}
