import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/products';

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-[#f9f6f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-[#294840] font-medium mb-2">
            Browse by
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Categories</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.name}`}
              className="group relative overflow-hidden rounded-3xl aspect-square bg-white shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#294840]/80 via-[#294840]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                <p className="text-white/70 text-xs mt-0.5">{cat.count} items</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-lg">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
