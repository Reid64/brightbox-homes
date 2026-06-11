import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Compact nudge linking product pages to the buyer-education cost comparison.
// Intentionally low-key: one line, subtle border, not a billboard.
export default function RealCostCallout() {
  return (
    <Link
      href="/the-real-cost"
      className="group flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-bb-charcoal px-6 py-5 transition-colors duration-fast ease-out hover:border-bb-blue/40 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <p className="font-body text-sm text-gray-300 sm:text-base">
        Think you found a cheaper home?{' '}
        <span className="text-white">Add up what&apos;s missing.</span>
      </p>
      <span className="inline-flex shrink-0 items-center gap-1 font-body text-sm font-semibold text-bb-blue transition-colors duration-fast ease-out group-hover:text-white">
        See the Real Cost
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}
