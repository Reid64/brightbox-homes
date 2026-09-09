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
          className="object-contain object-center"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(13,21,38,0.95) 0%, rgba(13,21,38,0.0) 100%)',
            zIndex: 1,
          }}
        />
        <div
          className="relative flex flex-col justify-center px-6 py-16"
          style={{ zIndex: 2, minHeight: 480, maxWidth: 560 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A853]">
            Design Your Home
          </p>
          <h1 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl lg:text-6xl">
            Build It Your Way
          </h1>
          <p className="mt-4 text-lg text-[#D1D5DB]">
            Walk through every choice — model, exterior, roof, interior finishes, and
            upgrades — and watch your Bright Box Home come together step by step.
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-[#D4A853]">
            Six Easy Steps to Your Perfect Home
          </p>
        </div>
      </section>

      <DesignJourney />
    </>
  );
}
