import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Vending Units | Bright Box Homes',
  description:
    'Container-based food stands, retail kiosks, and mobile storefronts. Fully customizable with branding, fold-up serving windows, and interior buildout. Contact us for commercial pricing.',
};

const exteriorImages = [
  { src: '/images/products/vending-units/exterior/01.jpg', alt: 'Deployed container food stand with custom illuminated signage at night.' },
  { src: '/images/products/vending-units/exterior/02.png', alt: 'Orange container food stand on a boardwalk with outdoor seating.' },
  { src: '/images/products/vending-units/exterior/03.png', alt: 'Container food kiosk in a city park with patio seating.' },
  { src: '/images/products/vending-units/exterior/04.png', alt: 'Green container cafe with customers ordering at the counter.' },
  { src: '/images/products/vending-units/exterior/05.jpg', alt: 'Orange container vending unit with fold-up serving windows.' },
  { src: '/images/products/vending-units/exterior/06.jpg', alt: 'Customizable black container cafe with bar seating and branding space.' },
  { src: '/images/products/vending-units/exterior/07.jpg', alt: 'Glass-front container retail unit.' },
];

const specs = [
  { label: 'Construction', value: 'Steel-frame container' },
  { label: 'Customization', value: 'Full exterior branding, serving windows, interior buildout' },
  { label: 'Applications', value: 'Food trucks, cafes, retail kiosks, pop-up shops' },
];

const features = [
  'Custom exterior branding and color',
  'Fold-up serving windows',
  'Interior counter and prep area',
  'Electrical hookup ready',
  'Plumbing rough-in available',
  'Stackable and transportable',
  'Multiple size options',
];

export default function VendingUnitsPage() {
  return (
    <ProductPageTemplate
      name="Vending Units"
      tagline="Container-based food stands, retail kiosks, and mobile storefronts. Fully customizable."
      description="Turn a steel-frame container into a turnkey storefront. Vending Units ship ready for full exterior branding, fold-up serving windows, and a finished interior counter and prep area - ideal for food stands, cafes, retail kiosks, and pop-up shops. Electrical hookup comes standard with plumbing rough-in available, and units stack and transport easily for multi-location operators."
      price="Contact for Pricing"
      priceLabel="Commercial"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      specs={specs}
      features={features}
    />
  );
}
