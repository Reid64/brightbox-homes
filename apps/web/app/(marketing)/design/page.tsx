import type { Metadata } from 'next';
import DesignJourney from '@/components/design/DesignJourney';

export const metadata: Metadata = {
  title: 'Design Your Home | Bright Box Homes',
  description:
    'A guided journey through customizing your Bright Box Home - choose your model, exterior, roof, interior finishes, and upgrades, step by step.',
};

export default function DesignPage() {
  return <DesignJourney />;
}
