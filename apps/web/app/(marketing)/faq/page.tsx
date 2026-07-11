import type { Metadata } from 'next';
import { BookConsultation } from '@/components/ui/BookConsultation';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'FAQ | Bright Box Homes - Everything You Need to Know',
  description:
    'Answers to the most common questions about expandable container homes, permits, delivery, true costs, off-grid living, financing, building code, and unrestricted land.',
};

const faqSections = [
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
          'Everything factory-installed: a mini-split HVAC system, tankless water heater, induction stove, dual-pane windows, a covered front porch, an upgraded 125-amp electrical panel, washer/dryer hookups, a garbage disposal, and a walk-in shower. You also choose from 60+ exterior colors, interior flooring, wall panels, and cabinet colors - all included in the base price.',
      },
      {
        question: 'What is NOT included in the price?',
        answer:
          'Land, foundation, permits, delivery and freight, the crane or forklift to unload, a septic system, utility trenching, the electrical service connection, a water meter, decks beyond the standard porch, skirting, engineering or surveys, and the local contractor labor to tie utilities in. These vary too much by site to bundle into the home price.',
      },
      {
        question: 'Can expandable container homes be financed or insured?',
        answer:
          'Both are possible but differ from a traditional home. Because these are classified as temporary structures in most jurisdictions, conventional mortgages are difficult - many buyers use personal-property or chattel financing, and we can point you toward partners like Acorn. Insurance is available through specialty insurers that cover manufactured and modular structures, typically as personal property rather than real property.',
      },
      {
        question: 'Are expandable container homes actually cheaper than traditional homes?',
        answer:
          'For the structure itself, yes - significantly. Once you add foundation, utilities, permits, and site work the gap narrows, but an expandable home is still typically 40-60% less than comparable site-built construction and goes up in a fraction of the time. The savings are real; just budget for the full project, not only the home.',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSections.flatMap((s) =>
    s.items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="py-24 lg:py-32" style={{ background: 'linear-gradient(180deg, #0F1729, #141B2D)' }}>
        <div className="mx-auto max-w-[1280px] px-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#6B9BF7]">
            FAQ
          </p>
          <h1 className="font-heading text-4xl font-bold text-[#FFFFFF] md:text-5xl lg:text-6xl">
            Everything You Need to Know
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#D1D5DB]">
            Honest answers about cost, permits, delivery, off-grid living, financing,
            and finding the right land for your Bright Box Home.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-[#F5F0E8] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Accordion sections={faqSections} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0F1729] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#FFFFFF] md:text-4xl">
            Still have questions?
          </h2>
          <p className="mt-4 text-lg text-[#D1D5DB]">
            Our team is happy to walk you through anything - from land to delivery to
            financing.
          </p>
          <div className="mt-8 flex justify-center">
            <BookConsultation size="lg" />
          </div>
          <p className="mt-6 text-sm text-gray-400">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
        </div>
      </section>
    </>
  );
}
