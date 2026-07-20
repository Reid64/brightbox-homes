'use client';

import { useState } from 'react';
import DesignJourneyStepBar from './DesignJourneySidebar';
import DesignJourneyContent, { type OrderItem } from './DesignJourneyContent';
import HomeConfigurator from './HomeConfigurator';
import OrderPanel from './OrderPanel';

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
  const [order, setOrder] = useState<Record<string, OrderItem>>({});

  return (
    <div style={{ background: '#0D1526', minHeight: '100vh' }}>
      <DesignJourneyStepBar steps={STEPS} active={active} onSelect={setActive} />

      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* LEFT: step content */}
          <div className="min-w-0 flex-1">
            <DesignJourneyContent
              active={active}
              setActive={setActive}
              order={order}
              setOrder={setOrder}
            />
          </div>

          {/* RIGHT: sticky configurator + invoice panel */}
          <div className="lg:w-[380px] lg:shrink-0">
            <div className="sticky top-32 flex flex-col gap-4">
              <HomeConfigurator
                model={order.model?.label ?? null}
                exteriorColor={order.exterior?.label ?? null}
                roofColor={order.roof?.label ?? null}
                hasRoof={!!order.roof}
                hasPatio={!!order['ext-patio']}
                hasDeck={!!order['ext-deck']}
                hasSolar={!!(order['solar-8kw'] || order['solar-10kw'])}
                orderTotal={Object.values(order).reduce((s, i) => s + i.price, 0)}
              />
              {Object.keys(order).length > 0 && (
                <OrderPanel
                  order={order}
                  onRemove={(key) => {
                    const n = { ...order };
                    delete n[key];
                    setOrder(n);
                  }}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
