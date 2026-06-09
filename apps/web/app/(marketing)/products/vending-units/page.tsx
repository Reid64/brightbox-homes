import type { Metadata } from 'next';
import { Store, Palette, ShieldCheck, Zap, Truck, Sparkles, ShoppingBag, Coffee, Building2, UtensilsCrossed } from 'lucide-react';
import ProductPageTemplate from '@/components/products/ProductPageTemplate';

const intro =
  'Vending Units turn a shipping-container shell into a turnkey storefront. Built for food stands, retail kiosks, and mobile pop-ups, each unit is customized with serving windows, branding, and the utilities your business needs - then delivered ready to open. Rugged, lockable, and relocatable, it is the fastest way to put a branded business on any lot.';

const keyFeatures = [
  { icon: Store, title: 'Serving Windows', text: 'Configurable fold-up serving and retail windows built for fast customer flow.' },
  { icon: Palette, title: 'Custom Branding', text: 'Finish the exterior in your brand colors, logo, and signage.' },
  { icon: ShieldCheck, title: 'Steel Container Shell', text: 'Lockable, weatherproof steel construction that travels and secures easily.' },
  { icon: Zap, title: 'Business-Ready Utilities', text: 'Electrical, lighting, and equipment hookups configured for your use.' },
  { icon: Truck, title: 'Relocatable', text: 'Move your storefront to events, seasons, or new locations as needed.' },
  { icon: Sparkles, title: 'Turnkey Setup', text: 'Delivered ready to operate - open for business with minimal on-site work.' },
];

const useCases = [
  { icon: UtensilsCrossed, title: 'Food Stand', text: 'A compact, equipped kitchen-to-counter food service unit.' },
  { icon: ShoppingBag, title: 'Retail Kiosk', text: 'A secure, branded shop for products and merchandise.' },
  { icon: Coffee, title: 'Coffee Bar', text: 'A high-traffic espresso and beverage stand.' },
  { icon: Building2, title: 'Pop-Up Shop', text: 'A relocatable storefront for events and seasonal sales.' },
];

export const metadata: Metadata = {
  title: 'Vending Units | Bright Box Homes',
  description:
    'Container-based food stands, retail kiosks, and mobile storefronts. Fully customizable with branding, fold-up serving windows, and interior buildout. Contact us for commercial pricing.',
};

const exteriorImages = [
  { src: '/images/products/vending-units/exterior/01.jpg', alt: 'Deployed container food stand with custom illuminated signage at night.', caption: 'Open for business after dark - custom illuminated signage that draws a crowd.' },
  { src: '/images/products/vending-units/exterior/02.png', alt: 'Orange container food stand on a boardwalk with outdoor seating.', caption: 'Prime boardwalk real estate with built-in outdoor seating.' },
  { src: '/images/products/vending-units/exterior/03.png', alt: 'Container food kiosk in a city park with patio seating.', caption: 'A turnkey park kiosk - patio seating and foot traffic included.' },
  { src: '/images/products/vending-units/exterior/04.png', alt: 'Green container cafe with customers ordering at the counter.', caption: 'A cafe that pulls a line - serving window built for fast flow.' },
  { src: '/images/products/vending-units/exterior/05.jpg', alt: 'Orange container vending unit with fold-up serving windows.', caption: 'Fold-up serving windows open wide and lock down secure after hours.' },
  { src: '/images/products/vending-units/exterior/06.jpg', alt: 'Customizable black container cafe with bar seating and branding space.', caption: 'Bar seating and bold branding space - your concept, your colors.' },
  { src: '/images/products/vending-units/exterior/07.jpg', alt: 'Glass-front container retail unit.', caption: 'A glass-front retail unit that puts your products on display.' },
];

const specs = [
  { label: 'Construction', value: 'Steel-frame container' },
  { label: 'Customization', value: 'Full exterior branding, serving windows, interior buildout' },
  { label: 'Applications', value: 'Food trucks, cafes, retail kiosks, pop-up shops' },
];

const features = [
  'Custom exterior branding and color',
  'Fold-up serving windows',
  'Interior counter and prep area',
  'Electrical hookup ready',
  'Plumbing rough-in available',
  'Stackable and transportable',
  'Multiple size options',
];

export default function VendingUnitsPage() {
  return (
    <ProductPageTemplate
      name="Vending Units"
      tagline="Container-based food stands, retail kiosks, and mobile storefronts. Fully customizable."
      description="Turn a steel-frame container into a turnkey storefront. Vending Units ship ready for full exterior branding, fold-up serving windows, and a finished interior counter and prep area - ideal for food stands, cafes, retail kiosks, and pop-up shops. Electrical hookup comes standard with plumbing rough-in available, and units stack and transport easily for multi-location operators."
      price="Contact for Pricing"
      priceLabel="Commercial"
      heroImages={exteriorImages}
      exteriorImages={exteriorImages}
      intro={intro}
      keyFeatures={keyFeatures}
      useCases={useCases}
      specs={specs}
      features={features}
    />
  );
}
