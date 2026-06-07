import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Apartments & Office Buildings | Bright Box Homes',
  description:
    'Scalable modular construction for multi-unit residential and commercial applications - apartment complexes, office buildings, and workforce housing built from the assembly house system.',
};

const exteriorImages = [
  { src: '/images/products/apartments-office-buildings/exterior/01.png', alt: 'Modular glass-front office building at sunset.' },
  { src: '/images/products/apartments-office-buildings/exterior/02.png', alt: 'Modular apartment units around a courtyard at dusk.' },
  { src: '/images/products/apartments-office-buildings/exterior/03.png', alt: 'Two-story modular apartment building with parking.' },
  { src: '/images/products/apartments-office-buildings/exterior/04.png', alt: 'Two-story modular building with orange and white panels.' },
  { src: '/images/products/apartments-office-buildings/exterior/05.png', alt: 'Modern modular commercial building with rooftop seating.' },
  { src: '/images/products/apartments-office-buildings/exterior/06.png', alt: '14-unit modular apartment complex at sunset.' },
];

const specs = [
  { label: 'Construction', value: 'Assembly house modular system' },
  { label: 'Configuration', value: 'Multi-unit joinable layouts' },
  { label: 'Applications', value: 'Apartment complexes, office buildings, workforce housing' },
  { label: 'Scalability', value: 'Stack and join units for multi-story configurations' },
];

const features = [
  'Same modular assembly system as Assembly Homes',
  'Scalable to multi-story configurations',
  'Commercial-grade applications',
  'Apartment complexes',
  'Office buildings',
  'Workforce housing developments',
];

export default function ApartmentsOfficeBuildingsPage() {
  return (
    <ProductPageTemplate
      name="Apartments & Office Buildings"
      tagline="Scalable modular construction for multi-unit residential and commercial applications."
      description="Built from the same modular assembly system as our Assembly Homes, this line scales up: join and stack units into multi-story apartment complexes, office buildings, and workforce housing. Each configuration is engineered for commercial-grade use while keeping the speed and cost advantages of modular construction. Contact our team to scope a development for your site."
      price="Contact for Pricing"
      priceLabel="Commercial"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      specs={specs}
      features={features}
    />
  );
}
