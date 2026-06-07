import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Expandable Container Homes | Bright Box Homes',
  description:
    'Steel-frame expandable container homes from $35,995. 200-800 sq ft with expandable side sections, 60+ exterior colors, mini-split HVAC, and a tankless water heater. Delivered anywhere in the US.',
};

const exteriorImages = [
  { src: '/images/products/expandable-homes/exterior/01.jpeg', alt: 'Delivered brown expandable home with a covered porch among palm trees.' },
  { src: '/images/products/expandable-homes/exterior/02.jpeg', alt: 'Delivered gray expandable home with a covered porch.' },
  { src: '/images/products/expandable-homes/exterior/03.jpeg', alt: 'Delivered white expandable home on a rural property.' },
  { src: '/images/products/expandable-homes/exterior/04.jpeg', alt: 'Expandable home with glass entry doors set on a wooded lot.' },
  { src: '/images/products/expandable-homes/exterior/05.jpeg', alt: 'Brown expandable home with a covered porch and solar panel.' },
  { src: '/images/products/expandable-homes/exterior/06.jpeg', alt: 'A white expandable home being delivered by crane truck.' },
  { src: '/images/products/expandable-homes/exterior/07.jpeg', alt: 'A delivered expandable home with a covered porch under assembly.' },
  { src: '/images/products/expandable-homes/exterior/08.jpeg', alt: 'Side view of a delivered brown expandable home on a foundation.' },
];

const interiorImages = [
  { src: '/images/products/expandable-homes/interior/01.jpeg', alt: 'Expandable home bedroom with a queen bed and large windows.' },
  { src: '/images/products/expandable-homes/interior/02.jpeg', alt: 'Open-plan kitchen and bedroom interior of an expandable home.' },
  { src: '/images/products/expandable-homes/interior/03.jpeg', alt: 'Expandable home kitchen with white cabinets and marble backsplash.' },
  { src: '/images/products/expandable-homes/interior/04.jpeg', alt: 'Expandable home kitchen with a double sink and white cabinetry.' },
  { src: '/images/products/expandable-homes/interior/05.jpeg', alt: 'Walk-in shower with a rainfall head and marble walls.' },
  { src: '/images/products/expandable-homes/interior/06.png', alt: 'Bathroom with a glass shower stall and vanity.' },
  { src: '/images/products/expandable-homes/interior/07.png', alt: 'White kitchen cabinetry with countertop and sink.' },
  { src: '/images/products/expandable-homes/interior/08.png', alt: 'U-shaped white kitchen with open shelving.' },
  { src: '/images/products/expandable-homes/interior/09.jpg', alt: 'Open expandable interior with glass doors and vinyl plank flooring.' },
  { src: '/images/products/expandable-homes/interior/10.jpg', alt: 'Furnished expandable living room with sofa, dining area, and kitchen.' },
  { src: '/images/products/expandable-homes/interior/11.jpg', alt: 'Furnished expandable living area with sofa, TV, and open kitchen.' },
  { src: '/images/products/expandable-homes/interior/12.jpeg', alt: 'Expandable interior looking toward glass front doors and the porch.' },
  { src: '/images/products/expandable-homes/interior/13.jpeg', alt: 'Expandable interior with kitchen and bathroom, wood-tone walls.' },
];

const specs = [
  { label: 'Models', value: '5 (20x10, 20x20, 20x30, 20x40, Duplex)' },
  { label: 'Sq Ft Range', value: '200 - 800' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Exterior Colors', value: '60+ RAL options' },
  { label: 'Roof', value: '24-gauge corrugated metal, 19 colors' },
  { label: 'Windows', value: '9-10 dual-pane (size dependent)' },
  { label: 'Electrical', value: '125-amp panel, 33x 110V, 3x 240V, 7x GFCI' },
  { label: 'HVAC', value: '24,000 BTU 20 SEER mini-split' },
  { label: 'Water Heater', value: 'Tankless' },
  { label: 'Price Range', value: '$35,995 - $64,995' },
];

const features = [
  'Induction stove with range hood',
  'Walk-in shower with fixtures',
  'Tankless water heater',
  '24,000 BTU mini-split HVAC',
  'Covered front porch with railing',
  'Washer/dryer hookups',
  'Garbage disposal',
  'Dual-pane windows throughout',
  'Upgraded 125-amp electrical panel',
  '60+ RAL exterior color choices',
];

const floorPlans = [
  { group: '20x10 Studio', name: 'Studio Layout', src: '/images/floor-plans/expandable-20x10-studio.png', alt: '20x10 studio floor plan.', width: 1585, height: 951 },
  { group: '20x10 Studio', name: 'Studio Layout (Furnished)', src: '/images/floor-plans/expandable-20x10-studio-2.png', alt: 'Furnished 20x10 studio floor plan.', width: 1597, height: 985 },
  { group: '20x20 Models', name: '1 Bedroom', src: '/images/floor-plans/expandable-20x20-1br-preview.png', alt: '20x20 one-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x20-1br.pdf', width: 1191, height: 1684 },
  { group: '20x20 Models', name: '2 Bedroom', src: '/images/floor-plans/expandable-20x20-2br-preview.png', alt: '20x20 two-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x20-2br.pdf', width: 1191, height: 1684 },
  { group: '20x20 Models', name: '3 Bedroom', src: '/images/floor-plans/expandable-20x20-3br-preview.png', alt: '20x20 three-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x20-3br.pdf', width: 1191, height: 1684 },
  { group: '20x40 Models', name: '1 Bedroom', src: '/images/floor-plans/expandable-20x40-1br-preview.png', alt: '20x40 one-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x40-1br.pdf', width: 1191, height: 1684 },
  { group: '20x40 Models', name: '2 Bedroom', src: '/images/floor-plans/expandable-20x40-2br-preview.png', alt: '20x40 two-bedroom floor plan.', pdfSrc: '/images/floor-plans/expandable-20x40-2br.pdf', width: 1191, height: 1684 },
];

const upgrades = [
  {
    category: 'Solar & Power',
    items: [
      { name: 'Solar-Ready Package' },
      { name: '8kW Solar Kit' },
      { name: '10kW Solar Kit' },
      { name: 'Generator-Ready Package' },
      { name: '15kW Portable Generator' },
      { name: '18kW Whole House Generator' },
      { name: '22kW Whole House Generator' },
    ],
  },
  {
    category: 'HVAC & Comfort',
    items: [
      { name: '9,000 BTU Mini-Split' },
      { name: '24,000 BTU Mini-Split' },
      { name: 'Whole House Radiant Heating' },
      { name: 'Ceiling Mount Air Mover' },
    ],
  },
  {
    category: 'Kitchen',
    items: [
      { name: 'Top Kitchen Cabinets (one side)' },
      { name: 'Top Kitchen Cabinets (two sides)' },
      { name: 'Bottom Kitchen Cabinets' },
      { name: '4-Burner Induction Stove' },
      { name: '3/4 HP Garbage Disposal' },
      { name: 'Kitchen Cabinet Color Options' },
    ],
  },
  {
    category: 'Bathroom',
    items: [
      { name: 'Modular Shower Enclosure', image: '/images/upgrades/modular-shower.png' },
      { name: 'Upgraded Bathroom Vanity' },
      { name: 'Tankless Water Heater (wall-mount)' },
      { name: 'Bathroom Wall Design / Colors' },
      { name: 'Bathroom Exhaust Fan' },
    ],
  },
  {
    category: 'Laundry',
    items: [
      { name: 'Stackable Washer / Dryer' },
      { name: 'Washer & Dryer Rough-In' },
    ],
  },
  {
    category: 'Exterior',
    items: [
      { name: "Metal Roof & Truss System (20' and 40')", image: '/images/upgrades/metal-roof-truss-standard.png' },
      { name: 'Reinforced Truss for Solar', image: '/images/upgrades/metal-roof-truss-reinforced-solar.png' },
      { name: 'Covered Side Porch' },
      { name: 'Side Deck' },
      { name: 'Front Porch Railing Color' },
      { name: 'Front Porch Deck Color' },
      { name: 'Exterior House Colors' },
      { name: 'Carved Metal Plate Exterior' },
    ],
  },
  {
    category: 'Electrical',
    items: [
      { name: '200 Amp Service Panel' },
      { name: 'Additional 110V Outlets' },
      { name: '240V Outlets' },
      { name: 'GFCI Outlets' },
      { name: 'Dimmer Switches' },
      { name: 'TV Wall Mount' },
      { name: 'RG-6 Coaxial' },
    ],
  },
  {
    category: 'Interior',
    items: [
      { name: '3" Rockwool Insulation Upgrade' },
      { name: 'Interior Flooring Colors' },
      { name: 'Interior Trim Colors' },
      { name: 'Interior Wall Bamboo Wood Fiber Board' },
      { name: 'Double-Pane Low-E Windows' },
      { name: 'Standard Rear Door' },
      { name: 'Rear Sliding Door' },
    ],
  },
  {
    category: 'Structural',
    items: [
      { name: "Additional Bedroom (40' & 20' houses)" },
      { name: 'Full Metal Roof with Truss System' },
    ],
  },
];

export default function ExpandableHomesPage() {
  return (
    <ProductPageTemplate
      name="Expandable Container Homes"
      tagline="Steel-frame construction with expandable side sections. 200 to 800 sq ft."
      description="Our flagship line. Expandable container homes ship compact and unfold on site into 200 to 800 sq ft of finished living space. Built on a galvanized steel frame with a 24-gauge metal pitched roof, each home arrives fully equipped with a mini-split HVAC system, tankless water heater, induction kitchen, and a covered front porch. Choose from 60+ RAL exterior colors and five floor-plan sizes, from the 20x10 studio to the 20x20 stacked duplex."
      price="$35,995"
      priceLabel="Starting at"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      interiorImages={interiorImages}
      floorPlans={floorPlans}
      upgrades={upgrades}
      specs={specs}
      features={features}
    />
  );
}
