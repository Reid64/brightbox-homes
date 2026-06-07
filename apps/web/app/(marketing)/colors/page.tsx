import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Colors & Finishes | Bright Box Homes',
  description:
    '60+ exterior RAL colors, 19 metal roof options, carved metal plate exteriors, and full interior wall and flooring customization for your Bright Box home.',
};

const charts = [
  {
    label: 'Exterior',
    heading: 'Exterior Colors',
    note: '60+ RAL color options.',
    src: '/images/colors/exterior-house-colors.png',
    alt: 'Chart of 60+ RAL exterior house color options.',
    width: 1086,
    height: 1448,
  },
  {
    label: 'Exterior',
    heading: 'Carved Metal Plate Exterior',
    note: 'Wood-grain carved metal plate finishes.',
    src: '/images/colors/carved-metal-plate.png',
    alt: 'Chart of carved metal plate exterior wood-grain finishes.',
    width: 1024,
    height: 1536,
  },
  {
    label: 'Roof',
    heading: 'Metal Roof Colors',
    note: '19 color options.',
    src: '/images/colors/metal-roof-colors.png',
    alt: 'Chart of 19 metal roof color options.',
    width: 1191,
    height: 1320,
  },
  {
    label: 'Interior',
    heading: 'Interior Wall Colors',
    note: 'Wall panel finishes and colors.',
    src: '/images/colors/interior-wall-colors.png',
    alt: 'Chart of interior wall panel color options.',
    width: 1063,
    height: 1479,
  },
  {
    label: 'Interior',
    heading: 'Interior Flooring',
    note: 'Vinyl plank flooring colors.',
    src: '/images/colors/interior-floor-colors.jpg',
    alt: 'Chart of interior vinyl plank flooring colors.',
    width: 1280,
    height: 760,
  },
];

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

export default function ColorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Customization</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Colors &amp; Finishes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            60+ exterior colors, 19 roof options, and full interior customization.
          </p>
        </div>
      </section>

      {/* Color chart sections */}
      {charts.map((chart, i) => (
        <section
          key={chart.heading}
          className={`${i % 2 === 0 ? 'bg-bb-charcoal' : 'bg-bb-surface-dark'} py-16 lg:py-24`}
        >
          <div className="mx-auto max-w-[1280px] px-6">
            <p className={label}>{chart.label}</p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {chart.heading}
            </h2>
            <p className="mt-3 text-gray-400">{chart.note}</p>
            <a
              href={chart.src}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-white"
              aria-label={`View full ${chart.heading} chart`}
            >
              <Image
                src={chart.src}
                alt={chart.alt}
                width={chart.width}
                height={chart.height}
                className="h-auto w-full"
              />
            </a>
            <p className="mt-3 text-sm text-gray-500">Tap the chart to view full size.</p>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Found your palette?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Talk to our team about your color and finish choices.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/consultation" size="lg">
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
