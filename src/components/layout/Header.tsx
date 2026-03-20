'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSearch } from '@/context/SearchContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
];

const MARQUEE_TEXT = [
  'New Collection 2026',
  'Made in Egypt',
  'Premium Notebooks & Planners',
  'Noqta Designs',
  'Crafted with Purpose',
];

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { openSearch } = useSearch();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = scrolled;

  return (
    <div className="sticky top-0 z-50">
      {/* ── Announcement bar ── */}
      <div className="bg-[#294840] overflow-hidden h-9 flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT].map((text, i) => (
            <span key={i} className="text-white/80 text-[11px] tracking-widest uppercase mx-10">
              {text}
              <span className="text-[#4a8a70] mx-10">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main header ── */}
      <header
        className={`transition-all duration-500 ${
          isDark
            ? 'bg-[#0c1a16] shadow-2xl shadow-black/30 py-3'
            : 'bg-white/98 backdrop-blur-sm border-b border-gray-100/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="shrink-0 group">
              <Image
                src="https://www.noqtadesigns.com/web/image/website/3/logo/NOQTADESIGNS?unique=82d14f5"
                alt="Noqta Designs"
                width={130}
                height={48}
                className={`h-9 w-auto object-contain transition-all duration-500 group-hover:opacity-75 ${
                  isDark ? 'brightness-0 invert' : ''
                }`}
                priority
              />
            </Link>

            {/* Desktop nav — centered */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative group px-5 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isDark
                      ? 'text-white/60 hover:text-white'
                      : 'text-gray-600 hover:text-[#294840]'
                  }`}
                >
                  {link.label}
                  {/* نقطة — dot that slides up on hover */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1 h-1 rounded-full scale-0 group-hover:scale-100 group-hover:-translate-y-1 transition-all duration-200 ${
                      isDark ? 'bg-[#4a8a70]' : 'bg-[#294840]'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Search */}
              <button
                onClick={openSearch}
                aria-label="Search"
                className={`p-2.5 rounded-full transition-all ${
                  isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-[#294840] hover:bg-gray-50'
                }`}
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className={`relative p-2.5 rounded-full transition-all ${
                  isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-[#294840] hover:bg-gray-50'
                }`}
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#294840] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart pill */}
              <button
                onClick={toggleCart}
                aria-label="Cart"
                className={`flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-sm font-semibold transition-all ml-1 ${
                  isDark
                    ? 'bg-[#4a8a70] text-white hover:bg-[#3d7560] hover:shadow-lg hover:shadow-[#4a8a70]/25'
                    : 'bg-[#294840] text-white hover:bg-[#1e3530] hover:shadow-lg hover:shadow-[#294840]/25'
                } hover:-translate-y-px`}
              >
                <ShoppingBag size={15} />
                <span>Bag</span>
                {totalItems > 0 && (
                  <span className="bg-white/25 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
                className={`md:hidden p-2.5 rounded-full transition-all ml-1 ${
                  isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-[#294840] hover:bg-gray-50'
                }`}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0c1a16] flex flex-col md:hidden animate-fadeIn">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Image
              src="https://www.noqtadesigns.com/web/image/website/3/logo/NOQTADESIGNS?unique=82d14f5"
              alt="Noqta Designs"
              width={110}
              height={40}
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-all"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile links */}
          <nav className="flex flex-col px-8 pt-10 gap-0 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between text-4xl font-black text-white/70 hover:text-white transition-all duration-200 py-5 border-b border-white/[0.06] group"
              >
                <span>{link.label}</span>
                <span className="text-[#4a8a70] text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </nav>

          <div className="px-8 py-10 border-t border-white/10 flex items-center justify-between">
            <p className="text-white/25 text-xs tracking-[0.3em] uppercase">نقطة ديزاينز · 2026</p>
            <div className="flex gap-4">
              <button onClick={() => { openSearch(); setMobileOpen(false); }} className="text-white/40 hover:text-white transition-colors">
                <Search size={18} />
              </button>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <Heart size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
