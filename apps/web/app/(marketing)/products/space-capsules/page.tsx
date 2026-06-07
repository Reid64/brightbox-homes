import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Space Capsule Homes | Bright Box Homes',
  description:
    'Futuristic Space Capsule pods with fluorocarbon-coated aluminum panels and double-pane insulated glass. Ideal for backyard offices, studios, guest quarters, and glamping.',
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
  { src: '/images/products/space-capsules/interior/05.jpg', alt: 'Space Capsule bedroom with armchairs and a garden view.' },
  { src: '/images/products/space-capsules/interior/06.jpg', alt: 'Luxury Space Capsule interior with a bed, lounge chair, and skylight.' },
];

const specs = [
  { label: 'Construction', value: 'Aluminum panel with fluorocarbon coating' },
  { label: 'Insulation', value: 'Polyurethane' },
  { label: 'Glass', value: 'Double-pane insulated' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Flooring', value: 'Microcrystalline stone' },
  { label: 'Available Models', value: '27\'11" and 37\'9" lengths' },
];

const features = [
  'Fluorocarbon-coated aluminum panels',
  'Double-pane insulated glass',
  'Galvanized steel frame',
  'Microcrystalline stone flooring',
  'Polyurethane insulation',
  'Futuristic pod aesthetic',
];

export default function SpaceCapsulesPage() {
  return (
    <ProductPageTemplate
      name="Space Capsule Homes"
      tagline="Futuristic pod design for offices, studios, guest quarters, and glamping."
      description="The Space Capsule shares the Apple Cabin's premium construction profile - fluorocarbon-coated aluminum panels, double-pane insulated glass, a galvanized steel frame, and microcrystalline stone flooring - wrapped in a bold, futuristic pod silhouette. Available in two lengths, it makes an eye-catching backyard office, meditation studio, guest suite, or glamping pod. Pricing is being finalized for the US market."
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
