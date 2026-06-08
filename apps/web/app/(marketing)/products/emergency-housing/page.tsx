import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Emergency Housing | Bright Box Homes',
  description:
    'Rapidly deployable emergency and disaster housing from $2,000. Fire-grade A folding shelters that set up in hours, with optional bathroom, kitchenette, AC/heating, and solar modules.',
};

// Gallery shows real product photography only. The Bright Box-branded spec
// sheets / infographics (01-05.png) remain in /public for reference but are not
// displayed in the gallery.
const exteriorImages = [
  { src: '/images/products/emergency-housing/exterior/folding-house.png', alt: 'Folding emergency house shown folded and unfolded.' },
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
