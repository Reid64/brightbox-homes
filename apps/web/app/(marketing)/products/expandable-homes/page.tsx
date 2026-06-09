import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

export const metadata: Metadata = {
  title: 'Expandable Container Homes | Bright Box Homes',
  description:
    'Steel-frame expandable container homes from $35,995. Five sizes from a 200 sq ft studio to an 800 sq ft family home, plus a two-story duplex. Delivered anywhere in the US.',
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

const sizes = [
  {
    name: '20x10 Studio',
    price: 'Starting at $35,995',
    blurb: '200 sq ft studio - ideal ADU, guest suite, or rental.',
    href: '/products/expandable-homes/20x10',
    image: '/images/products/expandable-homes/exterior/11.png',
  },
  {
    name: '20x20 Models',
    price: 'Starting at $45,995',
    blurb: '400 sq ft in 1, 2, or 3 bedroom layouts.',
    href: '/products/expandable-homes/20x20',
    image: '/images/products/expandable-homes/exterior/01.jpeg',
  },
  {
    name: '20x30 Models',
    price: 'Starting at $49,995',
    blurb: '600 sq ft of finished living space for growing families.',
    href: '/products/expandable-homes/20x30',
    image: '/images/products/expandable-homes/exterior/02.jpeg',
  },
  {
    name: '20x40 Models',
    price: 'Starting at $59,995',
    blurb: 'Our largest single-story home - 800 sq ft, 1 or 2 bedrooms.',
    href: '/products/expandable-homes/20x40',
    image: '/images/products/expandable-homes/exterior/10.png',
  },
  {
    name: '20x20 Duplex',
    price: 'Contact for Pricing',
    blurb: 'Two stacked units. Live in one, rent the other.',
    href: '/products/expandable-homes/duplex',
    image: '/images/products/expandable-homes/duplex/01.png',
  },
];

export default function ExpandableHomesOverviewPage() {
  return (
    <>
      {/* Hero / intro */}
      <section className="bg-bb-surface-dark py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Expandable Container Homes</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Five Sizes, Endless Possibilities
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Our flagship line ships compact and unfolds on site into finished
            living space. Choose your model - from a 200 sq ft studio to an 800 sq
            ft family home, plus a two-story duplex built for investors.
          </p>
        </div>
      </section>

      {/* Size cards */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sizes.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group overflow-hidden rounded-xl border border-white/5 bg-bb-surface-dark transition-colors duration-normal ease-out hover:border-white/10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-xl font-semibold text-white">{s.name}</h2>
                  <p className="mt-1 font-mono text-sm text-bb-blue">{s.price}</p>
                  <p className="mt-3 text-sm text-gray-300">{s.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bb-blue">
                    View Model <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Not sure which size fits?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Tell us about your site and your plans - we&apos;ll help you choose the
            right model and configuration.
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
