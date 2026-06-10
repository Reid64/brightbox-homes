import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import UpgradesGrid from '@/components/products/UpgradesGrid';
import { exteriorImages, interiorImages, features, upgrades, intro, keyFeatures, useCases, frames } from '@/components/products/expandableData';

export const metadata: Metadata = {
  title: '20x30 Expandable Home | Bright Box Homes',
  description:
    'The 20x30 Expandable Home from $49,995. A 600 sq ft steel-frame home with expandable side sections, mini-split HVAC, tankless water heater, and a covered porch.',
};

const specs = [
  { label: 'Footprint', value: "20' x 30'" },
  { label: 'Area', value: '~600 sq ft' },
  { label: 'Layouts', value: 'Multi-bedroom configurations' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Roof', value: '24-gauge corrugated metal' },
  { label: 'HVAC', value: '24,000 BTU mini-split' },
  { label: 'Water Heater', value: 'Tankless' },
  { label: 'Exterior Colors', value: '60+ RAL options' },
  { label: 'Price', value: '$49,995' },
];

const pageImages = [
  { src: '/images/products/expandable-homes/exterior/model-20x30.png', alt: 'Wood-finish 20x30 expandable home with dark trim.' },
  ...exteriorImages,
];

export default function Expandable20x30Page() {
  return (
    <ProductPageTemplate
      name="20x30 Expandable Home"
      tagline="600 sq ft of finished living space for growing families."
      description="The 20x30 expands to 600 sq ft of finished living space - room for multiple bedrooms, a full kitchen, and a comfortable living area. Built on a galvanized steel frame with expandable side sections, it bridges the gap between our compact studios and our largest family homes. Every unit ships standard with a mini-split HVAC system, tankless water heater, induction kitchen, and a covered front porch, with 60+ RAL exterior colors to choose from."
      price="$49,995"
      priceLabel="Starting at"
      heroImages={pageImages}
      exteriorImages={pageImages}
      interiorImages={interiorImages}
      intro={intro}
      keyFeatures={keyFeatures}
      useCases={useCases}
      upgrades={upgrades}
      frames={frames}
      warmCards
      afterContent={<UpgradesGrid />}
      specs={specs}
      features={features}
    />
  );
}
