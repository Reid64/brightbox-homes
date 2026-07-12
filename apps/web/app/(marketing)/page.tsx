import Image from 'next/image';
import { BookConsultation } from '@/components/ui/BookConsultation';
import HeroVideo from '@/components/ui/HeroVideo';
import SmokeEffect from '@/components/SmokeEffect';
import Link from 'next/link';
import { Shield, Home, Truck, Award, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import TiltCard from '@/components/ui/TiltCard';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Marquee from '@/components/ui/Marquee';

// Dark premium homepage. Static content (no database yet). Apple Cabin and
// Space Capsule pricing is "Coming Soon" pending operator input (open blocker).
// Redesign: alternating warm (cream/beige) and dark (navy) sections; all colors
// written as literal hex / rgba (no design tokens) per redesign spec.

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
    price: '$59,995',
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
    image: '/images/products/apartments-office-buildings/exterior/apartments-homepage-card.png',
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
    price: 'From $2,000',
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
    text: 'Your home arrives ready to place on your prepared site. Our delivery team handles placement and setup. You handle utility connections and any local permitting with your own contractors.',
  },
];

const deliveredPhotos = [
  {
    src: '/images/delivered/delivered-7.jpg',
    alt: 'Delivered red expandable home unit sited beside a green house on a rural property.',
  },
  {
    src: '/images/delivered/delivered-2.jpg',
    alt: 'Delivered brown expandable home on a coastal lot.',
  },
  {
    src: '/images/delivered/delivered-8.jpg',
    alt: 'White expandable home being set in place by a crane during delivery.',
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

// Eyebrow labels: blue on light/warm sections, lighter blue on dark sections.
const eyebrowLight = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#3461C7]';
const eyebrowDark = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#6B9BF7]';

const trustBadges = [
  { src: '/images/badges/faith-foundation-partnership.png', alt: 'FAITH Foundation Partner' },
  { src: '/images/badges/faith-2500-donation.png', alt: '$2,500 donated per home sold' },
  { src: '/images/badges/exclusive-us-distributor.png', alt: 'Exclusive US Distributor' },
  { src: '/images/badges/american-owned-globally-sourced.png', alt: 'American Owned, Globally Sourced' },
];

// 1px gradient divider (transparent -> soft blue -> transparent).
const dividerStyle = {
  background: 'linear-gradient(to right, transparent, rgba(107,155,247,0.2), transparent)',
};

export default function HomePage() {
  return (
    <>
      {/* SECTION B: Scroll progress (fixed, above header) */}
      <ScrollProgress />

      {/* SECTION A: Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-[#0F1729]">
        <Image
          src="/images/home-hero.png"
          alt="Two-story expandable container home with balconies, landscaped gardens, and a family enjoying the backyard."
          fill
          priority
          sizes="100vw"
          className="animate-fade-in object-cover"
        />
        {/* Dark legibility overlay for depth + readable text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,23,41,0.85) 0%, rgba(20,27,45,0.7) 50%, rgba(15,23,41,0.95) 100%)',
          }}
        />

        {/* Subtle smoke + fire over the grill (small constrained canvas, not inset-0) */}
        <SmokeEffect />

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-start gap-12 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          {/* Left */}
          <div className="lg:-ml-24 lg:w-3/5">
            <span
              className="inline-block animate-fade-up rounded-full border border-[#6B9BF7]/30 bg-[#6B9BF7]/15 px-4 py-2 text-sm text-[#93B8FA] backdrop-blur"
              style={{ animationDelay: '500ms' }}
            >
              American Owned. Globally Sourced. US Delivered.
            </span>

            <AnimatedText
              text="Your Home, Built Your Way"
              as="h1"
              delay={200}
              className="mt-6 font-heading text-5xl font-extrabold tracking-tight text-[#FFFFFF] md:text-6xl lg:text-7xl"
            />

            <p
              className="mt-6 max-w-xl animate-fade-up text-xl text-[#D1D5DB]"
              style={{ animationDelay: '600ms' }}
            >
              Premium expandable homes from $35,995 - delivered anywhere in the US.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 animate-fade-up sm:flex-row sm:items-center" style={{ animationDelay: '700ms' }}>
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
              <Link
                href="/products/expandable-homes"
                className="inline-flex min-h-12 items-center justify-center px-8 py-4 text-lg font-medium text-[#FFFFFF] transition-colors duration-200 ease-out hover:bg-white/10"
                style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  borderRadius: '10px',
                }}
              >
                Explore Our Homes
              </Link>
            </div>

            <a
              href="tel:8002591745"
              className="mt-4 inline-block animate-fade-up text-sm font-bold text-[#FFFFFF] transition-colors duration-200 ease-out hover:text-[#93B8FA]"
              style={{ animationDelay: '800ms' }}
            >
              or call 800-259-1745
            </a>
          </div>

          {/* Right: floating ambient video PiP (desktop only) */}
          <div
            className="relative hidden animate-slide-in-right lg:block lg:w-2/5 lg:top-32 lg:-left-32"
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

      {/* SECTION D: Product Lines (warm cream) */}
      <section className="py-24 lg:py-32" style={{ background: '#0D1526' }}>
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={eyebrowLight}>OUR HOMES</p>
            <AnimatedText
              text="Explore the Collection"
              as="h2"
              className="font-heading text-4xl font-extrabold text-[#111827] md:text-5xl"
            />
            <p className="mt-4 text-lg text-[#4B5563]">
              Five product lines, one standard - uncompromising quality.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productLines.map((product, i) => (
              <ScrollReveal key={product.href} delay={i * 100} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href={product.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                    style={{ background: '#1A2540', border: '1px solid rgba(107,155,247,0.18)', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-[#EFE8DC]">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-[#4A7CE5]">
                          <Home size={32} aria-hidden="true" />
                          <span className="mt-2 font-heading text-sm font-semibold text-[#111827]">
                            {product.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-heading text-xl font-bold text-[#FFFFFF]">
                        {product.name}
                      </h3>
                      {product.price.includes('$') ? (
                        <p className="mt-1 font-mono text-lg font-semibold text-[#6B9BF7]">
                          {product.price}
                        </p>
                      ) : (
                        <p className="mt-1 font-mono text-lg text-[#9CA3AF]">
                          {product.price}
                        </p>
                      )}
                      <p className="mt-3 line-clamp-2 flex-1 text-sm text-[#9CA3AF]">
                        {product.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#4A7CE5] group-hover:underline">
                        View Details
                        <ArrowRight size={16} aria-hidden="true" />
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 text-xs text-[#9CA3AF]">
                        Get a Quote
                        <ArrowRight size={12} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <p className="mt-10 text-center text-[#4B5563]">
            Flexible financing available on every model.{' '}
            <Link
              href="/financing"
              className="font-semibold text-[#4A7CE5] underline-offset-4 hover:underline"
            >
              Apply for Financing
            </Link>
          </p>

          {/* Gradient divider */}
          <div className="mt-20 h-px w-full" style={dividerStyle} />
        </div>
      </section>

      {/* SECTION D2: Trust badges (elevated dark strip) */}
      <section
        className="bg-[#232B45] py-10"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 items-center justify-items-center gap-8 px-6 sm:flex sm:justify-center sm:gap-12">
          {trustBadges.map((b) => (
            <Image
              key={b.src}
              src={b.src}
              alt={b.alt}
              width={320}
              height={320}
              className="h-24 w-auto sm:h-32"
            />
          ))}
        </div>
      </section>

      {/* SECTION E: Stats Bar (dark, beige stat cards) */}
      <section className="bg-[#141B2D] py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="rounded-2xl border border-white/5 bg-[#1C2438] p-6">
            <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-[#D4C4A8] p-6">
                <AnimatedCounter
                  target={5}
                  suffix=" Product Lines"
                  className="font-heading text-3xl font-extrabold text-[#111827] md:text-4xl"
                />
              </div>
              <div className="rounded-xl bg-[#D4C4A8] p-6">
                <AnimatedCounter
                  target={60}
                  suffix="+ Exterior Colors"
                  className="font-heading text-3xl font-extrabold text-[#111827] md:text-4xl"
                />
              </div>
              <div className="rounded-xl bg-[#D4C4A8] p-6">
                <AnimatedCounter
                  target={35995}
                  prefix="$"
                  className="font-heading text-3xl font-extrabold text-[#111827] md:text-4xl"
                />
                <p className="mt-1 text-sm text-[#374151]">Starting From</p>
              </div>
              <div className="rounded-xl bg-[#D4C4A8] p-6">
                <AnimatedCounter
                  target={2500}
                  prefix="$"
                  suffix=" Donated Per Home"
                  className="font-heading text-3xl font-extrabold text-[#111827] md:text-4xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: Built Different (dark surface, beige feature cards) */}
      <section className="bg-[#1C2438] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={eyebrowDark}>WHY BRIGHT BOX</p>
            <h2 className="font-heading text-4xl font-extrabold md:text-5xl">
              <span className="text-[#FFFFFF]">Built </span>
              <span className="text-[#6B9BF7]">Different</span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {valueProps.map((prop, i) => {
              const Icon = prop.icon;
              return (
                <ScrollReveal key={prop.title} delay={i * 100}>
                  <div className="rounded-2xl bg-[#D4C4A8] p-10">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: 'rgba(15,23,41,0.08)' }}
                    >
                      <Icon size={24} aria-hidden="true" className="text-[#0F1729]" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold text-[#0F1729]">
                      {prop.title}
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: 'rgba(15,23,41,0.75)' }}>
                      {prop.text}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION G: Payment Process (warm cream, white step cards) */}
      <section className="bg-[#F5F0E8] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={eyebrowLight}>HOW IT WORKS</p>
            <AnimatedText
              text="Four Simple Steps to Your New Home"
              as="h2"
              className="font-heading text-4xl font-extrabold text-[#111827] md:text-5xl"
            />
          </ScrollReveal>

          <div className="mt-16">
            <ol className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              {journeySteps.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 100} className="relative">
                  <li className="relative h-full rounded-2xl border border-black/[0.04] bg-[#FFFFFF] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                    {/* Arrow pointing to the next step (desktop) */}
                    {i < journeySteps.length - 1 && (
                      <ChevronRight
                        aria-hidden="true"
                        size={28}
                        className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-[#4A7CE5] lg:block"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="block font-heading text-6xl font-extrabold text-[#3461C7]"
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-2 font-heading text-lg font-bold text-[#111827]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4B5563]">{step.text}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION H: Delivered Homes (navy) */}
      <section className="bg-[#0F1729] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <p className={eyebrowDark}>PROOF</p>
            <AnimatedText
              text="Real Homes. Real Deliveries."
              as="h2"
              className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl"
            />
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {deliveredPhotos.map((photo, i) => (
              <ScrollReveal key={photo.src} delay={i * 100}>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-[#1C2438]">
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
            <p className="mx-auto mt-12 max-w-2xl text-center text-[#D1D5DB]">
              Every home is factory-inspected, photo-documented, and backed by a
              7-day no-defect inspection window.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION I: FAITH Foundation (warm beige) */}
      <section className="bg-[#D4C4A8] py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <ScrollReveal>
            <p className={eyebrowLight}>GIVING BACK</p>
            <h2 className="font-heading text-4xl font-extrabold text-[#111827] md:text-5xl">
              Building Homes. Building Hope.
            </h2>
            <p className="mt-6 text-[#374151]">
              For every home sold, Bright Box Homes donates $2,500 to the FAITH
              Foundation - a 501(c)(3) nonprofit creating pathways to homeownership
              for low-income families.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <BookConsultation size="lg">Book a Consultation</BookConsultation>
              <Link
                href="/faith-foundation"
                className="inline-flex min-h-12 items-center justify-center px-8 py-4 text-lg font-medium text-[#3461C7] transition-colors duration-200 ease-out hover:bg-[#3461C7]/10"
                style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(52,97,199,0.4)',
                  borderRadius: '10px',
                }}
              >
                Learn About Our Mission
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} className="text-center lg:text-right">
            <span className="block font-heading text-7xl font-extrabold text-[#3461C7]">
              $2,500
            </span>
            <span className="mt-2 block text-[#374151]">donated per home sold</span>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION J: Final CTA (navy, glass card) */}
      <section className="bg-[#0F1729] py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <div
              className="mx-auto max-w-3xl rounded-2xl px-6 py-14 text-center sm:px-12"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 0 30px rgba(107,155,247,0.15)',
              }}
            >
              <AnimatedText
                text="Ready to Build?"
                as="h2"
                className="justify-center font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl"
              />
              <p className="mt-4 text-lg text-[#D1D5DB]">
                Speak with our team about the right home for your needs.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <BookConsultation size="lg">Book a Consultation</BookConsultation>
                <Link
                  href="/reserve"
                  className="inline-flex min-h-12 items-center justify-center px-8 py-4 text-lg font-medium text-[#FFFFFF] transition-colors duration-200 ease-out hover:bg-white/10"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    borderRadius: '10px',
                  }}
                >
                  Reserve Your Home - $500
                </Link>
              </div>
              <p className="mt-6 text-sm text-[#6B7280]">
                800-259-1745 &middot; info@brightboxhomes.com
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
