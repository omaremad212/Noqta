'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Instagram, MessageCircle, Check } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-[#f9f6f1] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-[#294840] font-medium mb-2">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-3 max-w-md">
            We&apos;d love to hear from you. Reach out for orders, questions, or just to say hello.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Let&apos;s Connect</h2>

            {/* WhatsApp - Primary CTA */}
            <a
              href="https://wa.me/201064076134"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-[#294840] text-white rounded-2xl hover:bg-[#1e3530] transition-all group mb-6"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageCircle size={22} />
              </div>
              <div>
                <p className="font-semibold">Chat on WhatsApp</p>
                <p className="text-white/70 text-sm">01064076134 · Fastest response</p>
              </div>
              <span className="ml-auto text-white/50 group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <div className="space-y-4">
              <a
                href="mailto:noqtadesigns@gmail.com"
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-[#294840]/30 hover:bg-gray-50 transition-all group"
              >
                <div className="w-11 h-11 bg-[#294840]/10 rounded-xl flex items-center justify-center">
                  <Mail size={18} className="text-[#294840]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Email</p>
                  <p className="text-gray-500 text-sm">noqtadesigns@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
                <div className="w-11 h-11 bg-[#294840]/10 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-[#294840]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Location</p>
                  <p className="text-gray-500 text-sm">Cairo, Egypt</p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/noqtadesigns/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-[#294840]/30 hover:bg-gray-50 transition-all"
              >
                <div className="w-11 h-11 bg-[#294840]/10 rounded-xl flex items-center justify-center">
                  <Instagram size={18} className="text-[#294840]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Instagram</p>
                  <p className="text-gray-500 text-sm">@noqtadesigns</p>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@noqta.designs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-[#294840]/30 hover:bg-gray-50 transition-all"
              >
                <div className="w-11 h-11 bg-[#294840]/10 rounded-xl flex items-center justify-center">
                  <Phone size={18} className="text-[#294840]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">TikTok</p>
                  <p className="text-gray-500 text-sm">@noqta.designs</p>
                </div>
              </a>
            </div>

            {/* FAQ snippet */}
            <div className="mt-8 p-5 bg-[#f9f6f1] rounded-2xl">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Frequently Asked</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Delivery time:</strong> 2–4 business days in Cairo</p>
                <p><strong>Payment:</strong> Cash on Delivery or Online</p>
                <p><strong>Returns:</strong> Contact us within 7 days</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Message Sent!</p>
                  <p className="text-gray-500 text-sm mt-2">We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                    className="mt-4 text-sm text-[#294840] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#294840] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#294840] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#294840] transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#294840] text-white rounded-full font-medium hover:bg-[#1e3530] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
