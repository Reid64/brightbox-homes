'use client';

import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';
import type { OrderItem } from './DesignJourneyContent';

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

export default function OrderPanel({
  order,
  onRemove,
}: {
  order: Record<string, OrderItem>;
  onRemove: (key: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const items = Object.entries(order);
  const total = items.reduce((s, [, v]) => s + v.price, 0);

  if (items.length === 0) return null;

  return (
    <div
      className="w-full overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4"
        style={{ borderBottom: open ? '1px solid #E5E7EB' : 'none' }}
      >
        <div className="flex items-center gap-2">
          <span className="font-heading text-base font-bold text-gray-900">Your Build</span>
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: '#6B9BF7' }}
          >
            {items.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-gray-900">{fmt(total)}</span>
          {open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
        </div>
      </button>

      {open && (
        <>
          {/* Line items */}
          <div className="max-h-72 overflow-y-auto px-5 py-3">
            <table className="w-full">
              <tbody>
                {items.map(([key, item]) => (
                  <tr key={key} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 pr-2">
                      <p className="text-xs font-medium leading-tight text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </td>
                    <td className="py-2 text-right">
                      <span className="font-mono text-xs font-semibold text-gray-900">
                        {item.price === 0 ? 'Included' : fmt(item.price)}
                      </span>
                    </td>
                    <td className="py-2 pl-2 text-right">
                      {item.removable && (
                        <button
                          onClick={() => onRemove(key)}
                          className="text-gray-300 transition-colors hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: '2px solid #E5E7EB' }}
          >
            <span className="text-sm font-bold text-gray-900">Estimated Total</span>
            <span className="font-mono text-base font-bold text-gray-900">{fmt(total)}</span>
          </div>

          {/* CTA */}
          <div className="px-5 pb-4">
            <p className="mb-2 text-center text-xs text-gray-400">Base home price not included above</p>
            <BookConsultation size="sm" className="w-full justify-center" />
          </div>
        </>
      )}
    </div>
  );
}
