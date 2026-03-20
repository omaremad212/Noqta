import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | Noqta Designs',
  description:
    'Browse our full collection of premium notebooks, planners, and stationery. Minimal design, premium quality.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
