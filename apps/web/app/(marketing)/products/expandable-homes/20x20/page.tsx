import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import { exteriorImages, interiorImages, features, upgrades } from '@/components/products/expandableData';

export const metadata: Metadata = {
  title: '20x20 Expandable Home | Bright Box Homes',
  description:
    'The 20x20 Expandable Home from $35,995. A 400 sq ft steel-frame home available in 1, 2, or 3 bedroom layouts with mini-split HVAC, tankless water heater, and a covered porch.',
};

const floorPlans = [
  { name: '1 Bedroom', src: '/images/floor-plans/expandable-20x20-1br-preview.png', alt: '20x20 one-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x20-1br.pdf', width: 1191, height: 1684 },
  { name: '2 Bedroom', src: '/images/floor-plans/expandable-20x20-2br-preview.png', alt: '20x20 two-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x20-2br.pdf', width: 1191, height: 1684 },
  { name: '3 Bedroom', src: '/images/floor-plans/expandable-20x20-3br-preview.png', alt: '20x20 three-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x20-3br.pdf', width: 1191, height: 1684 },
];

const specs = [
  { label: 'Footprint', value: "20' x 20'" },
  { label: 'Area', value: '~400 sq ft' },
  { label: 'Layouts', value: '1, 2, or 3 bedroom' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Roof', value: '24-gauge corrugated metal' },
  { label: 'HVAC', value: '24,000 BTU mini-split' },
  { label: 'Water Heater', value: 'Tankless' },
  { label: 'Exterior Colors', value: '60+ RAL options' },
  { label: 'Price', value: '$35,995' },
];

export default function Expandable20x20Page() {
  return (
    <ProductPageTemplate
      name="20x20 Expandable Home"
      tagline="400 sq ft in your choice of 1, 2, or 3 bedroom layouts."
      description="The 20x20 is our most versatile expandable home - 400 sq ft of finished living space available in one-, two-, or three-bedroom layouts. Built on a galvanized steel frame with expandable side sections, it works equally well as a primary residence, rental, or multi-room ADU. Every unit ships standard with a mini-split HVAC system, tankless water heater, induction kitchen, and a covered front porch, with 60+ RAL exterior colors to choose from."
      price="$35,995"
      priceLabel="Starting at"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      interiorImages={interiorImages}
      floorPlans={floorPlans}
      upgrades={upgrades}
      specs={specs}
      features={features}
    />
  );
}
