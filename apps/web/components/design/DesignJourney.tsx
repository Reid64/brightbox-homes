'use client';

import { useState } from 'react';
import DesignJourneyStepBar from './DesignJourneySidebar';
import DesignJourneyContent from './DesignJourneyContent';

const STEPS = [
  'Choose Your Home',
  'Pick Your Exterior',
  'Choose Your Roof',
  'Customize Interior',
  'Add Upgrades',
  'Get Started',
];

export default function DesignJourney() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ background: '#0D1526', minHeight: '100vh' }}>
      <DesignJourneyStepBar steps={STEPS} active={active} onSelect={setActive} />

      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* LEFT: step content */}
          <div className="min-w-0 flex-1">
            <h1 className="mb-6 font-heading text-2xl font-bold text-white">Design Your Home</h1>
            <DesignJourneyContent active={active} setActive={setActive} />
          </div>

          {/* RIGHT: sticky configurator + invoice panel */}
          <div className="lg:w-[380px] lg:shrink-0">
            <div className="sticky top-32 flex flex-col gap-4">
              <div
                className="flex aspect-video w-full items-center justify-center rounded-2xl"
                style={{
                  background: '#1A2540',
                  border: '1px solid rgba(107,155,247,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-[#6B9BF7]">Home Configurator</p>
                  <p className="mt-1 text-xs text-gray-500">Select a home to preview</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
