'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sun,
  Power,
  Thermometer,
  UtensilsCrossed,
  Bath,
  WashingMachine,
  Zap,
  Home,
  Layers,
} from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

const heading = 'font-heading text-3xl font-bold text-white md:text-4xl';
const subheading = 'mt-3 text-gray-300';
const chartImg = 'h-auto w-full rounded-lg border border-white/10';

const products = [
  { name: '20x10 Studio', price: '$35,995', href: '/products/expandable-homes/20x10', image: '/images/products/expandable-homes/exterior/model-20x10-front.png' },
  { name: '20x20', price: '$45,995', href: '/products/expandable-homes/20x20', image: '/images/products/expandable-homes/exterior/homepage-20x20.jpg' },
  { name: '20x30', price: '$49,995', href: '/products/expandable-homes/20x30', image: '/images/products/expandable-homes/exterior/model-20x30.png' },
  { name: '20x40', price: '$59,995', href: '/products/expandable-homes/20x40', image: '/images/products/expandable-homes/exterior/model-20x40-b.jpg' },
  { name: 'Duplex', price: '$59,995', href: '/products/duplex', image: '/images/products/duplex/hero.png' },
  { name: 'Apple Cabin', price: 'Coming Soon', href: '/products/apple-cabins', image: '/images/products/apple-cabins/exterior/01.png' },
  { name: 'Space Capsule', price: 'Coming Soon', href: '/products/space-capsules', image: '/images/products/space-capsules/exterior/01.png' },
  { name: 'Assembly', price: '$25,995', href: '/products/assembly-homes', image: '/images/products/assembly-homes/exterior/10.jpg' },
  { name: 'Emergency Housing', price: '$2,000', href: '/products/emergency-housing', image: '/images/products/emergency-housing/exterior/folding-house.png' },
];

const upgradeCategories = [
  { icon: Sun, name: 'Solar & Power', text: 'Solar-ready packages and kits.' },
  { icon: Power, name: 'Generators', text: 'Portable and whole-house backup.' },
  { icon: Thermometer, name: 'HVAC', text: 'Mini-split and radiant options.' },
  { icon: UtensilsCrossed, name: 'Kitchen', text: 'Cabinets, induction, disposal.' },
  { icon: Bath, name: 'Bathroom', text: 'Showers, vanities, finishes.' },
  { icon: WashingMachine, name: 'Laundry', text: 'Washer/dryer and rough-ins.' },
  { icon: Zap, name: 'Electrical', text: 'Panels, outlets, smart wiring.' },
  { icon: Home, name: 'Exterior', text: 'Decks, porches, colors, roofing.' },
  { icon: Layers, name: 'Insulation', text: 'Upgraded thermal packages.' },
];

export default function DesignJourneyContent({ active }: { active: number }) {
  return (
    // Re-mount on step change for a subtle 200ms fade.
    <div key={active} style={{ animation: 'fadeIn 200ms ease-out' }}>
      {active === 0 && (
        <div>
          <h1 className={heading}>Choose Your Home</h1>
          <p className={subheading}>Select the model and size that fits your needs.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group overflow-hidden rounded-xl border border-white/10 bg-bb-surface-dark transition-colors duration-fast ease-out hover:border-white/20"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 30vw, 50vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-3">
                  <p className="font-heading text-sm font-semibold text-white">{p.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-bb-blue">{p.price}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-bb-blue">
                    Explore <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {active === 1 && (
        <div>
          <h1 className={heading}>Pick Your Exterior Color</h1>
          <div className="mt-8 space-y-10">
            <div>
              <h2 className="font-heading text-xl font-semibold text-bb-blue">Standard RAL Colors (60+ Options)</h2>
              <Image
                src="/images/colors/exterior-house-colors.png"
                alt="60+ RAL exterior color chart"
                width={1086}
                height={1448}
                className={`mt-4 max-w-2xl ${chartImg}`}
              />
              <p className="mt-3 text-sm text-gray-300">All colors factory-applied with UV and weather-resistant coating.</p>
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-bb-blue">Carved Metal Plate Finish (Premium)</h2>
              <Image
                src="/images/colors/carved-metal-plate.png"
                alt="Carved metal plate exterior finishes"
                width={1024}
                height={1536}
                className={`mt-4 max-w-2xl ${chartImg}`}
              />
              <p className="mt-3 text-sm text-gray-300">A distinctive wood-grain carved metal facade upgrade.</p>
            </div>
          </div>
        </div>
      )}

      {active === 2 && (
        <div>
          <h1 className={heading}>Choose Your Roof</h1>

          {/* Roof color chart */}
          <Image
            src="/images/colors/metal-roof-colors.png"
            alt="19 metal roof color chart"
            width={1191}
            height={1320}
            className={`mt-8 max-w-2xl ${chartImg}`}
          />

          {/* LRV / SRI explanation */}
          <p className="mt-4 max-w-2xl text-sm text-gray-300">
            The LRV (Light Reflectance Value) and SRI (Solar Reflectance Index) values shown
            at the bottom of the color chart indicate each color&apos;s energy efficiency.
            Higher values reflect more sunlight and reduce cooling costs - an important
            consideration for hot climates like Texas. Choose lighter colors for maximum
            energy savings.
          </p>

          {/* Upgrade pricing */}
          <div className="mt-10">
            <h2 className="font-heading text-xl font-semibold text-bb-blue">Metal Roof Upgrade Pricing</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-300">
              Upgrade to a full pitched metal roof system with high-grade 24-gauge steel
              roofing panels, a complete metal truss system, and all fasteners included.
            </p>
            <div className="mt-4 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["10' Home", '$1,995'],
                ["20' Home", '$3,995'],
                ["30' Home", '$4,995'],
                ["40' Home", '$5,995'],
              ].map(([size, price]) => (
                <div key={size} className="rounded-xl border border-white/10 bg-bb-surface-dark p-4 text-center">
                  <p className="text-sm text-gray-300">{size}</p>
                  <p className="mt-1 font-mono text-xl font-bold text-bb-blue">{price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Truss images */}
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start">
            <figure className="w-full max-w-[250px]">
              <Image
                src="/images/upgrades/metal-roof-truss-standard.png"
                alt="Standard metal roof truss system"
                width={1499}
                height={1049}
                className="h-auto w-full rounded-lg border border-white/10 bg-white/5"
              />
              <figcaption className="mt-2 text-sm text-gray-300">Standard Metal Truss System</figcaption>
            </figure>
            <figure className="w-full max-w-[250px]">
              <Image
                src="/images/upgrades/metal-roof-truss-reinforced-solar.png"
                alt="Reinforced truss for solar installations"
                width={1500}
                height={1049}
                className="h-auto w-full rounded-lg border border-white/10 bg-white/5"
              />
              <figcaption className="mt-2 text-sm text-gray-300">Reinforced Truss for Solar Installations</figcaption>
            </figure>
          </div>

          {/* Ambient looping truss video (no controls) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-label="Metal roof truss system"
            className="mt-8 w-full max-w-sm rounded-lg border border-white/10"
          >
            <source src="/videos/metal-roof-truss.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {active === 3 && (
        <div>
          <h1 className={heading}>Customize Your Interior</h1>
          <div className="mt-8 space-y-8">
            <div>
              <h2 className="font-heading text-xl font-semibold text-bb-blue">Interior Wall Colors</h2>
              <Image
                src="/images/colors/interior-wall-colors.png"
                alt="Interior wall color chart"
                width={1063}
                height={1479}
                className={`mt-4 max-w-2xl ${chartImg}`}
              />
              <p className="mt-3 text-sm text-gray-300">Bamboo wood fiber wall panels - durable, easy to clean, moisture resistant.</p>
            </div>
            <div className="border-t border-white/10 pt-8">
              <h2 className="font-heading text-xl font-semibold text-bb-blue">Interior Flooring</h2>
              <Image
                src="/images/colors/interior-floor-colors.jpg"
                alt="Interior flooring color chart"
                width={1280}
                height={760}
                className={`mt-4 max-w-2xl ${chartImg}`}
              />
              <p className="mt-3 text-sm text-gray-300">Factory-installed vinyl plank flooring in a range of finishes.</p>
            </div>
          </div>
        </div>
      )}

      {active === 4 && (
        <div>
          <h1 className={heading}>Add Upgrades</h1>
          <p className={subheading}>
            Customize your home with solar packages, generators, appliances, upgraded electrical, and more.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upgradeCategories.map((u) => {
              const Icon = u.icon;
              return (
                <div key={u.name} className="rounded-xl border border-white/10 bg-bb-surface-dark p-5">
                  <Icon size={24} aria-hidden="true" className="text-red-500" />
                  <h3 className="mt-3 font-heading text-base font-semibold text-white">{u.name}</h3>
                  <p className="mt-1 text-sm text-gray-300">{u.text}</p>
                </div>
              );
            })}
          </div>
          <Link
            href="/products/expandable-homes/20x20"
            className="mt-6 inline-flex items-center gap-1 font-body font-medium text-bb-blue transition-colors duration-fast ease-out hover:text-white"
          >
            See detailed upgrade specs on your product page <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}

      {active === 5 && (
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <h1 className={heading}>Ready to Build?</h1>
          <p className="mt-4 max-w-lg text-lg text-gray-300">
            You&apos;ve explored the options. Now let&apos;s make it real.
          </p>
          <div className="mt-8">
            <BookConsultation size="lg" />
          </div>
          <p className="mt-6 text-gray-300">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
          <p className="mt-2 text-sm text-gray-400">Or call us - we&apos;ll walk you through every option.</p>
        </div>
      )}
    </div>
  );
}
