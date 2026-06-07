import type { ReactNode } from 'react';

// Pass-through layout for the marketing route group. Shared header/footer
// markup arrives in the component/content prompt series.
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
