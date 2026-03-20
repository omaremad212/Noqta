'use client';

import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-350 ease-in-out ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#294840]" />
            <h2 className="font-semibold text-gray-900">Your Cart</h2>
            {state.items.length > 0 && (
              <span className="bg-[#294840] text-white text-xs px-2 py-0.5 rounded-full">
                {state.items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-1">Add some beautiful stationery!</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-[#294840] text-white text-sm rounded-full hover:bg-[#1e3530] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-50">
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</p>
                    <p className="text-[#294840] font-semibold text-sm mt-1">{item.price} EGP</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#294840] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#294840] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Subtotal</span>
              <span className="font-bold text-gray-900">{totalPrice.toLocaleString()} EGP</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#294840] text-white text-center py-3.5 rounded-full font-medium hover:bg-[#1e3530] transition-colors text-sm"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center py-2.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mt-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
