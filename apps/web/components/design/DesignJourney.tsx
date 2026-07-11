'use client';

import { useState } from 'react';
import DesignJourneySidebar from './DesignJourneySidebar';
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
    <div className="bg-[#0F1729]">
      <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-8">
        <DesignJourneySidebar steps={STEPS} active={active} onSelect={setActive} />
        <div className="min-w-0 flex-1">
          <DesignJourneyContent active={active} />
        </div>
      </div>
    </div>
  );
}
