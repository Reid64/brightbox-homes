import type { Metadata } from 'next';
import Image from 'next/image';
import { BookConsultation } from '@/components/ui/BookConsultation';
import { Phone, Mail } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';

export const metadata: Metadata = {
  title: 'FAITH Foundation Partnership | Bright Box Homes',
  description:
    'For every home sold, Bright Box Homes donates $2,500 to the FAITH Foundation to help economically disadvantaged families with down payment assistance.',
};

const labelDark =
  'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#6B9BF7]';
const labelWarm =
  'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#3461C7]';

const steps = [
  { title: 'You Purchase', text: 'You purchase a Bright Box Home.' },
  {
    title: 'We Donate',
    text: '$2,500 from your purchase is donated to the FAITH Foundation.',
  },
  {
    title: 'Families Qualify',
    text: 'The Foundation provides down payment assistance to qualified low-income individuals and families.',
  },
  {
    title: 'Homes Are Built',
    text: 'Those families get one step closer to homeownership.',
  },
];

export default function FaithFoundationPage() {
  return (
    <>
      {/* A - Hero */}
      <section
        className="py-24 lg:py-32"
        style={{ background: 'linear-gradient(180deg, #0F1729, #141B2D)' }}
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className={labelDark}>Our Mission</p>
            <AnimatedText
              text="Building Homes. Building Hope."
              as="h1"
              className="font-heading text-4xl font-bold text-[#FFFFFF] md:text-5xl lg:text-6xl"
            />
            <p className="mt-6 max-w-xl text-lg text-[#D1D5DB]">
              For every home sold, Bright Box Homes donates $2,500 to the FAITH
              Foundation.
            </p>
            <div className="mt-8">
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end">
            <Image
              src="/images/badges/faith-foundation-partnership.png"
              alt="FAITH Foundation Partner"
              width={320}
              height={320}
              className="h-40 w-auto"
            />
            <span className="mt-6 block font-heading text-7xl font-bold text-[#6B9BF7]">
              $2,500
            </span>
            <span className="mt-2 block text-[#94A3B8]">donated per home sold</span>
          </div>
        </div>
      </section>

      {/* B - The Story */}
      <section className="bg-[#F5F0E8] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <div className="space-y-6 text-lg text-[#4B5563]">
              <p>
                Homeownership changes lives. But for millions of economically
                disadvantaged families, the path to owning a home feels impossible
                - not because they can&apos;t make the payments, but because the
                down payment is an insurmountable barrier.
              </p>
              <p>
                The FAITH Foundation is a 501(c)(3) nonprofit organization
                dedicated to breaking that barrier. Through financial literacy
                education, credit-building support, and direct down payment
                assistance, FAITH helps qualified families take the first step
                toward owning a home of their own.
              </p>
              <p>
                Bright Box Homes is a proud strategic partner of the FAITH
                Foundation. For every home we sell, we contribute $2,500 directly
                to the Foundation&apos;s down payment assistance fund. It&apos;s
                not a marketing gimmick - it&apos;s a commitment built into every
                transaction.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* C - How It Works */}
      <section className="bg-[#1C2438] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={labelDark}>How the Partnership Works</p>
            <h2 className="font-heading text-3xl font-bold text-[#FFFFFF] md:text-4xl">
              A Commitment Built Into Every Sale
            </h2>
          </ScrollReveal>

          <ol className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100} className="relative">
                <li className="relative">
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-16 top-8 hidden h-px w-full border-t border-[#6B9BF7]/20 lg:block"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="block font-heading text-6xl font-bold text-[#6B9BF7]/15"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-[#FFFFFF]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#D1D5DB]">{step.text}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* D - The Mission */}
      <section className="bg-[#D4C4A8] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <p className={labelWarm}>The Mission</p>
            <p className="text-lg text-[#374151]">
              The FAITH Foundation serves people who are ready to own - they have
              the income, the stability, and the commitment - but lack the savings
              for a traditional down payment. The Foundation&apos;s programs
              include financial literacy workshops, individualized credit-building
              plans, and direct grants applied toward down payments on qualifying
              homes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* E - Closing */}
      <section className="bg-[#0F1729] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <ScrollReveal>
            <p className="mx-auto max-w-2xl font-heading text-2xl font-semibold text-[#FFFFFF] md:text-3xl">
              Every Bright Box Home you buy builds two futures - yours and a
              family&apos;s who thought homeownership was out of reach.
            </p>
            <div className="mt-8 flex justify-center">
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <a
                href="tel:8002591745"
                className="inline-flex items-center gap-2 font-body text-[#D1D5DB] transition-colors duration-fast ease-out hover:text-[#FFFFFF]"
              >
                <Phone size={20} aria-hidden="true" />
                800-259-1745
              </a>
              <a
                href="mailto:info@brightboxhomes.com"
                className="inline-flex items-center gap-2 font-body text-[#D1D5DB] transition-colors duration-fast ease-out hover:text-[#FFFFFF]"
              >
                <Mail size={20} aria-hidden="true" />
                info@brightboxhomes.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
