import type { Metadata } from 'next';
import { ShieldCheck, Sun, Thermometer, Layers, Sparkles, Truck, Tent, KeyRound, Briefcase } from 'lucide-react';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

const intro =
  "The Apple Cabin wraps premium materials in a soft, rounded silhouette unlike anything else on your street. Fluorocarbon-coated aluminum panels, double-pane insulated glass, and a galvanized steel frame make it as durable as it is striking - a turnkey pod that drops onto almost any site and instantly becomes the centerpiece. It's the favorite of glamping operators, Airbnb hosts, and anyone who wants a backyard retreat with serious wow factor.";

const keyFeatures = [
  { icon: ShieldCheck, title: 'Aluminum-Panel Shell', text: 'Fluorocarbon-coated aluminum panels resist weather, UV, and corrosion for years.' },
  { icon: Sun, title: 'Double-Pane Glass', text: 'Insulated double-pane glazing keeps interiors bright, quiet, and temperature-stable.' },
  { icon: Thermometer, title: 'Polyurethane Insulation', text: 'A dense, sealed shell holds comfortable temperatures in heat and cold alike.' },
  { icon: Layers, title: 'Stone Flooring', text: 'Microcrystalline stone flooring - tough, easy to clean, and premium underfoot.' },
  { icon: Sparkles, title: 'Rounded Aesthetic', text: 'A distinctive organic form that photographs beautifully and stands out.' },
  { icon: Truck, title: 'Ships Turnkey', text: 'Arrives fully finished and ready to place with minimal site work.' },
];

const useCases = [
  { icon: Tent, title: 'Glamping Resort', text: 'A high-end, photogenic unit for resort and campground operators.' },
  { icon: KeyRound, title: 'Airbnb Rental', text: 'A standout short-term rental that commands premium nightly rates.' },
  { icon: Briefcase, title: 'Backyard Studio', text: 'A quiet office, studio, or creative space steps from home.' },
  { icon: Sparkles, title: 'Retreat Center', text: 'A serene escape for wellness, meditation, or guest stays.' },
];

const frames = [
  { src: '/images/frames/apple-frame.png', alt: 'Steel frame of an Apple Cabin under construction.', caption: 'Aluminum Alloy Housing with Galvanized Steel Frame', width: 541, height: 376 },
  { src: '/images/frames/apple-frame-2.png', alt: 'Apple Cabin steel frame structure.', caption: 'Reinforced steel structure engineered for the rounded form', width: 1729, height: 910 },
];

export const metadata: Metadata = {
  title: 'Apple Cabin Homes | Bright Box Homes',
  description:
    'Rounded aluminum-panel Apple Cabins with fluorocarbon coating, double-pane insulated glass, and microcrystalline stone flooring. Ideal for Airbnb, glamping, and backyard studios.',
};

const exteriorImages = [
  { src: '/images/products/apple-cabins/exterior/01.png', alt: 'Apple Cabin with rounded aluminum panels in a forest clearing.', caption: 'The Glade - rounded aluminum panels tucked into a private forest clearing.' },
  { src: '/images/products/apple-cabins/exterior/02.png', alt: 'Apple Cabin on a tropical beach at sunset.', caption: 'The Shoreline - a full-window retreat with the ocean at your doorstep.' },
  { src: '/images/products/apple-cabins/exterior/03.png', alt: 'Apple Cabin among pine trees with a carport.', caption: 'The Timberline - pine-shaded living with a covered carport.' },
  { src: '/images/products/apple-cabins/exterior/04.png', alt: 'Apple Cabin with a rooftop terrace at dusk.', caption: 'The Skydeck - a rooftop terrace built for sunset gatherings.' },
  { src: '/images/products/apple-cabins/exterior/05.png', alt: 'Apple Cabin with a mountain backdrop at sunset.', caption: 'The Summit - panoramic mountain views from a single pod.' },
  { src: '/images/products/apple-cabins/exterior/06.png', alt: 'Elevated Apple Cabin over a carport at twilight.', caption: 'The Overlook - elevated above a carport and glowing at twilight.' },
  { src: '/images/products/apple-cabins/exterior/07.png', alt: 'Apple Cabin with an American flag overlooking a lake at sunset.', caption: 'The Patriot - lakeside living with room to fly your flag.' },
  { src: '/images/products/apple-cabins/exterior/08.png', alt: 'Rounded white Apple Cabin with a glass front in a park setting.', caption: 'The Pavilion - sculpted white panels and a wraparound glass front.' },
  { src: '/images/products/apple-cabins/exterior/09.jpg', alt: 'Rounded Apple Cabin with a glass facade and furnished interior visible.', caption: 'The Vista - floor-to-ceiling glass framing a move-in-ready interior.' },
  { src: '/images/products/apple-cabins/exterior/10.jpg', alt: 'Apple Cabin with a wood deck beside a lake at sunset.', caption: "The Boardwalk - step from your deck straight to the water's edge." },
];

const interiorImages = [
  { src: '/images/products/apple-cabins/interior/01.jpg', alt: 'Apple Cabin bathroom with a round mirror, vessel sink, and walk-in shower.', caption: 'Spa-grade bath - a vessel sink, round mirror, and walk-in shower.' },
  { src: '/images/products/apple-cabins/interior/02.jpg', alt: 'Apple Cabin lounge with a white sofa and curved floor-to-ceiling glass.', caption: 'The lounge - a plush sofa wrapped in curved, light-filled glass.' },
  { src: '/images/products/apple-cabins/interior/03.webp', alt: 'Apple Cabin bedroom with a wood platform bed and storage drawers.', caption: 'Restful nights - a warm wood platform bed with built-in storage.' },
  { src: '/images/products/apple-cabins/interior/04.jpg', alt: 'Apple Cabin interior with wood-paneled walls, a desk, and kitchenette.', caption: 'Work from anywhere - wood-paneled walls, a desk, and a full kitchenette.' },
  { src: '/images/products/apple-cabins/interior/05.jpg', alt: 'Apple Cabin bedroom with an upholstered headboard and a garden view.', caption: 'Garden suite - wake to greenery through floor-to-ceiling glass.' },
  { src: '/images/products/apple-cabins/interior/06.jpg', alt: 'Apple Cabin interior with a bed, lounge chair, and skylight.', caption: 'Skylit serenity - a lounge chair beneath an overhead skylight.' },
];

const specs = [
  { label: 'Construction', value: 'Aluminum panel with fluorocarbon coating' },
  { label: 'Insulation', value: 'Polyurethane' },
  { label: 'Glass', value: 'Double-pane insulated' },
  { label: 'Frame', value: 'Galvanized steel' },
  { label: 'Flooring', value: 'Microcrystalline stone' },
  { label: 'Available Model', value: '27\'11" L x 10\'10" W x 10\'6" H' },
  { label: 'Approx Sq Ft', value: '302' },
];

const features = [
  'Fluorocarbon-coated aluminum panels',
  'Double-pane insulated glass',
  'Galvanized steel frame',
  'Microcrystalline stone flooring',
  'Polyurethane insulation',
  'Rounded organic aesthetic',
];

const floorPlans = [
  {
    name: '27\'11" Model',
    src: '/images/floor-plans/apple-cabin-27-11.png',
    alt: 'Apple Cabin floor plan, 27 feet 11 inches long.',
    width: 1708,
    height: 921,
  },
];

export default function AppleCabinsPage() {
  return (
    <ProductPageTemplate
      name="Apple Cabin Homes"
      tagline="Rounded aluminum-panel cabins with fluorocarbon coating. Perfect for Airbnb, glamping, and backyard studios."
      description="The Apple Cabin pairs a rounded, organic silhouette with premium materials: fluorocarbon-coated aluminum panels, double-pane insulated glass, a galvanized steel frame, and microcrystalline stone flooring over polyurethane insulation. The result is a weather-resilient, low-maintenance retreat that works as a short-term rental, a glamping unit, or a backyard studio. Pricing is being finalized for the US market."
      price="Coming Soon"
      priceLabel="Pricing"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      interiorImages={interiorImages}
      intro={intro}
      keyFeatures={keyFeatures}
      useCases={useCases}
      warmCards
      hideFinancing
      floorPlans={floorPlans}
      frames={frames}
      specs={specs}
      features={features}
    />
  );
}
