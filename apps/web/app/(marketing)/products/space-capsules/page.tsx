import type { Metadata } from 'next';
import { BedDouble, Tent, Briefcase, Users, Sparkles, ShieldCheck, Thermometer, Bath, LayoutGrid, Sun } from 'lucide-react';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

const intro =
  'The Space Capsule is the futuristic statement piece of the lineup - a panoramic glass pod that turns any setting into a destination. Floor-to-ceiling LOW-E glass, a private balcony, and a smart, fully-finished interior make it equally at home as a luxury rental, a lakeside resort unit, or a serene backyard office. Nine layouts scale from a compact solo pod to a two-bedroom cabin.';

const keyFeatures = [
  { icon: Sparkles, title: 'Panoramic Glass', text: 'Floor-to-ceiling LOW-E tempered glass curtain walls flood the pod with light.' },
  { icon: ShieldCheck, title: 'Steel + Aluminum Build', text: 'Galvanized steel frame with an insulated, waterproof, shock-proof shell.' },
  { icon: Thermometer, title: 'Climate Ready', text: 'Air conditioning and an insulated shell keep it comfortable in any season.' },
  { icon: Bath, title: 'Smart Bathroom', text: 'Full bath with marble floor, bath heater, and a smart toilet.' },
  { icon: LayoutGrid, title: 'Nine Layouts', text: 'Choose from nine models, ~129 to ~463 sq ft, solo pod to two-bedroom.' },
  { icon: Sun, title: 'Resort-Grade Finish', text: 'A panoramic balcony and exterior light belt give it a premium silhouette.' },
];

export const metadata: Metadata = {
  title: 'Space Capsule Homes | Bright Box Homes',
  description:
    'Panoramic glass Space Capsule homes with LOW-E tempered glass curtain walls, smart interiors, and resort-grade finishes. Nine layouts from a solo pod to a two-bedroom cabin. Ideal for Airbnb, glamping, offices, and guest suites.',
};

const exteriorImages = [
  { src: '/images/products/space-capsules/exterior/01.png', alt: 'Space Capsule home with orange accents overlooking a lake at sunset.' },
  { src: '/images/products/space-capsules/exterior/02.png', alt: 'Space Capsule home with an American flag beside a lake.' },
  { src: '/images/products/space-capsules/exterior/03.png', alt: 'Space Capsule home with purple LED accents at dusk.' },
  { src: '/images/products/space-capsules/exterior/04.png', alt: 'Space Capsule home with sculpted white panels in a garden.' },
  { src: '/images/products/space-capsules/exterior/05.png', alt: 'Space Capsule home on a lakeside glamping deck at sunset.' },
  { src: '/images/products/space-capsules/exterior/06.jpg', alt: 'Space Capsule pod with a deck overlooking water.' },
  { src: '/images/products/space-capsules/exterior/07.jpg', alt: 'Space Capsule pods arranged as a lakeside resort.' },
  { src: '/images/products/space-capsules/exterior/08.jpg', alt: 'Space Capsule pods beside a quarry lake.' },
  { src: '/images/products/space-capsules/exterior/09.jpg', alt: 'Aerial view of a Space Capsule pod village by the water.' },
  { src: '/images/products/space-capsules/exterior/10.jpg', alt: 'Space Capsule pod with lounge chairs on a grassy lawn.' },
];

const interiorImages = [
  { src: '/images/products/space-capsules/interior/01.jpg', alt: 'Space Capsule living area with curved glass and forest views.' },
  { src: '/images/products/space-capsules/interior/02.jpg', alt: 'Space Capsule interior with a kitchenette and lounge seating.' },
  { src: '/images/products/space-capsules/interior/03.jpg', alt: 'Furnished Space Capsule interior with dining, sofa, and bed.' },
  { src: '/images/products/space-capsules/interior/04.jpg', alt: 'Space Capsule interior with a bed, sofa, and floor-to-ceiling glass.' },
];

const specs = [
  { label: 'Construction', value: 'Galvanized steel frame, aluminum alloy housing' },
  { label: 'Shell', value: 'Insulated, waterproof, shock-proof' },
  { label: 'Glazing', value: 'Hollow LOW-E tempered glass curtain wall and skylight' },
  { label: 'Flooring', value: 'Environmental SPC (marble in bathroom)' },
  { label: 'Climate', value: 'Air conditioner (underfloor heating optional)' },
  { label: 'Ceiling Height', value: '~10\'6"' },
  { label: 'Layouts', value: '9 models, ~129 to ~463 sq ft' },
  { label: 'Bathroom', value: 'Full bath with smart toilet' },
];

const features = [
  'Galvanized steel frame with aluminum alloy housing',
  'Insulated, waterproof, and shock-proof shell',
  'Hollow LOW-E tempered glass curtain wall',
  'Hollow LOW-E tempered glass skylight',
  'Panoramic balcony',
  'Exterior surround silicone light belt',
  'Custom entry door',
  'Custom aluminum ceiling with fiber wall panels',
  'Environmental SPC flooring with marble bathroom floor',
  'Full bathroom with privacy glass door and bath heater',
  'Smart toilet, faucet, shower, and floor drain',
  'Washbasin, sink, mirror, and towel rack',
  'Electric curtain track',
  'Air conditioner',
];

const upgrades = [
  {
    category: 'Optional Upgrades',
    items: [
      { name: 'Underfloor heating system' },
      { name: 'Projection screen' },
      { name: 'Entrance staircase' },
      { name: 'Water supply and drainage thermal insulation' },
      { name: 'Shell color-change spray' },
      { name: 'Renovation plan upgrades' },
    ],
  },
];

const floorPlans = [
  {
    name: '27\'11" Model',
    src: '/images/floor-plans/space-capsule-27-11.png',
    alt: 'Space Capsule floor plan, 27 feet 11 inches long.',
    width: 1708,
    height: 921,
  },
  {
    name: '37\'9" Model',
    src: '/images/floor-plans/space-capsule-37-9.png',
    alt: 'Space Capsule floor plan, 37 feet 9 inches long.',
    width: 1774,
    height: 887,
  },
];

const useCases = [
  {
    icon: BedDouble,
    title: 'Airbnb & Short-Term Rental',
    text: 'Drop a turnkey, fully finished pod on your lot and start hosting. Panoramic glass and smart interiors photograph beautifully and command premium nightly rates.',
  },
  {
    icon: Tent,
    title: 'Glamping & Resort',
    text: 'Floor-to-ceiling LOW-E glass, a private panoramic balcony, and an exterior light belt make each capsule a destination - cluster several into a lakeside or mountain resort.',
  },
  {
    icon: Briefcase,
    title: 'Backyard Office & Studio',
    text: 'A quiet, climate-controlled, fully insulated workspace just steps from home - ideal for a home office, meditation studio, or creative retreat.',
  },
  {
    icon: Users,
    title: 'Guest Suite',
    text: 'A self-contained guest room with a full bathroom, smart toilet, and air conditioning - private accommodation without an addition to your main house.',
  },
];

const modelLineup = [
  { model: 'V9', size: "43' x 11'", area: '463 sq ft', layout: '2 bedroom, 1 bath' },
  { model: 'V7', size: "38' x 11'", area: '409 sq ft', layout: '2 bedroom, 1 bath' },
  { model: 'F7', size: "31' x 11'", area: '344 sq ft', layout: '2 bedroom, 1 bath' },
  { model: 'V6', size: "28' x 11'", area: '301 sq ft', layout: '2 bedroom, 1 bath' },
  { model: 'V5', size: "28' x 11'", area: '301 sq ft', layout: '1 room, 1 bath' },
  { model: 'F5', size: "22' x 11'", area: '248 sq ft', layout: '1 room, 1 bath' },
  { model: 'V3', size: "19' x 10'6\"", area: '194 sq ft', layout: '1 room, 1 bath' },
  { model: 'T3', size: "14'9\" round", area: '172 sq ft', layout: '1 room, 1 bath' },
  { model: 'V1', size: "13' x 10'", area: '129 sq ft', layout: '1 room, 1 bath' },
];

const frames = [
  { src: '/images/frames/space-frame.png', alt: 'Galvanized steel frame of a Space Capsule.', caption: 'Galvanized steel frame with an insulated, waterproof, shock-proof shell.', width: 1666, height: 944 },
];

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue';

const spaceCapsuleSections = (
  <>
    {/* Use Cases */}
    <section className="bg-bb-charcoal py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className={label}>Use Cases</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          One Pod, Many Lives
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.title}
                className="rounded-xl border border-white/5 bg-bb-surface-dark p-6"
              >
                <Icon size={28} aria-hidden="true" className="text-bb-blue" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                  {uc.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300">{uc.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Model Lineup */}
    <section className="bg-bb-surface-dark py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className={label}>Model Lineup</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Nine Layouts to Choose From
        </h2>
        <p className="mt-4 max-w-2xl text-gray-300">
          From a compact solo pod to a spacious two-bedroom cabin. Every model
          ships with the same standard finishes - choose the footprint that fits
          your site and use case.
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.15em] text-bb-blue">
                <th className="py-3 pr-4 font-medium">Model</th>
                <th className="py-3 pr-4 font-medium">Footprint</th>
                <th className="py-3 pr-4 font-medium">Area</th>
                <th className="py-3 font-medium">Layout</th>
              </tr>
            </thead>
            <tbody>
              {modelLineup.map((m) => (
                <tr key={m.model} className="border-b border-white/5">
                  <td className="py-4 pr-4 font-heading font-semibold text-white">{m.model}</td>
                  <td className="py-4 pr-4 font-mono text-gray-300">{m.size}</td>
                  <td className="py-4 pr-4 font-mono text-gray-300">{m.area}</td>
                  <td className="py-4 text-gray-300">{m.layout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          All models stand approximately 10&apos;6&quot; tall. Dimensions are
          approximate and subject to final configuration.
        </p>
      </div>
    </section>
  </>
);

export default function SpaceCapsulesPage() {
  return (
    <ProductPageTemplate
      name="Space Capsule Homes"
      tagline="Panoramic glass capsule homes with resort-grade finishes - nine layouts."
      description="The Bright Box Space Capsule is a panoramic glass capsule home built on a galvanized steel frame with an aluminum alloy housing and an insulated, waterproof, shock-proof shell. Floor-to-ceiling hollow LOW-E tempered glass curtain walls and a matching skylight wrap each pod in light, while a panoramic balcony and an exterior silicone light belt give it a striking, resort-grade silhouette. Inside, every capsule is finished with environmental SPC flooring, custom aluminum ceilings and fiber wall panels, a full bathroom with marble floor, bath heater, and smart toilet, electric curtain tracks, and air conditioning. Choose from nine layouts - from a 129 sq ft solo pod to a 463 sq ft two-bedroom cabin. Pricing is being finalized for the US market."
      price="Coming Soon"
      priceLabel="Pricing"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      interiorImages={interiorImages}
      intro={intro}
      keyFeatures={keyFeatures}
      afterGalleries={spaceCapsuleSections}
      floorPlans={floorPlans}
      frames={frames}
      upgrades={upgrades}
      specs={specs}
      features={features}
    />
  );
}
