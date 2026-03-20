import Image from 'next/image';
import { Instagram } from 'lucide-react';

const posts = [
  { id: 1, img: 'https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b' },
  { id: 2, img: 'https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5' },
  { id: 3, img: 'https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b' },
  { id: 4, img: 'https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5' },
  { id: 5, img: 'https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b' },
  { id: 6, img: 'https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5' },
];

export default function InstagramSection() {
  return (
    <section className="py-24 bg-[#f9f6f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram size={20} className="text-[#294840]" />
            <p className="text-xs uppercase tracking-widest text-[#294840] font-medium">
              @noqtadesigns
            </p>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">تابعونا على إنستغرام</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-sm mx-auto">
            إلهام يومي، كواليس الصنع، وأحدث المنتجات.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/noqtadesigns/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100"
            >
              <Image
                src={post.img}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-[#294840]/0 group-hover:bg-[#294840]/40 transition-colors flex items-center justify-center">
                <Instagram size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/noqtadesigns/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#294840] text-[#294840] rounded-full text-sm font-medium hover:bg-[#294840] hover:text-white transition-all"
          >
            <Instagram size={16} />
            تابعنا على إنستغرام
          </a>
        </div>
      </div>
    </section>
  );
}
