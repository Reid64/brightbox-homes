import type { Metadata } from 'next';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Colors & Finishes | Bright Box Homes',
  description:
    '60+ exterior colors, 19 roof options, carved metal plate finishes, and full interior customization. See all your options.',
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

// Zoomable color chart: large image on a white card, click opens full size.
function Chart({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-white"
        aria-label={`View full ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
      </a>
      <p className="mt-3 text-sm text-gray-500">Tap the chart to view full size.</p>
    </>
  );
}

export default function ColorsPage() {
  return (
    <>
      {/* A - Hero */}
      <section className="bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Customize</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Make It Yours
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            60+ exterior colors, 19 metal roof options, carved metal plate
            finishes, and full interior customization. Every Bright Box Home is
            built to your exact specifications.
          </p>
        </div>
      </section>

      {/* B - Exterior Colors */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Exterior</p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            60+ RAL Exterior Colors
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Choose from over 60 RAL standard colors for your home&apos;s exterior
            panels. Every color is factory-applied with a durable coating rated
            for UV and weather resistance.
          </p>
          <Chart
            src="/images/colors/exterior-house-colors.png"
            alt="60+ RAL exterior house color chart"
            width={1086}
            height={1448}
          />
        </div>
      </section>

      {/* C - Carved Metal Plate Exterior */}
      <section className="bg-bb-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Premium Exterior</p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Carved Metal Plate Finish
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            For a distinctive facade, upgrade to our carved metal plate exterior
            panels. Available in the colors shown below.
          </p>
          <Chart
            src="/images/colors/carved-metal-plate.png"
            alt="Carved metal plate exterior color chart"
            width={1024}
            height={1536}
          />
        </div>
      </section>

      {/* D - Metal Roof Colors + truss images + video */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Roofing</p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            19 Metal Roof Colors
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            24-gauge corrugated metal roofing with a full pitched roof system.
            Select from 19 standard colors.
          </p>
          <Chart
            src="/images/colors/metal-roof-colors.png"
            alt="19 metal roof color chart"
            width={1191}
            height={1320}
          />

          {/* Truss images, two columns */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Image
                src="/images/upgrades/metal-roof-truss-standard.png"
                alt="Standard metal roof truss system"
                width={1499}
                height={1049}
                className="h-auto w-full"
              />
              <figcaption className="p-4 text-sm text-gray-400">
                Standard Metal Roof Truss System
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Image
                src="/images/upgrades/metal-roof-truss-reinforced-solar.png"
                alt="Reinforced metal roof truss system for solar panel support"
                width={1500}
                height={1049}
                className="h-auto w-full"
              />
              <figcaption className="p-4 text-sm text-gray-400">
                Reinforced Truss System for Solar Panel Support
              </figcaption>
            </figure>
          </div>

          {/* Truss installation video (user-initiated, controls, audio stripped) */}
          <figure className="mt-12">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <video
                controls
                playsInline
                preload="metadata"
                className="h-auto w-full"
                aria-label="Metal Roof Truss System installation"
              >
                <source src="/videos/metal-roof-truss.mp4" type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-3 text-sm text-gray-400">
              Watch: Metal Roof Truss System Installation
            </figcaption>
          </figure>
        </div>
      </section>

      {/* E - Interior Wall Colors */}
      <section className="bg-bb-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Interior</p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Interior Wall Colors
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Bamboo wood fiber board wall panels available in the full range of
            colors shown. Durable, easy to clean, and moisture resistant.
          </p>
          <Chart
            src="/images/colors/interior-wall-colors.png"
            alt="Interior wall color chart"
            width={1063}
            height={1479}
          />
        </div>
      </section>

      {/* F - Interior Flooring */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Flooring</p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Interior Flooring Options
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Choose your floor finish from our standard range. All flooring is
            factory-installed.
          </p>
          <Chart
            src="/images/colors/interior-floor-colors.jpg"
            alt="Interior flooring color chart"
            width={1280}
            height={760}
          />
        </div>
      </section>

      {/* H - CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to choose your colors?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Our team will walk you through every option and help you design the
            perfect home.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/consultation" size="lg">
              Book a Consultation
            </Button>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
            <a
              href="tel:8002591745"
              className="inline-flex items-center gap-2 font-body text-white/80 transition-colors duration-fast ease-out hover:text-white"
            >
              <Phone size={20} aria-hidden="true" />
              800-259-1745
            </a>
            <a
              href="mailto:info@brightboxhomes.com"
              className="inline-flex items-center gap-2 font-body text-white/80 transition-colors duration-fast ease-out hover:text-white"
            >
              <Mail size={20} aria-hidden="true" />
              info@brightboxhomes.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
