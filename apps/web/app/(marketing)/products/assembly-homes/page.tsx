import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Box, LayoutGrid, Layers, Wallet, Zap, Hammer } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';
import ShowcaseCard from '@/components/products/ShowcaseCard';

export const metadata: Metadata = {
  title: 'Assembly Homes | Bright Box Homes',
  description:
    'Bright Box Assembly Homes - named modular models from $25,995. Connect ~171 sq ft units in any arrangement: stack, line up, L-shape, or U-shape. Each unit independently wired and plumbed.',
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';
const heading = 'font-heading text-3xl font-bold text-white md:text-4xl';

const baseFeatures = [
  'Electrical system (pre-wired)',
  'Modular bathroom system',
  'Modular kitchen system',
  'Induction burner stove',
  'Mini-split AC',
];
const multiStoryFeatures = ['Staircase with landing', 'Railing system'];

const models = [
  {
    name: 'Bright Box Vantage',
    image: '/images/products/assembly-homes/exterior/06.png',
    alt: 'Single-module assembly home with a panoramic glass facade.',
    desc: 'Single-module design with panoramic glass facade. ~171 sq ft of open-concept living.',
    multiStory: false,
  },
  {
    name: 'Bright Box Prism',
    image: '/images/products/assembly-homes/exterior/08.png',
    alt: 'Two-module glass assembly home configuration.',
    desc: 'Dual-module layout with expanded floor plan. Connect two units side-by-side for ~342 sq ft.',
    multiStory: false,
  },
  {
    name: 'Bright Box Vertex',
    image: '/images/products/assembly-homes/exterior/05.png',
    alt: 'Single-module assembly home with enhanced window configuration.',
    desc: 'Single-module with an enhanced window configuration for maximum natural light.',
    multiStory: false,
  },
  {
    name: 'Bright Box Axis',
    image: '/images/products/assembly-homes/exterior/09.jpg',
    alt: 'Assembly home with warm wood-tone exterior panels.',
    desc: 'Single-module with warm wood-tone exterior panels and a covered entry.',
    multiStory: false,
  },
  {
    name: 'Bright Box Pavilion',
    image: '/images/products/assembly-homes/exterior/10.jpg',
    alt: 'Four-module two-story white assembly home with an exterior staircase.',
    desc: 'Four-module, two-story configuration. ~684 sq ft across two levels with exterior staircase and landing.',
    multiStory: true,
  },
];

const whyModular = [
  { icon: Box, title: 'Approx 171 Sq Ft Units', text: 'Each module is roughly 171 sq ft - a consistent, repeatable building block.' },
  { icon: LayoutGrid, title: 'Any Configuration', text: 'Connect units in any arrangement - line up, L-shape, U-shape, or courtyard.' },
  { icon: Layers, title: 'Stack for Multi-Story', text: 'Stack modules vertically to build two-story and multi-story structures.' },
  { icon: Wallet, title: 'Affordable & Scalable', text: 'Start with one unit and add more as your needs and budget grow.' },
  { icon: Zap, title: 'Independently Serviced', text: 'Every unit is independently wired and plumbed for flexible layouts.' },
  { icon: Hammer, title: 'Fast Modular Build', text: 'Factory-built modules assemble on site far faster than traditional construction.' },
];

export default function AssemblyHomesPage() {
  return (
    <div className="bg-bb-charcoal">
      {/* Hero */}
      <section className="bg-bb-surface-dark py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Assembly Homes</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Modular Homes, Built Your Way
          </h1>
          <p className="mt-4 font-mono text-2xl text-bb-blue">Starting at $25,995</p>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Assembly Homes are modular building blocks - compact units, about 171 sq ft each,
            engineered to connect in any arrangement. Stack them for multi-story, line them up
            for multi-room, or wrap them into an L or U. Each ships independently wired and
            plumbed, so you start small and add as your needs grow.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <BookConsultation size="lg">Get a Custom Quote</BookConsultation>
            <Link
              href="/reserve"
              className="rounded-lg bg-red-500 px-8 py-4 text-center text-lg font-bold text-white transition-colors duration-fast ease-out hover:bg-red-600"
            >
              Reserve - $500
            </Link>
          </div>
        </div>
      </section>

      {/* Named model showcase */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>The Lineup</p>
          <h2 className={heading}>Choose Your Model</h2>
          <div className="mt-10 space-y-8">
            {models.map((m, i) => (
              <ShowcaseCard key={m.name} index={i} image={m.image} alt={m.alt}>
                <h3 className="font-heading text-2xl font-bold text-white">{m.name}</h3>
                <p className="mt-3 text-gray-300">{m.desc}</p>
                <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[...baseFeatures, ...(m.multiStory ? multiStoryFeatures : [])].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-bb-blue" />
                      <span className="text-sm text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </ShowcaseCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why modular */}
      <section className="bg-bb-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Why Modular Assembly</p>
          <h2 className={heading}>Build It Your Way</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyModular.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <Icon size={28} aria-hidden="true" className="text-bb-blue" />
                  <h3 className="mt-4 font-heading text-lg font-semibold text-white">{w.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{w.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Construction & Frame */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Construction</p>
          <h2 className={heading}>Construction &amp; Frame</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src="/images/products/assembly-homes/specs/frame.webp"
                  alt="Galvanized steel frame of an assembly modular unit."
                  fill
                  sizes="(min-width: 768px) 40rem, 100vw"
                  className="object-contain p-2"
                />
              </div>
              <figcaption className="px-2 py-3 text-sm text-gray-300">
                Galvanized Steel Frame - Modular Unit Construction
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src="/images/products/assembly-homes/specs/specs.png"
                  alt="Assembly home technical specifications and component breakdown."
                  fill
                  sizes="(min-width: 768px) 40rem, 100vw"
                  className="object-contain p-2"
                />
              </div>
              <figcaption className="px-2 py-3 text-sm text-gray-300">
                Technical Specifications
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Reserve CTA */}
      <section className="bg-gradient-to-br from-bb-navy to-bb-surface-dark py-16 text-center lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className={heading}>Ready to Reserve?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Secure your home with a fully refundable $500 deposit. We&apos;ll contact you
            within 24 hours to finalize your configuration.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/reserve"
              className="rounded-lg bg-red-500 px-8 py-4 text-lg font-bold text-white transition-colors duration-fast ease-out hover:bg-red-600"
            >
              Reserve Your Home - $500
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            100% refundable &middot; No obligation &middot; Locks your configuration
          </p>
        </div>
      </section>
    </div>
  );
}
