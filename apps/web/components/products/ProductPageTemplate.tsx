import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ImageGallery from '@/components/ui/ImageGallery';

interface GalleryImage {
  src: string;
  alt: string;
}

interface Spec {
  label: string;
  value: string;
}

interface ProductPageTemplateProps {
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceLabel: string;
  images: GalleryImage[];
  specs: Spec[];
  features: string[];
  ctaText?: string;
}

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

export default function ProductPageTemplate({
  name,
  tagline,
  description,
  price,
  priceLabel,
  images,
  specs,
  features,
  ctaText = 'Book a Consultation',
}: ProductPageTemplateProps) {
  const comingSoon = price === 'Coming Soon';

  return (
    <>
      {/* 1. Hero banner */}
      <section className="bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Bright Box Homes</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            {name}
          </h1>
          <p className="mt-2 text-lg text-gray-400">{tagline}</p>
          {comingSoon ? (
            <p className="mt-4 font-mono text-2xl text-gray-500">
              {priceLabel}: Coming Soon
            </p>
          ) : (
            <p className="mt-4 font-mono text-2xl text-bb-blue">
              {priceLabel} {price}
            </p>
          )}
          <p className="mt-6 max-w-2xl text-gray-300">{description}</p>
          <div className="mt-6">
            <Button href="/consultation" size="lg">
              {ctaText}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Gallery */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Gallery</p>
          {images.length > 0 ? (
            <ImageGallery images={images} className="mt-2" />
          ) : (
            <div className="mt-2 flex min-h-40 items-center justify-center rounded-lg border border-white/5 bg-bb-surface-dark p-8 text-center text-gray-500">
              Product photography coming soon.
            </div>
          )}
        </div>
      </section>

      {/* 3. Specifications */}
      <section className="bg-bb-surface-dark py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>Specifications</p>
          <dl className="mt-2 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-4 border-b border-white/5 py-4"
              >
                <dt className="text-gray-400">{spec.label}</dt>
                <dd className="text-right font-mono text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4. Standard Features */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className={label}>What&apos;s Included</p>
          <ul className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check
                  size={20}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-bb-blue"
                />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to learn more about {name}?
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/consultation" size="lg">
              {ctaText}
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Call us at 800-259-1745
          </p>
        </div>
      </section>
    </>
  );
}
