'use client';

interface SidebarProps {
  steps: string[];
  active: number;
  onSelect: (index: number) => void;
}

// Short descriptions shown under the active step. Keyed by label so the
// component keeps its `steps: string[]` contract.
const DESCRIPTIONS: Record<string, string> = {
  'Choose Your Home': 'Model, size, and floor plan',
  'Pick Your Exterior': 'Siding colour, trim, and finish',
  'Choose Your Roof': 'Roof type and coverage',
  'Customize Interior': 'Cabinets, flooring, and fixtures',
  'Add Upgrades': 'Solar, appliances, and extras',
  'Get Started': 'Reserve and next steps',
};

const RED = '#EF4444';

function ChevronDown() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={RED}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function DesignJourneyStepBar({ steps, active, onSelect }: SidebarProps) {
  return (
    <nav className="sticky top-16 z-30 lg:w-64 lg:shrink-0" aria-label="Design steps">
      {/* Mobile / tablet: horizontal pills with a red number badge */}
      <ol className="-mx-6 flex items-center gap-2 overflow-x-auto border-b border-white/10 bg-[#1C1C1E]/95 px-6 py-3 backdrop-blur-sm lg:hidden">
        {steps.map((label, i) => {
          const isActive = active === i;
          return (
            <li key={label} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? 'step' : undefined}
                className="flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1E]"
                style={{
                  background: isActive ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: RED }}
                >
                  {i + 1}
                </span>
                <span className="whitespace-nowrap">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Desktop: vertical timeline */}
      <ol className="hidden lg:block">
        {steps.map((label, i) => {
          const isActive = active === i;
          const description = DESCRIPTIONS[label];

          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? 'step' : undefined}
                className="flex w-full items-start gap-3 py-3 pl-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1E]"
                style={{ borderLeft: `3px solid ${isActive ? RED : 'transparent'}` }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: RED }}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 pt-1">
                  <span
                    className={`block text-sm ${
                      isActive ? 'font-bold text-white' : 'font-medium text-gray-400'
                    }`}
                  >
                    {label}
                  </span>
                  {isActive && description && (
                    <span className="mt-1 block text-[10px] leading-snug text-gray-500">
                      {description}
                    </span>
                  )}
                </span>
              </button>

              {/* Connector: red line broken by a chevron, aligned to the circle's axis */}
              {i < steps.length - 1 && (
                <div className="ml-[30px] flex w-6 flex-col items-center" aria-hidden="true">
                  <span
                    className="block"
                    style={{ width: '2px', height: '10px', background: 'rgba(239,68,68,0.4)' }}
                  />
                  <ChevronDown />
                  <span
                    className="block"
                    style={{ width: '2px', height: '10px', background: 'rgba(239,68,68,0.4)' }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
