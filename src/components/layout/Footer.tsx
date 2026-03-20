import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#294840] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="https://www.noqtadesigns.com/web/image/website/3/logo/NOQTADESIGNS?unique=82d14f5"
              alt="Noqta Designs"
              width={130}
              height={45}
              className="h-10 w-auto object-contain brightness-0 invert mb-4"
            />
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Beautifully crafted notebooks, planners, and stationery designed for intentional living.
              Minimal, elegant, and made with purpose.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/noqtadesigns/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#294840] transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@noqta.designs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#294840] transition-all text-xs font-bold"
              >
                TT
              </a>
              <a
                href="https://wa.me/201064076134"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#294840] transition-all text-xs font-bold"
              >
                WA
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5 text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop' },
                { href: '/cart', label: 'Cart' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/65 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5 text-white/90">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/201064076134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/65 hover:text-white text-sm transition-colors"
                >
                  <Phone size={14} />
                  01064076134
                </a>
              </li>
              <li>
                <a
                  href="mailto:noqtadesigns@gmail.com"
                  className="flex items-center gap-2 text-white/65 hover:text-white text-sm transition-colors"
                >
                  <Mail size={14} />
                  noqtadesigns@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/65 text-sm">
                <MapPin size={14} className="flex-shrink-0" />
                Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Noqta Designs. All rights reserved.</p>
          <p>Crafted with care in Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  );
}
