'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Home, Truck, Award, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Static homepage content. Product/pricing data is hardcoded here for Phase 1A
// (no database yet). Apple Cabin and Space Capsule pricing is "Coming Soon"
// pending operator input (open blocker).

const productLines = [
  {
    name: 'Expandable Container Homes',
    price: '$35,995',
    description:
      '200-800 sq ft steel-frame homes with expandable side sections. 60+ exterior colors.',
    href: '/products/expandable-homes',
    image: '/images/products/expandable-home-card.png',
    alt: 'Single-story expandable container home with a covered front porch and landscaped yard.',
  },
  {
    name: 'Apple Cabin Homes',
    price: 'Coming Soon',
    description:
      'Rounded aluminum-panel cabins with fluorocarbon coating. Perfect for Airbnb and glamping.',
    href: '/products/apple-cabins',
    image: '/images/products/apple-cabin-card.png',
    alt: 'Modern rounded aluminum-panel Apple Cabin with floor-to-ceiling glass.',
  },
  {
    name: 'Space Capsule Homes',
    price: 'Coming Soon',
    description:
      'Futuristic pod design for backyard offices, studios, and guest quarters.',
    href: '/products/space-capsules',
    image: '/images/products/space-capsule-card.png',
    alt: 'Futuristic Space Capsule home with orange accents overlooking a lake at sunset.',
  },
  {
    name: 'Assembly Homes',
    price: '$19,995',
    description: 'Modular units that join to create custom multi-room layouts.',
    href: '/products/assembly-homes',
    image: '/images/products/assembly-home-card.png',
    alt: 'Two-story modular Assembly Home with glass front sections and a balcony.',
  },
  {
    name: 'Foldout Homes',
    price: '$2,000',
    description:
      'Emergency and disaster housing. Deployable in hours. Fire-grade A materials.',
    href: '/products/foldout-homes',
    image: null, // No compliant product photo yet (see report) - branded placeholder used.
    alt: 'Foldout Home',
  },
];

const valueProps = [
  {
    icon: Shield,
    title: 'Buyer-Friendly Payments',
    text: 'Our 25/25/25/25 payment plan spreads your investment across four milestones - you never pay more than 25% at a time.',
  },
  {
    icon: Home,
    title: 'Everything Included',
    text: 'Every home comes standard with mini-split HVAC, tankless water heater, induction stove, dual-pane windows, and a covered front porch.',
  },
  {
    icon: Truck,
    title: 'Delivered to Your Door',
    text: 'From factory to your property - we handle international shipping, customs, and last-mile delivery anywhere in the US.',
  },
  {
    icon: Award,
    title: '$5,000 Challenge',
    text: "Find a comparable home at a better price from any US competitor, and we'll give you $5,000 back.",
    href: '/5k-challenge',
  },
];

const paymentSteps = [
  {
    title: 'Order Placement',
    text: 'Sign your purchase agreement and lock your configuration. Pay 25%.',
  },
  {
    title: 'Production Start',
    text: 'Factory confirms your build is scheduled and materials are ordered. Pay 25%.',
  },
  {
    title: 'Pre-Ship Approval',
    text: 'Review factory photos of your completed home and authorize shipping. Pay 25%.',
  },
  {
    title: 'Delivery',
    text: 'Receive your Bill of Lading and prepare for delivery. Pay final 25%.',
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
];

export default function HomePage() {
  // 3-beat hero entrance per DESIGN_LANGUAGE 6.4. Reduced motion reveals
  // everything instantly (delays zeroed; durations zeroed via globals.css).
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setMounted(true);
  }, []);

  const reveal = mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
  const beat = (ms: number) => ({ transitionDelay: reduced ? '0ms' : `${ms}ms` });

  return (
    <>
      {/* SECTION A - Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <Image
          src="/images/products/expandable-home-hero.png"
          alt="Two-story expandable container home with balconies, landscaped gardens, and a family enjoying the backyard."
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-slow ease-out ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center px-6 py-24 text-center">
          <span
            style={beat(500)}
            className={`inline-flex rounded-full bg-bb-blue px-4 py-2 font-body text-sm font-medium text-white transition-all duration-slow ease-out ${reveal}`}
          >
            American Owned. Globally Sourced. US Delivered.
          </span>

          <h1
            style={beat(300)}
            className={`mt-6 font-heading text-4xl font-extrabold tracking-tight text-white transition-all duration-slow ease-out sm:text-5xl md:text-hero ${reveal}`}
          >
            Your Home, Built Your Way
          </h1>

          <p
            style={beat(600)}
            className={`mt-4 max-w-2xl font-body text-h4 text-white/90 transition-all duration-slow ease-out ${reveal}`}
          >
            Premium expandable homes starting at $35,995 - delivered to your door
            with a buyer-friendly 25/25/25/25 payment plan.
          </p>

          <div
            style={beat(700)}
            className={`mt-8 transition-all duration-slow ease-out ${reveal}`}
          >
            <Button href="/consultation" size="lg">
              Book a Consultation
            </Button>
          </div>

          <a
            href="tel:8002591745"
            style={beat(800)}
            className={`mt-4 font-body text-sm text-white/70 transition-all duration-slow ease-out hover:text-white ${reveal}`}
          >
            or call 800-259-1745
          </a>
        </div>
      </section>

      {/* SECTION B - Product Lines */}
      <section className="mx-auto max-w-[1280px] px-6 py-24">
        <ScrollReveal>
          <h2 className="text-center font-heading text-h2 font-bold text-bb-navy">
            Explore Our Product Lines
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {productLines.map((product, i) => (
            <ScrollReveal key={product.href} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-md bg-bb-white shadow-sm transition-shadow duration-normal ease-out hover:shadow-md">
                <div className="relative aspect-video w-full overflow-hidden bg-bb-blue-light">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-bb-navy">
                      <Home size={32} aria-hidden="true" />
                      <span className="mt-2 font-heading text-sm font-bold">
                        {product.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-h3 font-bold text-bb-navy">
                    {product.name}
                  </h3>
                  <p className="mt-1 font-body font-medium text-bb-blue">
                    {product.price === 'Coming Soon'
                      ? 'Pricing: Coming Soon'
                      : `Starting at ${product.price}`}
                  </p>
                  <p className="mt-3 flex-1 font-body text-bb-gray-600">
                    {product.description}
                  </p>
                  <div className="mt-6">
                    <Button href={product.href} variant="secondary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SECTION C - Why Bright Box */}
      <section className="bg-bb-warm-white">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <ScrollReveal>
            <h2 className="text-center font-heading text-h2 font-bold text-bb-navy">
              Why Bright Box Homes
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {valueProps.map((prop, i) => {
              const Icon = prop.icon;
              return (
                <ScrollReveal key={prop.title} delay={i * 80}>
                  <div className="flex gap-4 rounded-md bg-bb-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-bb-blue-light text-bb-blue">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-h4 font-bold text-bb-navy">
                        {prop.title}
                      </h3>
                      <p className="mt-2 font-body text-bb-gray-600">{prop.text}</p>
                      {prop.href && (
                        <Link
                          href={prop.href}
                          className="mt-2 inline-flex font-body font-medium text-bb-blue transition-colors duration-fast ease-out hover:underline"
                        >
                          Learn more
                        </Link>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION D - How It Works */}
      <section className="bg-bb-warm-white">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <ScrollReveal>
            <h2 className="text-center font-heading text-h2 font-bold text-bb-navy">
              Simple 4-Step Payment Process
            </h2>
          </ScrollReveal>

          <ol className="mt-12 flex flex-col gap-10 md:flex-row md:gap-0">
            {paymentSteps.map((step, i) => (
              <ScrollReveal
                key={step.title}
                delay={i * 80}
                className="relative flex-1"
              >
                <li className="flex flex-col items-center px-4 text-center">
                  {/* Connecting line (horizontal desktop only, between steps) */}
                  {i < paymentSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-6 hidden h-px w-full bg-bb-gray-200 md:block"
                    />
                  )}
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-bb-blue font-heading text-h4 font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-heading text-h4 font-bold text-bb-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-bb-gray-600">
                    {step.text}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION E - Delivered Homes */}
      <section className="mx-auto max-w-[1280px] px-6 py-24">
        <ScrollReveal>
          <h2 className="text-center font-heading text-h2 font-bold text-bb-navy">
            Real Homes. Real Deliveries.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {deliveredPhotos.map((photo, i) => (
            <ScrollReveal key={photo.src} delay={i * 80}>
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-bb-blue-light shadow-sm">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl font-body text-bb-gray-600">
            Every Bright Box Home is inspected, documented, and delivered with a
            7-day no-defect inspection window.
          </p>
          <div className="mt-6">
            <Button href="/consultation" variant="secondary">
              Book a Consultation
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION F - FAITH Foundation */}
      <section className="bg-bb-warm-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
          <ScrollReveal>
            <h2 className="font-heading text-h2 font-bold text-bb-navy">
              Building Homes. Building Hope.
            </h2>
            <p className="mt-4 font-body text-bb-gray-600">
              For every home sold, Bright Box Homes donates $2,500 to the FAITH
              Foundation - a 501(c)(3) nonprofit providing pathways to
              homeownership for qualified low-income families.
            </p>
            <div className="mt-6">
              <Button href="/faith-foundation" variant="secondary">
                Learn About the FAITH Foundation
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80} className="flex justify-center">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-bb-blue-light text-bb-blue">
              <Home size={72} aria-hidden="true" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION G - Final CTA */}
      <section className="bg-bb-navy">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-h2 font-bold text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 font-body text-h4 text-white/90">
              Talk to our team about finding the right home for your needs and
              budget.
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
