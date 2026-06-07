import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Emergency Housing | Bright Box Homes',
  description:
    'Rapidly deployable emergency and disaster housing from $2,000. Fire-grade A folding shelters that set up in hours, with optional bathroom, kitchenette, AC/heating, and solar modules.',
};

const exteriorImages = [
  { src: '/images/products/emergency-housing/exterior/01.png', alt: 'Emergency House folded and unfolded views with imperial dimensions.' },
  { src: '/images/products/emergency-housing/exterior/02.png', alt: 'Emergency Housing Systems overview - rapidly deployable temporary housing.' },
  { src: '/images/products/emergency-housing/exterior/03.png', alt: 'Emergency housing product details and component breakdown.' },
  { src: '/images/products/emergency-housing/exterior/04.png', alt: 'Folding emergency house variants in wood, white, and glass finishes.' },
  { src: '/images/products/emergency-housing/exterior/05.png', alt: 'Three-step quick-assembly diagram for disaster housing setup.' },
];

const specs = [
  { label: 'Folded Dimensions', value: '112.2" x 16.1" H' },
  { label: 'Unfolded', value: '~9.35 ft x 9.35 ft x 9.35 ft' },
  { label: 'Approx Sq Ft', value: '87' },
  { label: 'Fire Rating', value: 'Grade A' },
  { label: 'Materials', value: 'Fireproof' },
  { label: 'Setup Time', value: 'Hours, not days' },
];

const features = [
  'Fire-grade A materials',
  'Deploys in hours',
  'Optional bathroom module',
  'Optional kitchenette module',
  'Optional AC/heating module',
  'Optional solar power kit',
  'Optional hot water module',
];

export default function EmergencyHousingPage() {
  return (
    <ProductPageTemplate
      name="Emergency Housing"
      tagline="Rapidly deployable emergency and disaster housing. Set up in hours, not days."
      description="When speed matters, our folding emergency houses ship compact and unfold into an 87 sq ft fireproof shelter in hours, not days. Built from fire-grade A materials, each unit can be outfitted with optional bathroom, kitchenette, AC/heating, hot water, and solar power modules - making it equally suited to disaster relief, workforce housing, humanitarian aid, and government and NGO projects."
      price="$2,000"
      priceLabel="Starting at"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      specs={specs}
      features={features}
    />
  );
}
