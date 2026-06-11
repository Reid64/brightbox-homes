import type { Metadata } from 'next';
import UpgradesGrid from '@/components/products/UpgradesGrid';

export const metadata: Metadata = {
  title: 'Upgrade Options | Bright Box Homes',
  description:
    'Premium upgrades to make your Bright Box Home uniquely yours - solar and power, generators, climate, kitchen, bathroom, and exterior options.',
};

export default function UpgradesPage() {
  return (
    <section className="bg-bb-charcoal py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <UpgradesGrid heading="Upgrade Options" />
      </div>
    </section>
  );
}
