'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import HomeConfigurator from './HomeConfigurator';
import OrderPanel from './OrderPanel';
import type { OrderItem } from './DesignJourneyContent';

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

interface MobileBuildSheetProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  order: Record<string, OrderItem>;
  onRemove: (key: string) => void;
}

/**
 * Below lg, the configurator and invoice live in a bottom sheet reached from a
 * floating button, instead of sitting ~3,000px down the page where nobody
 * scrolls. The desktop layout is untouched.
 */
export default function MobileBuildSheet({
  open,
  onOpen,
  onClose,
  order,
  onRemove,
}: MobileBuildSheetProps) {
  const items = Object.entries(order);
  const count = items.length;
  const total = items.reduce((sum, [, item]) => sum + item.price, 0);

  // Close on Escape and lock background scroll while the sheet is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  // Nothing selected yet: no button, no sheet.
  if (count === 0) return null;

  return (
    <div className="lg:hidden">
      {/* Floating trigger */}
      {!open && (
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full px-5 py-3.5 shadow-2xl"
          style={{
            background: '#D4A853',
            color: '#1C1C1E',
            boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
          }}
        >
          <span className="flex items-center gap-2">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: 'rgba(28,28,30,0.18)' }}
            >
              {count}
            </span>
            <span className="font-heading text-sm font-bold">View Your Build</span>
          </span>
          <span className="font-mono text-sm font-bold">{fmt(total)}</span>
        </button>
      )}

      {/* Sheet */}
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your build">
          <button
            type="button"
            aria-label="Close your build"
            onClick={onClose}
            className="absolute inset-0 h-full w-full"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          />

          <div
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-2xl px-4 pb-6 pt-4"
            style={{ background: '#1C1C1E', borderTop: '1px solid rgba(212,168,83,0.25)' }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-heading text-base font-bold text-white">Your Build</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#E5E7EB' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <HomeConfigurator
                model={order.model?.label ?? null}
                exteriorColor={order.exterior?.label ?? null}
                roofColor={order.roof?.label ?? null}
                hasRoof={!!order.roof}
                hasPatio={!!order['ext-patio']}
                hasDeck={!!order['ext-deck']}
                hasSolar={!!(order['solar-8kw'] || order['solar-10kw'])}
                orderTotal={total}
              />
              <OrderPanel order={order} onRemove={onRemove} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
