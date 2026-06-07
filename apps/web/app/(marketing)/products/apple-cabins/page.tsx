import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Apple Cabin Homes | Bright Box Homes',
  description:
    'Rounded aluminum-panel Apple Cabins with fluorocarbon coating, double-pane insulated glass, and microcrystalline stone flooring. Ideal for Airbnb, glamping, and backyard studios.',
};

const images = [
  { src: '/images/products/apple-cabins/01.png', alt: 'Apple Cabin with rounded aluminum panels and floor-to-ceiling glass.' },
  { src: '/images/products/apple-cabins/02.png', alt: 'Apple Cabin in a forest clearing at dusk.' },
  { src: '/images/products/apple-cabins/03.png', alt: 'Apple Cabin on a tropical beach at sunset.' },
  { src: '/images/products/apple-cabins/04.png', alt: 'Apple Cabin among pine trees with a carport.' },
  { src: '/images/products/apple-cabins/05.png', alt: 'Apple Cabin with a rooftop terrace at dusk.' },
  { src: '/images/products/apple-cabins/06.png', alt: 'Apple Cabin with a mountain backdrop at sunset.' },
  { src: '/images/products/apple-cabins/07.png', alt: 'Elevated Apple Cabin over a carport at twilight.' },
  { src: '/images/products/apple-cabins/08.jpg', alt: 'Apple Cabin living room with curved glass and forest views.' },
  { src: '/images/products/apple-cabins/09.jpg', alt: 'Apple Cabin interior with a kitchenette and lounge seating.' },
  { src: '/images/products/apple-cabins/10.jpg', alt: 'Furnished Apple Cabin studio with dining and sleeping areas.' },
];

const specs = [
  { label: 'Construction', value: 'Aluminum panel with fluorocarbon coating' },
  { label: 'Insulation', value: 'Polyurethane' },
  { label: 'Glass', value: 'Double-pane insulated' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Flooring', value: 'Microcrystalline stone' },
  { label: 'Available Model', value: '27\'11" L x 10\'10" W x 10\'6" H' },
  { label: 'Approx Sq Ft', value: '302' },
];

const features = [
  'Fluorocarbon-coated aluminum panels',
  'Double-pane insulated glass',
  'Galvanized steel frame',
  'Microcrystalline stone flooring',
  'Polyurethane insulation',
  'Rounded organic aesthetic',
];

export default function AppleCabinsPage() {
  return (
    <ProductPageTemplate
      name="Apple Cabin Homes"
      tagline="Rounded aluminum-panel cabins with fluorocarbon coating. Perfect for Airbnb, glamping, and backyard studios."
      description="The Apple Cabin pairs a rounded, organic silhouette with premium materials: fluorocarbon-coated aluminum panels, double-pane insulated glass, a galvanized steel frame, and microcrystalline stone flooring over polyurethane insulation. The result is a weather-resilient, low-maintenance retreat that works as a short-term rental, a glamping unit, or a backyard studio. Pricing is being finalized for the US market."
      price="Coming Soon"
      priceLabel="Pricing"
      images={images}
      specs={specs}
      features={features}
    />
  );
}
