import type { Metadata } from 'next';
import { Check, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';

export const metadata: Metadata = {
  title: '$5,000 Challenge | Bright Box Homes',
  description:
    "Find a better-equipped, higher-quality home from any US competitor and we'll put $5,000 toward yours.",
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

const steps = [
  {
    title: 'Find a Competitor',
    text: "Locate a competitor's home priced at $39,995 or above for the same size home from any US-based seller with publicly listed pricing.",
  },
  {
    title: 'Submit Your Claim',
    text: "Send us the competitor's listing URL and a side-by-side spec comparison showing equal or greater value.",
  },
  {
    title: 'We Verify',
    text: 'Our team reviews and verifies the claim within 48 hours.',
  },
  {
    title: 'Get Your Credit',
    text: 'If the competitor matches or beats us, $5,000 is applied as a credit to your Stage 1 deposit.',
  },
];

const details = [
  'Competitor must be a US-based company with verifiable public pricing',
  'Competing home must be priced at $39,995 or above for the same size home',
  'Competing home must match or exceed Bright Box Homes in square footage, standard inclusions, and build quality',
  'One claim per customer, per purchase',
  'Credit applied at Stage 1 payment - not redeemable for cash',
  'Bright Box Homes reserves the right to verify all claims',
];

export default function FiveKChallengePage() {
  return (
    <>
      {/* A - Hero */}
      <section className="bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>The Challenge</p>
          <AnimatedText
            text="We'll Pay You $5,000 to Prove Us Wrong"
            as="h1"
            className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Find a better-equipped, higher-quality home from any US competitor -
            and we&apos;ll put $5,000 toward yours.
          </p>
          <div className="mt-8">
            <Button href="/consultation" size="lg">
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* B - The Pitch */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                We built Bright Box Homes on one belief: nobody at this price
                point delivers more home for the money. Every unit ships standard
                with features our competitors sell as upgrades - mini-split HVAC,
                tankless water heater, induction stove, dual-pane windows, cabinet
                color options, interior floor colors, bathroom wall colors,
                upgraded insulation, ceiling-mounted air moving fans, and 60+
                exterior color options.
              </p>
              <p className="font-heading text-2xl font-semibold text-white">
                So we&apos;re putting our money where our mouth is.
              </p>
              <p>
                Find a US-based competitor offering the same size home of equal or
                greater square footage, with the same standard inclusions, at a
                comparable price - and we&apos;ll issue a $5,000 credit toward your
                Bright Box Home purchase. No games, no fine print tricks. Just
                confidence.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* C - How It Works */}
      <section className="bg-bb-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={label}>How It Works</p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Four Steps to $5,000
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

      {/* D - The Fine Print */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={label}>The Details</p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              The Fine Print
            </h2>
          </ScrollReveal>
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <Check
                  size={20}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-bb-blue"
                />
                <span className="text-gray-300">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* E - Closing CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <ScrollReveal>
            <p className="mx-auto max-w-2xl font-heading text-2xl font-semibold text-white md:text-3xl">
              We don&apos;t make this offer because we have to. We make it because
              we&apos;ve done the homework - and we know what you&apos;ll find.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/consultation" size="lg">
                Book a Consultation
              </Button>
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
