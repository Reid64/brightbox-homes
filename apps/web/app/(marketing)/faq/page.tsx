import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'FAQ | Bright Box Homes - Everything You Need to Know',
  description:
    'Answers to the most common questions about expandable container homes, permits, delivery, costs, off-grid living, and unrestricted land.',
};

const faqSections = [
  {
    title: 'Buying & Cost',
    items: [
      {
        question: 'What is included in the listed price?',
        answer:
          'The listed price covers the complete home unit with all standard inclusions: mini-split HVAC, tankless water heater, induction stove with range hood, dual-pane windows, covered front porch with railing, garbage disposal, washer/dryer hookups, upgraded 125-amp electrical panel, and your choice of 60+ RAL exterior colors, cabinet colors, interior flooring, bathroom wall finishes, and ceiling-mounted air movers. What you see in our standard inclusions list is what ships with every home.',
      },
      {
        question: 'What is NOT included in the price?',
        answer:
          "Land, permits, foundation, delivery freight, crane or forklift for placement, septic system, utility trenching and hookups (water, sewer, electric), water meter, decks and skirting beyond the included porch, engineering or survey work, and local contractor labor for final connections. We're transparent about this because the 'all-in' cost matters more than the sticker price.",
      },
      {
        question: 'How much does an expandable container home really cost after everything?',
        answer:
          "The honest answer depends on your site. A typical all-in budget beyond the home price includes: delivery freight ($3,000-$8,000 depending on distance), foundation ($3,000-$10,000 for slab or piers), utility hookups ($2,000-$8,000), septic if needed ($5,000-$15,000), crane placement ($500-$2,000), and permits ($500-$3,000). For a 20x20 home at $45,995, a realistic all-in range is $60,000-$80,000 depending on site conditions. We'd rather you know this upfront than be surprised.",
      },
      {
        question: 'Are expandable container homes actually cheaper than traditional homes?',
        answer:
          "In most cases, yes - significantly. The national median new home price exceeds $400,000. A fully set up Bright Box Home including site work typically comes in at $60,000-$100,000 all-in. The tradeoff is size and customization depth - these aren't 2,500 sq ft custom builds. But for 200-800 sq ft of well-equipped living space, the value proposition is hard to beat.",
      },
      {
        question: 'Can these homes be financed or insured?',
        answer:
          "Yes to both, but the process differs from traditional homes. Most lenders classify these as personal property (like manufactured homes) rather than real property, so you'll typically work with personal property lenders or chattel loan providers. Insurance is available through carriers that cover manufactured or modular structures. We can connect you with financing partners who specialize in prefab homes.",
      },
      {
        question: 'What size options are available?',
        answer:
          'Our Expandable Container Homes come in five sizes: 20x10 (200 sq ft studio, $35,995), 20x20 (400 sq ft, 1-3 bedroom options, $45,995), 20x30 (600 sq ft, $49,995), 20x40 (800 sq ft, $59,995), and the 20x20 Duplex (800 sq ft combined two-story, $64,995). We also offer Apple Cabins, Space Capsules, Assembly Homes, Vending Units, and Foldout emergency housing.',
      },
    ],
  },
  {
    title: 'Permits & Placement',
    items: [
      {
        question: 'Are expandable container homes legal where I live?',
        answer:
          'It depends entirely on your local jurisdiction. Zoning, building codes, and permit requirements vary by city, county, and state. Here is what we recommend: look for unrestricted land, typically found in rural and unincorporated areas. Unrestricted land has no zoning overlays, no HOA restrictions, and minimal permitting requirements. Many of our buyers specifically seek out unrestricted rural acreage for exactly this reason. We can help you understand what to look for.',
      },
      {
        question: 'Can I put one on rural land?',
        answer:
          'Rural land is often the best option for prefab homes - especially unrestricted land in unincorporated areas. With unrestricted land, you typically avoid zoning restrictions, residential design standards, and HOA rules that can complicate placement in subdivisions or city limits. Check for deed restrictions, floodplain status, and utility access. Many Texas counties, for example, have large areas of unrestricted land ideal for expandable container homes.',
      },
      {
        question: 'Can I put one inside city limits?',
        answer:
          "Usually more challenging than rural placement. Cities enforce zoning codes, residential design standards, minimum square footage requirements, foundation specifications, and occupancy permits. Some cities explicitly allow accessory dwelling units (ADUs) which can work for smaller models. Check with your city's planning department before purchasing.",
      },
      {
        question: 'Do expandable container homes need a foundation?',
        answer:
          'Yes. Every expandable home needs a stable, level foundation. Options include concrete slab, concrete piers, helical piles, or engineered support systems depending on your site conditions, soil type, and local requirements. We provide foundation specification guides for each model.',
      },
      {
        question: 'What site preparation is required before delivery?',
        answer:
          'At minimum: a level pad or foundation, utility stub-outs (water, sewer/septic, electrical), clear vehicle access for the delivery truck (minimum 12 ft wide road), adequate space for crane or forklift operation, and proper drainage. We provide a detailed site prep checklist after purchase.',
      },
    ],
  },
  {
    title: 'Delivery & Setup',
    items: [
      {
        question: 'How is the home delivered and unloaded?',
        answer:
          "Homes ship via flatbed truck from port to your property. A crane or forklift places the unit on your prepared foundation. You'll need road access wide enough for a flatbed (12 ft minimum), overhead clearance, and a staging area for the crane. We coordinate the entire delivery process including customs, port handling, and last-mile logistics.",
      },
      {
        question: 'How long does setup take?',
        answer:
          "The home itself unfolds and is placed in a matter of hours. But 'move-in ready' includes more: foundation curing (1-7 days depending on type), utility connections (1-3 days with a licensed contractor), permit inspections, and any site finishing like decks, skirting, or landscaping. Realistic timeline from delivery to move-in is 1-4 weeks depending on site readiness and local inspection schedules.",
      },
    ],
  },
  {
    title: 'Utilities & Off-Grid',
    items: [
      {
        question: 'How are plumbing, sewer, water, and electrical connected?',
        answer:
          "Homes ship with pre-installed internal plumbing, electrical wiring, breaker panel, and fixture connections. What you complete on-site is the 'last mile' - connecting the home's stub-outs to your local water supply, sewer or septic system, and electrical service. This requires licensed local contractors and typically takes 1-3 days.",
      },
      {
        question: 'Can an expandable container home be off-grid?',
        answer:
          'Absolutely - this is one of the most popular use cases. We offer solar-ready packages, generator-ready electrical, and our homes are compatible with off-grid systems including solar panels, battery storage, propane water heaters, well water, rainwater collection, composting toilets, and generator backup. Many buyers place these on unrestricted rural land specifically for off-grid living.',
      },
    ],
  },
  {
    title: 'Durability & Comfort',
    items: [
      {
        question: 'Are expandable container homes durable?',
        answer:
          'Durability depends on build quality. Our homes use galvanized steel frames, 24-gauge corrugated metal roofing, dual-pane windows, and quality hinges and weatherseals. The steel frame structure is inherently strong - these are built from the same materials as shipping containers that survive ocean transit. Proper foundation, drainage, and maintenance extend the lifespan to decades.',
      },
      {
        question: 'Are these homes insulated well enough for hot or cold climates?',
        answer:
          'Standard insulation handles moderate climates well. For extreme heat (like Texas summers) or cold winters, we offer upgraded 3-inch Rockwool insulation that significantly improves thermal performance. Combined with the 24,000 BTU mini-split HVAC system, our homes maintain comfortable temperatures year-round. Proper installation and sealing at the site level is critical.',
      },
      {
        question: 'Do expandable homes have condensation or moisture problems?',
        answer:
          'Steel structures can be prone to condensation if not properly insulated and ventilated. Our homes address this with insulated wall panels, ceiling-mounted air movers for circulation, and proper vapor barrier installation. Correct foundation drainage and site grading are also essential. Follow our installation guidelines and condensation is manageable.',
      },
    ],
  },
  {
    title: 'Use Cases',
    items: [
      {
        question:
          'Can I use one as an ADU, guest house, cabin, rental, office, or workforce housing?',
        answer:
          'All of the above. Our buyers use expandable homes as ADUs (accessory dwelling units), Airbnb rentals, hunting cabins, home offices, in-law suites, workforce housing, and primary residences. Each use case may have different local requirements - ADU rules vary by city, short-term rental permits vary by county, and workforce housing may have commercial zoning needs. We recommend checking your local regulations for your specific intended use.',
      },
    ],
  },
  {
    title: 'Quality & Trust',
    items: [
      {
        question: 'Are cheap container homes from overseas reliable?',
        answer:
          "Quality varies enormously. The cheapest units from unknown factories often cut corners on steel gauge, weld quality, insulation, electrical safety, and weathersealing. Bright Box Homes works exclusively with vetted, factory-authorized manufacturers. Every home is inspected before shipping, photo-documented during production, and backed by our 7-day no-defect inspection window upon delivery. We're transparent about our sourcing because your trust matters more than a sale.",
      },
      {
        question: 'What should I inspect before buying any expandable container home?',
        answer:
          'Check steel gauge and frame thickness, weld quality, hinge mechanisms, roof pitch and drainage, weatherseals around all expansion joints, floor system construction, electrical panel rating, plumbing layout, insulation type and R-value, window and door quality, and any certifications or warranties. We publish our full specifications because we want informed buyers.',
      },
      {
        question: 'Do they meet building code?',
        answer:
          "Our homes are classified as temporary structures and do not require local building code compliance in most jurisdictions. However, if you intend to use one as a permanent residence in an area with building codes, you'll need to work with your local building department on permitting, foundation engineering, and inspections. This is another reason we recommend unrestricted land - in many rural areas, these requirements don't apply.",
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
      <section className="bg-bb-surface-dark py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue">
            FAQ
          </p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Everything You Need to Know
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Real answers to the questions buyers actually ask - about permits,
            costs, delivery, off-grid living, and finding the right land.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-bb-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Accordion sections={faqSections} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bb-navy py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Still have questions?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Our team is happy to walk you through anything - from land to delivery
            to financing.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/consultation" size="lg">
              Book a Consultation
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
        </div>
      </section>
    </>
  );
}
