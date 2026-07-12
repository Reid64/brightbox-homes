'use client';

import { useState } from 'react';
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
  X,
} from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

const heading = 'font-heading text-3xl font-bold text-white md:text-4xl';
const subheading = 'mt-3 text-gray-300';
const addBtn =
  'rounded-xl bg-[#6B9BF7] px-4 py-2 font-semibold text-white transition-colors duration-200 ease-out hover:bg-[#4A7CE5]';

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

const roofPricing = [
  { size: "10' Home", key: 'roof-10ft', label: 'Metal Roof 10ft Upgrade', price: 1995 },
  { size: "20' Home", key: 'roof-20ft', label: 'Metal Roof 20ft Upgrade', price: 3995 },
  { size: "30' Home", key: 'roof-30ft', label: 'Metal Roof 30ft Upgrade', price: 4995 },
  { size: "40' Home", key: 'roof-40ft', label: 'Metal Roof 40ft Upgrade', price: 5995 },
];

type Upgrade = {
  id: string;
  name: string;
  image: string;
  desc: string;
  price: number;
  orderKey: string;
  orderLabel: string;
};

const upgrades: Upgrade[] = [
  { id: 'solar-8kw', name: 'Solar 8kW', image: '/images/upgrades/solar-8kw.webp', desc: '8kW solar kit with panels, inverter, and mounting hardware. Ideal for most homes.', price: 8500, orderKey: 'solar', orderLabel: 'Solar 8kW Package' },
  { id: 'solar-10kw', name: 'Solar 10kW', image: '/images/upgrades/solar-10kw.webp', desc: '10kW solar kit for larger homes or higher energy needs.', price: 11500, orderKey: 'solar', orderLabel: 'Solar 10kW Package' },
  { id: 'generac-18kw', name: 'Generac 18kW Generator', image: '/images/upgrades/generac-18kw.webp', desc: 'Generac 18kW standby generator with automatic transfer switch.', price: 6500, orderKey: 'generator', orderLabel: 'Generac 18kW Generator' },
  { id: 'generac-22kw', name: 'Generac 22kW Generator', image: '/images/upgrades/generac-22kw.webp', desc: 'Generac 22kW standby generator — whole-home backup power.', price: 8200, orderKey: 'generator', orderLabel: 'Generac 22kW Generator' },
  { id: 'duromax', name: 'DuroMax Portable Generator', image: '/images/upgrades/duromax-xp15000hx.png', desc: 'DuroMax XP15000HX dual-fuel portable generator, 15,000W peak.', price: 1800, orderKey: 'generator', orderLabel: 'DuroMax Portable Generator' },
  { id: 'mini-split', name: 'Mini-Split 2-Ton HVAC', image: '/images/upgrades/mini-split-2ton.png', desc: '2-ton ductless mini-split system. Cools and heats up to 800 sq ft.', price: 2200, orderKey: 'hvac', orderLabel: 'Mini-Split 2-Ton HVAC' },
  { id: 'radiant-floor', name: 'Radiant Floor Heating', image: '/images/upgrades/radiant-floor-heating-bright-box-homes-640891.jpg', desc: 'Electric radiant floor heating system installed under vinyl plank flooring.', price: 3100, orderKey: 'floor-heat', orderLabel: 'Radiant Floor Heating' },
  { id: 'ceiling-fans', name: 'Ceiling Air Mover Fans', image: '/images/upgrades/ceiling-air-mover-fans.png', desc: 'High-velocity ceiling air mover fans for improved circulation.', price: 450, orderKey: 'fans', orderLabel: 'Ceiling Air Mover Fans' },
  { id: 'induction-stove', name: '5-Burner Induction Stove', image: '/images/upgrades/induction-5burner.png', desc: 'Professional 5-burner induction cooktop upgrade.', price: 890, orderKey: 'stove', orderLabel: '5-Burner Induction Stove' },
  { id: 'kitchenette', name: 'Kitchenette Package', image: '/images/upgrades/kitchenette.png', desc: 'Compact kitchenette with sink, mini-fridge, and upper cabinets.', price: 2400, orderKey: 'kitchen', orderLabel: 'Kitchenette Package' },
  { id: 'vanity', name: 'Custom Bathroom Vanity', image: '/images/upgrades/custom-bathroom-vanity.png', desc: 'Upgraded vanity with stone countertop and undermount sink.', price: 1200, orderKey: 'vanity', orderLabel: 'Custom Bathroom Vanity' },
  { id: 'shower', name: 'Modular Shower', image: '/images/upgrades/modular-shower.png', desc: 'Pre-fabricated modular shower unit, easy installation.', price: 1800, orderKey: 'shower', orderLabel: 'Modular Shower Unit' },
  { id: 'water-heater', name: 'Tankless Water Heater', image: '/images/upgrades/tankless-water-heater.png', desc: 'On-demand tankless water heater, propane or electric.', price: 950, orderKey: 'water-heater', orderLabel: 'Tankless Water Heater' },
  { id: 'patio', name: 'Covered Front Patio', image: '/images/upgrades/covered-side-patio.jpeg', desc: 'Factory-built covered front patio with steel posts and metal roof extension.', price: 3500, orderKey: 'patio', orderLabel: 'Covered Front Patio' },
  { id: 'side-deck', name: 'Side Deck', image: '/images/upgrades/side-deck.png', desc: 'Pressure-treated side deck with steel railing.', price: 2800, orderKey: 'deck', orderLabel: 'Side Deck' },
];

function priceLabel(price: number) {
  return price === 0 ? 'Included' : `$${price.toLocaleString()}`;
}

// Hover-expand image: scales to 110% on hover with a blue border glow.
function ZoomImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div className={`group/zoom overflow-hidden rounded-lg border border-white/10 transition-colors duration-300 ease-out hover:border-[#6B9BF7]/50 ${className ?? ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full cursor-zoom-in transition-transform duration-300 ease-out group-hover/zoom:scale-110"
      />
    </div>
  );
}

export default function DesignJourneyContent({
  active,
  setActive,
}: {
  active: number;
  setActive: (step: number) => void;
}) {
  const [order, setOrder] = useState<Record<string, { label: string; price: number; removable: boolean }>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  const addToOrder = (key: string, label: string, price: number, removable = true) =>
    setOrder((prev) => ({ ...prev, [key]: { label, price, removable } }));

  const removeFromOrder = (key: string) =>
    setOrder((prev) => {
      const n = { ...prev };
      delete n[key];
      return n;
    });

  const total = Object.values(order).reduce((s, i) => s + i.price, 0);
  const hasOrder = Object.keys(order).length > 0;

  return (
    <div>
      {/* Re-mount on step change for a subtle 200ms fade. */}
      <div key={active} style={{ animation: 'fadeIn 200ms ease-out' }}>
        {active === 0 && (
          <div>
            <h1 className={heading}>Choose Your Home</h1>
            <p className={subheading}>Select the model and size that fits your needs.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {products.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    addToOrder('model', p.name, 0, false);
                    setActive(1);
                  }}
                  className="group w-full overflow-hidden rounded-xl border border-white/10 bg-[#232B45] text-left shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#6B9BF7]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
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
                    <p className="mt-0.5 font-mono text-xs text-[#6B9BF7]">{p.price}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-[#6B9BF7]">
                      Select <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {active === 1 && (
          <div>
            <h1 className={heading}>Pick Your Exterior Color</h1>
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h2 className="font-heading text-xl font-semibold text-[#6B9BF7]">Standard Exterior Colors — Included</h2>
                <ZoomImage
                  src="/images/colors/exterior-house-colors.png"
                  alt="60+ RAL exterior color chart"
                  width={1086}
                  height={1448}
                  className="mt-4"
                />
                <p className="mt-3 text-sm text-gray-300">All colors factory-applied with UV and weather-resistant coating.</p>
                <button
                  type="button"
                  onClick={() => addToOrder('exterior', 'Standard Exterior Color', 0)}
                  className={`mt-4 ${addBtn}`}
                >
                  Add Standard Exterior to Order
                </button>
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-[#6B9BF7]">Carved Metal Plate Finish — $1,000 Upgrade</h2>
                <ZoomImage
                  src="/images/colors/carved-metal-plate.png"
                  alt="Carved metal plate exterior finishes"
                  width={1024}
                  height={1536}
                  className="mt-4"
                />
                <p className="mt-3 text-sm text-gray-300">
                  Premium carved metal plate exterior panels. Available in the colors shown. $1,000 upgrade from standard RAL finish.
                </p>
                <button
                  type="button"
                  onClick={() => addToOrder('exterior', 'Carved Metal Plate Finish', 1000)}
                  className={`mt-4 ${addBtn}`}
                >
                  Add Carved Metal Plate to Order
                </button>
              </div>
            </div>
          </div>
        )}

        {active === 2 && (
          <div>
            <h1 className={heading}>Choose Your Roof</h1>

            <div className="mt-8 rounded-xl border border-[#6B9BF7]/15 bg-[#1A2540] p-6">
              <h2 className="font-heading text-xl font-semibold text-[#6B9BF7]">Why a Metal Roof?</h2>
              <p className="mt-3 text-sm text-gray-300">
                A standing-seam metal roof protects your home&apos;s primary steel structure from water intrusion — the leading
                cause of long-term structural damage in prefab construction. Metal roofs last 40-70 years, shed water instantly,
                withstand 140mph winds, reflect solar heat to cut cooling costs, and are the only roofing system that properly
                integrates with a steel-frame expandable home. Every Bright Box Home is engineered for a metal roof upgrade.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
              <div className="lg:w-1/2">
                <ZoomImage
                  src="/images/colors/metal-roof-colors.png"
                  alt="19 metal roof color chart"
                  width={1191}
                  height={1320}
                />
              </div>

              <div className="space-y-8 lg:w-1/2">
                <p className="text-sm text-gray-300">
                  The LRV (Light Reflectance Value) and SRI (Solar Reflectance Index) values shown at the bottom of the color
                  chart indicate each color&apos;s energy efficiency. Higher values reflect more sunlight and reduce cooling costs -
                  an important consideration for hot climates like Texas. Choose lighter colors for maximum energy savings.
                </p>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-[#6B9BF7]">Metal Roof Upgrade Pricing</h2>
                  <p className="mt-2 text-sm text-gray-300">
                    Upgrade to a full pitched metal roof system with high-grade 24-gauge steel roofing panels, a complete metal
                    truss system, and all fasteners included.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {roofPricing.map((r) => (
                      <div key={r.key} className="flex flex-col rounded-xl border border-white/10 bg-[#1C2438] p-3 text-center">
                        <p className="text-xs text-gray-300">{r.size}</p>
                        <p className="mt-1 font-mono text-lg font-bold text-[#6B9BF7]">{priceLabel(r.price)}</p>
                        <button
                          type="button"
                          onClick={() => addToOrder(r.key, r.label, r.price)}
                          className="mt-3 rounded-lg bg-[#6B9BF7] px-2 py-1.5 text-xs font-semibold text-white transition-colors duration-200 ease-out hover:bg-[#4A7CE5]"
                        >
                          Add to Order
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <figure className="w-full max-w-[180px]">
                    <Image
                      src="/images/upgrades/metal-roof-truss-standard.png"
                      alt="Standard metal roof truss system"
                      width={1499}
                      height={1049}
                      className="h-auto w-full rounded-lg border border-white/10 bg-white/5"
                    />
                    <figcaption className="mt-2 text-xs text-gray-300">Standard Metal Truss System</figcaption>
                  </figure>
                  <figure className="w-full max-w-[180px]">
                    <Image
                      src="/images/upgrades/metal-roof-truss-reinforced-solar.png"
                      alt="Reinforced truss for solar installations"
                      width={1500}
                      height={1049}
                      className="h-auto w-full rounded-lg border border-white/10 bg-white/5"
                    />
                    <figcaption className="mt-2 text-xs text-gray-300">Reinforced Truss for Solar Installations</figcaption>
                  </figure>
                </div>

                {/* Ambient looping truss video (no controls) */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Metal roof truss system"
                  className="w-full max-w-sm rounded-lg border border-white/10"
                >
                  <source src="/videos/metal-roof-truss.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        )}

        {active === 3 && (
          <div>
            <h1 className={heading}>Customize Your Interior</h1>
            <div className="mt-8 space-y-8">
              <div>
                <h2 className="font-heading text-xl font-semibold text-[#6B9BF7]">Interior Wall Colors</h2>
                <ZoomImage
                  src="/images/colors/interior-wall-colors.png"
                  alt="Interior wall color chart"
                  width={1063}
                  height={1479}
                  className="mt-4 max-w-2xl"
                />
                <p className="mt-3 text-sm text-gray-300">Bamboo wood fiber wall panels - durable, easy to clean, moisture resistant.</p>
                <button
                  type="button"
                  onClick={() => addToOrder('interior-wall', 'Interior Wall Color', 0)}
                  className={`mt-4 ${addBtn}`}
                >
                  Add Interior Wall Color Selection to Order
                </button>
              </div>
              <div className="border-t border-white/10 pt-8">
                <h2 className="font-heading text-xl font-semibold text-[#6B9BF7]">Interior Flooring</h2>
                <ZoomImage
                  src="/images/colors/interior-floor-colors.jpg"
                  alt="Interior flooring color chart"
                  width={1280}
                  height={760}
                  className="mt-4 max-w-2xl"
                />
                <p className="mt-3 text-sm text-gray-300">Factory-installed vinyl plank flooring in a range of finishes.</p>
                <button
                  type="button"
                  onClick={() => addToOrder('interior-floor', 'Interior Flooring', 0)}
                  className={`mt-4 ${addBtn}`}
                >
                  Add Flooring Selection to Order
                </button>
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
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {upgrades.map((u) => {
                const isOpen = expanded === u.id;
                return (
                  <div key={u.id}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : u.id)}
                      aria-expanded={isOpen}
                      className={`flex w-full items-start gap-4 border border-[#6B9BF7]/12 bg-[#1A2540] p-4 text-left transition-colors duration-200 ease-out hover:border-[#6B9BF7]/40 ${
                        isOpen ? 'rounded-t-xl' : 'rounded-xl'
                      }`}
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
                        <Image src={u.image} alt={u.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading text-base font-semibold text-white">{u.name}</h3>
                          <p className="whitespace-nowrap font-mono text-sm font-bold text-[#6B9BF7]">{priceLabel(u.price)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-300">{u.desc}</p>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="rounded-b-xl border border-t-0 border-[#6B9BF7]/12 bg-[#111C33] p-4">
                        <p className="text-sm text-gray-300">{u.desc}</p>
                        <button
                          type="button"
                          onClick={() => addToOrder(u.orderKey, u.orderLabel, u.price)}
                          className={`mt-4 ${addBtn}`}
                        >
                          Add to Order
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <Link
              href="/products/expandable-homes/20x20"
              className="mt-6 inline-flex items-center gap-1 font-body font-medium text-[#6B9BF7] transition-colors duration-fast ease-out hover:text-white"
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
            <p className="mt-6 text-gray-300">800-259-1745 &middot; info@brightboxhomes.com</p>
            <p className="mt-2 text-sm text-gray-400">Or call us - we&apos;ll walk you through every option.</p>
          </div>
        )}
      </div>

      {/* Live order / build panel — desktop right rail, mobile bottom drawer. */}
      {hasOrder && (
        <div className="fixed inset-x-0 bottom-0 z-50 lg:inset-x-auto lg:bottom-auto lg:right-6 lg:top-24 lg:w-72">
          <div className="max-h-[70vh] overflow-y-auto rounded-t-2xl border border-[#6B9BF7]/20 bg-[#1A2540] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] lg:rounded-2xl">
            <h2 className="font-heading text-lg font-bold text-white">Your Build</h2>
            <ul className="mt-4 space-y-3">
              {Object.entries(order).map(([key, item]) => (
                <li key={key} className="flex items-start justify-between gap-2 text-sm">
                  <span className="min-w-0 flex-1 text-gray-300">{item.label}</span>
                  <span className="whitespace-nowrap font-mono font-semibold text-[#6B9BF7]">{priceLabel(item.price)}</span>
                  {item.removable && (
                    <button
                      type="button"
                      onClick={() => removeFromOrder(key)}
                      aria-label={`Remove ${item.label}`}
                      className="flex-shrink-0 text-red-500 transition-colors duration-200 ease-out hover:text-red-400"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-bold text-white">Estimated Total</span>
              <span className="font-mono font-bold text-white">${total.toLocaleString()}</span>
            </div>
            <div className="mt-4">
              <BookConsultation />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
