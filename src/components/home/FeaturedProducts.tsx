import { products } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#294840] font-medium mb-2">
              Curated Selection
            </p>
            <h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-[#294840] hover:underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
