import Image from 'next/image';
import type { Metadata } from 'next';
import { MapPin, Search, FileCheck, Handshake } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

export const metadata: Metadata = {
  title: 'Find Land | Bright Box Homes',
  description:
    "Don't own land yet? Bright Box Homes helps you find build-ready parcels and connects you with a licensed land partner - so your expandable home has somewhere to land.",
};

const labelDark = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A853]';
const labelLight = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-black/60';

const steps = [
  {
    icon: Search,
    title: 'Tell Us What You Need',
    text: 'Share your target region, budget, and how you plan to use the home - full-time residence, rental, or getaway.',
  },
  {
    icon: MapPin,
    title: 'We Help You Search',
    text: 'We point you toward build-ready parcels and connect you with our licensed land partner for on-the-ground listings.',
  },
  {
    icon: FileCheck,
    title: 'Check Site Requirements',
    text: 'Together we review access, utilities, permitting, and foundation needs so the parcel actually works for your model.',
  },
];

export default function FindLandPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: 'linear-gradient(180deg, #1C1C1E, #1C1C1E)' }}
      >
        <Image
          src="/images/find-land-hero.webp"
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
            <p className={labelDark}>Find Land</p>
            <h1 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl lg:text-6xl">
              Need Land? We&apos;ll Help You Find It.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#D1D5DB]">
              A great home needs somewhere to land. If you don&apos;t already own a lot, we&apos;ll help
              you find a build-ready parcel and make sure it meets the site requirements for your
              Bright Box Home.
            </p>
            <div className="mt-8">
              <BookConsultation size="lg">Get Land Assistance</BookConsultation>
            </div>
          </div>
        </div>
      </section>

      {/* How we help (warm cream, white cards) */}
      <section className="bg-[#F5F0E8] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelLight}>How It Works</p>
          <h2 className="font-heading text-4xl font-extrabold text-[#111827] md:text-5xl">
            From Search to Site-Ready
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-lg border border-black/[0.04] bg-[#FFFFFF] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ background: 'rgba(28,28,30,0.08)' }}
                  >
                    <Icon size={24} aria-hidden="true" className="text-black/60" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-[#111827]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563]">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner broker (dark section, warm #F5F0E8 card) */}
      <section className="bg-[#252527] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={labelDark}>Our Land Partner</p>
          <h2 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl">
            Work With a Licensed Land Broker
          </h2>
          <p className="mt-4 max-w-2xl text-[#D1D5DB]">
            We&apos;ve partnered with a licensed land brokerage that specializes in rural and
            residential lots. They help our buyers locate, evaluate, and secure parcels that
            are ready for placement.
          </p>

          <div
            className="mt-10 flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10"
            style={{
              background: '#F5F0E8',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '16px',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                style={{ background: 'rgba(28,28,30,0.1)' }}
              >
                <Handshake size={24} aria-hidden="true" className="text-black/60" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[#111827]">
                  Bright Box Land Partner Program
                </h3>
                <p className="mt-2 max-w-xl text-sm text-[#111827]">
                  Request an introduction and our team will connect you with a licensed broker
                  who can pull listings in your target area and walk the site requirements with you.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <BookConsultation size="lg">Request an Introduction</BookConsultation>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (navy) */}
      <section className="bg-[#1C1C1E] py-24 text-center lg:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl">
            Ready to Start Your Search?
          </h2>
          <p className="mt-4 text-lg text-[#D1D5DB]">
            Book a consultation and we&apos;ll help you find land and match it to the right home.
          </p>
          <div className="mt-8 flex justify-center">
            <BookConsultation size="lg">Book a Consultation</BookConsultation>
          </div>
          <p className="mt-6 text-sm text-[#9CA3AF]">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
        </div>
      </section>
    </>
  );
}
