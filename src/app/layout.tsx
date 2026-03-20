import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { SearchProvider } from '@/context/SearchContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import SearchModal from '@/components/layout/SearchModal';

export const metadata: Metadata = {
  title: 'Noqta Designs | Premium Notebooks & Planners',
  description:
    'Discover beautifully crafted notebooks, planners, and stationery from Noqta Designs. Minimal, elegant, and made for intentional living.',
  keywords: 'notebooks, planners, stationery, Noqta Designs, Egypt, agenda',
  openGraph: {
    title: 'Noqta Designs | Premium Notebooks & Planners',
    description: 'Discover beautifully crafted notebooks, planners, and stationery.',
    url: 'https://noqtadesigns.com',
    siteName: 'Noqta Designs',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartDrawer />
              <SearchModal />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
