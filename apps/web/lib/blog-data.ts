// Blog post content. Each post renders on /blog/[slug]. Content is an ordered
// list of blocks (heading or paragraph) for clean, structured rendering.

export interface ContentBlock {
  type: 'heading' | 'para';
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  readingTime: string;
  content: ContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'finding-unrestricted-land',
    title: 'How to Find Unrestricted Land for Your Prefab Home',
    category: 'Land & Placement',
    date: 'Originally published December 12, 2024',
    excerpt:
      'Unrestricted land is the single easiest path to placing an expandable container home. Here is how to find it, what to verify, and which regions to look in.',
    image: '/images/products/expandable-homes/exterior/03.jpeg',
    readingTime: '6 min read',
    content: [
      { type: 'para', text: 'If there is one decision that determines how smooth your prefab-home project will be, it is where you put it. The single best placement strategy for an expandable container home is unrestricted land - rural parcels with no zoning overlay, no homeowners association, and minimal permitting. Get the land right and everything downstream gets easier.' },
      { type: 'heading', text: 'What "unrestricted land" actually means' },
      { type: 'para', text: 'Unrestricted land is property with no deed restrictions, no HOA, and no residential design standards dictating what you can build or how it must look. In practice it usually means rural acreage in a county that has chosen not to adopt comprehensive zoning. On unrestricted land you are far more likely to be able to place a temporary structure like a Bright Box Home, live in it, and add solar or a well without fighting a design-review board.' },
      { type: 'para', text: 'It is the opposite of a typical subdivision lot, where covenants control everything from roof pitch to fence height and an HOA can block a container home outright. Those rules exist to protect property values inside the subdivision - but they are exactly what makes prefab placement difficult.' },
      { type: 'heading', text: 'How to search for it' },
      { type: 'para', text: 'Start at the county level, not the city. Counties - not states - set most zoning, and they vary enormously even within the same state. Land-listing sites let you filter for acreage, and listings will often say "no restrictions," "no HOA," or "no zoning." Treat those as a starting point, then verify directly. Call the county planning or development office and ask two questions: does this parcel have zoning, and are temporary or modular structures permitted?' },
      { type: 'para', text: 'Pull the deed and any plat documents before you buy. Deed restrictions can run with the land even where there is no HOA, and they are the most common surprise. A title company or real-estate attorney can confirm what, if anything, is recorded against the parcel.' },
      { type: 'heading', text: 'What to verify before you buy' },
      { type: 'para', text: 'Beyond restrictions, check the practical items that make a parcel livable. Confirm flood-plain status (FEMA flood maps are free to search), required setbacks from property lines and roads, and legal road access - a landlocked parcel without a recorded easement is a serious problem. Then confirm utilities: is grid power at the road, or will you go off-grid? Can you drill a well and install a septic system, and does the county require a perc test first?' },
      { type: 'para', text: 'Drainage and grade matter too. A level, well-draining pad is cheaper to build on and protects your home from moisture over time. Walk the land after rain if you can.' },
      { type: 'heading', text: 'Best regions to look' },
      { type: 'para', text: 'Large parts of rural Texas are a favorite for exactly this reason - many Texas counties have little or no county-wide zoning, and unrestricted acreage is widely available and affordable. Similar opportunities exist across rural areas of the Mountain West, the South, and the Midwest. The pattern to look for is the same everywhere: unincorporated land, outside city limits, in a county without comprehensive zoning.' },
      { type: 'heading', text: 'Why this is the #1 strategy for container homes' },
      { type: 'para', text: 'Bright Box Homes are classified as temporary structures, which already removes much of the building-code friction in most jurisdictions. Pair that classification with unrestricted land and you have the clearest possible path to placing your home, connecting utilities or going off-grid, and actually living in it - without a design board, an HOA, or a zoning variance standing in the way.' },
      { type: 'para', text: 'Once you have your land sorted, the rest is straightforward. Explore our expandable container homes from $35,995, and talk to our team about site requirements - we will help you think through access, foundation, and utilities before you commit.' },
    ],
  },
  {
    slug: 'true-cost-expandable-container-home',
    title: "The True Cost of an Expandable Container Home: What You'll Really Pay",
    category: 'Buying & Cost',
    date: 'Originally published December 19, 2024',
    excerpt:
      'The sticker price is the home itself. Here is an honest breakdown of freight, foundation, utilities, permits, and site prep - so you can budget the full project.',
    image: '/images/products/expandable-homes/exterior/homepage-20x20.jpg',
    readingTime: '8 min read',
    content: [
      { type: 'para', text: 'The most common question we get is also the most important: what does an expandable container home really cost once everything is said and done? The honest answer is that the listed price is the home, fully built and equipped - and your total project cost depends heavily on your site. Here is how to budget for the whole thing.' },
      { type: 'heading', text: 'The home itself' },
      { type: 'para', text: 'Bright Box expandable homes range from $35,995 for the 20x10 studio to $59,995 for the 800 sq ft 20x40, with the 20x20 and 20x30 in between. That price is not a shell - it includes a mini-split HVAC system, tankless water heater, induction stove, dual-pane windows, a covered porch, a 200-amp electrical panel, and your choice of 60+ exterior colors and interior finishes. For the structure itself, that is a remarkable amount of finished home for the money.' },
      { type: 'heading', text: 'Freight and unloading' },
      { type: 'para', text: 'Your home ships on a flatbed truck from port to your property. Freight cost depends on distance, and you will need a crane or forklift on delivery day to unload the unit and set it on its foundation. Budget for both - and make sure your site has road access wide enough for a flatbed plus room to stage equipment.' },
      { type: 'heading', text: 'Foundation' },
      { type: 'para', text: 'Every home needs a stable, level foundation. A simple gravel-and-pier setup is the most affordable; a poured concrete slab costs more but is the most permanent; helical piles suit difficult soils. Expect roughly $3,000 to $15,000 depending on the option, your soil, and local labor rates. This is one of the biggest swing factors in your total budget.' },
      { type: 'heading', text: 'Utilities' },
      { type: 'para', text: 'The home arrives with plumbing and electrical rough-ins, but the "last mile" happens on site. A licensed electrician connects the panel to grid power (or to your solar and battery system), and a licensed plumber ties into municipal water and sewer or to a well and septic system. If you need a new electrical service run, a water meter, septic install, or trenching across the property, those add up quickly - septic alone can run several thousand dollars.' },
      { type: 'heading', text: 'Permits and site prep' },
      { type: 'para', text: 'Permit costs vary widely by jurisdiction, and on unrestricted rural land they are often minimal. Site prep - clearing, grading for drainage, and an access road - is easy to overlook but real. The flatter and more accessible your land, the less you will spend here.' },
      { type: 'heading', text: 'A realistic total' },
      { type: 'para', text: 'Add it up and the all-in cost lands meaningfully above the sticker price - often by $20,000 to $40,000 or more once foundation, utilities, and site work are included, depending entirely on your site. A remote parcel needing a well, septic, and a long power run costs far more to set up than a flat lot with utilities at the road. The home price is fixed; the site is the variable.' },
      { type: 'heading', text: 'How it compares - and how you pay' },
      { type: 'para', text: 'Even with the full project budget, an expandable home typically lands 40-60% below comparable site-built construction and goes up in a fraction of the time. And our 25/25/25/25 payment plan spreads the home cost across four milestones - order, production, pre-shipment, and pre-delivery - so you are never writing one enormous check. Talk to our team and we will help you build a realistic, site-specific budget before you buy.' },
    ],
  },
  {
    slug: 'container-home-legality-zoning-permits',
    title: 'Are Expandable Container Homes Legal? Zoning, Permits, and Placement Guide',
    category: 'Permits & Legality',
    date: 'Originally published January 4, 2025',
    excerpt:
      'Legality comes down to your jurisdiction and how the home is classified. Here is how temporary-structure status, zoning, and unrestricted land fit together.',
    image: '/images/products/expandable-homes/exterior/01.jpeg',
    readingTime: '5 min read',
    content: [
      { type: 'para', text: 'It is the question that stops most people before they buy: is this even legal where I want to put it? The answer is almost always yes - with the right land and a clear understanding of how these homes are classified. Here is the practical guide.' },
      { type: 'heading', text: 'Temporary-structure classification' },
      { type: 'para', text: 'Bright Box Homes are classified as temporary structures. In most jurisdictions, temporary structures do not trigger the full residential building-code process that a permanent stick-built house would. That classification is the foundation of why these homes are so much easier to place than people expect - but it is not a universal free pass, which is why local rules still matter.' },
      { type: 'heading', text: 'City vs county vs rural' },
      { type: 'para', text: 'Think of it as three tiers of difficulty. Inside city limits is the hardest: municipalities enforce zoning, residential design standards, foundation specs, and occupancy permits, and some restrict temporary structures outright. County land outside any city is easier. Rural, unincorporated land in a county with little or no zoning is the easiest of all - and it is where we steer most buyers.' },
      { type: 'heading', text: 'The unrestricted land advantage' },
      { type: 'para', text: 'Unrestricted land - no zoning overlay, no HOA, no deed restrictions - removes the layers that make placement difficult. On unrestricted acreage you typically avoid design review, minimum-square-footage rules, and HOA approval entirely. Combined with the temporary-structure classification, it is the clearest path to legally placing and living in your home. Many rural Texas counties, among others, offer exactly this.' },
      { type: 'heading', text: 'ADU and accessory-use rules' },
      { type: 'para', text: 'If you want to place a home on a lot you already own, look into accessory dwelling unit (ADU) rules. A growing number of cities and states have loosened ADU regulations to encourage more housing, and an expandable home can sometimes qualify. Guest houses often fall under accessory-structure rules instead. These vary by jurisdiction, so confirm the specific use you intend.' },
      { type: 'heading', text: 'The building-code reality' },
      { type: 'para', text: 'Be precise here: a temporary structure that does not require code compliance is not the same as a code-certified permanent dwelling. If you intend to use the home as a permanent primary residence in a jurisdiction with strict codes, you may face additional requirements. For most rural placements, recreational uses, ADUs, rentals, and off-grid living, the temporary-structure path is exactly what makes the project feasible.' },
      { type: 'heading', text: 'How to check your jurisdiction' },
      { type: 'para', text: 'Do not rely on a listing or a forum post. Call the county planning or development office and the building department directly. Ask whether the parcel has zoning, whether temporary or modular structures are permitted, what permits (if any) apply, and what the setback and septic requirements are. Get answers before you buy the land - it is the cheapest insurance in the entire project.' },
      { type: 'para', text: 'Once you understand your local rules, the rest is the fun part. Explore our expandable container homes and read our guide to finding unrestricted land, then talk to our team about your specific site.' },
    ],
  },
  {
    slug: 'off-grid-container-home-solar-power',
    title: 'Off-Grid Living with an Expandable Container Home: Solar, Water, and Power Setup',
    category: 'Off-Grid',
    date: 'Originally published January 18, 2025',
    excerpt:
      'Solar, batteries, generators, well water, and septic make a fully off-grid container home practical. Here is how the pieces fit - and what to factory-order.',
    image: '/images/products/expandable-homes/exterior/05.jpeg',
    readingTime: '7 min read',
    content: [
      { type: 'para', text: 'Going off-grid is one of the most popular reasons people choose an expandable container home, and it pairs perfectly with unrestricted rural land. With the right setup you can have full power, water, and comfort with no utility connection at all. Here is how the systems work together.' },
      { type: 'heading', text: 'Power: solar and batteries' },
      { type: 'para', text: 'Solar is the backbone of an off-grid home. Bright Box offers solar-ready packages and 8kW and 10kW solar kits that can be factory-installed, sized to cover everyday loads like lighting, the mini-split HVAC, the induction stove, and appliances. Pair the panels with battery storage so you keep power after sundown and through cloudy stretches. An 8kW system suits a smaller, efficient home; step up to 10kW (or add panels) for larger units or heavier use.' },
      { type: 'heading', text: 'Backup: generators' },
      { type: 'para', text: 'A generator is the safety net behind your solar and batteries. Bright Box offers generator-ready electrical and generator options from 15kW up to 22kW. For most off-grid setups, solar plus batteries handle the daily load and the generator covers extended low-sun periods or peak demand. Ordering the home generator-ready from the factory means the transfer wiring is built in, not retrofitted.' },
      { type: 'heading', text: 'Water: well and rainwater' },
      { type: 'para', text: 'Off-grid water usually comes from a drilled well with a pump (which your solar system can power) or from rainwater collection with filtration. Check whether your county requires a permit or perc test before drilling. The home arrives plumbed and ready; you connect it to your water source on site.' },
      { type: 'heading', text: 'Waste: septic' },
      { type: 'para', text: 'Without a sewer connection you will install a septic system. Cost depends on soil and system type, and many rural counties require a perc test to confirm the ground drains properly before they approve the install. Factor this into both your budget and your timeline - it is often the longest-lead item in an off-grid build.' },
      { type: 'heading', text: 'Cooking and heat: propane' },
      { type: 'para', text: 'While the standard induction stove runs on electricity, many off-grid owners add propane for cooking and supplemental heat to reduce the load on their solar system. A propane water-heater swap is also available for off-grid setups. It is a simple way to keep your battery bank focused on the essentials.' },
      { type: 'heading', text: 'Putting it together' },
      { type: 'para', text: 'A practical off-grid Bright Box Home looks like this: an efficient expandable unit with the 3-inch Rockwool insulation upgrade, an 8kW or 10kW solar kit with battery storage, a generator for backup, a well or rainwater system, and septic. Order the solar-ready and generator-ready packages from the factory so the home arrives wired for it. Add unrestricted rural land and you have a self-sufficient home with no monthly utility bills.' },
      { type: 'para', text: 'Explore our expandable container homes and the available solar and power upgrades, then talk to our team about designing an off-grid configuration for your site.' },
    ],
  },
  {
    slug: 'container-home-vs-traditional-construction',
    title: 'Container Home vs Traditional Construction: An Honest Comparison',
    category: 'Buying & Cost',
    date: 'Originally published February 1, 2025',
    excerpt:
      'Cost, timeline, customization, durability, resale, financing, and insurance - an even-handed look at how expandable container homes stack up against site-built houses.',
    image: '/images/products/expandable-homes/exterior/09.png',
    readingTime: '9 min read',
    content: [
      { type: 'para', text: 'Expandable container homes and traditional site-built houses solve the same problem - shelter you own - in very different ways. Neither is universally "better." Here is an honest, category-by-category comparison to help you decide which fits your situation.' },
      { type: 'heading', text: 'Cost' },
      { type: 'para', text: 'This is the clearest win for container homes. The structure itself is dramatically cheaper, and even after foundation, utilities, and site work, an expandable home typically lands 40-60% below comparable site-built construction. Traditional homes carry higher material, labor, and financing costs, and overruns are common. If budget is the priority, the container home wins.' },
      { type: 'heading', text: 'Timeline' },
      { type: 'para', text: 'A traditional build commonly takes 6-12 months or more from breaking ground to move-in. An expandable home is manufactured in the factory while you prepare your site, unfolds in hours on delivery day, and is typically move-in ready within 2-6 weeks of delivery once utilities and finishing are done. For speed, the container home is in a different league.' },
      { type: 'heading', text: 'Customization' },
      { type: 'para', text: 'Traditional construction offers essentially unlimited customization - any size, any layout, any material - which is its real advantage. Container homes are more constrained: you choose from defined sizes and floor plans, then customize colors, finishes, flooring, cabinets, and upgrades. For most buyers the available choices are more than enough; if you want a fully bespoke 3,000 sq ft custom home, traditional is the route.' },
      { type: 'heading', text: 'Durability' },
      { type: 'para', text: 'Both can last decades when built and maintained well. Container homes use a galvanized steel frame that is inherently strong, with metal roofing and dual-pane windows; longevity comes down to the foundation, drainage, and upkeep. Traditional homes have a long, proven track record. Call this one roughly even, with the caveat that quality varies more between container-home sellers than between licensed home builders.' },
      { type: 'heading', text: 'Resale' },
      { type: 'para', text: 'Traditional homes have deeper, more established resale markets and standardized appraisal. Container homes are a newer category, and resale can depend on local demand and how the home is classified. If you are buying primarily as a long-term financial investment with predictable appreciation, factor this in.' },
      { type: 'heading', text: 'Financing and insurance' },
      { type: 'para', text: 'Traditional homes qualify for conventional mortgages and standard homeowners insurance. Container homes, classified as temporary or personal property in many areas, are harder to finance with a traditional mortgage - buyers often use personal-property or chattel loans - and are insured through specialty manufactured/modular insurers. Our 25/25/25/25 payment plan also reduces the need for financing by spreading payments across the build.' },
      { type: 'heading', text: 'The bottom line' },
      { type: 'para', text: 'Choose a traditional build if you want maximum customization, conventional financing, and the deepest resale market - and you have the time and budget. Choose an expandable container home if you want to spend far less, move in far faster, and place a quality home on rural or unrestricted land. For a huge share of buyers - first homes, rentals, ADUs, vacation places, and off-grid living - the container home is the smarter choice. Explore the lineup and talk to our team about your goals.' },
    ],
  },
  {
    slug: 'whats-included-bright-box-home',
    title: "What's Included with Every Bright Box Home (And What You'll Need to Add)",
    category: 'Buying & Cost',
    date: 'Originally published February 14, 2025',
    excerpt:
      'A clear, honest inventory of what ships in the base price of every Bright Box Home, what is not included, and the upgrades worth considering.',
    image: '/images/products/expandable-homes/interior/10.jpg',
    readingTime: '6 min read',
    content: [
      { type: 'para', text: 'One of the biggest sources of confusion when buying a prefab home is figuring out what actually comes with it. We believe in being completely clear up front. Here is exactly what is included in the base price of a Bright Box expandable home, what is not, and which upgrades are worth a look.' },
      { type: 'heading', text: 'What ships in the base price' },
      { type: 'para', text: 'A Bright Box Home is not a bare shell - it arrives finished and equipped. Standard inclusions are a mini-split HVAC system for heating and cooling, a tankless water heater, an induction stove, a garbage disposal, a walk-in shower, and washer/dryer hookups. The structure includes dual-pane windows, a covered front porch, and a 200-amp electrical panel.' },
      { type: 'para', text: 'You also get real design choice at no extra cost: 60+ exterior colors, interior flooring options, interior wall panels, and cabinet color selection are all part of the base price. In other words, the home that arrives is one you have already personalized.' },
      { type: 'heading', text: 'What is NOT included' },
      { type: 'para', text: 'The items that depend on your specific site are not bundled in, because they vary too much to price blindly. That means land, the foundation, permits, delivery and freight, the crane or forklift to unload, a septic system, utility trenching, the electrical service connection, a water meter, decks beyond the standard porch, skirting, engineering or surveys, and the local licensed-contractor labor to tie utilities in. None of these are hidden - they are simply yours to arrange based on your land.' },
      { type: 'heading', text: 'Upgrades worth considering' },
      { type: 'para', text: 'Beyond the standard package, the most popular upgrades address comfort and self-sufficiency. A 3-inch Rockwool insulation upgrade is well worth it for Texas heat or cold-winter climates. Solar-ready and generator-ready packages, 8kW and 10kW solar kits, and 15kW-22kW generators turn the home into an off-grid-capable property. A full pitched metal roof system, additional windows, and upgraded countertops round out the common choices.' },
      { type: 'heading', text: 'Planning a realistic budget' },
      { type: 'para', text: 'The smart way to budget is in three buckets: the home (a fixed, known price), your chosen upgrades (also fixed and known), and the site work (the variable). The home and upgrades you can lock in precisely. The site - foundation, utilities, permits, prep - is where you should build in margin, because a flat lot with utilities at the road costs a fraction of a remote parcel needing a well, septic, and a long power run.' },
      { type: 'heading', text: 'No surprises' },
      { type: 'para', text: 'Our goal is for you to know exactly what you are paying for. The base price is genuinely a complete, finished home; the upgrades are transparent; and the site work is yours to control based on the land you choose. Explore our expandable container homes from $35,995, review the available upgrades on each product page, and talk to our team - we will help you build the full, honest budget before you commit.' },
    ],
  },
  {
    slug: 'electrical-service-adu-solar-offgrid-guide',
    title: 'Powering Your Bright Box Home: Service Size, ADUs, Solar, and What It Really Costs',
    category: 'Site & Utilities',
    date: 'Originally published September 24, 2026',
    excerpt:
      'Every Bright Box Home ships with a 200-amp panel. That does not mean you have 200 amps. Here is the full picture - new service, backyard ADUs, second meters, off-grid solar, trenching costs, and the questions to ask before you buy.',
    image: '/images/products/expandable-homes/exterior/11.png',
    readingTime: '15 min read',
    content: [
      { type: 'para', text: 'Electrical service is the single most misunderstood part of placing a prefab home, and the part most likely to produce an unwelcome surprise after the home is already on the ground. It is also entirely manageable once you understand one distinction. This guide covers that distinction and then walks through every situation we see: a standalone home on raw land, a backyard ADU behind an existing house, a second meter, and a fully off-grid solar setup.' },

      { type: 'heading', text: 'The one distinction that explains everything: panel versus service' },
      { type: 'para', text: 'Your electrical panel is the metal box inside the home with the breakers in it. It distributes power to the circuits - lights, outlets, the HVAC, the water heater. Every Bright Box Home now ships with a 200-amp panel as standard equipment.' },
      { type: 'para', text: 'Your electrical service is something entirely different. It is the supply of power that arrives at the home from outside: the utility wires, the meter, and the conductors running from that meter to your panel. The service is not part of the home. It is arranged and installed on your site by you and your licensed electrician, working with your utility.' },
      { type: 'para', text: 'This is why the two numbers can differ. A 200-amp panel fed by a 100-amp supply gives you 100 amps of usable capacity. The panel rating is a ceiling, not a guarantee. Understanding that sentence will save you more money and frustration than anything else in this article.' },
      { type: 'para', text: 'So why do we ship a 200-amp panel if the feed might be smaller? Because the panel sets your ceiling permanently. A 200-amp panel with a large busbar and plenty of breaker spaces can accept solar, an EV charger, a generator interlock, and a shop circuit years later without replacing the panel. Feeding a large panel with a smaller supply is normal, common, and fully code-compliant. Undersizing the panel and discovering the limit three years later is the expensive mistake.' },

      { type: 'heading', text: 'How much power does the home actually use?' },
      { type: 'para', text: 'Less than most people expect. A Bright Box Home is between 200 and 800 square feet, which means the lighting and general-outlet load is small. The loads that matter are the appliances: the mini-split heat pump, the induction cooktop, the electric dryer if you install one, and above all the water heater.' },
      { type: 'para', text: 'As an illustration only - your electrician performs the real calculation for your specific configuration and jurisdiction - a fully equipped 800 square foot home with a mini-split, an induction cooktop, a washer and electric dryer, and a modest point-of-use water heater typically calculates out somewhere in the range of 70 to 100 amps under the residential load method in the National Electrical Code. That is comfortably inside a 100-amp supply and generously inside 200.' },
      { type: 'para', text: 'Add one particular appliance, though, and the arithmetic changes completely.' },

      { type: 'heading', text: 'The tankless water heater trap' },
      { type: 'para', text: 'Whole-house electric tankless water heaters are wonderful appliances and enormous electrical loads. A 24kW whole-house unit at 240 volts draws 100 amps. Not 100 amps occasionally - 100 amps whenever someone is taking a shower. Because the code treats that as a continuous load, the circuit feeding it must be sized at 125 percent of its rating, which means roughly 125 amps of capacity dedicated to hot water alone.' },
      { type: 'para', text: 'On a 100-amp supply, a 24kW electric tankless is simply not possible. On a 125-amp supply it consumes the entire service before a single light is switched on. This is the single most common electrical mistake in the small-home world, and it is why we now ship a 200-amp panel and recommend a 200-amp service for any home specified with a whole-house electric tankless.' },
      { type: 'para', text: 'You have three sensible paths. Install a 200-amp service and enjoy unlimited hot water. Choose a smaller point-of-use electric water heater, which uses a fraction of the power and suits a studio or one-bathroom home very well. Or use propane or natural gas for hot water, which removes the load from your electrical service almost entirely - often the smartest choice on rural land where a larger electrical service is expensive.' },
      { type: 'para', text: 'Talk to us about which water heater is specified on your build before you size your service. The two decisions are linked, and getting them out of order is what causes trouble.' },

      { type: 'heading', text: 'Situation one: a standalone home on its own meter' },
      { type: 'para', text: 'This is the cleanest scenario. Your home is the only structure on the parcel, or at least the only one on this service, and the utility sets a meter for it. A 200-amp residential service is the standard offering from essentially every utility in the country for new construction, and in most cases getting one is routine.' },
      { type: 'para', text: 'The process generally runs like this. You contact the utility and request a new service, sometimes called a service application or a line extension request. They send someone to look at the site. They tell you where the point of connection will be, whether the service will be overhead or underground, and what you are responsible for providing. You hire a licensed electrician to install the meter base, the service conductors, and the grounding system to their specification. The utility connects their side, an inspector signs off, and the meter is set.' },
      { type: 'para', text: 'The timeline varies enormously. In a developed area with power already at the road, a few weeks is typical. On remote acreage requiring a line extension and an engineering study, several months is realistic. Start this conversation before your home is delivered, not after.' },

      { type: 'heading', text: 'What a new service actually costs, and what drives the number' },
      { type: 'para', text: 'This is where budgets go wrong, so be specific with your utility and get the number in writing. The amperage itself is rarely the cost driver. Going from a 100-amp service to a 200-amp service usually adds a modest amount to the electrician bill - heavier conductors and a larger meter base - and often nothing at all to the utility charge. The distance and the terrain are what cost money.' },
      { type: 'para', text: 'The first driver is how far you are from existing utility lines. If power is already at the road in front of your parcel, you are looking at a straightforward service drop. If the nearest line is hundreds of feet away, the utility must extend their distribution to reach you, and you will typically pay for that extension. Costs commonly run into the thousands, and on genuinely remote rural land - a long private drive, a parcel set well back from the road, difficult terrain - a line extension can reach five figures. This is not unusual and it is not the utility being difficult. It is the real cost of building infrastructure across distance.' },
      { type: 'para', text: 'The second driver is overhead versus underground. Overhead service on poles is substantially cheaper. Underground service looks better and is protected from weather, but requires trenching, conduit, and often sand bedding and warning tape to code. Trenching cost depends entirely on what you are digging through. Soft soil is inexpensive. Caliche, rock, and tree roots are not. Rural Texas has plenty of both.' },
      { type: 'para', text: 'The third driver is transformer capacity. If the utility transformer serving your area does not have capacity for another home, they may need to upgrade it, and that cost can be passed along. This is the one most people never see coming, and it is worth asking about specifically.' },
      { type: 'para', text: 'The fourth driver is the meter location and the length of the run from the meter to your home. Conductors are priced by the foot and heavy conductors are not cheap. Positioning your home reasonably close to where the meter will sit saves real money.' },
      { type: 'para', text: 'Our honest advice: before you close on rural land, call the utility that serves that parcel and ask what a new 200-amp residential service would cost at that address. They will often give you a written estimate. That single phone call has changed more than a few of our customers minds about which parcel to buy.' },

      { type: 'heading', text: 'Situation two: a backyard ADU behind an existing house' },
      { type: 'para', text: 'This is the most common use for our smaller models, and the scenario where the panel-versus-service distinction matters most. Your Bright Box Home goes in the backyard as an accessory dwelling unit, a guest house, an office, or a rental. In almost every case, it is not getting its own utility service. It is being fed from the existing house as a subpanel.' },
      { type: 'para', text: 'A subpanel is exactly what it sounds like: a panel fed from another panel rather than directly from the utility. Your electrician runs a feeder - typically four conductors, two hot, one neutral, one ground - from a breaker in the main house panel out to the home. That breaker determines your capacity. A 60-amp, 80-amp, or 100-amp feeder is typical for an ADU.' },
      { type: 'para', text: 'Here is the constraint. The existing house has its own service, often 100, 150, or 200 amps, and it is already using part of it. What is left over is what you can send to the ADU. Your electrician performs a load calculation on the existing home - adding up its actual demand - and determines how much spare capacity exists. A 200-amp house with a gas furnace, gas water heater, and modest loads may have plenty. A 100-amp house with electric heat and an electric range may have almost nothing to spare.' },
      { type: 'para', text: 'This is why a 200-amp feed to a backyard ADU is uncommon. It is not that the ADU cannot accept it - our panel certainly can. It is that the existing house usually cannot send it.' },

      { type: 'heading', text: 'What to do if the existing service is too small' },
      { type: 'para', text: 'You have several options, in rough order of cost. First, reduce the ADU load. Choosing a point-of-use or gas water heater instead of a whole-house electric tankless can cut your required feeder nearly in half, and that single choice often makes an otherwise impossible project work.' },
      { type: 'para', text: 'Second, upgrade the main house service. Going from 100 amps to 200 amps at the existing home is a well-understood job involving a new meter base, new service conductors, a new main panel, and utility coordination. It is not cheap, but it is routine work for a residential electrician, and it improves the main house too.' },
      { type: 'para', text: 'Third, look at load management. Modern smart panels and load-management devices can allow a larger total connected load on a smaller service by preventing the biggest loads from running simultaneously. This technology has matured considerably and is worth asking your electrician about before assuming a service upgrade is necessary.' },
      { type: 'para', text: 'Fourth, request a separate service with its own meter.' },

      { type: 'heading', text: 'Situation three: a second meter on the same property' },
      { type: 'para', text: 'Getting the utility to set a second meter for the ADU sidesteps the capacity problem entirely, and it has a real advantage if you are renting the unit out: the tenant gets their own bill. It is also the option most dependent on where you live.' },
      { type: 'para', text: 'Some utilities and jurisdictions allow a second residential meter on a single parcel without difficulty. Others prohibit it, or permit it only if the ADU is a legally permitted dwelling unit under local zoning, or require the parcel to be subdivided. Some will set a second meter but charge a monthly service fee for it regardless of usage. There is no national answer to this question, only a local one.' },
      { type: 'para', text: 'Two phone calls will resolve it: one to your utility asking whether they will set a second residential meter at your address, and one to your county or city planning office asking whether an ADU is a permitted use on your parcel. Make both calls before you commit to a plan.' },

      { type: 'heading', text: 'Situation four: off-grid, where your inverter is your service' },
      { type: 'para', text: 'If you are going off-grid, there is no utility service at all, and the whole conversation changes. Your inverter becomes your service. Its continuous output rating is the practical equivalent of your main breaker.' },
      { type: 'para', text: 'Our 8kW solar package produces roughly 33 amps of continuous 240-volt output. The 10kW package produces roughly 42 amps. Those are your ceilings, and they are considerably smaller than a grid service - which is exactly why off-grid homes are designed differently rather than simply disconnected from the grid.' },
      { type: 'para', text: 'Off-grid design means avoiding large simultaneous electrical loads and shifting what you can to propane. A 24kW electric tankless water heater is completely incompatible with an off-grid system - it would need three times the entire output of a 10kW inverter. Propane handles hot water, cooking, and backup heat beautifully off-grid, and every kilowatt you move to propane is a kilowatt of battery and panel you do not have to buy.' },
      { type: 'para', text: 'Battery capacity is the other half. Panels produce during daylight; batteries carry you through the night and through cloudy days. Our 10kW package includes 20.48kWh of lithium iron phosphate storage, which covers a well-designed small home comfortably. Size this around your actual daily consumption in kilowatt-hours, not around a feeling.' },
      { type: 'para', text: 'The 200-amp panel still matters off-grid, because it gives you the breaker spaces to wire the inverter, a generator inlet, and a critical-loads arrangement without cramming.' },

      { type: 'heading', text: 'Solar on a grid-tied home, and the rule that surprises everyone' },
      { type: 'para', text: 'If you are staying on the grid and adding solar, there is a code rule worth understanding before you choose an inverter size, because it catches almost everyone.' },
      { type: 'para', text: 'When solar feeds power into your panel, it does so through a breaker, and that power flows onto the same busbar that your main breaker feeds. To keep the busbar from being overloaded from both ends at once, the code limits the combination. In the most commonly used arrangement, the sum of the main breaker rating and the solar backfeed breaker rating cannot exceed 120 percent of the busbar rating.' },
      { type: 'para', text: 'Work that through on a 200-amp panel with a 200-amp main breaker. The busbar is 200 amps, 120 percent of that is 240 amps, and the 200-amp main already accounts for most of it - leaving only about 40 amps for solar backfeed. That is roughly a 7 to 8kW inverter. Our 10kW package would exceed it.' },
      { type: 'para', text: 'There are standard solutions and your solar installer will know them. The main breaker can be derated - replacing a 200-amp main with a 175-amp main frees up considerably more room for backfeed while still leaving far more capacity than a small home needs. The solar can be connected on the supply side of the main breaker, ahead of the panel entirely, which removes the limit. Or a combining panel can be used. None of these are exotic. But they need to be planned, not discovered.' },
      { type: 'para', text: 'This is the clearest illustration of why the panel we ship matters. The busbar rating of the panel sets the outer limit of everything you can ever add. A larger busbar means more room for solar, and that room is permanent.' },

      { type: 'heading', text: 'Generators and backup power' },
      { type: 'para', text: 'Our generator-ready package provides an exterior generator inlet and the panel arrangement to use it safely. The critical component is the interlock: a mechanical device that makes it physically impossible for the generator breaker and the main breaker to be on at the same time.' },
      { type: 'para', text: 'That is not a formality. Without an interlock or a transfer switch, a generator can push power backward out onto the utility lines - a condition called backfeeding that can seriously injure or kill a lineworker repairing the outage you are generating through. Never connect a generator to a home without a proper interlock or transfer switch, and never use a cord with male plugs on both ends.' },
      { type: 'para', text: 'A portable dual-fuel generator in the 12 to 15kW range covers the essentials of a small home well. A permanently installed standby generator with an automatic transfer switch in the 18 to 22kW range runs the whole home automatically and starts itself when the power fails. Both need fuel planning: propane storage, natural gas supply, or gasoline rotation.' },

      { type: 'heading', text: 'Permits, inspections, and who does what' },
      { type: 'para', text: 'The division of responsibility is consistent. We build and wire the home at the factory, including the panel, the circuits, the outlets, the lighting, and the fixtures. It arrives complete. You provide the service - everything from the utility to the point where it lands in the home - through a licensed local electrician.' },
      { type: 'para', text: 'That electrician pulls the electrical permit in nearly every jurisdiction. An inspector will typically want to see the service equipment, the grounding and bonding, and the connection into the home. Grounding deserves particular attention with a steel-framed home: the structure itself must be properly bonded, and this is not the place for improvisation.' },
      { type: 'para', text: 'If your parcel is in an unincorporated county with no building department, electrical permitting may be minimal or absent. That does not make the code optional in any meaningful sense - your insurer and any future buyer will both care whether the work was done correctly, and so will you the first time there is a storm.' },

      { type: 'heading', text: 'The questions to ask before you buy anything' },
      { type: 'para', text: 'Ask your utility: what would a new 200-amp residential service cost at this address, is it overhead or underground, how far is the nearest distribution line, does the serving transformer have spare capacity, and will you set a second meter on this parcel. Ask for it in writing.' },
      { type: 'para', text: 'Ask your electrician, if you are feeding from an existing house: what is the calculated load on the existing service, how much spare capacity is there, what size feeder can you run to the ADU, and what would a service upgrade cost if we need one.' },
      { type: 'para', text: 'Ask your county: is an ADU a permitted use on this parcel, is an electrical permit required, and is there a separate utility connection permit.' },
      { type: 'para', text: 'Ask us: which water heater is specified on my build, what is the calculated load for my configuration, and does my planned solar package fit the panel as configured. These are the questions that determine your service size, and we would far rather answer them before your home is built than after it is delivered.' },

      { type: 'heading', text: 'A note for rural Texas buyers' },
      { type: 'para', text: 'Much of our business is on unrestricted rural acreage in Texas, and the pattern there is consistent. Land is affordable and restrictions are light, which is exactly why people choose it - and the utility connection is frequently the largest single site-cost variable in the entire project. A parcel a quarter mile off the road with no power at the property line can cost more to electrify than the difference in price between two of our models.' },
      { type: 'para', text: 'That is not a reason to avoid rural land. It is a reason to price the electrical connection as part of the land decision rather than after it. Two otherwise identical parcels can differ by five figures on this line item alone, and the listing will never tell you which is which.' },
      { type: 'para', text: 'It is also why off-grid deserves genuine consideration rather than being treated as a fallback. If a utility extension is quoted at five figures, that same money buys a substantial solar and battery system that comes with no monthly bill attached. Run both numbers before you assume the grid is the default.' },

      { type: 'heading', text: 'The short version' },
      { type: 'para', text: 'Every Bright Box Home ships with a 200-amp panel, which sets your ceiling permanently and leaves room for solar, EV charging, and a generator. The service that feeds it comes from your site, and its size depends on your situation: a full 200-amp service for a standalone home on its own meter, typically a 60 to 100-amp subpanel feed for a backyard ADU, or an inverter-defined capacity off-grid. The water heater choice drives the requirement more than anything else. And the cost of the connection is driven by distance and terrain, not amperage.' },
      { type: 'para', text: 'Get a written utility quote before you buy land, have your electrician run a load calculation before you order, and tell us your situation so we can specify the home to match it. Explore our expandable container homes from $35,995, review the solar and generator packages on any product page, and talk to our team - we would rather spend an hour on your site plan now than troubleshoot it later.' },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
