'use client';

import { use, useState } from 'react';
import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Check, ChevronRight, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ui/ProductCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) notFound();

  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const images = product.images ?? [product.image];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-[#294840] transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-[#294840] transition-colors">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50">
            <Image
              src={images[activeImg]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#294840] text-white text-xs px-3 py-1.5 rounded-full font-medium">
                {product.badge}
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? 'border-[#294840]' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-widest text-[#294840] font-medium mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating!) ? '#f59e0b' : 'none'}
                    className={i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mt-5">
            <span className="text-3xl font-bold text-[#294840]">{product.price} EGP</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">{product.originalPrice} EGP</span>
            )}
          </div>

          <p className="mt-5 text-gray-500 leading-relaxed">{product.description}</p>

          {/* Features */}
          {product.features && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">What&apos;s Included</h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-[#294840] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-[#294840] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-[#294840] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              {product.inStock ? (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <Check size={14} /> In Stock
                </span>
              ) : (
                <span className="text-sm text-red-500">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 py-4 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-[#294840] text-white hover:bg-[#1e3530] hover:shadow-lg hover:shadow-[#294840]/20 hover:-translate-y-0.5'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ShoppingBag size={18} />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleItem(product)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                wishlisted
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'border-gray-200 text-gray-500 hover:border-[#294840] hover:text-[#294840]'
              }`}
            >
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Delivery info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
            <p className="text-xs text-gray-500">
              🚚 <strong>Free delivery</strong> on orders over 500 EGP · Cash on delivery available ·
              Ships within 2–4 business days
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
