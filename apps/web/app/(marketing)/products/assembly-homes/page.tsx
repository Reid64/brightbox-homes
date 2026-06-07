import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Assembly Homes | Bright Box Homes',
  description:
    'Modular Assembly Homes from $19,995 per unit. Join single units into custom multi-room layouts with modular bathrooms and kitchenettes. Stackable and expandable.',
};

const exteriorImages = [
  { src: '/images/products/assembly-homes/exterior/01.png', alt: 'Two-story stacked modular assembly unit with glass fronts.' },
  { src: '/images/products/assembly-homes/exterior/02.png', alt: 'Single-story modular assembly unit with a glass facade.' },
  { src: '/images/products/assembly-homes/exterior/03.png', alt: 'Two-story modular assembly unit with a balcony.' },
  { src: '/images/products/assembly-homes/exterior/04.png', alt: 'Stacked modular assembly unit with a rooftop deck.' },
];

const specs = [
  { label: 'Price Range', value: '$25,995 - $29,995 per unit' },
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
      description="Assembly Homes are compact modular units engineered to connect side-by-side and stack, letting you compose anything from a single studio to a multi-room layout or a commercial storefront. Each unit can be equipped with a modular bathroom and kitchenette, and pre-defined single- and multi-unit configurations make planning straightforward. Pricing runs $25,995 to $29,995 turnkey per unit depending on configuration. For multi-story apartment and office developments, see our Apartments & Office Buildings line."
      price="$25,995 - $29,995"
      priceLabel="Starting at"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      specs={specs}
      features={features}
    />
  );
}
