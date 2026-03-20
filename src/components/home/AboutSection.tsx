import Image from 'next/image';
import Link from 'next/link';
import { Heart, Leaf, Star } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Made with Care', desc: 'Every product is thoughtfully designed with love and attention to detail.' },
  { icon: Leaf, title: 'Quality Materials', desc: 'We use only premium paper and materials that elevate your experience.' },
  { icon: Star, title: 'Minimal Aesthetic', desc: 'Clean, elegant design that inspires focus and creativity.' },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative h-[520px]">
            <div className="absolute top-0 left-0 w-72 h-80 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b"
                alt="About Noqta Designs"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-60 h-72 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5"
                alt="Noqta Designs Products"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#294840] text-white rounded-2xl px-6 py-4 shadow-2xl z-10 text-center min-w-[160px]">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-white/70 text-xs mt-1">Happy Customers</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#294840] font-medium mb-3">
              Our Story
            </p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Designed for those who
              <span className="text-[#294840]"> value the art</span> of writing.
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed">
              Noqta Designs was born from a love of beautiful stationery and intentional living.
              Based in Cairo, Egypt, we create notebooks and planners that inspire you to slow down,
              reflect, and write with purpose.
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Each product is crafted with precision — from the texture of the cover to the weight
              of the paper — because we believe that what you write with matters as much as what you write.
            </p>

            <div className="mt-8 space-y-5">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#294840]/10 flex items-center justify-center flex-shrink-0">
                    <v.icon size={18} className="text-[#294840]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{v.title}</h4>
                    <p className="text-gray-500 text-sm mt-0.5">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex mt-8 px-8 py-3.5 bg-[#294840] text-white rounded-full font-medium text-sm hover:bg-[#1e3530] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
