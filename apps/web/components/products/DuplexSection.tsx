import Image from 'next/image';
import { DollarSign, Home, Key, Building2, TrendingDown, Zap } from 'lucide-react';
import ImageGallery from '@/components/ui/ImageGallery';

interface GalleryImage {
  src: string;
  alt: string;
}

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

const highlights = [
  { icon: DollarSign, text: 'Live in one, rent one - offset your mortgage immediately' },
  { icon: Home, text: 'Two independent units on a single lot and foundation' },
  { icon: Key, text: 'Airbnb and short-term rental ready' },
  { icon: Building2, text: 'Workforce housing at scale' },
  { icon: TrendingDown, text: 'Fraction of traditional duplex construction cost' },
  { icon: Zap, text: 'Each unit independently plumbed, wired, and climate-controlled' },
];

export default function DuplexSection({
  images,
  heroImage,
}: {
  images: GalleryImage[];
  heroImage?: GalleryImage;
}) {
  return (
    <section id="investment" className="scroll-mt-24 rounded-2xl border border-white/10 bg-bb-surface-dark p-6 lg:p-10">
      <div>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Left: heading + copy */}
          <div className={heroImage ? 'lg:w-1/2' : 'w-full'}>
            <p className={label}>Investment Opportunity</p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Double Your Investment
            </h2>
            <p className="mt-3 text-lg text-bb-blue">
              Stack two units. Live in one. Rent the other.
            </p>

            <div className="mt-6 space-y-6 text-gray-300">
              <p>
                The Bright Box Duplex is two expandable container homes stacked into a
                single two-story footprint. Same steel-frame construction, same
                standard inclusions, twice the opportunity. For homeowners, it&apos;s
                the simplest path to offsetting your mortgage - live upstairs, rent the
                lower unit, and let your tenant cover your payment. For investors,
                it&apos;s two rental units on one lot with one foundation, one utility
                connection, and one purchase.
              </p>
              <p>
                At a fraction of the cost of traditional duplex construction, the
                Bright Box Duplex delivers rental-ready units in weeks, not months.
                Each unit is independently plumbed, wired, and climate-controlled.
                Whether you&apos;re house-hacking your first property, building an
                Airbnb portfolio on rural land, or deploying workforce housing at
                scale, the duplex configuration turns a home purchase into an
                income-producing asset from day one.
              </p>
            </div>
          </div>

          {/* Right: hero image */}
          {heroImage && (
            <div className="lg:w-1/2">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-2xl border border-white/5 bg-[#1A2030] p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.text}
                  className="flex items-start gap-3 rounded-xl bg-[#D4C4A8] p-5 transition-colors duration-fast ease-out hover:bg-[#C8B898]"
                >
                  <Icon size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-bb-blue" />
                  <span className="text-sm text-gray-700">{h.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {images.length > 0 && <ImageGallery images={images} className="mt-12" />}
      </div>
    </section>
  );
}
