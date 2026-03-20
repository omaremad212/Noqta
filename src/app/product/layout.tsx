import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product | Noqta Designs',
  description: 'Premium notebooks and planners from Noqta Designs.',
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
