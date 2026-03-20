import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-[#294840]/10 select-none">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mt-4">Page not found</h1>
      <p className="text-gray-500 mt-2 max-w-sm text-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3 mt-8">
        <Link
          href="/"
          className="px-6 py-3 bg-[#294840] text-white rounded-full text-sm font-medium hover:bg-[#1e3530] transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:border-[#294840] hover:text-[#294840] transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
