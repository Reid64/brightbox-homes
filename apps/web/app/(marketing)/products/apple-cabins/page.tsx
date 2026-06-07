import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Apple Cabin Homes | Bright Box Homes',
  description:
    'Rounded aluminum-panel Apple Cabins with fluorocarbon coating, double-pane insulated glass, and microcrystalline stone flooring. Ideal for Airbnb, glamping, and backyard studios.',
};

const exteriorImages = [
  { src: '/images/products/apple-cabins/exterior/01.jpg', alt: 'Apple Cabin with a deck overlooking water.' },
  { src: '/images/products/apple-cabins/exterior/02.jpg', alt: 'Apple Cabins arranged as a lakeside glamping resort.' },
  { src: '/images/products/apple-cabins/exterior/03.jpg', alt: 'Apple Cabins beside a quarry lake.' },
  { src: '/images/products/apple-cabins/exterior/04.jpg', alt: 'Aerial view of an Apple Cabin glamping village by the water.' },
  { src: '/images/products/apple-cabins/exterior/05.jpg', alt: 'Apple Cabin with lounge chairs on a grassy lawn.' },
];

const interiorImages = [
  { src: '/images/products/apple-cabins/interior/01.jpg', alt: 'Furnished Apple Cabin interior with dining, sofa, and bed.' },
  { src: '/images/products/apple-cabins/interior/02.jpg', alt: 'Apple Cabin interior with a bed, sofa, and floor-to-ceiling glass.' },
  { src: '/images/products/apple-cabins/interior/03.jpg', alt: 'Apple Cabin bedroom with plaid armchairs and a garden view.' },
  { src: '/images/products/apple-cabins/interior/04.jpg', alt: 'Luxury Apple Cabin interior with a bed, lounge chair, and skylight.' },
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
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      interiorImages={interiorImages}
      specs={specs}
      features={features}
    />
  );
}
