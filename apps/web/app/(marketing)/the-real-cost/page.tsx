import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, UtensilsCrossed, Bath, Truck, Thermometer, HardHat } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';

export const metadata: Metadata = {
  title: "The Real Cost of a 'Cheap' Home | Bright Box Homes",
  description:
    'Think that $10,000 container home is a deal? Add shipping, missing kitchens, bathrooms, and $20,000+ in upgrades. See the real math before you buy.',
  openGraph: {
    title: "The Real Cost of a 'Cheap' Home | Bright Box Homes",
    description:
      'Think that $10,000 container home is a deal? Add shipping, missing kitchens, bathrooms, and $20,000+ in upgrades. See the real math before you buy.',
    url: 'https://brightboxhomes.com/the-real-cost',
    siteName: 'Bright Box Homes',
    images: [
      {
        url: 'https://brightboxhomes.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bright Box Homes',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Real Cost of a 'Cheap' Home | Bright Box Homes",
    description:
      'Think that $10,000 container home is a deal? Add shipping, missing kitchens, bathrooms, and $20,000+ in upgrades. See the real math before you buy.',
    images: ['https://brightboxhomes.com/images/og-image.png'],
  },
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';
const headingClass = 'font-heading text-3xl font-bold text-white md:text-4xl';

// Left column — the advertised "deal" plus everything it leaves out.
const dealItems: { item: string; price: string }[] = [
  { item: 'Advertised Home Price', price: '$10,000' },
  { item: 'Shipping to Your Property', price: '$6,500' },
  { item: 'Kitchen Installation', price: '$4,000 - $8,000' },
  { item: 'Bathroom Installation', price: '$3,000 - $6,000' },
  { item: 'HVAC / Climate Control', price: '$3,000 - $5,000' },
  { item: 'Hot Water Heater', price: '$800 - $1,500' },
  { item: 'Electrical Upgrades (outlets, switches)', price: '$2,000 - $4,000' },
  { item: 'Roof Upgrade (from flat)', price: '$2,000 - $4,000' },
  { item: 'Covered Porch / Deck', price: '$2,000 - $5,000' },
  { item: 'Interior Finishing (paint, trim, flooring)', price: '$1,500 - $3,000' },
];

// Right column — the Bright Box turnkey home, with everything already included.
const brightBoxItems: { item: string; price: string }[] = [
  { item: 'Turnkey Home Price ($35,995 20x10 to $59,995 20x40)', price: 'Included' },
  { item: 'Shipping', price: 'Free in Texas' },
  { item: 'Kitchen w/ Cabinets, Induction Stove, Disposal', price: 'Included' },
  { item: 'Bathroom w/ Walk-in Shower, Vanity, Toilet', price: 'Included' },
  { item: '24,000 BTU Mini-Split HVAC', price: 'Included' },
  { item: 'Tankless Hot Water Heater', price: 'Included' },
  { item: '33 Electrical Outlets + GFCI', price: 'Included' },
  { item: 'Pitched Metal Roof w/ Truss System', price: 'Included' },
  { item: 'Covered Porch w/ Deck & Railing', price: 'Included' },
  { item: '60+ Color Palettes (exterior, interior, floor, roof)', price: 'Included' },
];

const questions: { icon: typeof UtensilsCrossed; q: string; a: string }[] = [
  {
    icon: UtensilsCrossed,
    q: 'Does the price include a kitchen?',
    a: 'Many advertised homes ship as empty shells. No cabinets, no stove, no countertops.',
  },
  {
    icon: Bath,
    q: 'Does it include a bathroom?',
    a: "If the listing doesn't mention plumbing, you're paying a contractor to install it after delivery.",
  },
  {
    icon: Truck,
    q: 'What does shipping actually cost?',
    a: 'Advertised prices rarely include the $6,000-$7,000 it costs to get the home to your property.',
  },
  {
    icon: Thermometer,
    q: 'Is climate control included?',
    a: "An uninsulated container in Texas summer hits 140°F inside. HVAC isn't optional - it's essential.",
  },
  {
    icon: HardHat,
    q: 'How many contractors will I need to hire?',
    a: 'A turnkey home means zero. A shell means coordinating plumbers, electricians, HVAC techs, roofers, and finish carpenters.',
  },
];

const standardColumns: string[][] = [
  [
    'Kitchen w/ upper & lower cabinets',
    'Induction stove & range hood',
    '1/2 HP garbage disposal',
    'Countertop color choices',
  ],
  [
    'Walk-in shower w/ custom head',
    'Bathroom vanity & mirror',
    'Tankless hot water heater',
    'Washer/dryer hookups',
  ],
  [
    '24,000 BTU mini-split HVAC',
    '33 electrical outlets',
    'Pitched metal roof & truss',
    'Covered porch w/ deck & railing',
  ],
];

export default function TheRealCostPage() {
  return (
    <>
      {/* SECTION 1 - Hero */}
      <section className="bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Buyer Education</p>
          <AnimatedText
            text="The Real Cost of a 'Cheap' Home"
            as="h1"
            className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            A $10,000 price tag doesn&apos;t include what you actually need to live
            in it.
          </p>
        </div>
      </section>

      {/* SECTION 2 - The Math */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={label}>The Math</p>
            <h2 className={headingClass}>Add It Up</h2>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* LEFT - The "Deal" You See Online */}
            <ScrollReveal>
              <div className="flex h-full flex-col rounded-2xl border border-[#B8A888] bg-[#D4C4A8] p-6 lg:p-8">
                <div className="border-b border-black/15 pb-4">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-bb-warning">
                    The Catch
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-gray-900">
                    The &apos;Deal&apos; You See Online
                  </h3>
                </div>
                <ul className="mt-4 flex-1 divide-y divide-black/10">
                  {dealItems.map((row) => (
                    <li
                      key={row.item}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-sm text-gray-800">{row.item}</span>
                      <span className="shrink-0 text-right font-mono text-sm font-medium text-gray-900">
                        {row.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex items-baseline justify-between gap-4 border-t-2 border-bb-warning/60 pt-4">
                  <span className="font-heading text-lg font-bold text-gray-900">
                    TOTAL
                  </span>
                  <span className="shrink-0 text-right font-mono text-lg font-bold text-bb-warning">
                    $34,800 - $53,000
                  </span>
                </div>
                <p className="mt-4 text-sm italic text-gray-700">
                  And you still coordinated 6+ contractors and waited months.
                </p>
              </div>
            </ScrollReveal>

            {/* RIGHT - What You Get From Bright Box */}
            <ScrollReveal delay={100}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-bb-blue bg-[#D4C4A8] p-6 lg:p-8">
                <div className="border-b border-black/15 pb-4">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-bb-blue-dark">
                    Turnkey
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-gray-900">
                    What You Get From Bright Box
                  </h3>
                </div>
                <ul className="mt-4 flex-1 divide-y divide-black/10">
                  {brightBoxItems.map((row) => (
                    <li
                      key={row.item}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-sm text-gray-800">{row.item}</span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-right font-mono text-sm font-semibold text-bb-blue-dark">
                        <Check size={14} aria-hidden="true" className="shrink-0" />
                        {row.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex items-baseline justify-between gap-4 border-t-2 border-bb-blue pt-4">
                  <span className="font-heading text-lg font-bold text-gray-900">
                    TOTAL
                  </span>
                  <span className="shrink-0 text-right font-mono text-lg font-bold text-bb-blue-dark">
                    $35,995 - $59,995
                  </span>
                </div>
                <p className="mt-4 text-sm italic text-gray-700">
                  One price. One order. Move-in ready.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 3 - What To Ask Before You Buy */}
      <section className="bg-bb-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={label}>Before You Buy</p>
            <h2 className={headingClass}>Five Questions Every Buyer Should Ask</h2>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {questions.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.q} delay={i * 80}>
                  <div className="flex h-full flex-col rounded-xl border border-[#B8A888] bg-[#D4C4A8] p-6">
                    <Icon size={28} aria-hidden="true" className="text-bb-blue-dark" />
                    <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                      {item.q}
                    </h3>
                    <p className="mt-2 text-sm text-gray-700">{item.a}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 - The Bright Box Standard */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={label}>The Standard</p>
            <h2 className={headingClass}>Every Bright Box Home Includes</h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mt-10 rounded-2xl border border-[#B8A888] bg-[#D4C4A8] p-6 lg:p-10">
              <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-3">
                {standardColumns.flat().map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check
                      size={20}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-bb-blue-dark"
                    />
                    <span className="text-sm text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-8 text-center font-heading text-xl font-semibold text-white md:text-2xl">
              What others call upgrades, we call standard.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5 - CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <ScrollReveal>
            <h2 className={headingClass}>Ready to See the Difference?</h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/5k-challenge"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-bb-blue px-8 py-4 text-lg font-semibold text-white transition-colors duration-fast ease-out hover:bg-bb-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue focus-visible:ring-offset-2"
              >
                Take the $5,000 Challenge
              </Link>
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
              <Link
                href="/reserve"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-red-500 px-8 py-4 text-lg font-bold text-white transition-colors duration-fast ease-out hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Reserve Your Home - $500
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
