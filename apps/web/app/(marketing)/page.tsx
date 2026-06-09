import Image from 'next/image';
import { BookConsultation } from '@/components/ui/BookConsultation';
import HeroVideo from '@/components/ui/HeroVideo';
import Link from 'next/link';
import { Shield, Home, Truck, Award, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import TiltCard from '@/components/ui/TiltCard';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Marquee from '@/components/ui/Marquee';

// Dark premium homepage. Static content (no database yet). Apple Cabin and
// Space Capsule pricing is "Coming Soon" pending operator input (open blocker).
// Hero 3-beat entrance runs via CSS animations (animate-fade-*/slide-in-right
// with per-element animation-delay); reduced motion zeroes delays in globals.css.

const productLines = [
  {
    name: 'Expandable Container Homes',
    price: '$35,995',
    description:
      '200-800 sq ft steel-frame homes with 60+ exterior colors, customizable interiors, cabinets, flooring, and finishes.',
    href: '/products/expandable-homes',
    image: '/images/products/expandable-homes/exterior/homepage-20x20.jpg',
    alt: 'Gray expandable home with a white covered porch and deck.',
  },
  {
    name: 'Duplex Homes',
    price: 'Contact for Pricing',
    description:
      'Two expandable units stacked into one two-story footprint. Live in one, rent the other - an income property from day one.',
    href: '/products/duplex',
    image: '/images/products/expandable-homes/duplex/01.png',
    alt: 'Two-story duplex expandable home with balconies and a landscaped yard.',
  },
  {
    name: 'Apple Cabin Homes',
    price: 'Coming Soon',
    description:
      'Aluminum-panel cabins with fluorocarbon coating and rounded organic aesthetic. Ideal for Airbnb and glamping.',
    href: '/products/apple-cabins',
    image: '/images/products/apple-cabins/exterior/01.png',
    alt: 'Apple Cabin with rounded aluminum panels in a forest clearing.',
  },
  {
    name: 'Space Capsule Homes',
    price: 'Coming Soon',
    description:
      'Futuristic pod design for backyard offices, meditation studios, and guest quarters.',
    href: '/products/space-capsules',
    image: '/images/products/space-capsules/exterior/01.png',
    alt: 'Futuristic Space Capsule home with orange accents overlooking a lake at sunset.',
  },
  {
    name: 'Assembly Homes',
    price: '$25,995 - $29,995',
    description:
      'Modular units that connect to create custom multi-room layouts for any use case.',
    href: '/products/assembly-homes',
    image: '/images/products/assembly-homes/exterior/10.jpg',
    alt: 'Two-story white modular assembly home with a balcony and staircase.',
  },
  {
    name: 'Apartments & Office Buildings',
    price: 'Contact for Pricing',
    description:
      'Scalable modular construction for multi-unit apartment complexes, office buildings, and workforce housing.',
    href: '/products/apartments-office-buildings',
    image: '/images/products/apartments-office-buildings/exterior/apt-01.jpg',
    alt: 'Two-story glass-front modular building configuration.',
  },
  {
    name: 'Vending Units',
    price: 'Contact for Pricing',
    description:
      'Container-based food stands, retail kiosks, and mobile storefronts. Fully customizable with branding and serving windows.',
    href: '/products/vending-units',
    image: '/images/products/vending-units/exterior/01.jpg',
    alt: 'Deployed container food stand with custom illuminated signage at night.',
  },
  {
    name: 'Emergency Housing',
    price: '$2,000',
    description:
      'Rapidly deployable emergency and disaster housing. Fire-grade A materials, set up in hours.',
    href: '/products/emergency-housing',
    image: '/images/products/emergency-housing/exterior/folding-house.png',
    alt: 'Folding emergency house shown folded and unfolded.',
  },
];

const valueProps = [
  {
    icon: Shield,
    title: 'Buyer-Friendly Payments',
    text: 'Our 25/25/25/25 plan spreads your cost across four milestones. You never pay more than 25% at once.',
  },
  {
    icon: Home,
    title: 'Everything Included',
    text: 'Mini-split HVAC, tankless water heater, induction stove, dual-pane windows, and covered front porch - all standard.',
  },
  {
    icon: Truck,
    title: 'Delivered to Your Door',
    text: 'We handle international shipping, customs, and last-mile delivery to your property anywhere in the continental US.',
  },
  {
    icon: Award,
    title: '$5,000 Challenge',
    text: "Find a comparable home from any US competitor at a better price - we'll hand you $5,000 back.",
  },
];

const journeySteps = [
  {
    title: 'Choose Your Home',
    text: 'Select the floor plan, size, and model that best fits your needs.',
  },
  {
    title: 'Personalize Your Home',
    text: 'Choose colors, finishes, upgrades, appliances, solar packages, and other options.',
  },
  {
    title: 'Prepare Your Site',
    text: "Whether you already own land or need assistance finding it, we'll help determine site requirements, utilities, access, permits, and foundation needs.",
  },
  {
    title: 'Delivery & Installation',
    text: 'We coordinate delivery, setup, utility connections, and final walkthrough so you can move in faster.',
  },
];

const deliveredPhotos = [
  {
    src: '/images/delivered/delivered-1.jpg',
    alt: 'Delivered white expandable home set on a rural property.',
  },
  {
    src: '/images/delivered/delivered-2.jpg',
    alt: 'Delivered brown expandable home on a coastal lot.',
  },
  {
    src: '/images/delivered/delivered-3.jpg',
    alt: 'Delivered gray expandable home with a covered porch among palm trees.',
  },
  {
    src: '/images/delivered/delivered-4.jpg',
    alt: 'Delivered expandable home with a covered porch on a prepared pad.',
  },
  {
    src: '/images/delivered/delivered-5.jpg',
    alt: 'Delivered expandable home with glass entry doors on a rural lot.',
  },
  {
    src: '/images/delivered/delivered-6.jpg',
    alt: 'Delivered expandable home set on a concrete foundation.',
  },
];

const marqueeItems = [
  'AMERICAN OWNED',
  'GLOBALLY SOURCED',
  'US DELIVERED',
  '25/25/25/25 PAYMENTS',
  '$5,000 CHALLENGE',
  'FREE TEXAS SHIPPING',
  'FAITH FOUNDATION PARTNER',
];

const sectionLabel = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

export default function HomePage() {
  return (
    <>
      {/* SECTION B: Scroll progress (fixed, above header) */}
      <ScrollProgress />

      {/* SECTION A: Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <Image
          src="/images/home-hero.png"
          alt="Two-story expandable container home with balconies, landscaped gardens, and a family enjoying the backyard."
          fill
          priority
          sizes="100vw"
          className="animate-fade-in object-cover"
        />
        {/* Dark legibility scrim (single-hue charcoal fade, lighter so the image shows through) */}
        <div className="absolute inset-0 bg-gradient-to-t from-bb-charcoal via-bb-charcoal/40 to-bb-charcoal/20" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-start gap-12 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          {/* Left */}
          <div className="lg:w-3/5">
            <span
              className="inline-block animate-fade-up rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur"
              style={{ animationDelay: '500ms' }}
            >
              American Owned. Globally Sourced. US Delivered.
            </span>

            <AnimatedText
              text="Your Home, Built Your Way"
              as="h1"
              delay={200}
              className="mt-6 font-heading text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl"
            />

            <p
              className="mt-6 max-w-xl animate-fade-up text-xl text-gray-300"
              style={{ animationDelay: '600ms' }}
            >
              Premium expandable homes from $35,995 - delivered anywhere in the US.
            </p>

            <div className="mt-8 animate-fade-up" style={{ animationDelay: '700ms' }}>
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
            </div>

            <a
              href="tel:8002591745"
              className="mt-4 inline-block animate-fade-up text-sm text-gray-500 transition-colors duration-fast ease-out hover:text-gray-300"
              style={{ animationDelay: '800ms' }}
            >
              or call 800-259-1745
            </a>
          </div>

          {/* Right: floating ambient video PiP (desktop only) */}
          <div
            className="hidden animate-slide-in-right lg:block lg:w-2/5"
            style={{ animationDelay: '600ms' }}
          >
            <HeroVideo />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30">
          <ChevronDown size={28} aria-hidden="true" className="animate-bounce" />
        </div>
      </section>

      {/* SECTION C: Marquee */}
      <Marquee items={marqueeItems} />

      {/* SECTION D: Product Lines */}
      <section className="bg-bb-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={sectionLabel}>OUR HOMES</p>
            <AnimatedText
              text="Explore the Collection"
              as="h2"
              className="font-heading text-4xl font-bold text-white md:text-5xl"
            />
            <p className="mt-4 text-lg text-gray-300">
              Five product lines, one standard - uncompromising quality.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productLines.map((product, i) => (
              <ScrollReveal key={product.href} delay={i * 100} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href={product.href}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-bb-surface-dark transition-colors duration-normal ease-out hover:border-white/10"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-bb-charcoal">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-bb-blue/60">
                          <Home size={32} aria-hidden="true" />
                          <span className="mt-2 font-heading text-sm font-semibold text-gray-300">
                            {product.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-heading text-xl font-semibold text-white">
                        {product.name}
                      </h3>
                      {product.price.startsWith('$') ? (
                        <p className="mt-1 font-mono text-lg text-bb-blue">
                          {product.price}
                        </p>
                      ) : (
                        <p className="mt-1 font-mono text-lg text-gray-500">
                          {product.price}
                        </p>
                      )}
                      <p className="mt-3 line-clamp-2 flex-1 text-sm text-gray-300">
                        {product.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm text-bb-blue group-hover:underline">
                        View Details
                        <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: Stats Bar */}
      <section className="border-y border-white/5 bg-bb-surface-dark py-16">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <AnimatedCounter
              target={5}
              suffix=" Product Lines"
              className="font-heading text-3xl font-bold text-white md:text-4xl"
            />
          </div>
          <div>
            <AnimatedCounter
              target={60}
              suffix="+ Exterior Colors"
              className="font-heading text-3xl font-bold text-white md:text-4xl"
            />
          </div>
          <div>
            <AnimatedCounter
              target={35995}
              prefix="$"
              className="font-heading text-3xl font-bold text-white md:text-4xl"
            />
            <p className="mt-1 text-sm text-gray-300">Starting From</p>
          </div>
          <div>
            <AnimatedCounter
              target={2500}
              prefix="$"
              suffix=" Donated Per Home"
              className="font-heading text-3xl font-bold text-white md:text-4xl"
            />
          </div>
        </div>
      </section>

      {/* SECTION F: Why Bright Box */}
      <section className="bg-bb-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={sectionLabel}>WHY BRIGHT BOX</p>
            <AnimatedText
              text="Built Different"
              as="h2"
              className="font-heading text-4xl font-bold text-white md:text-5xl"
            />
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {valueProps.map((prop, i) => {
              const Icon = prop.icon;
              return (
                <ScrollReveal key={prop.title} delay={i * 100}>
                  <div className="rounded-xl border border-white/5 bg-bb-surface-dark p-8">
                    <Icon size={32} aria-hidden="true" className="text-bb-blue" />
                    <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                      {prop.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-300">{prop.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION G: Payment Process */}
      <section className="border-y border-white/5 bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={sectionLabel}>HOW IT WORKS</p>
            <AnimatedText
              text="Four Simple Steps to Your New Home"
              as="h2"
              className="font-heading text-4xl font-bold text-white md:text-5xl"
            />
          </ScrollReveal>

          <ol className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-6">
            {journeySteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100} className="relative">
                <li className="relative">
                  {/* Arrow pointing to the next step (desktop) */}
                  {i < journeySteps.length - 1 && (
                    <ChevronRight
                      aria-hidden="true"
                      size={28}
                      className="absolute -right-2 top-4 hidden text-white/50 lg:block"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="block font-heading text-6xl font-bold text-red-500"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">{step.text}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION H: Delivered Homes */}
      <section className="bg-bb-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={sectionLabel}>PROOF</p>
            <AnimatedText
              text="Real Homes. Real Deliveries."
              as="h2"
              className="font-heading text-4xl font-bold text-white md:text-5xl"
            />
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {deliveredPhotos.map((photo, i) => (
              <ScrollReveal key={photo.src} delay={i * 100}>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-bb-surface-dark">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="mx-auto mt-12 max-w-2xl text-center text-gray-300">
              Every home is factory-inspected, photo-documented, and backed by a
              7-day no-defect inspection window.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION I: FAITH Foundation */}
      <section className="border-t border-white/5 bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <ScrollReveal>
            <p className={sectionLabel}>GIVING BACK</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Building Homes. Building Hope.
            </h2>
            <p className="mt-6 text-gray-300">
              For every home sold, Bright Box Homes donates $2,500 to the FAITH
              Foundation - a 501(c)(3) nonprofit creating pathways to homeownership
              for low-income families.
            </p>
            <div className="mt-8">
              <Button href="/faith-foundation" variant="secondary">
                Learn About Our Mission
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} className="text-center lg:text-right">
            <span className="block font-heading text-7xl font-bold text-bb-blue/20">
              $2,500
            </span>
            <span className="mt-2 block text-gray-500">donated per home sold</span>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION J: Final CTA */}
      <section className="bg-bb-navy py-24 text-center lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <AnimatedText
              text="Ready to Build?"
              as="h2"
              className="justify-center font-heading text-4xl font-bold text-white md:text-5xl"
            />
            <p className="mt-4 text-lg text-gray-300">
              Speak with our team about the right home for your needs.
            </p>
            <div className="mt-8 flex justify-center">
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              800-259-1745 &middot; info@brightboxhomes.com
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
