import Image from 'next/image';
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

interface GallerySection {
  label: string;
  heading: string;
  images: GalleryImage[];
}

interface FloorPlan {
  name: string;
  src?: string;
  alt: string;
  pdfSrc?: string;
}

interface UpgradeItem {
  name: string;
  description?: string;
  image?: string;
}

interface UpgradeCategory {
  category: string;
  items: UpgradeItem[];
}

interface ProductPageTemplateProps {
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceLabel: string;
  heroImages: GalleryImage[];
  exteriorImages: GalleryImage[];
  interiorImages?: GalleryImage[];
  // When provided, replaces the default Exterior/Interior galleries with these
  // named sections (e.g. Micro Apartments + Office Buildings).
  galleries?: GallerySection[];
  floorPlans?: FloorPlan[];
  upgrades?: UpgradeCategory[];
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
  heroImages,
  exteriorImages,
  interiorImages,
  galleries,
  floorPlans,
  upgrades,
  specs,
  features,
  ctaText = 'Book a Consultation',
}: ProductPageTemplateProps) {
  // Numeric prices ("$35,995") render in brand blue; quote-style prices
  // ("Coming Soon", "Contact for Pricing") render as a gray label: value.
  const isQuote = !price.startsWith('$');
  const hero = heroImages.slice(0, 2);

  return (
    <>
      {/* 1. Hero (above the fold) */}
      <section className="bg-bb-surface-dark">
        <div className="mx-auto flex min-h-[70vh] max-w-[1280px] flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center lg:py-24">
          {/* Right column (images) renders first on mobile so it stacks above text */}
          {hero.length > 0 && (
            <div className="order-first lg:order-last lg:w-1/2">
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:gap-6">
                {hero.map((image, i) => (
                  <div
                    key={image.src}
                    className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/5 ${
                      hero.length === 2 && i === 1 ? 'sm:-mt-0 lg:-ml-10 lg:w-5/6 lg:self-end' : ''
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 45vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Left column (text) */}
          <div className={hero.length > 0 ? 'lg:w-1/2' : 'w-full'}>
            <p className={label}>Bright Box Homes</p>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {name}
            </h1>
            <p className="mt-4 text-lg text-gray-400">{tagline}</p>
            {isQuote ? (
              <p className="mt-4 font-mono text-2xl text-gray-500">
                {priceLabel}: {price}
              </p>
            ) : (
              <p className="mt-4 font-mono text-2xl text-bb-blue">
                {priceLabel} {price}
              </p>
            )}
            <p className="mt-6 max-w-xl text-gray-300">{description}</p>
            <div className="mt-8">
              <Button href="/consultation" size="lg">
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Galleries. When `galleries` is provided, render those named
          sections (alternating background); otherwise the default
          Exterior (+ Interior) galleries. */}
      {galleries && galleries.length > 0 ? (
        galleries.map((g, i) => (
          <section
            key={g.label}
            className={`${i % 2 === 0 ? 'bg-bb-charcoal' : 'bg-bb-surface-dark'} py-16 lg:py-24`}
          >
            <div className="mx-auto max-w-[1280px] px-6">
              <p className={label}>{g.label}</p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                {g.heading}
              </h2>
              <ImageGallery images={g.images} className="mt-10" />
            </div>
          </section>
        ))
      ) : (
        <>
          <section className="bg-bb-charcoal py-16 lg:py-24">
            <div className="mx-auto max-w-[1280px] px-6">
              <p className={label}>Exterior</p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                See It From Every Angle
              </h2>
              {exteriorImages.length > 0 ? (
                <ImageGallery images={exteriorImages} className="mt-10" />
              ) : (
                <div className="mt-10 flex min-h-40 items-center justify-center rounded-lg border border-white/5 bg-bb-surface-dark p-8 text-center text-gray-500">
                  Product photography coming soon.
                </div>
              )}
            </div>
          </section>

          {interiorImages && interiorImages.length > 0 && (
            <section className="bg-bb-surface-dark py-16 lg:py-24">
              <div className="mx-auto max-w-[1280px] px-6">
                <p className={label}>Interior</p>
                <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                  Take a Look Inside
                </h2>
                <ImageGallery images={interiorImages} className="mt-10" />
              </div>
            </section>
          )}
        </>
      )}

      {/* 3b. Floor Plans (only if provided) */}
      {floorPlans && floorPlans.length > 0 && (
        <section className="bg-bb-surface-dark py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className={label}>Floor Plans</p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Choose Your Layout
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {floorPlans.map((fp) => (
                <div
                  key={fp.name}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  {fp.src ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white">
                      <Image
                        src={fp.src}
                        alt={fp.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-bb-charcoal text-sm text-gray-500">
                      PDF floor plan
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="font-heading font-semibold text-white">
                      {fp.name}
                    </span>
                    {fp.pdfSrc && (
                      <a
                        href={fp.pdfSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-sm text-bb-blue transition-colors duration-fast ease-out hover:text-white"
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Specifications */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
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

      {/* 5. Standard Features */}
      <section className="bg-bb-surface-dark py-16 lg:py-24">
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

      {/* 5b. Available Upgrades (only if provided) */}
      {upgrades && upgrades.length > 0 && (
        <section className="bg-bb-charcoal py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className={label}>Upgrades</p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Customize Your Home
            </h2>
            <div className="mt-10 space-y-12">
              {upgrades.map((cat) => (
                <div key={cat.category}>
                  <h3 className="font-heading text-xl font-semibold text-bb-blue">
                    {cat.category}
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="overflow-hidden rounded-xl border border-white/5 bg-bb-surface-dark"
                      >
                        {item.image && (
                          <div className="relative aspect-video w-full bg-white/5">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(min-width: 1024px) 33vw, 100vw"
                              className="object-contain p-2"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <p className="font-body font-medium text-white">{item.name}</p>
                          {item.description && (
                            <p className="mt-1 text-sm text-gray-400">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA */}
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
          <p className="mt-6 text-sm text-gray-500">Call us at 800-259-1745</p>
        </div>
      </section>
    </>
  );
}
