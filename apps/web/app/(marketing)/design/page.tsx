import type { Metadata } from 'next';
import { BookConsultation } from '@/components/ui/BookConsultation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sun,
  Thermometer,
  UtensilsCrossed,
  Droplets,
  Zap,
  Home,
  ArrowRight,
} from 'lucide-react';
import ImageGallery from '@/components/ui/ImageGallery';

export const metadata: Metadata = {
  title: 'Design Your Home | Bright Box Homes',
  description:
    'Walk through every step of customizing your Bright Box Home - from floor plan to colors to upgrades.',
};

const stepNum = 'block font-heading text-6xl font-bold text-bb-blue/10 md:text-7xl';

const products = [
  { name: 'Expandable Homes', href: '/products/expandable-homes', image: '/images/products/expandable-homes/exterior/01.jpeg' },
  { name: 'Apple Cabins', href: '/products/apple-cabins', image: '/images/products/apple-cabins/exterior/01.png' },
  { name: 'Space Capsules', href: '/products/space-capsules', image: '/images/products/space-capsules/exterior/01.png' },
  { name: 'Assembly Homes', href: '/products/assembly-homes', image: '/images/products/assembly-homes/exterior/01.png' },
  { name: 'Vending Units', href: '/products/vending-units', image: '/images/products/vending-units/exterior/01.jpg' },
];

const floorPlans = [
  { name: '20x10 Studio', src: '/images/floor-plans/expandable-20x10-studio.png' },
  { name: '20x20 - 1 Bedroom', src: '/images/floor-plans/expandable-20x20-1br-preview.png' },
  { name: '20x40 - 1 Bedroom', src: '/images/floor-plans/expandable-20x40-1br-preview.png' },
  { name: 'Apple Cabin 27\'11"', src: '/images/floor-plans/apple-cabin-27-11.png' },
];

const exteriorCharts = [
  { src: '/images/colors/exterior-house-colors.png', alt: 'Exterior RAL color chart - 60+ options' },
  { src: '/images/colors/carved-metal-plate.png', alt: 'Carved metal plate exterior finishes - premium upgrade' },
];
const roofChart = [
  { src: '/images/colors/metal-roof-colors.png', alt: 'Metal roof color chart - 19 options' },
];
const interiorCharts = [
  { src: '/images/colors/interior-wall-colors.png', alt: 'Interior wall color chart' },
  { src: '/images/colors/interior-floor-colors.jpg', alt: 'Interior flooring color chart' },
];

const upgradeCategories = [
  { icon: Sun, name: 'Solar & Power' },
  { icon: Thermometer, name: 'HVAC & Comfort' },
  { icon: UtensilsCrossed, name: 'Kitchen' },
  { icon: Droplets, name: 'Bathroom' },
  { icon: Zap, name: 'Electrical' },
  { icon: Home, name: 'Exterior' },
];

export default function DesignPage() {
  return (
    <>
      {/* STEP 1 - Choose Your Home */}
      <section className="bg-bb-surface-dark py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <span className={stepNum}>01</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
            Choose Your Home
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Start by exploring our product lines. From compact 200 sq ft studios
            to 800 sq ft family homes, stacked duplexes, modular units, and more.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {products.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group overflow-hidden rounded-xl border border-white/5 bg-bb-charcoal transition-colors duration-normal ease-out hover:border-white/10"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-3">
                  <p className="font-heading text-sm font-semibold text-white">{p.name}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-bb-blue">
                    Explore <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 2 - Select Your Floor Plan */}
      <section className="bg-bb-charcoal py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <span className={stepNum}>02</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
            Select Your Floor Plan
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Choose the layout that fits your lifestyle. Studio, one-bedroom,
            two-bedroom, or three-bedroom - each optimized for space and comfort.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {floorPlans.map((fp) => (
              <div key={fp.name} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="overflow-hidden rounded-lg bg-white p-2">
                  <Image
                    src={fp.src}
                    alt={`${fp.name} floor plan`}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="h-auto w-full"
                  />
                </div>
                <p className="mt-3 text-center font-body text-sm text-gray-300">{fp.name}</p>
              </div>
            ))}
          </div>
          <Link
            href="/products/expandable-homes"
            className="mt-8 inline-flex items-center gap-1 font-body font-medium text-bb-blue transition-colors duration-fast ease-out hover:text-white"
          >
            View All Floor Plans <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* STEP 3 - Pick Your Exterior */}
      <section className="bg-bb-surface-dark py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <span className={stepNum}>03</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
            Pick Your Exterior
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Over 60 RAL standard colors for your exterior panels, plus our premium
            carved metal plate finish option. Tap a chart to view it full size.
          </p>
          <ImageGallery images={exteriorCharts} className="mt-10" />
        </div>
      </section>

      {/* STEP 4 - Choose Your Roof */}
      <section className="bg-bb-charcoal py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <span className={stepNum}>04</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
            Choose Your Roof
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            24-gauge corrugated metal roofing in 19 colors, with standard or
            solar-ready reinforced truss system.
          </p>
          <ImageGallery images={roofChart} className="mt-10" />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
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
                Reinforced Truss for Solar Panel Support
              </figcaption>
            </figure>
          </div>

          <figure className="mt-12">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <video
                controls
                playsInline
                preload="metadata"
                className="h-auto w-full"
                aria-label="Metal Roof Truss System"
              >
                <source src="/videos/metal-roof-truss.mp4" type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-3 text-sm text-gray-400">
              Watch: Metal Roof Truss System
            </figcaption>
          </figure>
        </div>
      </section>

      {/* STEP 5 - Customize Your Interior */}
      <section className="bg-bb-surface-dark py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <span className={stepNum}>05</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
            Customize Your Interior
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Wall colors, flooring, cabinet finishes, bathroom tiles, and trim -
            make every surface yours. Tap a chart to view it full size.
          </p>
          <ImageGallery images={interiorCharts} className="mt-10" />
        </div>
      </section>

      {/* STEP 6 - Add Upgrades */}
      <section className="bg-bb-charcoal py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <span className={stepNum}>06</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
            Add Your Upgrades
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Solar packages, generators, upgraded insulation, appliances, smart
            home integration, and more.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {upgradeCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-bb-surface-dark p-6 text-center"
                >
                  <Icon size={28} aria-hidden="true" className="text-bb-blue" />
                  <span className="font-body text-sm text-gray-300">{cat.name}</span>
                </div>
              );
            })}
          </div>
          <Link
            href="/products/expandable-homes"
            className="mt-8 inline-flex items-center gap-1 font-body font-medium text-bb-blue transition-colors duration-fast ease-out hover:text-white"
          >
            See All Upgrade Options <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* STEP 7 - Book a Consultation */}
      <section className="bg-bb-navy py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <span className={stepNum}>07</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
            Let&apos;s Build It
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            You&apos;ve seen the possibilities. Now talk to our team to finalize
            your configuration, get pricing, and start your 25/25/25/25 payment
            plan.
          </p>
          <div className="mt-8 flex justify-center">
            <BookConsultation size="lg">Book a Consultation</BookConsultation>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
        </div>
      </section>
    </>
  );
}
