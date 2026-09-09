import type { Metadata } from 'next';
import { BookConsultation } from '@/components/ui/BookConsultation';
import Section, { eyebrow } from '@/components/layout/Section';
import { MediaCard } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Expandable Container Homes | Bright Box Homes',
  description:
    'Steel-frame expandable container homes from $35,995. Five sizes from a 200 sq ft studio to an 800 sq ft family home, Delivered anywhere in the US.',
};

const sizes = [
  {
    name: '20x10 Studio',
    price: 'Starting at $35,995',
    blurb: '200 sq ft studio - ideal ADU, guest suite, or rental.',
    href: '/products/expandable-homes/20x10',
    image: '/images/products/expandable-homes/exterior/model-20x10-front.png',
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
    image: '/images/products/expandable-homes/exterior/model-20x30.png',
  },
  {
    name: '20x40 Models',
    price: 'Starting at $59,995',
    blurb: 'Our largest single-story home - 800 sq ft, 1 or 2 bedrooms.',
    href: '/products/expandable-homes/20x40',
    image: '/images/products/expandable-homes/exterior/10.png',
  },
];

export default function ExpandableHomesOverviewPage() {
  return (
    <>
      {/* Hero / intro */}
      <Section tone="charcoal" size="standard">
        <p className={eyebrow.charcoal}>Expandable Container Homes</p>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Four Sizes, Endless Possibilities
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Our flagship line ships compact and unfolds on site into finished
          living space. Choose your model - from a 200 sq ft studio to an 800 sq
          ft family home. Looking to invest? Explore the two-story Duplex.
        </p>
      </Section>

      {/* Size cards */}
      <Section tone="cream" size="standard">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sizes.map((s) => (
            <MediaCard
              key={s.href}
              href={s.href}
              title={s.name}
              price={s.price}
              blurb={s.blurb}
              image={s.image}
              alt={s.name}
            />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="charcoal" size="standard" className="text-center">
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
        <p className="mt-6 text-sm text-gray-400">Call us at 800-259-1745</p>
      </Section>
    </>
  );
}
