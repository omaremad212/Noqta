import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist | Noqta Designs',
  description: 'Your saved Noqta Designs products.',
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
