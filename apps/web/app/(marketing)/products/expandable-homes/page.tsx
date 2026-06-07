import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Expandable Container Homes | Bright Box Homes',
  description:
    'Steel-frame expandable container homes from $35,995. 200-800 sq ft with expandable side sections, 60+ exterior colors, mini-split HVAC, and a tankless water heater. Delivered anywhere in the US.',
};

const images = [
  { src: '/images/products/expandable-homes/01.png', alt: 'Two-story expandable container home with balconies and landscaped gardens.' },
  { src: '/images/products/expandable-homes/02.png', alt: 'Two-story expandable home with a family enjoying the backyard.' },
  { src: '/images/products/expandable-homes/03.png', alt: 'Single-story expandable home with a covered front porch.' },
  { src: '/images/products/expandable-homes/04.png', alt: 'Compact expandable home with a carport and gravel driveway.' },
  { src: '/images/products/expandable-homes/05.png', alt: 'Expandable home with glass walls and landscaped garden lighting.' },
  { src: '/images/products/expandable-homes/06.png', alt: '3D floor plan showing an expandable home interior layout.' },
  { src: '/images/products/expandable-homes/07.jpg', alt: 'Expandable home kitchen with white cabinets and a double sink.' },
  { src: '/images/products/expandable-homes/08.png', alt: 'Expandable home kitchen with white cabinetry and countertop.' },
  { src: '/images/products/expandable-homes/09.png', alt: 'Expandable home bathroom with a glass shower stall and vanity.' },
  { src: '/images/products/expandable-homes/10.png', alt: 'Expandable home kitchen with shelving and a U-shaped counter.' },
];

const specs = [
  { label: 'Models', value: '5 (20x10, 20x20, 20x30, 20x40, Duplex)' },
  { label: 'Sq Ft Range', value: '200 - 800' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Exterior Colors', value: '60+ RAL options' },
  { label: 'Roof', value: '24-gauge corrugated metal, 19 colors' },
  { label: 'Windows', value: '9-10 dual-pane (size dependent)' },
  { label: 'Electrical', value: '125-amp panel, 33x 110V, 3x 240V, 7x GFCI' },
  { label: 'HVAC', value: '24,000 BTU 20 SEER mini-split' },
  { label: 'Water Heater', value: 'Tankless' },
  { label: 'Price Range', value: '$35,995 - $64,995' },
];

const features = [
  'Induction stove with range hood',
  'Walk-in shower with fixtures',
  'Tankless water heater',
  '24,000 BTU mini-split HVAC',
  'Covered front porch with railing',
  'Washer/dryer hookups',
  'Garbage disposal',
  'Dual-pane windows throughout',
  'Upgraded 125-amp electrical panel',
  '60+ RAL exterior color choices',
];

export default function ExpandableHomesPage() {
  return (
    <ProductPageTemplate
      name="Expandable Container Homes"
      tagline="Steel-frame construction with expandable side sections. 200 to 800 sq ft."
      description="Our flagship line. Expandable container homes ship compact and unfold on site into 200 to 800 sq ft of finished living space. Built on a galvanized steel frame with a 24-gauge metal pitched roof, each home arrives fully equipped with a mini-split HVAC system, tankless water heater, induction kitchen, and a covered front porch. Choose from 60+ RAL exterior colors and five floor-plan sizes, from the 20x10 studio to the 20x20 stacked duplex."
      price="$35,995"
      priceLabel="Starting at"
      images={images}
      specs={specs}
      features={features}
    />
  );
}
