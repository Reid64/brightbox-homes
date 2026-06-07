import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Apartments & Office Buildings | Bright Box Homes',
  description:
    'Scalable modular construction for multi-unit residential and commercial applications - apartment complexes, office buildings, and workforce housing built from the assembly house system.',
};

const exteriorImages = [
  { src: '/images/products/apartments-office-buildings/exterior/apt-01.jpg', alt: 'Two-story glass-front modular building configuration.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-02.png', alt: 'Three-story white modular building with balcony and exterior stairs.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-03.jpg', alt: 'Two-story modular glass building with a rooftop balcony.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-04.jpg', alt: 'Two-story modular building complex around a courtyard.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-06.jpg', alt: 'Dark two-story modular building with a rooftop deck.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-07.jpg', alt: 'Two-story modular building with a balcony walkway.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-08.jpg', alt: 'Long two-story modular building with an external staircase.' },
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
