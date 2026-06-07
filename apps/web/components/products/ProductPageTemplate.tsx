import type { ReactNode } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';
import ImageGallery from '@/components/ui/ImageGallery';
import ProductSideNav from '@/components/products/ProductSideNav';
import type { NavSection } from '@/components/products/ProductSideNav';

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
  group?: string;
  width?: number;
  height?: number;
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
  galleries?: GallerySection[];
  afterGalleries?: ReactNode;
  floorPlans?: FloorPlan[];
  upgrades?: UpgradeCategory[];
  specs: Spec[];
  features: string[];
  ctaText?: string;
}

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';
const sectionClass = 'scroll-mt-24 border-t border-white/5 py-12 lg:py-16';
const headingClass = 'font-heading text-3xl font-bold text-white md:text-4xl';

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
  afterGalleries,
  floorPlans,
  upgrades,
  specs,
  features,
  ctaText = 'Book a Consultation',
}: ProductPageTemplateProps) {
  const isQuote = !price.startsWith('$');
  const hero = heroImages.slice(0, 2);

  // Group floor plans by their optional `group` (e.g. size).
  const floorPlanGroups: { name: string; items: FloorPlan[] }[] = [];
  for (const fp of floorPlans ?? []) {
    const key = fp.group ?? '';
    const existing = floorPlanGroups.find((g) => g.name === key);
    if (existing) existing.items.push(fp);
    else floorPlanGroups.push({ name: key, items: [fp] });
  }

  const usingGalleries = !!(galleries && galleries.length > 0);
  const hasInterior = !!(interiorImages && interiorImages.length > 0);
  const hasFloorPlans = !!(floorPlans && floorPlans.length > 0);
  const hasUpgrades = !!(upgrades && upgrades.length > 0);

  // Build sidebar nav from the sections that actually render.
  const navSections: NavSection[] = [{ id: 'overview', label: 'Overview' }];
  if (usingGalleries) {
    galleries!.forEach((g) => navSections.push({ id: slug(g.label), label: g.label }));
  } else {
    navSections.push({ id: 'exterior', label: 'Exterior' });
    if (hasInterior) navSections.push({ id: 'interior', label: 'Interior' });
  }
  if (hasFloorPlans) navSections.push({ id: 'floor-plans', label: 'Floor Plans' });
  if (hasUpgrades) navSections.push({ id: 'upgrades', label: 'Upgrades' });
  navSections.push({ id: 'specs', label: 'Specs' });

  return (
    <div className="bg-bb-charcoal">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-0 px-6 lg:flex-row lg:gap-12">
        <ProductSideNav productName={name} sections={navSections} />

        <div className="min-w-0 flex-1">
          {/* Overview */}
          <section id="overview" className="scroll-mt-24 py-12 lg:py-16">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
              {hero.length > 0 && (
                <div className="order-first lg:order-last lg:w-1/2">
                  <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                    {hero.map((image, i) => (
                      <div
                        key={image.src}
                        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/5"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          priority={i === 0}
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={hero.length > 0 ? 'lg:w-1/2' : 'w-full'}>
                <p className={label}>Bright Box Homes</p>
                <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
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

                {features.length > 0 && (
                  <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          size={20}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-bb-blue"
                        />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8 lg:hidden">
                  <BookConsultation size="lg">{ctaText}</BookConsultation>
                </div>
              </div>
            </div>
          </section>

          {/* Galleries */}
          {usingGalleries ? (
            galleries!.map((g) => (
              <section key={g.label} id={slug(g.label)} className={sectionClass}>
                <p className={label}>{g.label}</p>
                <h2 className={headingClass}>{g.heading}</h2>
                <ImageGallery images={g.images} className="mt-8" />
              </section>
            ))
          ) : (
            <>
              <section id="exterior" className={sectionClass}>
                <p className={label}>Exterior</p>
                <h2 className={headingClass}>See It From Every Angle</h2>
                {exteriorImages.length > 0 ? (
                  <ImageGallery images={exteriorImages} className="mt-8" />
                ) : (
                  <div className="mt-8 flex min-h-40 items-center justify-center rounded-lg border border-white/5 bg-bb-surface-dark p-8 text-center text-gray-500">
                    Product photography coming soon.
                  </div>
                )}
              </section>

              {hasInterior && (
                <section id="interior" className={sectionClass}>
                  <p className={label}>Interior</p>
                  <h2 className={headingClass}>Take a Look Inside</h2>
                  <ImageGallery images={interiorImages!} className="mt-8" />
                </section>
              )}
            </>
          )}

          {afterGalleries}

          {/* Floor Plans */}
          {hasFloorPlans && (
            <section id="floor-plans" className={sectionClass}>
              <p className={label}>Floor Plans</p>
              <h2 className={headingClass}>Choose Your Layout</h2>
              <div className="mt-8 space-y-12">
                {floorPlanGroups.map((grp) => (
                  <div key={grp.name || 'plans'}>
                    {grp.name && (
                      <h3 className="mb-4 font-heading text-xl font-semibold text-bb-blue">
                        {grp.name}
                      </h3>
                    )}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      {grp.items.map((fp) => (
                        <div
                          key={fp.name}
                          className="rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                          {fp.src ? (
                            <div className="overflow-hidden rounded-lg bg-white p-2">
                              <Image
                                src={fp.src}
                                alt={fp.alt}
                                width={fp.width ?? 1200}
                                height={fp.height ?? 800}
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="h-auto w-full"
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
                ))}
              </div>
            </section>
          )}

          {/* Upgrades */}
          {hasUpgrades && (
            <section id="upgrades" className={sectionClass}>
              <p className={label}>Upgrades</p>
              <h2 className={headingClass}>Customize Your Home</h2>
              <div className="mt-8 space-y-12">
                {upgrades!.map((cat) => (
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
                              <p className="mt-1 text-sm text-gray-400">{item.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Specs */}
          <section id="specs" className={sectionClass}>
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
          </section>

          {/* CTA */}
          <section className="border-t border-white/5 py-12 text-center lg:py-16">
            <h2 className={headingClass}>Ready to learn more about {name}?</h2>
            <div className="mt-8 flex justify-center">
              <BookConsultation size="lg">{ctaText}</BookConsultation>
            </div>
            <p className="mt-6 text-sm text-gray-500">Call us at 800-259-1745</p>
          </section>
        </div>
      </div>
    </div>
  );
}
