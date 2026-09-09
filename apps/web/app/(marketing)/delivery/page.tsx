import Image from 'next/image';
import type { Metadata } from 'next';
import { Truck, Ship, PackageCheck, PlugZap, Ruler, Blocks, Wrench, Phone, PlayCircle, Zap, Droplets, HardHat, FileCheck } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

export const metadata: Metadata = {
  title: 'Delivery & Site Preparation | Bright Box Homes',
  description:
    'Free delivery within 300 miles of any major US port city. Learn exactly how to prepare your site, what foundation you need, and what to expect when your Bright Box Home arrives.',
};

const labelDark = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A853]';
const labelLight = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-black/60';

export default function DeliveryPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: 'linear-gradient(180deg, #1C1C1E, #1C1C1E)' }}
      >
        <Image
          src="/images/delivery-hero.png"
          alt=""
          aria-hidden="true"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(13,21,38,0.85) 0%, rgba(13,21,38,0.5) 60%, rgba(13,21,38,0.3) 100%)',
            zIndex: 1,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="mx-auto max-w-[1280px] px-6">
            <p className={labelDark}>Delivery</p>
            <h1 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl lg:text-6xl">
              From Our Factory to Your Property
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#D1D5DB]">
              Free delivery within 300 miles of any major US port city. We handle international freight,
              customs clearance, and last-mile delivery — your job is to have your site ready.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <BookConsultation size="lg">Check Your Delivery Zone</BookConsultation>
              <a
                href="tel:8002591745"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-white/10"
              >
                <Phone size={20} />
                800-259-1745
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE MAP ── */}
      <section className="bg-[#1C1C1E] py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelDark}>Delivery Zone</p>
          <h2 className="mb-8 font-heading text-3xl font-extrabold text-white md:text-4xl">
            See If You&apos;re in the Free Zone
          </h2>
          <div className="flex min-h-64 items-center justify-center rounded-lg p-10 flex-col gap-4" style={{background:'#1C1C1E',border:'1px solid rgba(255,255,255,0.1)'}}><p className="text-lg font-semibold text-white text-center">Free Delivery Within 300 Miles of Any Major US Port</p><p className="text-sm text-gray-400 text-center max-w-lg">Port cities: Houston TX, Los Angeles CA, Newark NJ, Savannah GA, Charleston SC, Seattle WA, Norfolk VA, Miami FL, New Orleans LA, Baltimore MD.</p></div>
          <p className="mt-4 text-center text-sm text-gray-400">
            Free delivery within 300 miles of any major US port · Beyond 300 miles: ~$3/mile from nearest port
          </p>
        </div>
      </section>

      {/* ── HOW DELIVERY WORKS ── */}
      <section className="bg-[#252527] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelDark}>How It Works</p>
          <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
            From Factory to Foundation
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: PackageCheck, title: 'Factory Inspection', text: 'Every home is inspected and photo-documented before leaving the factory. You receive photos of your home before it ships.' },
              { icon: Ship, title: 'International Freight', text: 'We coordinate ocean freight, port handling, and customs clearance into the US. You never touch the paperwork.' },
              { icon: Truck, title: 'Last-Mile Delivery', text: 'Your home arrives on a flatbed truck fully assembled — kitchen, bathroom, HVAC, electrical, and plumbing all done. It slides directly onto your prepared foundation.' },
              { icon: PlugZap, title: 'You Connect Utilities', text: 'You hire local licensed contractors to connect electrical, water, and septic. We provide all specs and documentation your contractors need.' },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-lg border border-white/10 bg-[#1C1C1E] p-6">
                  <Icon size={28} aria-hidden="true" className="text-[#D4A853]" />
                  <h3 className="mt-4 font-heading text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SITE PREPARATION ── */}
      <section style={{ background: '#F5F0E8' }} className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelLight}>Before Delivery Day</p>
          <h2 className="font-heading text-4xl font-extrabold text-[#1C1C1E] md:text-5xl">
            Preparing Your Site
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[#374151]">
            Your property must be ready before we arrive. Here is exactly what needs to be in place.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* Level Ground */}
            <div className="rounded-lg bg-[#252527] p-8" style={{ border: '1px solid rgba(212,168,83,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'rgba(212,168,83,0.15)' }}>
                <Ruler size={24} className="text-[#D4A853]" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-white">Level Graded Land</h3>
              <p className="mt-2 text-sm text-gray-300">
                Your site must be graded and level where the home will be placed. Uneven ground prevents proper placement and causes long-term structural issues. Have a grading contractor level your pad before delivery day.
              </p>
            </div>

            {/* Foundation Blocks */}
            <div className="rounded-lg bg-[#252527] p-8" style={{ border: '1px solid rgba(212,168,83,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'rgba(212,168,83,0.15)' }}>
                <Blocks size={24} className="text-[#D4A853]" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-white">Foundation Blocks / Piers</h3>
              <p className="mt-2 text-sm text-gray-300">
                Concrete blocks or piers must be set before delivery. Your home slides directly onto them.
              </p>
              <div className="mt-4 rounded-lg p-4" style={{ background: 'rgba(212,168,83,0.08)', border: '1px solid rgba(212,168,83,0.15)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D4A853]">Foundation Specs</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-300">
                  <li>• <strong className="text-white">8 blocks total</strong> required per home</li>
                  <li>• Spacing: <strong className="text-white">61.6 inches (156.5 cm)</strong> apart center-to-center</li>
                  <li>• Options: concrete slab, concrete blocks, or pier and beam</li>
                  <li>• We provide a foundation layout diagram specific to your home size</li>
                </ul>
              </div>
            </div>

            {/* Truck Access */}
            <div className="rounded-lg bg-[#252527] p-8" style={{ border: '1px solid rgba(212,168,83,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'rgba(212,168,83,0.15)' }}>
                <Truck size={24} className="text-[#D4A853]" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-white">Truck Access</h3>
              <p className="mt-2 text-sm text-gray-300">
                The flatbed delivery truck needs a clear path to your placement site.
              </p>
              <div className="mt-4 rounded-lg p-4" style={{ background: 'rgba(212,168,83,0.08)', border: '1px solid rgba(212,168,83,0.15)' }}>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Path width: <strong className="text-white">minimum 14 feet</strong></li>
                  <li>• Path length: <strong className="text-white">minimum 60 feet</strong> straight approach</li>
                  <li>• Overhead clearance: <strong className="text-white">minimum 15 feet</strong> for trees and power lines</li>
                  <li>• Ground must support a loaded flatbed truck</li>
                </ul>
              </div>
            </div>

            {/* Utility Rough-Ins */}
            <div className="rounded-lg bg-[#252527] p-8" style={{ border: '1px solid rgba(212,168,83,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'rgba(212,168,83,0.15)' }}>
                <Zap size={24} className="text-[#D4A853]" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-white">Utility Connections Ready</h3>
              <p className="mt-2 text-sm text-gray-300">
                Have your utility rough-ins positioned near the home&apos;s placement location before delivery.
              </p>
              <div className="mt-4 rounded-lg p-4" style={{ background: 'rgba(212,168,83,0.08)', border: '1px solid rgba(212,168,83,0.15)' }}>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• <strong className="text-white">Electrical panel</strong> roughed in — 125 amp service minimum</li>
                  <li>• <strong className="text-white">Water supply line</strong> buried and accessible</li>
                  <li>• <strong className="text-white">Septic or sewer</strong> connection point established</li>
                  <li>• All lines buried to local code depth requirements</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT IS NOT INCLUDED ── */}
      <section className="bg-[#1C1C1E] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelDark}>Connections & Setup</p>
          <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
            What Requires Local Contractors
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            These installations require licensed contractors who know your county&apos;s building codes, soil, and utility layout.
          </p>

          <div className="mt-12 rounded-lg p-8" style={{ background: '#252527', border: '1px solid rgba(212,168,83,0.15)' }}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { icon: Droplets, title: 'Septic or Sewer Connection', text: 'Your local plumber connects the home\'s waste line to your septic tank or municipal sewer.' },
                { icon: Droplets, title: 'Water Supply Hookup', text: 'A licensed plumber connects the home\'s water inlet to your well or municipal water supply.' },
                { icon: Zap, title: 'Electrical Grid Connection', text: 'A licensed electrician connects the home\'s 125-amp panel to your utility meter or off-grid power system.' },
                { icon: HardHat, title: 'Foundation Construction', text: 'We provide the specs and layout diagram — your contractor pours or sets the blocks to our specifications.' },
                { icon: FileCheck, title: 'Permits & Inspections', text: 'Permit requirements vary by county. We provide all documentation your building department needs.' },
                { icon: Wrench, title: 'Expanding the Cabin Sections', text: 'Your home arrives folded for transport. A small crew (2-3 people) unfolds the expandable sections on-site — typically less than 1 hour.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 rounded-lg p-4" style={{ background: 'rgba(212,168,83,0.05)' }}>
                    <Icon size={20} className="mt-0.5 shrink-0 text-[#D4A853]" />
                    <div>
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                      <p className="mt-1 text-xs text-gray-400">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm italic text-gray-400">
              We don&apos;t do these connections because every site is different — your local contractors know your soil, your codes, and your utility layout better than anyone.
            </p>
          </div>
        </div>
      </section>

      {/* ── AFTER DELIVERY ── */}
      <section style={{ background: '#F5F0E8' }} className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelLight}>After Your Home Arrives</p>
          <h2 className="font-heading text-4xl font-extrabold text-[#1C1C1E] md:text-5xl">
            We Don&apos;t Disappear After Delivery
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-[#252527] p-8" style={{ border: '1px solid rgba(212,168,83,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              <PlayCircle size={28} className="text-[#D4A853]" />
              <h3 className="mt-4 font-heading text-lg font-bold text-white">Setup Video Included</h3>
              <p className="mt-2 text-sm text-gray-300">
                Every Bright Box Home comes with a detailed setup and connection video walking you through the final steps — utility hookups, leveling adjustments, expanding the sections, and finishing touches.
              </p>
            </div>
            <div className="rounded-lg bg-[#252527] p-8" style={{ border: '1px solid rgba(212,168,83,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              <Phone size={28} className="text-[#D4A853]" />
              <h3 className="mt-4 font-heading text-lg font-bold text-white">Post-Delivery Support</h3>
              <p className="mt-2 text-sm text-gray-300">
                Have questions during setup? Book a post-delivery consultation and our team walks you through any remaining requirements. One year warranty covers parts damaged or lost (not caused by humans).
              </p>
              <a href="tel:8002591745" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4A853] hover:text-white">
                <Phone size={16} /> 800-259-1745
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY SPECS ── */}
      <section className="bg-[#1C1C1E] py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="rounded-lg p-8" style={{ background: '#252527', border: '1px solid rgba(212,168,83,0.15)' }}>
            <h3 className="font-heading text-xl font-bold text-white">Quick Reference: Home Specs</h3>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              {[
                { label: '20ft Home Weight', value: '6,172 lbs' },
                { label: '40ft Home Weight', value: '10,362 lbs' },
                { label: 'Ceiling Height', value: '7.35 ft' },
                { label: 'Electrical Panel', value: '125 Amp' },
                { label: 'Foundation Blocks', value: '8 total' },
                { label: 'Block Spacing', value: '61.6 inches' },
                { label: 'Lead Time', value: '8–10 weeks' },
                { label: 'Warranty', value: '1 year parts' },
              ].map((spec) => (
                <div key={spec.label} className="rounded-lg p-4" style={{ background: 'rgba(212,168,83,0.06)' }}>
                  <p className="text-xs text-gray-400">{spec.label}</p>
                  <p className="mt-1 font-mono text-base font-bold text-white">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1C1C1E] py-24 text-center lg:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
            Ready to Get Your Home Delivered?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Book a consultation and we&apos;ll confirm delivery options, site requirements, and pricing for your property.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
