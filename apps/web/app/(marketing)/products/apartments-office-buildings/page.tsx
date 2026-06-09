import type { Metadata } from 'next';
import { Building2, Layers, Wallet, ShieldCheck, Zap, Users, Briefcase, GraduationCap } from 'lucide-react';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

const intro =
  "When one unit isn't enough, our modular apartment and office systems scale to whole buildings. Stack and join units into multi-story residential complexes, office blocks, or workforce-housing campuses - built faster and at lower cost than traditional construction, with consistent finishes and systems across every unit. Configure the layout, unit count, and amenities to your project.";

const keyFeatures = [
  { icon: Building2, title: 'Multi-Story Modular', text: 'Stack and connect units into multi-floor residential or commercial buildings.' },
  { icon: Layers, title: 'Repeatable Units', text: 'Identical, factory-built units mean consistent quality and faster timelines.' },
  { icon: Wallet, title: 'Lower Cost Per Unit', text: 'Modular construction cuts cost and schedule versus site-built buildings.' },
  { icon: ShieldCheck, title: 'Steel-Frame Durability', text: 'Galvanized steel structure engineered for multi-unit, multi-story loads.' },
  { icon: Zap, title: 'Building Systems', text: 'Electrical, plumbing, and HVAC engineered across the full configuration.' },
  { icon: Users, title: 'Built for Density', text: 'Workforce, student, and multi-family housing at scale.' },
];

const useCases = [
  { icon: Building2, title: 'Apartment Complex', text: 'Multi-unit residential buildings delivered fast.' },
  { icon: Briefcase, title: 'Office Building', text: 'Modular commercial office space, scaled to need.' },
  { icon: Users, title: 'Workforce Housing', text: 'Durable, repeatable housing for crews and campuses.' },
  { icon: GraduationCap, title: 'Student Housing', text: 'High-density, cost-efficient residence configurations.' },
];

export const metadata: Metadata = {
  title: 'Apartments & Office Buildings | Bright Box Homes',
  description:
    'Scalable modular construction for multi-unit residential and commercial applications - apartment complexes, office buildings, and workforce housing built from the assembly house system.',
};

// Residential multi-unit configurations.
const microApartments = [
  { src: '/images/products/apartments-office-buildings/exterior/apt-02.png', alt: 'Three-story white modular apartment building with balconies and exterior stairs.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-04.jpg', alt: 'Two-story modular apartment complex around a courtyard.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-07.jpg', alt: 'Two-story modular apartment building with a balcony walkway.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-08.jpg', alt: 'Long two-story modular residential building with an external staircase.' },
];

// Commercial / office configurations.
const officeBuildings = [
  { src: '/images/products/apartments-office-buildings/exterior/apt-01.jpg', alt: 'Two-story glass-front modular office building.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-03.jpg', alt: 'Two-story modular glass office building with a rooftop balcony.' },
  { src: '/images/products/apartments-office-buildings/exterior/apt-06.jpg', alt: 'Dark modern modular office building with a rooftop deck.' },
];

const galleries = [
  { label: 'Micro Apartments', heading: 'Residential Multi-Unit Configurations', images: microApartments },
  { label: 'Office Buildings', heading: 'Commercial & Office Configurations', images: officeBuildings },
];

const heroImages = [...microApartments, ...officeBuildings];

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
      heroImages={heroImages}
      exteriorImages={[]}
      galleries={galleries}
      intro={intro}
      keyFeatures={keyFeatures}
      useCases={useCases}
      specs={specs}
      features={features}
    />
  );
}
