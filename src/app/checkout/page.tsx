'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, CreditCard, Truck, Lock } from 'lucide-react';
import { CheckoutForm } from '@/types';

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    phone: '',
    address: '',
    city: 'Cairo',
    notes: '',
    paymentMethod: 'cod',
  });

  const shipping = totalPrice >= 500 ? 0 : 50;
  const total = totalPrice + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (form.paymentMethod === 'online') {
      try {
        const response = await fetch('/api/paymob', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: state.items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
            total,
            customer: form,
          }),
        });
        const data = await response.json();
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
          return;
        }
        // Credentials not yet configured — show friendly message
        alert('Online payment is not yet configured. Please choose Cash on Delivery or contact us.');
      } catch {
        alert('Payment error. Please try again or choose Cash on Delivery.');
      }
      setLoading(false);
      return;
    }

    // Simulate order placement
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    clearCart();
    setSubmitted(true);
  };

  if (state.items.length === 0 && !submitted) {
    router.push('/shop');
    return null;
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
        <p className="text-gray-500 mt-3">
          Thank you for your order. We&apos;ll contact you on <strong>{form.phone}</strong> to confirm
          delivery details.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Expected delivery: 2–4 business days · Cairo, Egypt
        </p>
        <Link
          href="/shop"
          className="inline-flex mt-8 px-7 py-3 bg-[#294840] text-white rounded-full font-medium hover:bg-[#1e3530] transition-colors text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#294840] transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          {/* Contact */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6">
            <h2 className="font-bold text-gray-900 mb-5">Delivery Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#294840] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="01xxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#294840] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#294840] transition-colors text-sm bg-white"
                >
                  {['Cairo', 'Giza', 'Alexandria', 'Luxor', 'Aswan', 'Other'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Street, building, floor, apartment"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#294840] transition-colors text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special instructions..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#294840] transition-colors text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6">
            <h2 className="font-bold text-gray-900 mb-5">Payment Method</h2>
            <div className="space-y-3">
              {/* Cash on Delivery */}
              <label
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  form.paymentMethod === 'cod'
                    ? 'border-[#294840] bg-[#294840]/5'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="accent-[#294840]"
                />
                <Truck size={22} className={form.paymentMethod === 'cod' ? 'text-[#294840]' : 'text-gray-400'} />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when your order arrives</p>
                </div>
              </label>

              {/* Online Payment */}
              <label
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  form.paymentMethod === 'online'
                    ? 'border-[#294840] bg-[#294840]/5'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={form.paymentMethod === 'online'}
                  onChange={handleChange}
                  className="accent-[#294840]"
                />
                <CreditCard size={22} className={form.paymentMethod === 'online' ? 'text-[#294840]' : 'text-gray-400'} />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Online Payment (Visa)</p>
                  <p className="text-xs text-gray-500">Secure payment via Paymob</p>
                </div>
                <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#294840] text-white rounded-full font-medium hover:bg-[#1e3530] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-lg hover:shadow-[#294840]/20"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Placing Order...
              </span>
            ) : (
              <>
                <Lock size={16} />
                Place Order · {total.toLocaleString()} EGP
              </>
            )}
          </button>
        </form>

        {/* Order Summary */}
        <div>
          <div className="bg-[#f9f6f1] rounded-3xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-5">Order Summary</h2>
            <div className="space-y-4 mb-5">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#294840] text-white text-[10px] rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                    <p className="text-sm text-[#294840] font-semibold mt-0.5">
                      {(item.price * item.quantity).toLocaleString()} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{totalPrice.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'Free' : `${shipping} EGP`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200 text-base">
                <span>Total</span>
                <span>{total.toLocaleString()} EGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
