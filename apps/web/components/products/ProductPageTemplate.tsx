import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
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

interface IconCard {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface FrameImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
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
  intro?: string;
  keyFeatures?: IconCard[];
  useCases?: IconCard[];
  floorPlans?: FloorPlan[];
  upgrades?: UpgradeCategory[];
  frames?: FrameImage[];
  specs: Spec[];
  features: string[];
  ctaText?: string;
}

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';
const headingClass = 'font-heading text-3xl font-bold text-white md:text-4xl';
const bandBase = 'scroll-mt-24 rounded-2xl border border-white/10 p-6 lg:p-10';
const bandDark = `${bandBase} bg-bb-surface-dark`;
const bandDeep = `${bandBase} bg-bb-charcoal`;

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
  intro,
  keyFeatures,
  useCases,
  floorPlans,
  upgrades,
  frames,
  specs,
  features,
  ctaText = 'Book a Consultation',
}: ProductPageTemplateProps) {
  const isQuote = !price.startsWith('$');
  const hero = heroImages.slice(0, 2);

  const floorPlanGroups: { name: string; items: FloorPlan[] }[] = [];
  for (const fp of floorPlans ?? []) {
    const key = fp.group ?? '';
    const existing = floorPlanGroups.find((g) => g.name === key);
    if (existing) existing.items.push(fp);
    else floorPlanGroups.push({ name: key, items: [fp] });
  }

  const usingGalleries = !!(galleries && galleries.length > 0);
  const hasInterior = !!(interiorImages && interiorImages.length > 0);
  const hasKeyFeatures = !!(keyFeatures && keyFeatures.length > 0);
  const hasUseCases = !!(useCases && useCases.length > 0);
  const hasFloorPlans = !!(floorPlans && floorPlans.length > 0);
  const hasUpgrades = !!(upgrades && upgrades.length > 0);

  const navSections: NavSection[] = [{ id: 'overview', label: 'Overview' }];
  if (usingGalleries) {
    galleries!.forEach((g) => navSections.push({ id: slug(g.label), label: g.label }));
  } else {
    navSections.push({ id: 'exterior', label: 'Exterior' });
    if (hasInterior) navSections.push({ id: 'interior', label: 'Interior' });
  }
  if (hasKeyFeatures) navSections.push({ id: 'features', label: 'Features' });
  if (hasUseCases) navSections.push({ id: 'use-cases', label: "Who It's For" });
  if (hasFloorPlans) navSections.push({ id: 'floor-plans', label: 'Floor Plans' });
  if (hasUpgrades) navSections.push({ id: 'upgrades', label: 'Upgrades' });
  navSections.push({ id: 'specs', label: 'Specs' });

  return (
    <div className="bg-bb-charcoal">
      <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-8">
        <ProductSideNav productName={name} sections={navSections} />

        <div className="min-w-0 flex-1 space-y-8">
          {/* Overview */}
          <section id="overview" className={bandDark}>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
              {hero.length > 0 && (
                <div className="order-first lg:order-last lg:w-1/2">
                  <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                    {hero.map((image, i) => (
                      <div
                        key={image.src}
                        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1"
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            priority={i === 0}
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                          />
                        </div>
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
                <p className="mt-4 text-lg text-gray-300">{tagline}</p>
                {isQuote ? (
                  <p className="mt-4 font-mono text-2xl text-gray-400">
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
                        <Check size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-bb-blue" />
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

          {/* Intro */}
          {intro && (
            <section className={bandDeep}>
              <p className="max-w-3xl text-lg leading-relaxed text-gray-200">{intro}</p>
            </section>
          )}

          {/* Galleries */}
          {usingGalleries ? (
            galleries!.map((g) => (
              <section key={g.label} id={slug(g.label)} className={bandDeep}>
                <p className={label}>{g.label}</p>
                <h2 className={headingClass}>{g.heading}</h2>
                <ImageGallery images={g.images} className="mt-8" />
              </section>
            ))
          ) : (
            <>
              <section id="exterior" className={bandDeep}>
                <p className={label}>Exterior</p>
                <h2 className={headingClass}>See It From Every Angle</h2>
                {exteriorImages.length > 0 ? (
                  <ImageGallery images={exteriorImages} className="mt-8" />
                ) : (
                  <div className="mt-8 flex min-h-40 items-center justify-center rounded-lg border border-white/10 bg-white/5 p-8 text-center text-gray-400">
                    Product photography coming soon.
                  </div>
                )}
              </section>

              {hasInterior && (
                <section id="interior" className={bandDeep}>
                  <p className={label}>Interior</p>
                  <h2 className={headingClass}>Take a Look Inside</h2>
                  <ImageGallery images={interiorImages!} className="mt-8" />
                </section>
              )}
            </>
          )}

          {afterGalleries}

          {/* Key Features */}
          {hasKeyFeatures && (
            <section id="features" className={bandDark}>
              <p className={label}>Key Features</p>
              <h2 className={headingClass}>Built to a Higher Standard</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {keyFeatures!.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="rounded-xl border border-white/10 bg-white/5 p-6"
                    >
                      <Icon size={28} aria-hidden="true" className="text-bb-blue" />
                      <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-300">{f.text}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Who It's For */}
          {hasUseCases && (
            <section id="use-cases" className={bandDeep}>
              <p className={label}>Who It&apos;s For</p>
              <h2 className={headingClass}>One Home, Many Possibilities</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {useCases!.map((u) => {
                  const Icon = u.icon;
                  return (
                    <div
                      key={u.title}
                      className="rounded-xl border border-white/10 bg-white/5 p-6"
                    >
                      <Icon size={28} aria-hidden="true" className="text-bb-blue" />
                      <h3 className="mt-4 font-heading text-base font-semibold text-white">
                        {u.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-300">{u.text}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Floor Plans */}
          {hasFloorPlans && (
            <section id="floor-plans" className={bandDark}>
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
                          className="rounded-xl border border-white/15 bg-white/5 p-4"
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
                            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-bb-charcoal text-sm text-gray-400">
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
            <section id="upgrades" className={bandDeep}>
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
                          className="overflow-hidden rounded-xl border border-white/15 bg-white/5"
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
                              <p className="mt-1 text-sm text-gray-300">{item.description}</p>
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
          <section id="specs" className={bandDark}>
            <p className={label}>Specifications</p>
            <dl className="mt-2 grid grid-cols-1 gap-x-12 md:grid-cols-2">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/5 py-4"
                >
                  <dt className="text-gray-300">{spec.label}</dt>
                  <dd className="text-right font-mono text-white">{spec.value}</dd>
                </div>
              ))}
            </dl>

            {frames && frames.length > 0 && (
              <div className="mt-10">
                <h3 className="font-heading text-xl font-semibold text-bb-blue">
                  Construction &amp; Frame
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {frames.map((fr) => (
                    <figure key={fr.src} className="max-w-md">
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1">
                        <Image
                          src={fr.src}
                          alt={fr.alt}
                          width={fr.width}
                          height={fr.height}
                          sizes="(min-width: 640px) 28rem, 100vw"
                          className="h-auto w-full rounded-lg"
                        />
                      </div>
                      <figcaption className="mt-2 text-sm text-gray-300">{fr.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-white/10 bg-bb-navy p-8 text-center lg:p-12">
            <h2 className={headingClass}>Ready to learn more about {name}?</h2>
            <div className="mt-8 flex justify-center">
              <BookConsultation size="lg">{ctaText}</BookConsultation>
            </div>
            <p className="mt-6 text-sm text-gray-300">Call us at 800-259-1745</p>
          </section>
        </div>
      </div>
    </div>
  );
}
