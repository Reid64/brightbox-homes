import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import UpgradesGrid from '@/components/products/UpgradesGrid';
import { exteriorImages, interiorImages, features, upgrades, intro, keyFeatures, useCases, frames } from '@/components/products/expandableData';

export const metadata: Metadata = {
  title: '20x10 Expandable Home - Studio | Bright Box Homes',
  description:
    'The 20x10 Expandable Home studio from $35,995. A 200 sq ft steel-frame studio with a full kitchen and bathroom, mini-split HVAC, and a covered porch. Delivered anywhere in the US.',
};

const floorPlans = [
  { name: 'Studio Layout', src: '/images/floor-plans/expandable-20x10-studio.png', alt: '20x10 studio floor plan.', width: 1585, height: 951 },
  { name: 'Studio Layout (Furnished)', src: '/images/floor-plans/expandable-20x10-studio-2.png', alt: 'Furnished 20x10 studio floor plan.', width: 1597, height: 985 },
];

const specs = [
  { label: 'Footprint', value: "20' x 10'" },
  { label: 'Area', value: '~200 sq ft' },
  { label: 'Layout', value: 'Studio (1 room, 1 bath)' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Roof', value: '24-gauge corrugated metal' },
  { label: 'HVAC', value: '24,000 BTU mini-split' },
  { label: 'Water Heater', value: 'Tankless' },
  { label: 'Exterior Colors', value: '60+ RAL options' },
  { label: 'Price', value: '$35,995' },
];

const pageImages = [
  { src: '/images/products/expandable-homes/exterior/model-20x10-front.png', alt: 'White 20x10 expandable home with black trim.' },
  ...exteriorImages,
];

export default function Expandable20x10Page() {
  return (
    <ProductPageTemplate
      name="20x10 Expandable Home - Studio"
      tagline="A compact 200 sq ft studio that ships flat and unfolds in hours."
      description="The 20x10 is our most compact expandable home - a 200 sq ft studio that arrives on a galvanized steel frame and unfolds on site into a finished single room with a full kitchen and bathroom. It makes an ideal backyard ADU, guest suite, rental unit, or off-grid cabin. Every unit ships standard with a mini-split HVAC system, tankless water heater, induction kitchen, and a covered front porch."
      price="$35,995"
      priceLabel="Starting at"
      heroImages={pageImages}
      exteriorImages={pageImages}
      interiorImages={interiorImages}
      intro={intro}
      keyFeatures={keyFeatures}
      useCases={useCases}
      floorPlans={floorPlans}
      upgrades={upgrades}
      frames={frames}
      warmCards
      afterContent={<UpgradesGrid />}
      specs={specs}
      features={features}
    />
  );
}
