import { ShieldCheck, Thermometer, Droplets, Palette, Zap, Home, KeyRound, Users, Tent } from 'lucide-react';

// Shared content for the Expandable Homes size-specific pages. Photography is
// not size-tagged at the source, so the general exterior/interior galleries and
// upgrade list are shared across sizes; floor plans and specs are per-size.

export const intro =
  "Our flagship line and best value: steel-frame homes that ship compact and unfold on site into fully finished living space. Every Bright Box expandable home arrives move-in ready with a complete kitchen, full bathroom, climate control, and a covered porch - then customizes to your taste with 60+ exterior colors and a full range of interior finishes. Whether it's your first home, an income property, or a backyard ADU, it delivers real-home comfort at a fraction of traditional construction cost.";

export const keyFeatures = [
  { icon: ShieldCheck, title: 'Galvanized Steel Frame', text: 'Built on the same rugged steel structure as shipping containers - engineered to last decades.' },
  { icon: Thermometer, title: 'Climate Controlled', text: '24,000 BTU 20 SEER mini-split HVAC keeps every room comfortable year-round.' },
  { icon: Droplets, title: 'Full Kitchen & Bath', text: 'Tankless water heater, induction stove, walk-in shower, and garbage disposal - standard.' },
  { icon: Palette, title: '60+ Color Options', text: 'Choose 60+ RAL exterior colors plus customizable interior walls, floors, and cabinets.' },
  { icon: Zap, title: 'Move-In Ready Wiring', text: 'Upgraded 125-amp panel with 110V, 240V, and GFCI outlets pre-installed throughout.' },
  { icon: Home, title: 'Covered Front Porch', text: 'Every model ships with a covered porch and railing - usable outdoor space from day one.' },
];

export const frames = [
  { src: '/images/frames/expandable-house-frame-1.jpg', alt: 'Expandable Home Steel Frame Construction', caption: 'Galvanized Steel Frame - Welded Construction', width: 1600, height: 1600 },
  { src: '/images/frames/expandable-house-frame-2.jpg', alt: 'Expandable Home Steel Frame Construction', caption: 'Precision-Welded Steel Frame Base', width: 1600, height: 1600 },
  { src: '/images/frames/production-facility.png', alt: 'Bright Box Homes Production Facility', caption: 'Bright Box Homes Production Facility', width: 1694, height: 928 },
];

export const useCases = [
  { icon: Home, title: 'Primary Residence', text: 'Full-time, full-comfort living at an affordable price point.' },
  { icon: Tent, title: 'Vacation Home', text: 'A turnkey getaway for the lake, mountains, or rural acreage.' },
  { icon: KeyRound, title: 'Airbnb Rental', text: 'A photogenic, income-producing short-term rental unit.' },
  { icon: Users, title: 'ADU / Guest House', text: 'Extra living space for family, guests, or a home office.' },
];

// Construction-stage / cinder-block photos removed for a premium look:
// 02, 04, 08 (prominent cinder-block piles), 05 (blocks + junk tires),
// 06 (mid-crane, unfinished), 07 (ladder, under assembly). Files kept in repo.
export const exteriorImages = [
  { src: '/images/products/expandable-homes/exterior/01.jpeg', alt: 'Delivered brown expandable home with a covered porch among palm trees.', caption: 'Delivered and ready - a warm-toned home with a covered porch under the palms.' },
  { src: '/images/products/expandable-homes/exterior/03.jpeg', alt: 'Delivered white expandable home on a rural property.', caption: 'Crisp white finish, set and settled on open rural land.' },
  { src: '/images/products/expandable-homes/exterior/09.png', alt: 'Two-story expandable home with balconies and a landscaped backyard.', caption: 'Two stories, twin balconies, and a backyard made for gathering.' },
  { src: '/images/products/expandable-homes/exterior/10.png', alt: 'Single-story expandable home with a covered front porch.', caption: 'Single-level living with a welcoming covered porch out front.' },
  { src: '/images/products/expandable-homes/exterior/11.png', alt: 'Compact expandable home with a carport and gravel driveway.', caption: 'Compact footprint, full function - complete with its own carport.' },
  { src: '/images/products/expandable-homes/exterior/12.png', alt: 'Expandable home with glass walls and landscaped garden lighting.', caption: 'Floor-to-ceiling glass glowing against landscaped garden lighting.' },
];

export const interiorImages = [
  { src: '/images/products/expandable-homes/interior/01.jpeg', alt: 'Expandable home bedroom with a queen bed and large windows.', caption: 'A bright bedroom retreat with a queen bed and oversized windows.' },
  { src: '/images/products/expandable-homes/interior/02.jpeg', alt: 'Open-plan kitchen and bedroom interior of an expandable home.', caption: 'Open-plan living - kitchen and sleeping space that flow together.' },
  { src: '/images/products/expandable-homes/interior/03.jpeg', alt: 'Expandable home kitchen with white cabinets and marble backsplash.', caption: 'A crisp white kitchen finished with a marble backsplash.' },
  { src: '/images/products/expandable-homes/interior/04.jpeg', alt: 'Expandable home kitchen with a double sink and white cabinetry.', caption: 'Full-size double sink and ample white cabinetry for real cooking.' },
  { src: '/images/products/expandable-homes/interior/05.jpeg', alt: 'Walk-in shower with a rainfall head and marble walls.', caption: 'A spa-style walk-in shower with a rainfall head and marble walls.' },
  { src: '/images/products/expandable-homes/interior/06.png', alt: 'Bathroom with a glass shower stall and vanity.', caption: 'A clean, modern bath with a glass shower stall and vanity.' },
  { src: '/images/products/expandable-homes/interior/07.png', alt: 'White kitchen cabinetry with countertop and sink.', caption: 'Move-in-ready kitchen cabinetry, counters, and sink included.' },
  { src: '/images/products/expandable-homes/interior/08.png', alt: 'U-shaped white kitchen with open shelving.', caption: 'A U-shaped kitchen with open shelving and generous prep space.' },
  { src: '/images/products/expandable-homes/interior/09.jpg', alt: 'Open expandable interior with glass doors and vinyl plank flooring.', caption: 'Light pours in through glass doors over warm vinyl plank floors.' },
  { src: '/images/products/expandable-homes/interior/10.jpg', alt: 'Furnished expandable living room with sofa, dining area, and kitchen.', caption: 'A fully furnished great room - living, dining, and kitchen in one.' },
  { src: '/images/products/expandable-homes/interior/11.jpg', alt: 'Furnished expandable living area with sofa, TV, and open kitchen.', caption: 'Movie nights sorted - a comfortable living area and open kitchen.' },
  { src: '/images/products/expandable-homes/interior/12.jpeg', alt: 'Expandable interior looking toward glass front doors and the porch.', caption: 'A bright sightline from the living space out to the covered porch.' },
  { src: '/images/products/expandable-homes/interior/13.jpeg', alt: 'Expandable interior with kitchen and bathroom, wood-tone walls.', caption: 'Warm wood-tone walls wrap the kitchen and bath in natural texture.' },
  { src: '/images/products/expandable-homes/interior/14.jpg', alt: 'Expandable home bathroom with a curved glass shower and vanity.', caption: 'A curved glass shower and vanity bring a boutique-hotel feel.' },
  { src: '/images/products/expandable-homes/interior/15.jpeg', alt: 'Expandable home kitchen with white cabinets and a black countertop.', caption: 'White cabinets against a bold black countertop - timeless contrast.' },
  { src: '/images/products/expandable-homes/interior/16.jpg', alt: 'Expandable home interior hallway showing multiple room doors.', caption: 'A real hallway connecting multiple private rooms - this lives like a house.' },
];

export const features = [
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

export const upgrades = [
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

export const duplexImages = [
  { src: '/images/products/expandable-homes/duplex/01.png', alt: 'Two-story duplex expandable home with balconies and a landscaped yard.' },
  { src: '/images/products/expandable-homes/duplex/02.png', alt: 'Dark two-story duplex with a carport at dusk.' },
  { src: '/images/products/expandable-homes/duplex/03.avif', alt: 'Two-story duplex with rooftop balconies in a city setting.' },
  { src: '/images/products/expandable-homes/duplex/04.avif', alt: 'Two-story duplex expandable home in an open field.' },
  { src: '/images/products/expandable-homes/duplex/05.avif', alt: 'Two-story steel duplex container home.' },
  { src: '/images/products/expandable-homes/duplex/06.avif', alt: 'Two-story duplex with a balcony in a showroom.' },
  { src: '/images/products/expandable-homes/duplex/07.avif', alt: 'Modern two-story modular duplex with a balcony.' },
  { src: '/images/products/expandable-homes/duplex/08.jpg', alt: 'Two-story duplex container home with covered porches.' },
];
