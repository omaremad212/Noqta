import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#f9f6f1]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #294840 0px,
              #294840 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-[#294840]/10 text-[#294840] text-xs font-medium px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-[#294840] rounded-full" />
              New Collection 2026
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Write your
              <br />
              <span className="text-[#294840]">story</span> with
              <br />
              intention.
            </h1>

            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-md">
              Premium notebooks and planners designed for minds that appreciate beauty in simplicity.
              Crafted with purpose, built for your best work.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link
                href="/shop"
                className="px-8 py-4 bg-[#294840] text-white font-medium rounded-full hover:bg-[#1e3530] transition-all hover:shadow-lg hover:shadow-[#294840]/25 hover:-translate-y-0.5 text-sm"
              >
                Shop the Collection
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-gray-200 text-gray-700 font-medium rounded-full hover:border-[#294840] hover:text-[#294840] transition-all text-sm"
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200">
              {[
                { label: 'Products', value: '20+' },
                { label: 'Happy Customers', value: '500+' },
                { label: 'Years of Design', value: '3+' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-[#294840]">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="relative h-[560px] hidden lg:block">
            <div className="absolute top-0 right-8 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b"
                alt="2026 Agenda"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-56 h-72 rounded-3xl overflow-hidden shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5"
                alt="Ramadan Planner"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl px-5 py-4 z-10">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Starting from</p>
              <p className="text-2xl font-bold text-[#294840]">95 EGP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
