import Link from 'next/link';

const STATS = [
  { value: '500+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating'  },
  { value: '2',    label: 'Collections'     },
  { value: '100%', label: 'Made in Egypt'   },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0c1a16]">

      {/* ── Background glows (centered) ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[700px] h-[700px] bg-[#294840]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[400px] h-[400px] bg-[#4a8a70]/12 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1a3d30]/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1a3d30]/20 rounded-full blur-[80px] pointer-events-none" />

      {/* ── Main content (centered) ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">

          {/* Center text */}
          <div className="text-center max-w-3xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#294840]/40 border border-[#4a8a70]/25 text-[#4a8a70] text-[11px] font-medium px-4 py-2 rounded-full mb-8 uppercase tracking-[0.3em] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-[#4a8a70] rounded-full animate-pulse" />
              New Collection 2026
            </div>

            {/* Headline */}
            <h1 className="font-black text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}>
              Premium Notebooks &amp;{' '}
              <span
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px #4a8a70',
                  fontStyle: 'italic',
                }}
              >
                Planners
              </span>
              <br />
              for Your Best Work.
            </h1>

            {/* Subtitle */}
            <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Crafted with purpose, designed for minds that appreciate beauty in simplicity.
              Made in Egypt, built for your story.
            </p>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#4a8a70] text-white font-semibold rounded-full text-sm hover:bg-[#3d7560] transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4a8a70]/30"
              >
                Shop the Collection
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white/60 font-medium rounded-full text-sm hover:border-white/40 hover:text-white transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="relative z-10 border-t border-white/[0.07] bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.07]">
            {STATS.map((s) => (
              <div key={s.label} className="text-center py-6 px-4">
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-white/35 text-[11px] mt-1 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
