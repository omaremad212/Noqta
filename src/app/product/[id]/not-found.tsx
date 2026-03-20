import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-[#294840]/10 select-none">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mt-4">Product not found</h1>
      <p className="text-gray-500 mt-2 text-sm max-w-sm">
        This product doesn&apos;t exist or may have been removed from our store.
      </p>
      <Link
        href="/shop"
        className="mt-8 px-7 py-3 bg-[#294840] text-white rounded-full text-sm font-medium hover:bg-[#1e3530] transition-colors"
      >
        Browse All Products
      </Link>
    </div>
  );
}
