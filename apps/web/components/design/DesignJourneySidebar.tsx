'use client';

interface SidebarProps {
  steps: string[];
  active: number;
  onSelect: (index: number) => void;
}

export default function DesignJourneyStepBar({ steps, active, onSelect }: SidebarProps) {
  return (
    <nav className="sticky top-16 z-30 border-b border-white/10 bg-[#0D1526]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-6">
        <ol className="flex items-center gap-1 overflow-x-auto py-3">
          {steps.map((label, i) => {
            const isActive = active === i;
            const isComplete = i < active;
            return (
              <li key={label} className="flex shrink-0 items-center">
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-all duration-200"
                  style={{
                    background: isActive ? '#6B9BF7' : isComplete ? 'rgba(107,155,247,0.15)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#ffffff' : isComplete ? '#6B9BF7' : '#9CA3AF',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.25)' : isComplete ? '#6B9BF7' : '#EF4444',
                      color: '#ffffff',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {i < steps.length - 1 && (
                  <span className="mx-1 text-gray-600" aria-hidden="true">›</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
