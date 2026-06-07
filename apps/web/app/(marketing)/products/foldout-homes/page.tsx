import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Foldout Homes | Bright Box Homes',
  description:
    'Foldout Homes from $2,000. Fire-grade A emergency and disaster housing that deploys in hours, with optional bathroom, kitchenette, AC/heating, and solar modules.',
};

// No compliant product photography available yet (source assets are catalog
// spreads with vendor logos and metric measurements). Galleries show a
// placeholder until clean photos are provided.
const exteriorImages: { src: string; alt: string }[] = [];

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

export default function FoldoutHomesPage() {
  return (
    <ProductPageTemplate
      name="Foldout Homes"
      tagline="Emergency and disaster housing. Deployable in hours."
      description="When speed matters, Foldout Homes ship compact and unfold into an 87 sq ft fireproof shelter in hours, not days. Built from fire-grade A materials, each unit can be outfitted with optional bathroom, kitchenette, AC/heating, hot water, and solar power modules - making it equally suited to disaster relief, remote worksites, and off-grid basecamps."
      price="$2,000"
      priceLabel="Starting at"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      specs={specs}
      features={features}
    />
  );
}
