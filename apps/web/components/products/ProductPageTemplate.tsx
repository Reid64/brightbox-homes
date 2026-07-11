import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';
import ImageGallery from '@/components/ui/ImageGallery';
import ClickableImage from '@/components/ui/ClickableImage';
import ProductSideNav from '@/components/products/ProductSideNav';
import type { NavSection } from '@/components/products/ProductSideNav';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
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
  afterContent?: ReactNode;
  intro?: string;
  keyFeatures?: IconCard[];
  useCases?: IconCard[];
  floorPlans?: FloorPlan[];
  upgrades?: UpgradeCategory[];
  frames?: FrameImage[];
  specs: Spec[];
  features: string[];
  ctaText?: string;
  warmCards?: boolean;
  hideGalleries?: boolean;
  hideFinancing?: boolean;
}

// Redesign palette (literal hex, no tokens). Alternating dark navy and warm
// cream bands stacked on a #0F1729 page background.
const labelDark = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#6B9BF7]';
const labelLight = 'mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#3461C7]';
const headingOnDark = 'font-heading text-3xl font-bold text-[#FFFFFF] md:text-4xl';
const headingOnLight = 'font-heading text-3xl font-bold text-[#111827] md:text-4xl';
const bandBase = 'scroll-mt-24 rounded-2xl border p-6 lg:p-10';
const bandDark = `${bandBase} border-white/10 bg-[#1C2438]`;
const bandDeep = `${bandBase} border-white/10 bg-[#141B2D]`;
const bandCream = `${bandBase} border-black/[0.04] bg-[#F5F0E8] shadow-[0_4px_16px_rgba(0,0,0,0.05)]`;

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
  afterContent,
  intro,
  keyFeatures,
  useCases,
  floorPlans,
  upgrades,
  frames,
  specs,
  features,
  hideGalleries = false,
  hideFinancing = false,
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
  // 3+ frames (expandable photo rows) render as uniform object-cover tiles.
  // 1-2 frames (which may be spec diagrams) keep object-contain to avoid cropping.
  const uniformFrames = !!(frames && frames.length >= 3);

  const navSections: NavSection[] = [{ id: 'overview', label: 'Overview' }];
  if (!hideGalleries) {
    if (usingGalleries) {
      galleries!.forEach((g) => navSections.push({ id: slug(g.label), label: g.label }));
    } else {
      navSections.push({ id: 'exterior', label: 'Exterior' });
      if (hasInterior) navSections.push({ id: 'interior', label: 'Interior' });
    }
  }
  if (hasKeyFeatures) navSections.push({ id: 'features', label: 'Features' });
  if (hasUseCases) navSections.push({ id: 'use-cases', label: "Who It's For" });
  if (hasFloorPlans) navSections.push({ id: 'floor-plans', label: 'Floor Plans' });
  if (hasUpgrades) navSections.push({ id: 'upgrades', label: 'Upgrades' });
  navSections.push({ id: 'specs', label: 'Specs' });

  return (
    <div className="bg-[#0F1729]">
      <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-8">
        <ProductSideNav productName={name} sections={navSections} />

        <div className="min-w-0 flex-1 space-y-8">
          {/* Overview (hero gradient) */}
          <section
            id="overview"
            className={`${bandBase} border-white/10`}
            style={{ background: 'linear-gradient(180deg, #0F1729, #141B2D)' }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
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
                <p className={labelDark}>Bright Box Homes</p>
                <h1 className="font-heading text-4xl font-extrabold text-[#FFFFFF] md:text-5xl">
                  {name}
                </h1>
                <p className="mt-4 text-lg text-[#D1D5DB]">{tagline}</p>
                {isQuote ? (
                  <p className="mt-4 font-mono text-2xl text-[#9CA3AF]">
                    {priceLabel}: {price}
                  </p>
                ) : (
                  <p className="mt-4 font-mono text-2xl font-bold text-[#6B9BF7]">
                    {priceLabel} {price}
                  </p>
                )}
                {!isQuote && !hideFinancing && (
                  <Link
                    href="/financing"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#6B9BF7] underline-offset-4 hover:underline"
                  >
                    Flexible Financing Available
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
                <p className="mt-6 max-w-xl text-[#D1D5DB]">{description}</p>

                {features.length > 0 && (
                  <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#6B9BF7]" />
                        <span className="text-sm text-[#D1D5DB]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8">
                  <BookConsultation size="lg">Get a Custom Quote</BookConsultation>
                </div>
              </div>
            </div>
          </section>

          {/* Intro */}
          {intro && (
            <section className={bandDeep}>
              <p className="max-w-3xl text-lg leading-relaxed text-[#D1D5DB]">{intro}</p>
            </section>
          )}

          {/* Galleries */}
          {hideGalleries ? null : usingGalleries ? (
            galleries!.map((g) => (
              <section key={g.label} id={slug(g.label)} className={bandDeep}>
                <p className={labelDark}>{g.label}</p>
                <h2 className={headingOnDark}>{g.heading}</h2>
                <ImageGallery images={g.images} className="mt-8" />
              </section>
            ))
          ) : (
            <>
              <section id="exterior" className={bandDeep}>
                <p className={labelDark}>Exterior</p>
                <h2 className={headingOnDark}>See It From Every Angle</h2>
                {exteriorImages.length > 0 ? (
                  <ImageGallery images={exteriorImages} className="mt-8" />
                ) : (
                  <div className="mt-8 flex min-h-40 items-center justify-center rounded-lg border border-white/10 bg-white/5 p-8 text-center text-[#9CA3AF]">
                    Product photography coming soon.
                  </div>
                )}
              </section>

              {hasInterior && (
                <section id="interior" className={bandDeep}>
                  <p className={labelDark}>Interior</p>
                  <h2 className={headingOnDark}>Take a Look Inside</h2>
                  <ImageGallery images={interiorImages!} className="mt-8" />
                </section>
              )}
            </>
          )}

          {afterGalleries}

          {/* Key Features (warm cream, white cards) */}
          {hasKeyFeatures && (
            <section id="features" className={bandCream}>
              <p className={labelLight}>Key Features</p>
              <h2 className={headingOnLight}>Built to a Higher Standard</h2>
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {keyFeatures!.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={f.title}
                        className="rounded-xl border border-black/[0.04] bg-[#FFFFFF] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                      >
                        <Icon size={28} aria-hidden="true" className="text-[#4A7CE5]" />
                        <h3 className="mt-4 font-heading text-lg font-semibold text-[#111827]">
                          {f.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#374151]">{f.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Who It's For (dark surface) */}
          {hasUseCases && (
            <section id="use-cases" className={bandDeep}>
              <p className={labelDark}>Who It&apos;s For</p>
              <h2 className={headingOnDark}>One Home, Many Possibilities</h2>
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {useCases!.map((u) => {
                    const Icon = u.icon;
                    return (
                      <div
                        key={u.title}
                        className="rounded-xl border border-white/10 bg-[#232B45] p-6"
                      >
                        <Icon size={28} aria-hidden="true" className="text-[#6B9BF7]" />
                        <h3 className="mt-4 font-heading text-base font-semibold text-[#FFFFFF]">
                          {u.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#D1D5DB]">{u.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Floor Plans (dark surface) */}
          {hasFloorPlans && (
            <section id="floor-plans" className={bandDark}>
              <p className={labelDark}>Floor Plans</p>
              <h2 className={headingOnDark}>Choose Your Layout</h2>
              <div className="mt-8 space-y-12">
                {floorPlanGroups.map((grp) => (
                  <div key={grp.name || 'plans'}>
                    {grp.name && (
                      <h3 className="mb-4 font-heading text-xl font-semibold text-[#6B9BF7]">
                        {grp.name}
                      </h3>
                    )}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      {grp.items.map((fp) => (
                        <div
                          key={fp.name}
                          className="rounded-xl border border-white/15 bg-[#232B45] p-4"
                        >
                          {fp.src ? (
                            <ClickableImage
                              src={fp.src}
                              alt={fp.alt}
                              width={fp.width ?? 1200}
                              height={fp.height ?? 800}
                              caption={`${fp.name} floor plan`}
                              sizes="(min-width: 1024px) 40vw, 100vw"
                              className="overflow-hidden rounded-lg bg-white p-2"
                              imgClassName="h-auto w-full"
                            />
                          ) : (
                            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-[#0F1729] text-sm text-[#9CA3AF]">
                              PDF floor plan
                            </div>
                          )}
                          <div className="mt-4 flex items-center justify-between gap-4">
                            <span className="font-heading font-semibold text-[#FFFFFF]">
                              {fp.name}
                            </span>
                            {fp.pdfSrc && (
                              <a
                                href={fp.pdfSrc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 text-sm text-[#6B9BF7] transition-colors duration-200 ease-out hover:text-[#FFFFFF]"
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

          {/* Upgrades (warm cream, white cards) */}
          {hasUpgrades && (
            <section id="upgrades" className={bandCream}>
              <p className={labelLight}>Upgrades</p>
              <h2 className={headingOnLight}>Customize Your Home</h2>
              <div className="mt-8 space-y-12">
                {upgrades!.map((cat) => (
                  <div key={cat.category}>
                    <h3 className="font-heading text-xl font-semibold text-[#3461C7]">
                      {cat.category}
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {cat.items.map((item) => (
                        <div
                          key={item.name}
                          className="overflow-hidden rounded-xl border border-black/[0.04] bg-[#FFFFFF] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                        >
                          {item.image && (
                            <div className="relative aspect-video w-full bg-[#EFE8DC]">
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
                            <p className="font-body font-medium text-[#111827]">{item.name}</p>
                            {item.description && (
                              <p className="mt-1 text-sm text-[#4B5563]">{item.description}</p>
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

          {/* Specs (dark surface) */}
          <section id="specs" className={bandDark}>
            <p className={labelDark}>Specifications</p>
            <dl className="mt-2 grid grid-cols-1 gap-x-12 md:grid-cols-2">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/5 py-4"
                >
                  <dt className="text-[#9CA3AF]">{spec.label}</dt>
                  <dd className="text-right font-mono text-[#FFFFFF]">{spec.value}</dd>
                </div>
              ))}
            </dl>

            {frames && frames.length > 0 && (
              <div className="mt-10">
                <h3 className="font-heading text-xl font-semibold text-[#6B9BF7]">
                  Construction &amp; Frame
                </h3>
                <div
                  className={`mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 ${
                    uniformFrames ? 'lg:grid-cols-3' : ''
                  }`}
                >
                  {frames.map((fr) =>
                    uniformFrames ? (
                      // Uniform fixed-aspect tiles - identical h/w/aspect across the row.
                      <figure key={fr.src} className="w-full">
                        <ClickableImage
                          src={fr.src}
                          alt={fr.alt}
                          caption={fr.caption}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5"
                          imgClassName="object-cover"
                        />
                        <figcaption className="mt-2 text-sm text-[#D1D5DB]">{fr.caption}</figcaption>
                      </figure>
                    ) : (
                      // Diagram-safe (no crop) for 1-2 frame products.
                      <figure key={fr.src} className="max-w-md">
                        <ClickableImage
                          src={fr.src}
                          alt={fr.alt}
                          width={fr.width}
                          height={fr.height}
                          caption={fr.caption}
                          sizes="(min-width: 640px) 28rem, 100vw"
                          className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1"
                          imgClassName="h-auto w-full rounded-lg"
                        />
                        <figcaption className="mt-2 text-sm text-[#D1D5DB]">{fr.caption}</figcaption>
                      </figure>
                    ),
                  )}
                </div>
              </div>
            )}
          </section>

          {afterContent}

          {/* Reserve CTA band (navy glass) */}
          <section
            className="rounded-2xl p-8 text-center lg:p-12"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 0 30px rgba(107,155,247,0.15)',
            }}
          >
            <h2 className={headingOnDark}>Ready to Reserve?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#D1D5DB]">
              Secure your home with a fully refundable $500 deposit. We&apos;ll contact you
              within 24 hours to finalize your configuration.
            </p>
            <div className="mt-8 flex justify-center">
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
            <p className="mt-4 text-sm text-[#9CA3AF]">
              100% refundable &middot; No obligation &middot; Locks your configuration
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
