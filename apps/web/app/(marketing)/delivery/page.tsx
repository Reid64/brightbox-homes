import type { Metadata } from 'next';
import { Truck, Ship, MapPin, PackageCheck, PlugZap } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

export const metadata: Metadata = {
  title: 'Delivery | Bright Box Homes',
  description:
    'Bright Box Homes handles international shipping, customs, and last-mile delivery to your property anywhere in the continental US - with free shipping in Texas. Check your delivery zone.',
};

const labelDark = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#6B9BF7]';
const labelLight = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#3461C7]';

const coverage = [
  {
    icon: MapPin,
    title: 'Free Texas Shipping',
    text: 'Delivery within Texas is included at no extra cost - one of the many reasons Texas buyers love Bright Box.',
  },
  {
    icon: Truck,
    title: 'Continental US Delivery',
    text: 'We deliver to your property anywhere in the lower 48 states. Rates outside Texas depend on distance and site access.',
  },
  {
    icon: Ship,
    title: 'Shipping & Customs Handled',
    text: 'We manage international freight, port handling, and customs clearance - so you never touch the paperwork.',
  },
];

const process = [
  {
    icon: PackageCheck,
    title: 'Factory Inspection',
    text: 'Every home is inspected and photo-documented before it leaves the factory.',
  },
  {
    icon: Ship,
    title: 'Freight & Customs',
    text: 'We coordinate ocean freight, port handling, and customs clearance into the US.',
  },
  {
    icon: Truck,
    title: 'Last-Mile Delivery',
    text: 'Our delivery team brings the home to your prepared site and handles placement and setup.',
  },
  {
    icon: PlugZap,
    title: 'Utility Hookups',
    text: 'You connect utilities and handle any local permitting with your own licensed contractors.',
  },
];

export default function DeliveryPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-24 lg:py-32"
        style={{ background: 'linear-gradient(180deg, #0F1729, #141B2D)' }}
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelDark}>Delivery</p>
          <h1 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl lg:text-6xl">
            Delivered to Your Door
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#D1D5DB]">
            From the factory floor to your property, we handle international shipping, customs,
            and last-mile delivery - anywhere in the continental US, with free shipping in Texas.
          </p>
          <div className="mt-8">
            <BookConsultation size="lg">Check Your Delivery Zone</BookConsultation>
          </div>
        </div>
      </section>

      {/* Coverage (warm cream, white cards) */}
      <section className="bg-[#F5F0E8] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelLight}>Where We Deliver</p>
          <h2 className="font-heading text-4xl font-extrabold text-[#111827] md:text-5xl">
            Coverage &amp; Shipping
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {coverage.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-black/[0.04] bg-[#FFFFFF] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(52,97,199,0.08)' }}
                  >
                    <Icon size={24} aria-hidden="true" className="text-[#4A7CE5]" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-[#111827]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery zone callout strip (elevated dark) */}
      <section
        className="bg-[#232B45] py-10"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-3 px-6 text-center sm:flex-row sm:gap-4">
          <Truck size={24} aria-hidden="true" className="text-[#D1D5DB]" />
          <p className="text-[#D1D5DB]">
            Not sure if we reach your area?{' '}
            <a
              href="tel:8002591745"
              className="font-semibold text-[#6B9BF7] transition-colors duration-200 ease-out hover:text-[#FFFFFF]"
            >
              Check your delivery zone - call 800-259-1745
            </a>
          </p>
        </div>
      </section>

      {/* Process (dark surface, elevated cards) */}
      <section className="bg-[#1C2438] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelDark}>How It Works</p>
          <h2 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl">
            From Factory to Foundation
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-xl border border-white/[0.06] bg-[#232B45] p-6"
                >
                  <Icon size={28} aria-hidden="true" className="text-[#6B9BF7]" />
                  <h3 className="mt-4 font-heading text-base font-bold text-[#FFFFFF]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#D1D5DB]">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA (navy) */}
      <section className="bg-[#0F1729] py-24 text-center lg:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl">
            Ready to Get Your Home Delivered?
          </h2>
          <p className="mt-4 text-lg text-[#D1D5DB]">
            Book a consultation and we&apos;ll confirm delivery options and pricing for your address.
          </p>
          <div className="mt-8 flex justify-center">
            <BookConsultation size="lg">Book a Consultation</BookConsultation>
          </div>
          <p className="mt-6 text-sm text-[#6B7280]">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
        </div>
      </section>
    </>
  );
}
