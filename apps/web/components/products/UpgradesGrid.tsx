'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Upgrade {
  image: string;
  name: string;
  // Short blurb shown on the card.
  blurb: string;
  // Detailed specs shown in the lightbox/modal.
  specs: string;
  // Provenance of the specs text (see comments by each entry).
  source: 'spreadsheet' | 'web search' | 'short description' | 'placeholder';
}

// Upgrade catalog. Specs sourcing is marked per item via `source`:
//  - 'spreadsheet'      : taken verbatim from the project price-list spreadsheet
//  - 'web search'       : authentic manufacturer specs gathered via web search
//  - 'short description': operator-provided short copy (no detailed specs)
//  - 'placeholder'      : operator to supply full specs later
const UPGRADES: Upgrade[] = [
  // --- SPREADSHEET ---
  {
    image: '/images/upgrades/solar-8kw.webp',
    name: '8KW Solar Kit',
    blurb: 'Off-grid solar kit: 8000W pure sine inverter, LiFePO4 storage, and monocrystalline panels.',
    specs:
      '8000W Solar Inverter: AC Output 8000W, Pure Sine Wave, 120/240V split/single phase, parallel up to 6 units, Max PV Input 500VDC, 92% efficiency, Max Charging 200A, Max PV Array 11,000W, UL1741 ETL. LiFePO4 Battery: 51.2V, 100Ah, 5.12kWh, 7000+ cycle life, RS232/RS485/CAN, 10yr warranty. 415W Solar Panels: Monocrystalline, UL61730/TUV/IEC/CEC/CE, 25yr warranty.',
    source: 'spreadsheet',
  },
  {
    image: '/images/upgrades/solar-10kw.webp',
    name: '10KW Solar Kit',
    blurb: 'Off-grid solar kit: 10000W inverter, 20.48kWh LiFePO4 storage, and bifacial panels.',
    specs:
      '10000W Pure Sine Wave Inverter, 120/240V split phase, MPPT 125-425VDC, 92% efficiency, 200A max charging, 11,000W PV input, UL1741 ETL, 3yr warranty. Battery: SG48100P LiFePO4, 51.2V, 100Ah, 5.12kWh each, 20.48kWh total, 7000+ cycles, UL1973/CE/UN38.3, 10yr warranty. Panels: 12x 450W bifacial N-type mono (5.4kW total), UL61730/CEC, 12yr product + 30yr performance warranty. Parallel up to 6 inverters.',
    source: 'spreadsheet',
  },
  {
    image: '/images/upgrades/duromax-xp15000hx.png',
    name: 'DuroMax XP15000HX Generator',
    blurb: '15,000W dual-fuel portable generator with electric start and transfer-switch outlets.',
    specs:
      '15,000W dual-fuel (gas/propane), 670cc OHV engine, copper windings, electric push-button start. Outlets: 5x 120V GFCI, 1x 120V 30A, 1x 120/240V 30A twist-lock, 1x 120/240V 50A. Transfer-switch compatible. Digital control panel with voltage, frequency, runtime hours, and maintenance intervals.',
    source: 'spreadsheet',
  },
  {
    image: '/images/upgrades/mini-split-2ton.png',
    name: '2-Ton Mini-Split Heat Pump',
    blurb: '24,000 BTU inverter heat pump - heats and cools at 20+ SEER2 on 110V.',
    specs:
      '24,000 BTU inverter heat pump, 20+ SEER2, full DC inverter compressor, R32 or R410A refrigerant, 110V.',
    source: 'spreadsheet',
  },
  {
    image: '/images/upgrades/tankless-water-heater.png',
    name: 'Tankless Hot Water Heater',
    blurb: 'Whole-house electric tankless heater - endless hot water, wall-mounted.',
    specs:
      '24kW minimum, 240V single-phase, self-modulating, whole-house rated, 4.5-5.5 GPM output, wall-mount.',
    source: 'spreadsheet',
  },
  {
    image: '/images/upgrades/metal-roof-truss-standard.png',
    name: 'Metal Roof Truss Standard',
    blurb: 'Standard metal roof truss system for standing-seam metal roofing.',
    specs:
      'Standard metal roof truss system for expandable homes. Provides structural support for standing seam metal roofing.',
    source: 'spreadsheet',
  },
  {
    image: '/images/upgrades/metal-roof-truss-reinforced-solar.png',
    name: 'Metal Roof Truss Reinforced (Solar)',
    blurb: 'Reinforced truss system rated for roof-mounted solar panel installations.',
    specs:
      'Reinforced metal truss system with additional supports rated for roof-mounted solar panel installations. Includes 2 additional trusses for load distribution.',
    source: 'spreadsheet',
  },
  {
    image: '/images/upgrades/modular-shower.png',
    name: 'Modular Shower',
    blurb: 'Factory-assembled, pre-plumbed modular shower unit for Assembly Homes.',
    specs: 'Factory-assembled modular shower unit for Assembly Homes. Pre-plumbed, ready for connection.',
    source: 'spreadsheet',
  },
  {
    image: '/images/upgrades/radiant-floor-heating-bright-box-homes-640891.jpg',
    name: 'Radiant Floor Heating',
    blurb: 'Whole-house radiant heating beneath the flooring for even, efficient warmth.',
    specs:
      'Whole-house radiant heating system installed beneath flooring. Even heat distribution, energy efficient, no forced air.',
    source: 'spreadsheet',
  },
  // --- WEB SEARCH (authentic manufacturer specs) ---
  {
    image: '/images/upgrades/generac-18kw.webp',
    name: '18kW Generac Whole House Generator',
    blurb: 'Air-cooled Guardian standby generator with whole-home backup and Wi-Fi monitoring.',
    // Source: Generac Guardian 18kW (models 7226/7228) - generac.com spec sheet.
    specs:
      'Generac Guardian Series 18kW air-cooled home standby generator. Output: 18,000W on LP / 17,000W on natural gas. G-Force 800 Series 816cc dual-cylinder engine with G-Flex variable speed. True Power Technology (<5% total harmonic distortion). Evolution multilingual LCD controller. Free Mobile Link Wi-Fi remote monitoring. ~65 dBA. 5-year limited warranty. Available with 200A whole-house transfer switch.',
    source: 'web search',
  },
  {
    image: '/images/upgrades/generac-22kw.webp',
    name: '22kW Generac Whole House Generator',
    blurb: 'Top air-cooled Guardian generator with a 200A service-rated transfer switch and Wi-Fi.',
    // Source: Generac Guardian 22kW (model 7043) - generac.com.
    specs:
      'Generac Guardian Series 22kW air-cooled home standby generator (model 7043). Output: 22,000W on LP / 19,500W on natural gas. G-Force industrial-grade engine with pressure lubrication. Includes 200A service-entrance-rated automatic transfer switch. True Power Technology (<5% THD). Wi-Fi / Mobile Link remote monitoring. Aluminum RhinoCoat enclosure rated to 150 mph winds. ~67 dBA with Quiet-Test mode. 5-year limited warranty.',
    source: 'web search',
  },
  {
    image: '/images/upgrades/induction-5burner.png',
    name: '5-Burner Inlaid Induction Stovetop',
    blurb: 'Flush-mount 5-zone induction cooktop with touch controls and timer.',
    // Source: web search on 5-burner built-in induction cooktops (general category specs).
    specs:
      'Built-in 5-zone induction cooktop, approximately 7200-7400W total across the five zones, hardwired 220-240V. Ceramic glass surface with sensor touch controls, multiple power levels, child safety lock, and a 1-99 minute timer. Designed for flush/inlaid installation in the countertop.',
    source: 'web search',
  },
  {
    image: '/images/upgrades/ceiling-air-mover-fans.png',
    name: 'Ceiling Mount Air Mover Fans',
    blurb: 'Ceiling-mounted air circulator that pushes conditioned air back down into the room.',
    // Source: web search on ceiling-mount industrial air circulators (general category specs).
    specs:
      'Ceiling-mounted air circulator (air mover) engineered to push heated or cooled air from the ceiling back down to floor level. Typical configurations run on 115V/60Hz single phase with multiple speeds and air delivery in the ~3,000 CFM range for residential-scale spaces. Remote-control operation.',
    source: 'web search',
  },
  // --- SHORT DESCRIPTIONS (operator-provided) ---
  {
    image: '/images/upgrades/covered-side-patio.jpeg',
    name: 'Covered Side Patio',
    blurb: 'Covered patio extension for expanded outdoor living space.',
    specs: 'Covered patio extension for expanded outdoor living space. Matches home exterior finish.',
    source: 'short description',
  },
  {
    image: '/images/upgrades/side-deck.png',
    name: 'Side Deck',
    blurb: 'Extended deck platform for additional outdoor space.',
    specs: 'Extended deck platform for additional outdoor space. Durable composite construction.',
    source: 'short description',
  },
  {
    image: '/images/upgrades/custom-bathroom-vanity.png',
    name: 'Custom Bathroom Vanity',
    blurb: 'Upgraded bathroom vanity with modern fixtures and storage.',
    specs: 'Upgraded bathroom vanity with modern fixtures and storage. Multiple style options available.',
    source: 'short description',
  },
  // --- PLACEHOLDER (operator to supply full specs) ---
  {
    image: '/images/upgrades/kitchenette.png',
    name: 'Kitchenette',
    blurb: 'Compact kitchen unit for Assembly Homes.',
    specs: 'Compact kitchen unit for Assembly Homes. (Full specifications coming soon.)',
    source: 'placeholder',
  },
];

export default function UpgradesGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  const active = openIndex !== null ? UPGRADES[openIndex] : null;

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close]);

  return (
    <section id="upgrades" className="scroll-mt-24">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue">Upgrades</p>
      <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Customize Your Home</h2>
      <p className="mt-4 max-w-2xl text-gray-300">
        Premium upgrades to make your Bright Box Home uniquely yours.
      </p>

      <div className="mt-8 rounded-2xl border border-white/5 bg-[#1A2030] p-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {UPGRADES.map((u, i) => (
            <button
              key={u.image}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View details: ${u.name}`}
              className="flex flex-col rounded-xl bg-[#D4C4A8] p-4 text-left transition-colors duration-fast ease-out hover:bg-[#C8B898]"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src={u.image}
                  alt={u.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
                  className="object-contain p-2"
                />
              </div>
              <h3 className="mt-3 font-heading text-base font-bold leading-snug text-gray-900">
                {u.name}
              </h3>
              <p className="mt-1 flex-1 text-sm text-gray-700">{u.blurb}</p>
              <p className="mt-3 text-sm font-semibold text-gray-900">Price: TBD</p>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} details`}
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-fast ease-out hover:bg-white/20"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <div
            className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-bb-surface-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[45vh] w-full bg-white">
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="p-6 lg:p-8">
              <h3 className="font-heading text-2xl font-bold text-white">{active.name}</h3>
              <p className="mt-4 text-gray-300">{active.specs}</p>
              <p className="mt-6 text-lg font-semibold text-bb-blue">Price: TBD</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
