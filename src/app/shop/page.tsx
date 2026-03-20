'use client';

import { useState, useMemo } from 'react';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ShopContent() {
  const searchParams = useSearchParams();
  const defaultCat = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(defaultCat);
  const [sortBy, setSortBy] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allCategories = ['All', ...categories.map((c) => c.name)];

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [selectedCategory, sortBy]);

  return (
    <>
      {/* Page Header */}
      <div className="bg-[#f9f6f1] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-[#294840] font-medium mb-2">
            Noqta Designs
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Shop</h1>
          <p className="text-gray-500 mt-3 max-w-md">
            Browse our collection of premium notebooks, planners, and stationery.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#294840] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">{filtered.length} products</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-[#294840] bg-white text-gray-700"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-6 py-2.5 bg-[#294840] text-white rounded-full text-sm hover:bg-[#1e3530] transition-colors"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-400">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
