import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Assembly Homes | Bright Box Homes',
  description:
    'Modular Assembly Homes from $19,995 per unit. Join single units into custom multi-room layouts with modular bathrooms and kitchenettes. Stackable and expandable.',
};

const images = [
  { src: '/images/products/assembly-homes/01.png', alt: 'Two-story modular apartment building with parking.' },
  { src: '/images/products/assembly-homes/02.png', alt: 'Modular apartment units around a courtyard at dusk.' },
  { src: '/images/products/assembly-homes/03.png', alt: 'Two-story modular building with orange and white panels.' },
  { src: '/images/products/assembly-homes/04.png', alt: 'Modular glass-front office building at sunset.' },
  { src: '/images/products/assembly-homes/05.png', alt: 'Modern modular commercial building with rooftop seating.' },
  { src: '/images/products/assembly-homes/06.png', alt: '14-unit modular apartment complex at sunset.' },
  { src: '/images/products/assembly-homes/07.png', alt: 'Stacked modular assembly units with glass fronts.' },
  { src: '/images/products/assembly-homes/08.png', alt: 'Two-story stacked modular assembly home with a rooftop deck.' },
];

const specs = [
  { label: 'Price Range', value: '$19,995 - $25,995 per unit' },
  { label: 'Configuration', value: 'Single or multi-unit joinable layouts' },
  { label: 'Bathroom', value: 'Modular bathroom option' },
  { label: 'Kitchen', value: 'Modular kitchenette option' },
];

const features = [
  'Modular joinable design',
  'Pre-defined single and multi-unit configurations',
  'Optional modular bathroom',
  'Optional modular kitchenette',
  'Stackable and expandable',
];

export default function AssemblyHomesPage() {
  return (
    <ProductPageTemplate
      name="Assembly Homes"
      tagline="Modular units that join together to create custom multi-room layouts."
      description="Assembly Homes are modular units engineered to connect side-by-side and stack, letting you compose anything from a single studio to a multi-room residence or a full apartment and office complex. Each unit can be equipped with a modular bathroom and kitchenette, and pre-defined single- and multi-unit configurations make planning straightforward. Pricing runs $19,995 to $25,995 turnkey per unit depending on configuration."
      price="$19,995"
      priceLabel="Starting at"
      images={images}
      specs={specs}
      features={features}
    />
  );
}
