import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import DuplexSection from '@/components/products/DuplexSection';
import { duplexImages } from '@/components/products/expandableData';

export const metadata: Metadata = {
  title: '20x20 Duplex | Bright Box Homes',
  description:
    'The Bright Box 20x20 Duplex - two expandable container homes stacked into one two-story footprint. Live in one, rent the other. Rental-ready in weeks, at a fraction of traditional duplex construction cost.',
};

const heroImages = [
  { src: '/images/products/duplex/hero.png', alt: 'Two-story Bright Box duplex with balconies and a family in the backyard.' },
];

const specs = [
  { label: 'Footprint', value: "20' x 20' (two-story)" },
  { label: 'Combined Area', value: '~800 sq ft' },
  { label: 'Units', value: 'Two independent units' },
  { label: 'Roof', value: 'Full metal truss and metal roof' },
  { label: 'HVAC', value: 'Mini-split in each unit' },
  { label: 'Price', value: 'Starting at $59,995' },
];

const features = [
  'Full metal truss and metal roof system',
  'Covered front porch and deck',
  'Railing and staircase to upper unit',
  'Mini-split HVAC in each unit',
  'Independent electrical, plumbing, and climate control per unit',
];

export default function ExpandableDuplexPage() {
  return (
    <ProductPageTemplate
      name="20x20 Duplex"
      tagline="Two homes, one footprint - an income property from day one."
      description="The Bright Box Duplex stacks two expandable units into a single two-story footprint - live in one and rent the other. Each unit is independently plumbed, wired, and climate-controlled, with a full metal roof, covered porch and deck, and a staircase to the upper unit. It is the simplest way to turn a home purchase into an income-producing asset."
      price="$59,995"
      priceLabel="Starting at"
      heroImages={heroImages}
      exteriorImages={duplexImages}
      afterGalleries={<DuplexSection images={[]} />}
      warmCards
      specs={specs}
      features={features}
    />
  );
}
