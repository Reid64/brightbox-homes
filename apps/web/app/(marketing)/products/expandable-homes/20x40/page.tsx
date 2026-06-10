import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import UpgradesGrid from '@/components/products/UpgradesGrid';
import { exteriorImages, interiorImages, features, intro, keyFeatures, useCases, frames } from '@/components/products/expandableData';

export const metadata: Metadata = {
  title: '20x40 Expandable Home | Bright Box Homes',
  description:
    'The 20x40 Expandable Home from $59,995. An 800 sq ft steel-frame home available in 1 or 2 bedroom layouts with mini-split HVAC, tankless water heater, and a covered porch.',
};

const floorPlans = [
  { name: '1 Bedroom', src: '/images/floor-plans/expandable-20x40-1br-preview.png', alt: '20x40 one-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x40-1br.pdf', width: 1191, height: 1684 },
  { name: '2 Bedroom', src: '/images/floor-plans/expandable-20x40-2br-preview.png', alt: '20x40 two-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x40-2br.pdf', width: 1191, height: 1684 },
];

const specs = [
  { label: 'Footprint', value: "20' x 40'" },
  { label: 'Area', value: '~800 sq ft' },
  { label: 'Layouts', value: '1 or 2 bedroom' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Roof', value: '24-gauge corrugated metal' },
  { label: 'HVAC', value: '24,000 BTU mini-split' },
  { label: 'Water Heater', value: 'Tankless' },
  { label: 'Exterior Colors', value: '60+ RAL options' },
  { label: 'Price', value: '$59,995' },
];

const pageImages = [
  { src: '/images/products/expandable-homes/exterior/model-20x40-a.jpg', alt: 'Gray and white 20x40 expandable home in an open field.' },
  { src: '/images/products/expandable-homes/exterior/model-20x40-b.jpg', alt: 'Wood-front 20x40 expandable home with a covered porch.' },
  ...exteriorImages,
];

export default function Expandable20x40Page() {
  return (
    <ProductPageTemplate
      name="20x40 Expandable Home"
      tagline="Our largest single-story home - 800 sq ft in 1 or 2 bedroom layouts."
      description="The 20x40 is our largest single-story expandable home - 800 sq ft of finished living space in one- or two-bedroom layouts. Built on a galvanized steel frame with expandable side sections, it delivers full-home comfort with room for a generous living area, full kitchen, and multiple bedrooms. Every unit ships standard with a mini-split HVAC system, tankless water heater, induction kitchen, and a covered front porch, with 60+ RAL exterior colors to choose from."
      price="$59,995"
      priceLabel="Starting at"
      heroImages={pageImages}
      exteriorImages={pageImages}
      interiorImages={interiorImages}
      intro={intro}
      keyFeatures={keyFeatures}
      useCases={useCases}
      floorPlans={floorPlans}
      frames={frames}
      warmCards
      afterContent={<UpgradesGrid />}
      specs={specs}
      features={features}
    />
  );
}
