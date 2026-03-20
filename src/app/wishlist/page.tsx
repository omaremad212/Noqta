'use client';

import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { state, removeItem } = useWishlist();
  const { addItem } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={36} className="text-red-200" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h1>
        <p className="text-gray-500 mt-2">Save items you love to come back later.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mt-6 px-7 py-3 bg-[#294840] text-white rounded-full font-medium hover:bg-[#1e3530] transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-10">
        <Heart size={24} className="text-[#294840]" />
        <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
          {state.items.length} item{state.items.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
          >
            <Link href={`/product/${item.id}`} className="block relative aspect-[4/3] bg-gray-50">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </Link>
            <div className="p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{item.category}</p>
              <Link href={`/product/${item.id}`}>
                <h3 className="font-semibold text-gray-900 mt-0.5 hover:text-[#294840] transition-colors text-sm">
                  {item.name}
                </h3>
              </Link>
              <p className="text-[#294840] font-bold mt-1">{item.price} EGP</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { addItem(item); }}
                  className="flex-1 py-2 bg-[#294840] text-white text-xs rounded-full flex items-center justify-center gap-1.5 hover:bg-[#1e3530] transition-colors font-medium"
                >
                  <ShoppingBag size={13} />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
