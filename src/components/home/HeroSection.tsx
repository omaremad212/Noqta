import Link from 'next/link';

// Dot constellation – representing the "نقطة" (dot) brand name
type Dot = { cx: number; cy: number; r: number; active?: boolean };
const DOTS: Dot[] = [
  // Outer scatter
  { cx: 450, cy: 95,  r: 3.5, active: true  },
  { cx: 380, cy: 55,  r: 2                  },
  { cx: 525, cy: 75,  r: 2.5, active: true  },
  { cx: 565, cy: 165, r: 2                  },
  { cx: 555, cy: 255, r: 4,   active: true  },
  { cx: 545, cy: 345, r: 2.5               },
  { cx: 490, cy: 425, r: 3,   active: true  },
  { cx: 400, cy: 460, r: 2                  },
  { cx: 305, cy: 440, r: 4,   active: true  },
  { cx: 235, cy: 375, r: 2.5               },
  { cx: 205, cy: 285, r: 2.5               },
  { cx: 228, cy: 200, r: 2,   active: true  },
  { cx: 278, cy: 130, r: 3,   active: true  },
  { cx: 348, cy: 90,  r: 2                  },
  // Inner cluster
  { cx: 395, cy: 190, r: 5,   active: true  },
  { cx: 425, cy: 275, r: 3.5               },
  { cx: 360, cy: 318, r: 4,   active: true  },
  { cx: 298, cy: 268, r: 3,   active: true  },
  { cx: 320, cy: 188, r: 3.5               },
  { cx: 375, cy: 358, r: 2.5, active: true  },
  // Center
  { cx: 388, cy: 258, r: 9,   active: true  },
];

// Lines connecting dots for a constellation feel
const LINES: [number, number, number, number][] = [
  [395, 190, 450, 95],
  [395, 190, 298, 268],
  [388, 258, 490, 425],
  [360, 318, 305, 440],
  [555, 255, 395, 190],
  [228, 200, 298, 268],
  [278, 130, 395, 190],
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0c1a16]">
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-[#294840]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1a3d30]/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT: Text ── */}
            <div className="animate-fadeIn">
              {/* Label */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-[#4a8a70]" />
                <span className="text-[#4a8a70] text-[11px] font-medium tracking-[0.4em] uppercase">
                  نقطة ديزاينز · كولكشن 2026
                </span>
              </div>

              {/* Headline */}
              <div className="mb-8">
                <p className="text-white/30 text-xl font-light tracking-[0.2em] uppercase mb-3">
                  حيث تبدأ كل
                </p>
                <h1
                  className="font-black text-white leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(72px, 10vw, 130px)' }}
                >
                  كلمة
                </h1>
                <h1
                  className="font-black leading-[0.95] tracking-tight italic"
                  style={{
                    fontSize: 'clamp(72px, 10vw, 130px)',
                    color: 'transparent',
                    WebkitTextStroke: '2px #4a8a70',
                  }}
                >
                  بنقطة.
                </h1>
              </div>

              <p className="text-white/45 text-base leading-relaxed max-w-sm mb-10">
                دفاتر وأجندات مميزة مصممة لمن يؤمن بأن الأداة الصحيحة تُغيّر كل شيء.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-14">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#4a8a70] text-white font-semibold rounded-full text-sm hover:bg-[#3d7560] transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4a8a70]/30"
                >
                  تسوق الآن
                  <span className="group-hover:translate-x-1 transition-transform inline-block">←</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white/60 font-medium rounded-full text-sm hover:border-white/40 hover:text-white transition-all"
                >
                  قصتنا
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-10 pt-8 border-t border-white/[0.08]">
                {[
                  { value: '٢',    label: 'كولكشنات' },
                  { value: '+٥٠٠', label: 'عميل سعيد' },
                  { value: '★٤.٩', label: 'تقييم'    },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-[10px] text-white/35 mt-0.5 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Dot constellation ── */}
            <div className="hidden lg:flex items-center justify-center relative">
              <svg
                viewBox="160 40 430 450"
                className="w-full max-w-[520px] h-auto"
                aria-hidden="true"
              >
                {/* Rings */}
                <circle cx="388" cy="258" r="205" fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
                <circle cx="388" cy="258" r="148" fill="none" stroke="#4a8a70" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="5 9" />
                <circle cx="388" cy="258" r="92"  fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />

                {/* Center glow */}
                <circle cx="388" cy="258" r="45" fill="#294840" fillOpacity="0.30" />
                <circle cx="388" cy="258" r="22" fill="#4a8a70" fillOpacity="0.22" />

                {/* Connection lines */}
                {LINES.map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={i % 2 === 0 ? '#4a8a70' : 'white'}
                    strokeOpacity={i % 2 === 0 ? 0.22 : 0.07}
                    strokeWidth="0.6"
                  />
                ))}

                {/* Dots */}
                {DOTS.map((d, i) => (
                  <circle
                    key={i}
                    cx={d.cx} cy={d.cy} r={d.r}
                    fill={d.active ? '#4a8a70' : 'white'}
                    fillOpacity={d.active ? 0.9 : 0.22}
                  />
                ))}
              </svg>

              {/* Scattered accent dots */}
              <div className="absolute top-0 left-1/4 w-2 h-2 rounded-full bg-[#4a8a70]/60" />
              <div className="absolute bottom-1/4 right-0 w-3 h-3 rounded-full bg-[#4a8a70]/40" />
              <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom marquee strip ── */}
      <div className="relative z-10 border-t border-white/[0.07] bg-white/[0.015] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-white/20 text-[11px] uppercase tracking-[0.4em] mx-8">
              أدوات كتابة مميزة
              <span className="text-[#4a8a70]/60 mx-6">·</span>
              صُنع في مصر
              <span className="text-[#4a8a70]/60 mx-6">·</span>
              نقطة ديزاينز
              <span className="text-[#4a8a70]/60 mx-6">·</span>
              كولكشن 2026
              <span className="text-[#4a8a70]/60 mx-6">·</span>
              مصنوع بحب
              <span className="text-[#4a8a70]/60 mx-6">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
