'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#294840] text-white text-xs px-3 py-1 rounded-full font-medium z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 ${
            wishlisted
              ? 'bg-red-50 text-red-500'
              : 'bg-white/80 text-gray-500 hover:bg-white hover:text-red-500 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-[#294840] text-white hover:bg-[#1e3530]'
            }`}
          >
            <ShoppingBag size={15} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{product.category}</p>
            <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-[#294840] transition-colors">
              {product.name}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-[#294840] text-base">{product.price} EGP</span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star size={12} fill="#f59e0b" className="text-amber-400" />
              <span className="text-xs text-gray-500">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
