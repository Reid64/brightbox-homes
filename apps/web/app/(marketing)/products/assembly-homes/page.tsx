import type { Metadata } from 'next';
import { Box, LayoutGrid, Layers, Wallet, Zap, Hammer, HardHat, GraduationCap, Briefcase } from 'lucide-react';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Assembly Homes | Bright Box Homes',
  description:
    'Modular Assembly Homes from $25,995 per unit. Connect ~171 sq ft units in any arrangement - stack, line up, L-shape, or U-shape. Each unit independently wired and plumbed.',
};

// Real assembly-home photography (the earlier render set was duplicated and has
// been removed per the gallery cleanup).
const exteriorImages = [
  { src: '/images/products/assembly-homes/exterior/09.jpg', alt: 'Two-story light-brown modular assembly home with a balcony among palm trees.' },
  { src: '/images/products/assembly-homes/exterior/10.jpg', alt: 'Two-story white modular assembly home with a balcony and external staircase.' },
  { src: '/images/products/assembly-homes/exterior/05.png', alt: 'Two-story white modular assembly home with a glass front and balcony.' },
  { src: '/images/products/assembly-homes/exterior/06.png', alt: 'Single-story glass-front modular assembly home.' },
  { src: '/images/products/assembly-homes/exterior/07.png', alt: 'Two-story brown and white modular assembly home with a balcony.' },
  { src: '/images/products/assembly-homes/exterior/08.png', alt: 'Two-story glass modular assembly home on a hillside.' },
];

const specs = [
  { label: 'Unit Size', value: '~171 sq ft per module' },
  { label: 'Price Range', value: '$25,995 - $29,995 per unit' },
  { label: 'Configuration', value: 'Stack, line up, L-shape, or U-shape' },
  { label: 'Utilities', value: 'Each unit independently wired and plumbed' },
  { label: 'Bathroom', value: 'Modular bathroom option' },
  { label: 'Kitchen', value: 'Modular kitchenette option' },
];

const features = [
  'Approximately 171 sq ft per modular unit',
  'Connect units in any arrangement',
  'Stack for multi-story configurations',
  'Each unit independently wired and plumbed',
  'Optional modular bathroom and kitchenette',
  'Add units as your needs grow',
];

const intro =
  "Assembly Homes are modular building blocks: compact units, approximately 171 sq ft each, engineered to connect in any arrangement. Stack them for multi-story, line them up for multi-room, or wrap them into an L or U - and because each unit ships independently wired and plumbed, you can start small and add more as your needs grow. It is the most flexible, affordable way to build, whether you are creating a studio, a storefront, or a whole complex.";

const keyFeatures = [
  { icon: Box, title: 'Approx 171 Sq Ft Units', text: 'Each module is roughly 171 sq ft - a consistent, repeatable building block.' },
  { icon: LayoutGrid, title: 'Any Configuration', text: 'Connect units in any arrangement - line up, L-shape, U-shape, or courtyard.' },
  { icon: Layers, title: 'Stack for Multi-Story', text: 'Stack modules vertically to build two-story and multi-story structures.' },
  { icon: Wallet, title: 'Affordable & Scalable', text: 'Start with one unit and add more as your needs and budget grow.' },
  { icon: Zap, title: 'Independently Serviced', text: 'Every unit is independently wired and plumbed for flexible layouts.' },
  { icon: Hammer, title: 'Fast Modular Build', text: 'Factory-built modules assemble on site far faster than traditional construction.' },
];

const useCases = [
  { icon: Wallet, title: 'Affordable Housing', text: 'Low-cost, expandable homes for first-time and budget buyers.' },
  { icon: HardHat, title: 'Workforce Housing', text: 'Durable, repeatable lodging for crews and remote sites.' },
  { icon: GraduationCap, title: 'Student Housing', text: 'High-density, cost-efficient residence configurations.' },
  { icon: Briefcase, title: 'Modular Office', text: 'Connect units into flexible commercial or office space.' },
];

const frames = [
  { src: '/images/frames/assembly-frame.webp', alt: 'Steel frame of an assembly modular unit.', caption: 'Modular Steel Frame Unit', width: 800, height: 571 },
];

export default function AssemblyHomesPage() {
  return (
    <ProductPageTemplate
      name="Assembly Homes"
      tagline="Modular units that join together to create custom multi-room layouts."
      description="Assembly Homes are compact modular units engineered to connect side-by-side and stack, letting you compose anything from a single studio to a multi-room layout or a commercial storefront. Each unit can be equipped with a modular bathroom and kitchenette. For multi-story apartment and office developments, see our Apartments & Office Buildings line."
      price="$25,995 - $29,995"
      priceLabel="Starting at"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      intro={intro}
      keyFeatures={keyFeatures}
      useCases={useCases}
      frames={frames}
      specs={specs}
      features={features}
    />
  );
}
