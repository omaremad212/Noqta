'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-[#294840]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-3">ابق على اطلاع</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          انضم لمجتمع نقطة
        </h2>
        <p className="text-white/70 mt-4 text-sm leading-relaxed">
          احصل على وصول مبكر للكولكشنات الجديدة، عروض حصرية، وإلهام للحياة الواعية.
        </p>

        {submitted ? (
          <div className="mt-8 bg-white/10 rounded-2xl px-8 py-6">
            <p className="text-white font-medium">شكراً لاشتراكك! ✓</p>
            <p className="text-white/60 text-sm mt-1">سنتواصل معك قريباً.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-white/50 text-sm"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-white text-[#294840] font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
            >
              اشترك
            </button>
          </form>
        )}

        <p className="text-white/40 text-xs mt-4">
          لن نرسل لك أي سبام، يمكنك إلغاء الاشتراك في أي وقت.
        </p>
      </div>
    </section>
  );
}
