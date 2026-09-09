import type { Metadata } from 'next';
import { Check, Box, LayoutGrid, Layers, Wallet, Zap, Hammer, HardHat, GraduationCap, Briefcase } from 'lucide-react';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';
import UpgradesGrid from '@/components/products/UpgradesGrid';
import ShowcaseCard from '@/components/products/ShowcaseCard';

export const metadata: Metadata = {
  title: 'Assembly Homes | Bright Box Homes',
  description:
    'Bright Box Assembly Homes - named modular models from $25,995. Connect ~171 sq ft units in any arrangement: stack, line up, L-shape, or U-shape. Each unit independently wired and plumbed.',
};

const label = 'mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#D4A853]';
const headingClass = 'font-heading text-3xl font-bold text-white md:text-4xl';

const heroImages = [
  { src: '/images/products/assembly-homes/exterior/05.png', alt: 'Two-story white modular assembly home with a glass front and balcony.' },
  { src: '/images/products/assembly-homes/exterior/10.jpg', alt: 'Two-story white modular assembly home with a balcony and external staircase.' },
];

const baseFeatures = [
  'Electrical system (pre-wired)',
  'Modular bathroom system',
  'Modular kitchen system',
  'Induction burner stove',
  'Mini-split AC',
];
const multiStoryFeatures = ['Staircase with landing', 'Railing system'];

const models = [
  { name: 'Bright Box Vantage', image: '/images/products/assembly-homes/exterior/06.png', alt: 'Single-module assembly home with a panoramic glass facade.', desc: 'Single-module design with panoramic glass facade. ~171 sq ft of open-concept living.', multiStory: false },
  { name: 'Bright Box Prism', image: '/images/products/assembly-homes/exterior/08.png', alt: 'Two-module glass assembly home configuration.', desc: 'Dual-module layout with expanded floor plan. Connect two units side-by-side for ~342 sq ft.', multiStory: false },
  { name: 'Bright Box Vertex', image: '/images/products/assembly-homes/exterior/05.png', alt: 'Single-module assembly home with enhanced window configuration.', desc: 'Single-module with an enhanced window configuration for maximum natural light.', multiStory: false },
  { name: 'Bright Box Axis', image: '/images/products/assembly-homes/exterior/09.jpg', alt: 'Assembly home with warm wood-tone exterior panels.', desc: 'Single-module with warm wood-tone exterior panels and a covered entry.', multiStory: false },
  { name: 'Bright Box Pavilion', image: '/images/products/assembly-homes/exterior/10.jpg', alt: 'Four-module two-story white assembly home with an exterior staircase.', desc: 'Four-module, two-story configuration. ~684 sq ft across two levels with exterior staircase and landing.', multiStory: true },
];

const keyFeatures = [
  { icon: Box, title: 'Approx 171 Sq Ft Units', text: 'Each module is roughly 171 sq ft - a consistent, repeatable building block.' },
  { icon: LayoutGrid, title: 'Any Configuration', text: 'Connect units in any arrangement - line up, L-shape, U-shape, or courtyard.' },
  { icon: Layers, title: 'Stack for Multi-Story', text: 'Stack modules vertically to build two-story and multi-story structures.' },
  { icon: Wallet, title: 'Affordable & Scalable', text: 'Start with one unit and add more as your needs and budget grow.' },
  { icon: Zap, title: 'Independently Serviced', text: 'Every unit is independently wired and plumbed for flexible layouts.' },
  { icon: Hammer, title: 'Fast Modular Build', text: 'Factory-built modules assemble on site far faster than traditional construction.' },
];

const useCases = [
  { icon: Wallet, title: 'Affordable Housing', text: 'Low-cost, expandable homes for first-time and budget buyers.' },
  { icon: HardHat, title: 'Workforce Housing', text: 'Durable, repeatable lodging for crews and remote sites.' },
  { icon: GraduationCap, title: 'Student Housing', text: 'High-density, cost-efficient residence configurations.' },
  { icon: Briefcase, title: 'Modular Office', text: 'Connect units into flexible commercial or office space.' },
];

const frames = [
  { src: '/images/products/assembly-homes/specs/frame.webp', alt: 'Galvanized steel frame of an assembly modular unit.', caption: 'Galvanized Steel Frame - Modular Unit Construction', width: 800, height: 571 },
  { src: '/images/products/assembly-homes/specs/specs.png', alt: 'Assembly home technical specifications and component breakdown.', caption: 'Technical Specifications', width: 1173, height: 1341 },
];

const specs = [
  { label: 'Unit Size', value: '~171 sq ft per module' },
  { label: 'Price Range', value: '$25,995 - $29,995 per unit' },
  { label: 'Configuration', value: 'Stack, line up, L-shape, or U-shape' },
  { label: 'Utilities', value: 'Each unit independently wired and plumbed' },
];

const features = [
  'Approximately 171 sq ft per modular unit',
  'Connect units in any arrangement',
  'Stack for multi-story configurations',
  'Each unit independently wired and plumbed',
  'Optional modular bathroom and kitchenette',
  'Add units as your needs grow',
];

const showcase = (
  <section id="models" className="scroll-mt-24">
    <p className={label}>The Lineup</p>
    <h2 className={headingClass}>Choose Your Model</h2>
    <div className="mt-8 space-y-8">
      {models.map((m, i) => (
        <ShowcaseCard key={m.name} index={i} image={m.image} alt={m.alt} beige>
          <h3 className="font-heading text-2xl font-bold text-gray-900">{m.name}</h3>
          <p className="mt-3 text-gray-700">{m.desc}</p>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[...baseFeatures, ...(m.multiStory ? multiStoryFeatures : [])].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#D4A853]" />
                <span className="text-sm text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
        </ShowcaseCard>
      ))}
    </div>
  </section>
);

export default function AssemblyHomesPage() {
  return (
    <ProductPageTemplate
      name="Assembly Homes"
      tagline="Modular units that join together to create custom multi-room layouts."
      description="Assembly Homes are modular building blocks - compact units, about 171 sq ft each, engineered to connect in any arrangement. Stack them for multi-story, line them up for multi-room, or wrap them into an L or U. Each ships independently wired and plumbed, so you start small and add as your needs grow."
      price="$25,995 - $29,995"
      priceLabel="Starting at"
      heroImages={heroImages}
      exteriorImages={[]}
      hideGalleries
      afterGalleries={showcase}
      intro="The most flexible, affordable way to build - start with a single unit and grow into a whole complex."
      keyFeatures={keyFeatures}
      useCases={useCases}
      frames={frames}
      warmCards
      afterContent={<UpgradesGrid />}
      specs={specs}
      features={features}
    />
  );
}
