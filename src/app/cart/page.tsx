'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { state, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={36} className="text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500 mt-2">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mt-6 px-7 py-3 bg-[#294840] text-white rounded-full font-medium hover:bg-[#1e3530] transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 500 ? 0 : 50;
  const total = totalPrice + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-sm transition-shadow"
            >
              <Link href={`/product/${item.id}`}>
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{item.category}</p>
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-semibold text-gray-900 mt-0.5 hover:text-[#294840] transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-[#294840] font-bold mt-1">{item.price} EGP</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-[#294840] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-[#294840] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-bold text-gray-900">
                    {(item.price * item.quantity).toLocaleString()} EGP
                  </p>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#294840] transition-colors mt-2"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-[#f9f6f1] rounded-3xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({state.items.length} item{state.items.length > 1 ? 's' : ''})</span>
                <span>{totalPrice.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'Free' : `${shipping} EGP`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Add {(500 - totalPrice).toLocaleString()} EGP more for free shipping
                </p>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>{total.toLocaleString()} EGP</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full mt-6 bg-[#294840] text-white text-center py-4 rounded-full font-medium hover:bg-[#1e3530] transition-colors text-sm"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                Secure checkout · Cash on Delivery · Online Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
