'use client';

import { useSearch } from '@/context/SearchContext';
import { useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { products } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchModal() {
  const { isOpen, query, closeSearch, setQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeSearch]);

  const results = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSearch} />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full max-w-2xl mx-auto mt-20 rounded-2xl shadow-2xl overflow-hidden animate-scaleIn">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notebooks, planners..."
            className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-base bg-transparent"
          />
          <button
            onClick={closeSearch}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.length > 1 && results.length === 0 && (
            <div className="px-5 py-10 text-center text-gray-500 text-sm">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {results.length > 0 && (
            <div className="p-3">
              <p className="text-xs text-gray-400 px-3 mb-2 uppercase tracking-wide">Products</p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={closeSearch}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-[#294840]">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">{product.category} · {product.price} EGP</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.length <= 1 && (
            <div className="px-5 py-8 text-center text-sm text-gray-400">
              Start typing to search…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
