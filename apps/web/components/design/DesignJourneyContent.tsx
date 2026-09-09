'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import Image from 'next/image';
import { X, Check, ChevronDown, ChevronUp, ZoomIn } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface OrderItem {
  label: string;
  price: number;
  category: string;
  removable: boolean;
}

interface Swatch {
  id: string;
  label: string;
  hex?: string;
  imageSrc?: string;
  imagePosition?: string;
  meta?: string;
}

// ─── COLOR DATA ──────────────────────────────────────────────────────────────

const RAL_EXTERIOR: Swatch[] = [
  { id: 'RAL7000', label: 'RAL 7000', hex: '#7E8B92' },
  { id: 'RAL7001', label: 'RAL 7001', hex: '#8F999F' },
  { id: 'RAL7002', label: 'RAL 7002', hex: '#8D8D6C' },
  { id: 'RAL7003', label: 'RAL 7003', hex: '#827F72' },
  { id: 'RAL7004', label: 'RAL 7004', hex: '#969992' },
  { id: 'RAL7005', label: 'RAL 7005', hex: '#6C7156' },
  { id: 'RAL7006', label: 'RAL 7006', hex: '#756E61' },
  { id: 'RAL7008', label: 'RAL 7008', hex: '#6A5F31' },
  { id: 'RAL7009', label: 'RAL 7009', hex: '#4D5645' },
  { id: 'RAL7010', label: 'RAL 7010', hex: '#4C5154' },
  { id: 'RAL7011', label: 'RAL 7011', hex: '#434B4D' },
  { id: 'RAL7012', label: 'RAL 7012', hex: '#4E5754' },
  { id: 'RAL7013', label: 'RAL 7013', hex: '#464531' },
  { id: 'RAL7015', label: 'RAL 7015', hex: '#3E4243' },
  { id: 'RAL7016', label: 'RAL 7016', hex: '#293133' },
  { id: 'RAL7021', label: 'RAL 7021', hex: '#1C1C1A' },
  { id: 'RAL7022', label: 'RAL 7022', hex: '#4B4B48' },
  { id: 'RAL7023', label: 'RAL 7023', hex: '#7E8072' },
  { id: 'RAL7024', label: 'RAL 7024', hex: '#474A50' },
  { id: 'RAL7026', label: 'RAL 7026', hex: '#2E3435' },
  { id: 'RAL7030', label: 'RAL 7030', hex: '#8C8B7F' },
  { id: 'RAL7031', label: 'RAL 7031', hex: '#5B6E78' },
  { id: 'RAL7032', label: 'RAL 7032', hex: '#B5AC8A' },
  { id: 'RAL7033', label: 'RAL 7033', hex: '#7F8976' },
  { id: 'RAL7034', label: 'RAL 7034', hex: '#9DA08A' },
  { id: 'RAL7035', label: 'RAL 7035', hex: '#CBD0CC' },
  { id: 'RAL7036', label: 'RAL 7036', hex: '#9DA3A6' },
  { id: 'RAL7037', label: 'RAL 7037', hex: '#7D7F7D' },
  { id: 'RAL7038', label: 'RAL 7038', hex: '#B4B8B0' },
  { id: 'RAL7039', label: 'RAL 7039', hex: '#6B6963' },
  { id: 'RAL7040', label: 'RAL 7040', hex: '#9DA4A9' },
  { id: 'RAL7042', label: 'RAL 7042', hex: '#8F9695' },
  { id: 'RAL7043', label: 'RAL 7043', hex: '#4F5358' },
  { id: 'RAL7044', label: 'RAL 7044', hex: '#BDBDB2' },
  { id: 'RAL8000', label: 'RAL 8000', hex: '#887142' },
  { id: 'RAL8001', label: 'RAL 8001', hex: '#9C6B30' },
  { id: 'RAL8002', label: 'RAL 8002', hex: '#7B5141' },
  { id: 'RAL8003', label: 'RAL 8003', hex: '#7D5B37' },
  { id: 'RAL8004', label: 'RAL 8004', hex: '#8E402A' },
  { id: 'RAL8007', label: 'RAL 8007', hex: '#6F4A2F' },
  { id: 'RAL8008', label: 'RAL 8008', hex: '#6F4F28' },
  { id: 'RAL8011', label: 'RAL 8011', hex: '#5A3825' },
  { id: 'RAL8012', label: 'RAL 8012', hex: '#6C3B2A' },
  { id: 'RAL8014', label: 'RAL 8014', hex: '#4A3526' },
  { id: 'RAL8015', label: 'RAL 8015', hex: '#5E2F22' },
  { id: 'RAL8016', label: 'RAL 8016', hex: '#4C2B1D' },
  { id: 'RAL8017', label: 'RAL 8017', hex: '#44201B' },
  { id: 'RAL8019', label: 'RAL 8019', hex: '#3D2B1F' },
  { id: 'RAL8022', label: 'RAL 8022', hex: '#1A1110' },
  { id: 'RAL8023', label: 'RAL 8023', hex: '#A65922' },
  { id: 'RAL8024', label: 'RAL 8024', hex: '#79553D' },
  { id: 'RAL8025', label: 'RAL 8025', hex: '#755C49' },
  { id: 'RAL8028', label: 'RAL 8028', hex: '#4E3B31' },
  { id: 'RAL9001', label: 'RAL 9001', hex: '#FDF4E3' },
  { id: 'RAL9002', label: 'RAL 9002', hex: '#E7EBDA' },
  { id: 'RAL9003', label: 'RAL 9003', hex: '#F4F4F4' },
  { id: 'RAL9004', label: 'RAL 9004', hex: '#282828' },
  { id: 'RAL9005', label: 'RAL 9005', hex: '#0A0A0A' },
  { id: 'RAL9010', label: 'RAL 9010', hex: '#FFFFFF' },
  { id: 'RAL9011', label: 'RAL 9011', hex: '#1C1C1C' },
  { id: 'RAL9016', label: 'RAL 9016', hex: '#F6F6F6' },
  { id: 'RAL9017', label: 'RAL 9017', hex: '#1E1E1E' },
  { id: 'RAL9018', label: 'RAL 9018', hex: '#D7D7D7' },
];

const CARVED_METAL: Swatch[] = [
  { id: 'GM16', label: 'GM-16', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '0% 0%', meta: 'Light Pine' },
  { id: 'GM17', label: 'GM-17', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '50% 0%', meta: 'Dark Walnut' },
  { id: 'GM18', label: 'GM-18', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '0% 22%', meta: 'Russet Oak' },
  { id: 'GM19', label: 'GM-19', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '50% 22%', meta: 'Honey Cedar' },
  { id: 'GM20', label: 'GM-20', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '0% 44%', meta: 'Amber Teak' },
  { id: 'GM21', label: 'GM-21', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '50% 44%', meta: 'Ebony Ash' },
  { id: 'GM22', label: 'GM-22', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '0% 67%', meta: 'Blonde Maple' },
  { id: 'GM23', label: 'GM-23', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '50% 67%', meta: 'Olive Birch' },
  { id: 'GM24', label: 'GM-24', imageSrc: '/images/colors/carved-metal-plate.png', imagePosition: '0% 100%', meta: 'Cognac Cherry' },
];

const ROOF_COLORS: Swatch[] = [
  { id: 'B6-ZINC', label: 'Zincalume Plus', hex: '#B8BDB8', meta: 'SRI: 64 · LRV: 67' },
  { id: 'B6-WHITE', label: 'Winter White', hex: '#F0EDE8', meta: 'SRI: 68 · LRV: 74' },
  { id: 'B6-STONE', label: 'Light Stone', hex: '#C9BB9A', meta: 'SRI: 79 · LRV: 53' },
  { id: 'B6-DESERT', label: 'Desert Beige', hex: '#B5A898', meta: 'SRI: 69 · LRV: 39' },
  { id: 'B6-TAUPE', label: 'Taupe', hex: '#9E9088', meta: 'SRI: 59 · LRV: 28' },
  { id: 'B6-PATINA', label: 'Patina Steel', hex: '#7A6E6A', meta: 'SRI: 34 · LRV: 17' },
  { id: 'B6-CHESTNUT', label: 'Chestnut Brown', hex: '#4A3728', meta: 'SRI: 34 · LRV: 12' },
  { id: 'B6-CANYON', label: 'Canyon Red', hex: '#8B3A2A', meta: 'SRI: 43 · LRV: 16' },
  { id: 'B6-RUSTIC', label: 'Rustic Red', hex: '#7A1E1E', meta: 'SRI: 43 · LRV: 13' },
  { id: 'B6-OLDTOWN', label: 'Old Town Gray', hex: '#7A7E82', meta: 'SRI: 43 · LRV: 27' },
  { id: 'B6-OLDZINC', label: 'Old Zinc Gray', hex: '#5A5E60', meta: 'SRI: 43 · LRV: 22' },
  { id: 'B6-COPPER', label: 'Weathered Copper', hex: '#5C5238', meta: 'SRI: 32 · LRV: 11' },
  { id: 'B6-SLATE', label: 'Slate Gray', hex: '#3E4A52', meta: 'SRI: 32 · LRV: 13' },
  { id: 'B6-TAHOE', label: 'Tahoe Blue', hex: '#1E4060', meta: 'SRI: 33 · LRV: 14' },
  { id: 'B6-EVER', label: 'Everglade', hex: '#2E4A38', meta: 'SRI: 36 · LRV: 19' },
  { id: 'B6-DENALI', label: 'Denali Green', hex: '#1A3D2A', meta: 'SRI: 29 · LRV: 11' },
  { id: 'B6-FOREST', label: 'Forest Green', hex: '#1E3820', meta: 'SRI: 36 · LRV: 8' },
  { id: 'B6-PENNY', label: 'Copper Penny', hex: '#A0522D', meta: 'SRI: 33 · LRV: 20' },
  { id: 'B6-RUST', label: 'Natural Rust ★', hex: '#8B4513', meta: 'SRI: 32 · LRV: 15 · Premium' },
];

const INTERIOR_WALLS: Swatch[] = [
  { id: 'B151A92', label: 'B-151-A92', hex: '#D8D4CB', meta: 'Linen Weave' },
  { id: 'KM011', label: 'KM-011', hex: '#E8E6E0', meta: 'White Linen' },
  { id: 'KM012', label: 'KM-012', hex: '#D4C9A8', meta: 'Warm Sand' },
  { id: 'KM007', label: 'KM-007', hex: '#A8A8A8', meta: 'Silver Grain' },
  { id: 'KM019', label: 'KM-019', hex: '#C8B888', meta: 'Golden Oak' },
  { id: 'KM024', label: 'KM-024-XK7086', hex: '#D0D0CC', meta: 'Pearl Gray' },
  { id: 'B006', label: 'B-006', hex: '#E8E0D0', meta: 'Ivory Basket' },
  { id: 'B007', label: 'B-007', hex: '#E4E4E4', meta: 'Cloud White' },
  { id: 'B008', label: 'B-008', hex: '#DCDCD8', meta: 'Mist Gray' },
  { id: 'B092', label: 'B-092-365', hex: '#F0F0F0', meta: 'Pure White' },
  { id: 'A001', label: 'A-001', hex: '#F4F4F2', meta: 'Whitewood Grain' },
  { id: 'B0261', label: 'B-026-1', hex: '#E0E0DC', meta: 'Soft Silver' },
];

const FLOOR_COLORS: Swatch[] = [
  { id: 'T701', label: 'T701', hex: '#5C3D1E', meta: 'Dark Walnut' },
  { id: 'T702', label: 'T702', hex: '#C0BDB0', meta: 'Ash Gray' },
  { id: 'T703', label: 'T703', hex: '#B8C0B0', meta: 'Gray Oak' },
  { id: 'T705', label: 'T705', hex: '#B8622A', meta: 'Cherry Plank' },
  { id: 'T706', label: 'T706', hex: '#C87840', meta: 'Honey Maple' },
  { id: 'T708', label: 'T708', hex: '#A8A8A0', meta: 'Cool Gray' },
  { id: 'T709', label: 'T709', hex: '#C8B890', meta: 'Natural Beige' },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { name: '20×10 Studio', price: 35995, href: '/products/expandable-homes/20x10', image: '/images/products/expandable-homes/exterior/model-20x10-front.png' },
  { name: '20×20', price: 45995, href: '/products/expandable-homes/20x20', image: '/images/products/expandable-homes/exterior/homepage-20x20.jpg' },
  { name: '20×30', price: 49995, href: '/products/expandable-homes/20x30', image: '/images/products/expandable-homes/exterior/model-20x30.png' },
  { name: '20×40', price: 59995, href: '/products/expandable-homes/20x40', image: '/images/products/expandable-homes/exterior/model-20x40-b.jpg' },
  { name: 'Duplex', price: 59995, href: '/products/duplex', image: '/images/products/duplex/hero.png' },
  { name: 'Apple Cabin', price: null, href: '/products/apple-cabins', image: '/images/products/apple-cabins/exterior/01.png' },
  { name: 'Space Capsule', price: null, href: '/products/space-capsules', image: '/images/products/space-capsules/exterior/01.png' },
  { name: 'Assembly Home', price: 25995, href: '/products/assembly-homes', image: '/images/products/assembly-homes/exterior/10.jpg' },
  { name: 'Emergency Housing', price: 2000, href: '/products/emergency-housing', image: '/images/products/emergency-housing/exterior/folding-house.png' },
];

// ─── UPGRADES ─────────────────────────────────────────────────────────────────

const UPGRADES = [
  { key: 'solar-8kw', category: 'solar', name: 'Solar 8kW Package', price: 8500, image: '/images/upgrades/solar-8kw.webp', spec: '8kW solar kit with panels, inverter, and roof mounting hardware. Produces ~10,000–12,000 kWh/year. Ideal for most single-family homes.' },
  { key: 'solar-10kw', category: 'solar', name: 'Solar 10kW Package', price: 11500, image: '/images/upgrades/solar-10kw.webp', spec: '10kW solar kit for larger homes or high energy usage. Produces ~13,000–15,000 kWh/year. Compatible with reinforced truss system.' },
  { key: 'gen-18kw', category: 'generator', name: 'Generac 18kW Standby Generator', price: 6500, image: '/images/upgrades/generac-18kw.webp', spec: 'Generac 18kW air-cooled standby generator with automatic transfer switch. Runs on natural gas or propane. Powers whole home automatically during outages.' },
  { key: 'gen-22kw', category: 'generator', name: 'Generac 22kW Standby Generator', price: 8200, image: '/images/upgrades/generac-22kw.webp', spec: 'Generac 22kW liquid-cooled standby generator. The most powerful whole-home backup available. Automatic transfer, runs on natural gas or propane.' },
  { key: 'gen-duromax', category: 'generator', name: 'DuroMax XP15000HX Portable', price: 1800, image: '/images/upgrades/duromax-xp15000hx.png', spec: 'DuroMax XP15000HX dual-fuel portable generator. 15,000W peak / 12,000W running. Runs on gasoline or propane. Includes wheel kit.' },
  { key: 'hvac-minisplit', category: 'hvac', name: 'Mini-Split 2-Ton HVAC', price: 2200, image: '/images/upgrades/mini-split-2ton.png', spec: 'Ductless 2-ton mini-split system. Cools and heats up to 800 sq ft. 20 SEER rating. Includes wall-mount air handler and outdoor condenser unit.' },
  { key: 'hvac-radiant', category: 'hvac', name: 'Radiant Floor Heating', price: 3100, image: '/images/upgrades/radiant-floor-heating-bright-box-homes-640891.jpg', spec: 'Electric radiant floor heating mat installed under vinyl plank flooring. Programmable thermostat included. Provides even, silent heat from the floor up.' },
  { key: 'hvac-fans', category: 'hvac', name: 'Ceiling Air Mover Fans', price: 450, image: '/images/upgrades/ceiling-air-mover-fans.png', spec: 'High-velocity ceiling air mover fans for improved circulation. Quiet motor, variable speed. Significantly improves HVAC efficiency.' },
  { key: 'kitchen-stove', category: 'kitchen', name: '5-Burner Induction Stove', price: 890, image: '/images/upgrades/induction-5burner.png', spec: 'Professional 5-burner induction cooktop. Faster than gas, safer than electric coil, and energy efficient. Glass ceramic surface, easy to clean.' },
  { key: 'kitchen-kit', category: 'kitchen', name: 'Kitchenette Package', price: 2400, image: '/images/upgrades/kitchenette.png', spec: 'Compact kitchenette with stainless sink, mini-fridge, upper and lower cabinets, and countertop. Ideal for studio and ADU configurations.' },
  { key: 'bath-vanity', category: 'bathroom', name: 'Custom Bathroom Vanity', price: 1200, image: '/images/upgrades/custom-bathroom-vanity.png', spec: 'Upgraded bathroom vanity with stone countertop, undermount sink, soft-close drawers, and polished chrome fixtures.' },
  { key: 'bath-shower', category: 'bathroom', name: 'Modular Shower Unit', price: 1800, image: '/images/upgrades/modular-shower.png', spec: 'Pre-fabricated modular shower with tempered glass door, tile-pattern walls, and chrome fixtures. Easy single-day installation.' },
  { key: 'water-heater', category: 'plumbing', name: 'Tankless Water Heater', price: 950, image: '/images/upgrades/tankless-water-heater.png', spec: 'On-demand tankless water heater available in propane or electric. Never run out of hot water. Energy savings vs. tank heaters up to 30%.' },
  { key: 'ext-patio', category: 'exterior', name: 'Covered Front Patio', price: 3500, image: '/images/upgrades/covered-side-patio.jpeg', spec: 'Factory-built covered front patio with steel support posts, metal roof extension matching your chosen roof color, and concrete anchor points.' },
  { key: 'ext-deck', category: 'exterior', name: 'Side Deck', price: 2800, image: '/images/upgrades/side-deck.png', spec: 'Pressure-treated wood side deck with galvanized steel railing. Dimensions vary by home size. Bolted directly to the home frame.' },
];

// ─── ROOF PRICING ─────────────────────────────────────────────────────────────

const ROOF_PRICING = [
  { size: "10' Home", price: 1995 },
  { size: "20' Home", price: 3995 },
  { size: "30' Home", price: 4995 },
  { size: "40' Home", price: 5995 },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

function needsDarkText(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

// ─── SWATCH GRID ──────────────────────────────────────────────────────────────

function SwatchGrid({
  swatches,
  selected,
  onSelect,
  size = 'md',
}: {
  swatches: Swatch[];
  selected: string | null;
  onSelect: (s: Swatch) => void;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [zoomed, setZoomed] = useState<Swatch | null>(null);
  const dim = size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-20 w-20' : 'h-14 w-14';

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {swatches.map((s) => {
          const isSelected = selected === s.id;
          return (
            <button
              key={s.id}
              title={s.label + (s.meta ? ' — ' + s.meta : '')}
              onClick={() => { onSelect(s); setZoomed(s); }}
              className={`relative ${dim} overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:z-10 focus:outline-none focus:ring-2 focus:ring-[#D4A853]`}
              style={{
                borderColor: isSelected ? '#D4A853' : 'rgba(255,255,255,0.15)',
                boxShadow: isSelected ? '0 0 0 3px rgba(212,168,83,0.4)' : undefined,
                background: s.hex ?? undefined,
              }}
            >
              {s.imageSrc && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${s.imageSrc})`,
                    backgroundSize: '200% 900%',
                    backgroundPosition: s.imagePosition ?? '0% 0%',
                  }}
                />
              )}
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check size={14} className={s.hex && needsDarkText(s.hex) ? 'text-black' : 'text-white'} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Full-screen lightbox on click */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setZoomed(null)}
        >
          <div
            className="relative flex flex-col items-center gap-6 rounded-lg p-8 shadow-2xl"
            style={{ background: '#252527', border: '1px solid rgba(212,168,83,0.3)', maxWidth: 420, width: '90vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setZoomed(null)} className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <div
              className="h-48 w-full rounded-lg border border-white/10"
              style={
                zoomed.imageSrc
                  ? {
                      backgroundImage: `url(${zoomed.imageSrc})`,
                      backgroundSize: '200% 900%',
                      backgroundPosition: zoomed.imagePosition ?? '0% 0%',
                    }
                  : { background: zoomed.hex }
              }
            />
            <div className="text-center">
              <p className="font-heading text-xl font-semibold text-white">{zoomed.label}</p>
              {zoomed.meta && <p className="mt-1 text-sm text-gray-400">{zoomed.meta}</p>}
            </div>
            <button
              onClick={() => { onSelect(zoomed); setZoomed(null); }}
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-colors"
              style={{ background: selected === zoomed.id ? '#16A34A' : '#D4A853' }}
            >
              {selected === zoomed.id ? '✓ Added to Order' : 'Add to Order'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function DesignJourneyContent({
  active,
  setActive,
  order: orderProp,
  setOrder: setOrderProp,
}: {
  active: number;
  setActive: (n: number) => void;
  order?: Record<string, OrderItem>;
  setOrder?: Dispatch<SetStateAction<Record<string, OrderItem>>>;
}) {
  // Use lifted state when the parent provides it (so the sticky configurator can
  // read the same order); otherwise fall back to self-managed internal state.
  const [internalOrder, setInternalOrder] = useState<Record<string, OrderItem>>({});
  const order = orderProp ?? internalOrder;
  const setOrder = setOrderProp ?? setInternalOrder;
  const [selectedExterior, setSelectedExterior] = useState<string | null>(null);
  const [selectedCarved, setSelectedCarved] = useState<string | null>(null);
  const [selectedRoof, setSelectedRoof] = useState<string | null>(null);
  const [selectedRoofSize, setSelectedRoofSize] = useState<string | null>(null);
  const [selectedWall, setSelectedWall] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [expandedUpgrade, setExpandedUpgrade] = useState<string | null>(null);
  const [zoomedMedia, setZoomedMedia] = useState<{
    src: string;
    caption: string;
    type: 'image' | 'video';
  } | null>(null);

  const addToOrder = (key: string, label: string, price: number, category: string, removable = true) => {
    setOrder((prev) => ({ ...prev, [key]: { label, price, category, removable } }));
  };

  const removeFromOrder = (key: string) => {
    setOrder((prev) => {
      const n = { ...prev };
      delete n[key];
      return n;
    });
  };

  const sectionHeading = 'font-heading text-3xl font-bold text-white';
  const sectionSub = 'mt-2 text-sm font-normal text-gray-400';
  const subHeading = 'font-heading text-lg font-semibold text-[#D4A853]';
  const addBtn = 'mt-4 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors';

  return (
    <>
      <div key={active} style={{ animation: 'fadeIn 200ms ease-out' }}>

        {/* ── STEP 0: Choose Your Home ── */}
        {active === 0 && (
          <div>
            <h1 className={sectionHeading}>Choose Your Home</h1>
            <p className={sectionSub}>Select the model that fits your needs. Clicking selects it and moves you to exterior colors.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {PRODUCTS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    addToOrder('model', p.name, p.price ?? 0, 'Home Model', false);
                    setActive(1);
                  }}
                  className="group overflow-hidden rounded-lg border text-left transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: '#252527',
                    border: '1px solid rgba(212,168,83,0.15)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-heading text-sm font-semibold text-white">{p.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-[#D4A853]">
                      {p.price ? fmt(p.price) : 'Coming Soon'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 1: Exterior Color ── */}
        {active === 1 && (
          <div className="space-y-10">
            <div>
              <h1 className={sectionHeading}>Pick Your Exterior Color</h1>
              <p className={sectionSub}>Click any swatch to zoom in and add it to your order.</p>
            </div>

            {/* Standard RAL */}
            <div>
              <h2 className={subHeading}>Standard RAL Colors — Included</h2>
              <p className="mb-4 mt-1 text-xs text-gray-400">All colors factory-applied with UV and weather-resistant coating. 60+ options.</p>
              <SwatchGrid
                swatches={RAL_EXTERIOR}
                selected={selectedExterior}
                onSelect={(s) => {
                  setSelectedExterior(s.id);
                  addToOrder('exterior', `Exterior: ${s.label}`, 0, 'Exterior Color');
                }}
              />
              {selectedExterior && (
                <p className="mt-3 text-xs text-[#D4A853]">
                  ✓ Selected: {RAL_EXTERIOR.find((s) => s.id === selectedExterior)?.label}
                </p>
              )}
            </div>

            {/* Carved Metal */}
            <div>
              <h2 className={subHeading}>Carved Metal Plate Finish — $1,000 Upgrade</h2>
              <p className="mb-4 mt-1 text-xs text-gray-400">Premium wood-grain embossed metal panels. 9 finishes available. Click to zoom.</p>
              <SwatchGrid
                swatches={CARVED_METAL}
                selected={selectedCarved}
                onSelect={(s) => {
                  setSelectedCarved(s.id);
                  addToOrder('exterior', `Carved Metal Plate: ${s.label} — ${s.meta}`, 1000, 'Exterior Color');
                }}
                size="lg"
              />
              {selectedCarved && (
                <p className="mt-3 text-xs text-[#D4A853]">
                  ✓ Selected: {CARVED_METAL.find((s) => s.id === selectedCarved)?.label} — {CARVED_METAL.find((s) => s.id === selectedCarved)?.meta}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 2: Roof ── */}
        {active === 2 && (
          <div className="space-y-8">
            <div>
              <h1 className={sectionHeading}>Choose Your Roof</h1>
              <p className={sectionSub}>Select a color, then choose your home size for pricing.</p>
            </div>

            {/* Benefits block */}
            <div
              className="rounded-lg p-6"
              style={{ background: '#252527', border: '1px solid rgba(212,168,83,0.15)' }}
            >
              <h2 className="font-heading text-base font-semibold text-[#D4A853]">Why a Metal Roof?</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                A standing-seam metal roof protects your home&apos;s primary steel structure from water intrusion — the leading cause of long-term structural damage in prefab construction.
                Metal roofs last <strong className="text-white">40–70 years</strong>, shed water instantly, withstand <strong className="text-white">140mph winds</strong>, reflect solar heat to cut cooling costs,
                and are the only roofing system that properly integrates with a steel-frame expandable home. Every Bright Box Home is engineered for a metal roof upgrade.
              </p>
            </div>

            {/* Color swatches */}
            <div>
              <h2 className={subHeading}>Roof Colors — 19 Options</h2>
              <p className="mb-4 mt-1 text-xs text-gray-400">SRI and LRV values shown on zoom. Higher SRI = cooler roof in hot climates.</p>
              <SwatchGrid
                swatches={ROOF_COLORS}
                selected={selectedRoof}
                onSelect={(s) => {
                  setSelectedRoof(s.id);
                }}
                size="lg"
              />
              {selectedRoof && (
                <p className="mt-3 text-xs text-[#D4A853]">
                  ✓ Color selected: {ROOF_COLORS.find((s) => s.id === selectedRoof)?.label}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div>
              <h2 className={subHeading}>Select Your Home Size — Add to Order</h2>
              <p className="mb-4 mt-1 text-xs text-gray-400">
                Includes pitched metal roof panels, full truss system, all fasteners, and installation hardware.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {ROOF_PRICING.map((r) => (
                  <button
                    key={r.size}
                    onClick={() => {
                      setSelectedRoofSize(r.size);
                      const colorLabel = selectedRoof
                        ? ROOF_COLORS.find((s) => s.id === selectedRoof)?.label ?? 'Color TBD'
                        : 'Color TBD';
                      addToOrder('roof', `Metal Roof — ${r.size} — ${colorLabel}`, r.price, 'Roof Upgrade');
                    }}
                    className="rounded-lg border p-4 text-center transition-all duration-200"
                    style={{
                      background: selectedRoofSize === r.size ? '#D4A853' : '#252527',
                      border: selectedRoofSize === r.size ? '1px solid #D4A853' : '1px solid rgba(212,168,83,0.15)',
                    }}
                  >
                    <p className="text-xs text-gray-300">{r.size}</p>
                    <p className="mt-1 font-mono text-lg font-bold text-white">{fmt(r.price)}</p>
                    <p className="mt-1 text-xs text-[#D4A853]">
                      {selectedRoofSize === r.size ? '✓ Added' : 'Add to Order'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Truss images */}
            <div className="grid grid-cols-3 gap-4">
              <figure>
                <button
                  onClick={() => setZoomedMedia({ src: '/images/upgrades/metal-roof-truss-standard.png', caption: 'Standard Truss System', type: 'image' })}
                  className="relative w-full overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-[#D4A853]"
                  style={{ height: '200px' }}
                >
                  <Image src="/images/upgrades/metal-roof-truss-standard.png" alt="Standard metal roof truss" fill className="object-contain" />
                </button>
                <figcaption className="mt-2 text-xs text-gray-400">Standard Truss System</figcaption>
              </figure>
              <figure>
                <button
                  onClick={() => setZoomedMedia({ src: '/images/upgrades/metal-roof-truss-reinforced-solar.png', caption: 'Reinforced Truss for Solar', type: 'image' })}
                  className="relative w-full overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-[#D4A853]"
                  style={{ height: '200px' }}
                >
                  <Image src="/images/upgrades/metal-roof-truss-reinforced-solar.png" alt="Reinforced truss for solar" fill className="object-contain" />
                </button>
                <figcaption className="mt-2 text-xs text-gray-400">Reinforced Truss for Solar</figcaption>
              </figure>
              <figure>
                <button
                  onClick={() => setZoomedMedia({ src: '/videos/metal-roof-truss.mp4', caption: 'Truss Assembly', type: 'video' })}
                  className="w-full overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-[#D4A853]"
                  style={{ height: '200px' }}
                >
                  <video autoPlay muted loop playsInline className="h-full w-full object-contain">
                    <source src="/videos/metal-roof-truss.mp4" type="video/mp4" />
                  </video>
                </button>
                <figcaption className="mt-2 text-xs text-gray-400">Truss Assembly</figcaption>
              </figure>
            </div>
          </div>
        )}

        {/* ── STEP 3: Interior ── */}
        {active === 3 && (
          <div className="space-y-10">
            <div>
              <h1 className={sectionHeading}>Customize Your Interior</h1>
              <p className={sectionSub}>Click any swatch to zoom in and add to your order.</p>
            </div>

            <div>
              <h2 className={subHeading}>Interior Wall Panels</h2>
              <p className="mb-4 mt-1 text-xs text-gray-400">Bamboo wood fiber wall panels — durable, moisture resistant, easy to clean. 12 finishes.</p>
              <SwatchGrid
                swatches={INTERIOR_WALLS}
                selected={selectedWall}
                onSelect={(s) => {
                  setSelectedWall(s.id);
                  addToOrder('interior-wall', `Wall Panel: ${s.label} — ${s.meta}`, 0, 'Interior');
                }}
                size="lg"
              />
              {selectedWall && (
                <p className="mt-3 text-xs text-[#D4A853]">
                  ✓ Selected: {INTERIOR_WALLS.find((s) => s.id === selectedWall)?.label}
                </p>
              )}
            </div>

            <div>
              <h2 className={subHeading}>Flooring</h2>
              <p className="mb-4 mt-1 text-xs text-gray-400">Factory-installed vinyl plank flooring. 7 finishes. Click to zoom.</p>
              <SwatchGrid
                swatches={FLOOR_COLORS}
                selected={selectedFloor}
                onSelect={(s) => {
                  setSelectedFloor(s.id);
                  addToOrder('interior-floor', `Flooring: ${s.label} — ${s.meta}`, 0, 'Interior');
                }}
                size="lg"
              />
              {selectedFloor && (
                <p className="mt-3 text-xs text-[#D4A853]">
                  ✓ Selected: {FLOOR_COLORS.find((s) => s.id === selectedFloor)?.label}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 4: Upgrades ── */}
        {active === 4 && (
          <div>
            <h1 className={sectionHeading}>Add Upgrades</h1>
            <p className={sectionSub}>Click any upgrade to expand specs and add to your order.</p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {UPGRADES.map((u) => {
                const isExpanded = expandedUpgrade === u.key;
                const isAdded = !!order[u.key];
                return (
                  <div
                    key={u.key}
                    className="overflow-hidden rounded-lg transition-all duration-200"
                    style={{
                      background: '#252527',
                      border: `1px solid ${isAdded ? 'rgba(212,168,83,0.5)' : 'rgba(212,168,83,0.12)'}`,
                      boxShadow: isAdded ? '0 0 0 1px rgba(212,168,83,0.2)' : undefined,
                    }}
                  >
                    <button
                      onClick={() => setExpandedUpgrade(isExpanded ? null : u.key)}
                      className="flex w-full items-center gap-4 p-4 text-left"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image src={u.image} alt={u.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-tight text-white">{u.name}</p>
                        <p className="mt-0.5 font-mono text-xs text-[#D4A853]">{fmt(u.price)}</p>
                        {isAdded && <p className="mt-1 text-xs text-green-400">✓ Added to order</p>}
                      </div>
                      <div className="flex-shrink-0 text-gray-500">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div
                        className="px-4 pb-4"
                        style={{ borderTop: '1px solid rgba(212,168,83,0.1)' }}
                      >
                        <p className="mt-3 text-sm leading-relaxed text-gray-300">{u.spec}</p>
                        <button
                          onClick={() => {
                            if (isAdded) {
                              removeFromOrder(u.key);
                            } else {
                              addToOrder(u.key, u.name, u.price, 'Upgrade');
                            }
                          }}
                          className={`${addBtn} mt-4`}
                          style={{ background: isAdded ? '#DC2626' : '#D4A853' }}
                        >
                          {isAdded ? 'Remove from Order' : `Add to Order — ${fmt(u.price)}`}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 5: Get Started ── */}
        {active === 5 && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <h1 className={sectionHeading}>Ready to Build?</h1>
            <p className="mt-4 max-w-lg text-lg text-gray-300">
              You&apos;ve designed your home. Now let&apos;s make it real. Share your build with our team.
            </p>
            {Object.keys(order).length > 0 && (
              <div
                className="mt-8 w-full max-w-sm rounded-lg p-6 text-left"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <p className="mb-3 font-heading text-sm font-bold text-gray-900">Your Build Summary</p>
                {Object.entries(order).map(([key, item]) => (
                  <div key={key} className="flex justify-between border-b border-gray-100 py-1.5 last:border-0">
                    <span className="text-xs text-gray-700">{item.label}</span>
                    <span className="font-mono text-xs font-semibold text-gray-900">
                      {item.price === 0 ? 'Included' : fmt(item.price)}
                    </span>
                  </div>
                ))}
                <div className="mt-3 flex justify-between">
                  <span className="text-sm font-bold text-gray-900">Upgrades Total</span>
                  <span className="font-mono text-sm font-bold text-gray-900">
                    {fmt(Object.values(order).reduce((s, i) => s + i.price, 0))}
                  </span>
                </div>
              </div>
            )}
            <div className="mt-8">
              <BookConsultation size="lg" />
            </div>
            <p className="mt-6 text-gray-300">800-259-1745 · info@brightboxhomes.com</p>
          </div>
        )}

      </div>

      {/* Full-screen media lightbox */}
      {zoomedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setZoomedMedia(null)}
        >
          <div
            className="relative rounded-lg p-8 shadow-2xl"
            style={{ background: '#252527', border: '1px solid rgba(212,168,83,0.3)', maxWidth: 900, width: '90vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setZoomedMedia(null)} className="absolute right-4 top-4 z-10 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            {zoomedMedia.type === 'video' ? (
              <video autoPlay muted loop playsInline className="w-full">
                <source src={zoomedMedia.src} type="video/mp4" />
              </video>
            ) : (
              <div className="relative w-full" style={{ height: '60vh' }}>
                <Image src={zoomedMedia.src} alt={zoomedMedia.caption} fill className="object-contain" />
              </div>
            )}
            <p className="py-3 text-center text-sm text-gray-400">{zoomedMedia.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
