import type { Metadata } from 'next';
import ClickableImage from '@/components/ui/ClickableImage';
import { Clock, Flame, Package, Boxes, ShieldCheck, Truck, LifeBuoy, HardHat, Shield, Users, Briefcase } from 'lucide-react';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import UpgradesGrid from '@/components/products/UpgradesGrid';

export const metadata: Metadata = {
  title: 'Emergency Housing | Bright Box Homes',
  description:
    'Rapidly deployable emergency and disaster housing from $2,000. Fire-grade A folding shelters that fold flat for container shipping and set up in hours - for disaster relief, workforce, military, and humanitarian deployments.',
};

const exteriorImages = [
  { src: '/images/products/emergency-housing/exterior/folding-house.png', alt: 'Folding emergency house shown folded and unfolded.', caption: 'Folded flat for shipping, unfolded into a finished shelter in hours.' },
  { src: '/images/products/emergency-housing/exterior/FP9A0597-scaled.jpg', alt: 'Emergency Housing Exterior View', caption: 'Deployed on site in minutes - the folding shelter unfolds with a single lift.' },
];

// Bright Box-branded documentation graphics, each captioned. (The old
// "product details / component breakdown" graphic was removed - it did not
// depict the foldable home.)
const documentation = [
  { src: '/images/products/emergency-housing/exterior/01.png', caption: 'Dimensions and standard configuration' },
  { src: '/images/products/emergency-housing/exterior/02.png', caption: 'Emergency Housing Systems overview' },
  { src: '/images/products/emergency-housing/exterior/05.png', caption: 'Three-step setup process' },
  { src: '/images/products/emergency-housing/exterior/04.png', caption: 'Finish and configuration options' },
];

const specs = [
  { label: 'External Dimensions', value: "19' x 7.3' x 7.5'" },
  { label: 'Internal Dimensions', value: '18\'6" x 6\'11"' },
  { label: 'Folded Size', value: "19' x 7' x 1.2'" },
  { label: 'Fire Rating', value: 'Grade A (fireproof)' },
  { label: 'Panels', value: 'Rockwool sandwich panel' },
  { label: 'Frame', value: 'Steel' },
  { label: 'Setup Time', value: 'Hours, not days' },
];

const features = [
  'Sets up in hours, not days',
  'Fire-grade A fireproof materials',
  'Folds flat for container shipping',
  'Steel frame with rockwool sandwich panels',
  'Optional bathroom and kitchenette modules',
  'Optional AC/heating, hot water, and solar',
];

const keyFeatures = [
  { icon: Clock, title: 'Sets Up in Hours', text: 'Unfolds and locks into a finished shelter in hours, not days.' },
  { icon: Flame, title: 'Fire-Grade A Materials', text: 'Fireproof rockwool sandwich panels meet Grade A fire ratings.' },
  { icon: Package, title: 'Folds Flat to Ship', text: 'Collapses to a 1.2 ft profile - fits inside a standard shipping container.' },
  { icon: Boxes, title: 'Modular Options', text: 'Add bathroom, kitchenette, AC/heating, hot water, and solar modules.' },
  { icon: ShieldCheck, title: 'Steel-Frame Build', text: 'A rigid steel frame and insulated panels stand up to harsh conditions.' },
  { icon: Truck, title: 'Rapidly Deployable', text: 'Stack and transport many units at once for large-scale response.' },
];

const useCases = [
  { icon: LifeBuoy, title: 'Disaster Relief', text: 'Immediate shelter for families displaced by a disaster.' },
  { icon: HardHat, title: 'Workforce Housing', text: 'Temporary lodging for remote crews and job sites.' },
  { icon: Shield, title: 'Military Deployment', text: 'Rapid, rugged shelter for field operations.' },
  { icon: Users, title: 'Refugee Housing', text: 'Dignified, durable housing for humanitarian programs.' },
  { icon: Briefcase, title: 'Construction Office', text: 'A secure on-site office that sets up in hours.' },
];

const frames = [
  { src: '/images/frames/emergency-frame.png', alt: 'Steel frame of a folding emergency house.', caption: 'Foldable Steel Frame System', width: 352, height: 236 },
];

const documentationSection = (
  <section className="scroll-mt-24 rounded-2xl border border-white/10 bg-bb-surface-dark p-6 lg:p-10">
    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue">Documentation</p>
    <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">How It Works</h2>
    <p className="mt-4 max-w-2xl text-gray-300">
      Specifications, components, and the three-step setup process at a glance.
    </p>
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      {documentation.map((doc) => (
        <figure
          key={doc.src}
          className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1"
        >
          <ClickableImage
            src={doc.src}
            alt={doc.caption}
            caption={doc.caption}
            fill
            sizes="(min-width: 768px) 28rem, 100vw"
            className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-white"
            imgClassName="object-contain p-2"
          />
          <figcaption className="px-2 py-3 text-center text-sm text-gray-300">{doc.caption}</figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default function EmergencyHousingPage() {
  return (
    <ProductPageTemplate
      name="Emergency Housing"
      tagline="Rapidly deployable emergency and disaster housing. Set up in hours, not days."
      description="Fire-grade folding shelters that ship flat and unfold into finished housing on site - built for speed when it matters most."
      price="$2,000"
      priceLabel="Starting at"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      intro="When disaster strikes or crews deploy, speed is everything. Bright Box Emergency Housing ships folded flat - fitting into a standard shipping container - and unfolds into a finished, fire-grade shelter in hours, not days. Built from fireproof rockwool sandwich panels on a steel frame, each unit can be outfitted with bathroom, kitchenette, climate, and power modules to suit disaster relief, workforce, military, and humanitarian deployments."
      keyFeatures={keyFeatures}
      useCases={useCases}
      afterGalleries={documentationSection}
      frames={frames}
      warmCards
      afterContent={<UpgradesGrid />}
      specs={specs}
      features={features}
    />
  );
}
