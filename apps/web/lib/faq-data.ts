import { Home, Wallet, Ruler, Truck, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Single source of truth for FAQ content. The page renders `faqSections`
// verbatim (and derives its FAQPage JSON-LD from it); the category layer sits
// on top so the same 22 questions can also be browsed or searched by topic
// without a second copy of the copy drifting out of sync.

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

export type FaqCategoryId =
  | 'buying-a-bright-box'
  | 'financing'
  | 'site-preparation'
  | 'delivery-and-installation'
  | 'home-care-and-warranty';

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
  icon: LucideIcon;
  /** Tailwind text-colour class. Literal strings so Tailwind's content scanner
   *  (which globs ./lib/**) keeps them in the build - never build these
   *  dynamically or they will be purged. */
  color: string;
  /** Tailwind border-colour class, used to emphasise a search match. Same
   *  literal-string rule as `color`. */
  borderColor: string;
  /** Compact label for the FAQ hero, which keeps all five categories on one
   *  row at every width - the full labels are too long to fit a fifth of a
   *  phone screen. */
  shortLabel: string;
  /** Optional ghosted photo behind this category's accordion section. Public
   *  path only - the Accordion renders it lazily through next/image at 10%. */
  backdrop?: string;
  /** The same colour as a raw hex. Tailwind cannot generate the per-category
   *  glow shadows and SVG strokes the FAQ hero needs, so those read this via a
   *  CSS custom property instead. Keep it in sync with `color`. */
  hex: string;
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'buying-a-bright-box',
    label: 'Buying a Bright Box',
    shortLabel: 'Buying',
    icon: Home,
    color: 'text-bb-gold',
    borderColor: 'border-bb-gold',
    hex: '#D4A853',
  },
  {
    id: 'financing',
    label: 'Financing',
    shortLabel: 'Financing',
    icon: Wallet,
    color: 'text-bb-success',
    borderColor: 'border-bb-success',
    hex: '#16A34A',
  },
  {
    id: 'site-preparation',
    label: 'Site Preparation',
    shortLabel: 'Site Prep',
    icon: Ruler,
    color: 'text-bb-warning',
    borderColor: 'border-bb-warning',
    hex: '#D97706',
  },
  {
    id: 'delivery-and-installation',
    label: 'Delivery & Installation',
    shortLabel: 'Delivery',
    icon: Truck,
    color: 'text-bb-blue',
    borderColor: 'border-bb-blue',
    hex: '#4A9BD9',
    backdrop: '/images/delivery-hero.png',
  },
  {
    id: 'home-care-and-warranty',
    label: 'Home Care & Warranty',
    shortLabel: 'Warranty',
    icon: ShieldCheck,
    color: 'text-bb-purple',
    borderColor: 'border-bb-purple',
    hex: '#8158D6',
    backdrop: '/images/products/expandable-homes/interior/01.jpeg',
  },
];

// 7 authored sections, preserved verbatim - this is the render order on /faq.
export const faqSections: FaqSection[] = [
  {
    title: 'Buying & Cost',
    items: [
      {
        question: 'How much does an expandable container home really cost?',
        answer:
          'The listed price - $35,995 for the 20x10 up to $59,995 for the 20x40 - is the home itself, fully built and equipped. Your total project cost depends on your site. Plan for freight from port to your property, a crane or forklift to unload and place the unit, a foundation ($3,000-$15,000 depending on slab, piers, or helical piles), utility connections (electrical service and water/sewer or septic tie-ins), permits, and site prep. A realistic all-in budget runs well above the sticker price - but our 25/25/25/25 payment plan spreads the home cost across four milestones so you never pay more than 25% at once.',
      },
      {
        question: 'What is included in the listed price?',
        answer:
          'Everything factory-installed: a mini-split HVAC system, tankless water heater, induction stove, dual-pane windows, a covered front porch, a 200-amp electrical panel, washer/dryer hookups, a garbage disposal, and a walk-in shower. You also choose from 60+ exterior colors, interior flooring, wall panels, and cabinet colors - all included in the base price.',
      },
      {
        question: 'What is NOT included in the price?',
        answer:
          'Land, foundation, permits, delivery and freight, the crane or forklift to unload, a septic system, utility trenching, the electrical service connection, a water meter, decks beyond the standard porch, skirting, engineering or surveys, and the local contractor labor to tie utilities in. These vary too much by site to bundle into the home price.',
      },
      {
        question: 'Are expandable container homes actually cheaper than traditional homes?',
        answer:
          'For the structure itself, yes - significantly. Once you add foundation, utilities, permits, and site work the gap narrows, but an expandable home is still typically 40-60% less than comparable site-built construction and goes up in a fraction of the time. The savings are real; just budget for the full project, not only the home.',
      },
    ],
  },
  {
    title: 'Financing',
    items: [
      {
        question: 'Can expandable container homes be financed or insured?',
        answer:
          'Both are possible but differ from a traditional home. Because these are classified as temporary structures in most jurisdictions, conventional mortgages are difficult - many buyers use personal-property or chattel financing, and we can point you toward partners like Acorn. Insurance is available through specialty insurers that cover manufactured and modular structures, typically as personal property rather than real property.',
      },
    ],
  },
  {
    title: 'Permits & Placement',
    items: [
      {
        question: 'Are expandable container homes legal where I live?',
        answer:
          'It depends on your jurisdiction. Bright Box Homes are classified as temporary structures, which in most areas do not require full building-code compliance. The easiest path by far is unrestricted rural land - no zoning overlay, no HOA, and minimal permitting. City and county rules vary widely, so always confirm with your local building department before you buy.',
      },
      {
        question: 'Can I put one on rural land?',
        answer:
          "Rural land is our number-one recommended placement strategy. Many rural counties have minimal or no zoning. Look specifically for 'unrestricted' land - no deed restrictions, no HOA, and no residential design standards. Before buying, verify flood-plain status, setback requirements, and utility or well/septic access. Unrestricted acreage is where expandable homes are easiest to place and live in legally.",
      },
      {
        question: 'Can I put one inside city limits?',
        answer:
          'Usually harder. Municipalities enforce zoning, residential design standards, foundation specifications, and occupancy permits, and some restrict temporary structures outright. A few cities allow them as accessory dwelling units (ADUs). Check your local ordinances first - but rural, unrestricted land remains the simpler path.',
      },
      {
        question: 'Do expandable container homes meet building code?',
        answer:
          'Bright Box Homes are classified as temporary buildings and do not require local building-code compliance in most jurisdictions. They can be built and outfitted to meet certain specifications, but final approval always depends on your local jurisdiction. Consult your building department about how a temporary structure is treated where you intend to place it.',
      },
      {
        question: 'Can I use one as an ADU, guest house, rental, or office?',
        answer:
          'All are common uses, each with its own rules. ADU regulations vary by city and state; guest houses usually fall under accessory-structure rules; rentals require local landlord-tenant compliance; and office or commercial use needs commercial zoning or a home-occupation permit. Confirm the specific use you intend with your local authority.',
      },
    ],
  },
  {
    title: 'Delivery & Setup',
    items: [
      {
        question: 'How is the home delivered and unloaded?',
        answer:
          'The home ships on a flatbed truck. Your site needs adequate road access, a cleared and level staging area, and room for a crane or forklift to unload and set the unit on its foundation. Bright Box coordinates the delivery logistics from port to property.',
      },
      {
        question: 'How long does setup take?',
        answer:
          "The unit itself unfolds and is placed in a matter of hours. 'Move-in ready,' though, also includes the foundation (days to weeks), utility connections (days), any required inspections, and finishing like decks or skirting. A realistic timeline is 2-6 weeks from delivery to move-in, depending mostly on how prepared your site is.",
      },
      {
        question: 'What site preparation is required before delivery?',
        answer:
          'At minimum: a level pad or foundation, an access road wide enough for a flatbed and crane, utility stub-outs (electrical, water, sewer or septic), a cleared work area, proper drainage grading, and compliance with any setback requirements.',
      },
    ],
  },
  {
    title: 'Utilities & Off-Grid',
    items: [
      {
        question: 'How are plumbing, sewer, water, and electrical connected?',
        answer:
          "Homes arrive with plumbing and electrical rough-ins already installed, plus a factory-installed water heater, HVAC, and appliances. On site, a licensed electrician connects the panel to your utility service and a licensed plumber ties into water and sewer or a septic system. It is the 'last mile,' not a full build-out.",
      },
      {
        question: 'Can an expandable container home be off-grid?',
        answer:
          'Yes - it is one of the most popular setups. Add a solar package (8kW or 10kW kits), battery storage, and a generator (15kW-22kW), pair it with a septic system, well or rainwater collection, and propane for cooking. Bright Box offers solar-ready and generator-ready packages factory-installed, and unrestricted rural land is ideal for going fully off-grid.',
      },
    ],
  },
  {
    title: 'Durability & Comfort',
    items: [
      {
        question: 'Are expandable container homes durable?',
        answer:
          'Yes. Expandable homes are built on a galvanized steel frame - the same rugged structure as a shipping container - with optional 24-gauge metal roofing, dual-pane windows, and proper insulation. Long-term durability comes down to a quality foundation, good site drainage, and routine maintenance.',
      },
      {
        question: 'Are they insulated well enough for Texas heat or cold climates?',
        answer:
          'Standard insulation is included, with a 3-inch Rockwool upgrade available for extreme climates. The 24,000 BTU mini-split handles both heating and cooling, dual-pane windows cut thermal transfer, and ceiling air movers improve circulation. For Texas heat or cold-winter regions, we recommend the insulation upgrade.',
      },
      {
        question: 'Do expandable homes have condensation or moisture problems?',
        answer:
          'Condensation is possible in any tightly sealed structure that is not properly ventilated. Bright Box homes include ventilation, HVAC, and insulation to minimize it, and proper site drainage plus a sound foundation prevent moisture intrusion from below. Follow the ventilation guidance and it is very manageable.',
      },
    ],
  },
  {
    title: 'Use Cases',
    items: [
      {
        question: 'What size options are available?',
        answer:
          'Five expandable sizes: 20x10 (studio, ~200 sq ft), 20x20 (~400 sq ft), 20x30 (~600 sq ft), 20x40 (~800 sq ft), and the 20x20 Duplex (two-story, ~800 sq ft combined). Beyond the expandable line we also offer Apple Cabins, Space Capsules, Assembly Homes, and Emergency Housing.',
      },
      {
        question: 'Can I customize the layout, exterior, kitchen, bathroom, and finishes?',
        answer:
          'Yes. Choose from 60+ exterior colors, 19 roof colors, interior wall colors, flooring options, cabinet colors, and bathroom wall designs. Kitchen and bathroom locations follow the floor plan you select, but the finishes throughout are yours to customize.',
      },
    ],
  },
  {
    title: 'Quality & Trust',
    items: [
      {
        question: 'Are cheap container homes from overseas reliable?',
        answer:
          'Quality varies enormously between sellers. Bright Box Homes works with vetted factory partners, runs pre-ship photo and video inspections, and gives you a 7-day no-defect inspection window after delivery - protections many overseas sellers do not offer. Before buying from anyone, verify steel gauge, weld quality, insulation type, US-standard 120V/240V electrical, plumbing compatibility, and warranty terms.',
      },
      {
        question: 'What should I inspect before buying from any seller?',
        answer:
          'Check the steel gauge and frame quality, weld consistency, hinge mechanisms, roof pitch and drainage, weatherproof seals, the floor system, the electrical panel rating, plumbing layout, insulation R-value, window and door quality, certifications, and warranty terms. A reputable seller will share all of this before you commit.',
      },
    ],
  },
];

// Section title -> category. Authored sections stay the editorial unit; the five
// categories are the browse/search unit layered over them. Exported so the
// Accordion can colour each authored section without re-deriving the mapping;
// it holds no reference to faqSections, so importing it into a client component
// does not drag the 22 answers along.
export const sectionCategory: Record<string, FaqCategoryId> = {
  'Buying & Cost': 'buying-a-bright-box',
  'Use Cases': 'buying-a-bright-box',
  Financing: 'financing',
  'Permits & Placement': 'site-preparation',
  'Utilities & Off-Grid': 'site-preparation',
  'Delivery & Setup': 'delivery-and-installation',
  'Durability & Comfort': 'home-care-and-warranty',
  'Quality & Trust': 'home-care-and-warranty',
};

/** Every question belonging to a category, in authored section order.
 *  Every category currently resolves to at least one question, but callers
 *  should still tolerate an empty result: the map is keyed on section title, so
 *  renaming a section without updating sectionCategory silently empties it. */
export function faqByCategoryId(id: FaqCategoryId): FaqItem[] {
  return faqSections
    .filter((section) => sectionCategory[section.title] === id)
    .flatMap((section) => section.items);
}

/** Which sections feed a category - useful for headings and debugging the map. */
export function sectionsByCategoryId(id: FaqCategoryId): FaqSection[] {
  return faqSections.filter((section) => sectionCategory[section.title] === id);
}

// Free-text search hints: lowercase keyword -> category. Matched as substrings
// against a query, so 'financing' also hits 'finance' via the 'financ' stem.
export const searchKeywordMap: Record<string, FaqCategoryId> = {
  // buying-a-bright-box
  cost: 'buying-a-bright-box',
  price: 'buying-a-bright-box',
  included: 'buying-a-bright-box',
  size: 'buying-a-bright-box',
  customize: 'buying-a-bright-box',
  duplex: 'buying-a-bright-box',
  adu: 'buying-a-bright-box',
  rental: 'buying-a-bright-box',
  office: 'buying-a-bright-box',
  // financing
  financ: 'financing',
  loan: 'financing',
  mortgage: 'financing',
  chattel: 'financing',
  insurance: 'financing',
  payment: 'financing',
  credit: 'financing',
  // site-preparation
  septic: 'site-preparation',
  permit: 'site-preparation',
  zoning: 'site-preparation',
  land: 'site-preparation',
  foundation: 'site-preparation',
  utilities: 'site-preparation',
  electrical: 'site-preparation',
  plumbing: 'site-preparation',
  well: 'site-preparation',
  solar: 'site-preparation',
  'off-grid': 'site-preparation',
  code: 'site-preparation',
  // delivery-and-installation
  delivery: 'delivery-and-installation',
  shipping: 'delivery-and-installation',
  freight: 'delivery-and-installation',
  crane: 'delivery-and-installation',
  setup: 'delivery-and-installation',
  install: 'delivery-and-installation',
  timeline: 'delivery-and-installation',
  // home-care-and-warranty
  warranty: 'home-care-and-warranty',
  durability: 'home-care-and-warranty',
  insulation: 'home-care-and-warranty',
  condensation: 'home-care-and-warranty',
  moisture: 'home-care-and-warranty',
  maintenance: 'home-care-and-warranty',
  inspect: 'home-care-and-warranty',
  quality: 'home-care-and-warranty',
};

/** Section title -> category id, for the FIRST authored section of each
 *  category. These are the scroll targets the hero links to: the section
 *  element carries id="<category id>", so a category with two sections anchors
 *  at whichever comes first in render order. */
export function categoryAnchorMap(): Record<string, FaqCategoryId> {
  const claimed = new Set<FaqCategoryId>();
  const map: Record<string, FaqCategoryId> = {};
  for (const section of faqSections) {
    const id = sectionCategory[section.title];
    if (id && !claimed.has(id)) {
      claimed.add(id);
      map[section.title] = id;
    }
  }
  return map;
}

/** Categories whose keywords match a free-text query, most specific first. */
export function categoriesForQuery(query: string): FaqCategoryId[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits = Object.entries(searchKeywordMap)
    .filter(([keyword]) => q.includes(keyword))
    .sort((a, b) => b[0].length - a[0].length)
    .map(([, id]) => id);
  return [...new Set(hits)];
}
