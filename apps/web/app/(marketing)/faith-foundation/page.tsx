import type { Metadata } from 'next';
import { BookConsultation } from '@/components/ui/BookConsultation';
import { Phone, Mail } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';

export const metadata: Metadata = {
  title: 'FAITH Foundation Partnership | Bright Box Homes',
  description:
    'For every home sold, Bright Box Homes donates $2,500 to the FAITH Foundation to help economically disadvantaged families with down payment assistance.',
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

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
      <section className="bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className={label}>Our Mission</p>
            <AnimatedText
              text="Building Homes. Building Hope."
              as="h1"
              className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            />
            <p className="mt-6 max-w-xl text-lg text-gray-300">
              For every home sold, Bright Box Homes donates $2,500 to the FAITH
              Foundation.
            </p>
            <div className="mt-8">
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <span className="block font-heading text-7xl font-bold text-bb-blue/20">
              $2,500
            </span>
            <span className="mt-2 block text-gray-500">donated per home sold</span>
          </div>
        </div>
      </section>

      {/* B - The Story */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <div className="space-y-6 text-lg text-gray-300">
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
      <section className="bg-bb-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={label}>How the Partnership Works</p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
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
                      className="absolute left-16 top-8 hidden h-px w-full border-t border-bb-blue/20 lg:block"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="block font-heading text-6xl font-bold text-bb-blue/15"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">{step.text}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* D - The Mission */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <p className={label}>The Mission</p>
            <p className="text-lg text-gray-300">
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
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <ScrollReveal>
            <p className="mx-auto max-w-2xl font-heading text-2xl font-semibold text-white md:text-3xl">
              Every Bright Box Home you buy builds two futures - yours and a
              family&apos;s who thought homeownership was out of reach.
            </p>
            <div className="mt-8 flex justify-center">
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <a
                href="tel:8002591745"
                className="inline-flex items-center gap-2 font-body text-white/80 transition-colors duration-fast ease-out hover:text-white"
              >
                <Phone size={20} aria-hidden="true" />
                800-259-1745
              </a>
              <a
                href="mailto:info@brightboxhomes.com"
                className="inline-flex items-center gap-2 font-body text-white/80 transition-colors duration-fast ease-out hover:text-white"
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
