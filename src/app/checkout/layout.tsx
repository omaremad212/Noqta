import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Noqta Designs',
  description: 'Complete your order securely. Cash on delivery or online payment available.',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
