'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <span className="text-2xl">⚠️</span>
      </div>
      <h1 className="text-xl font-bold text-gray-900">Something went wrong</h1>
      <p className="text-gray-500 mt-2 text-sm max-w-sm">
        An unexpected error occurred. Please try again or contact us if the problem persists.
      </p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#294840] text-white rounded-full text-sm font-medium hover:bg-[#1e3530] transition-colors"
        >
          Try Again
        </button>
        <a
          href="/"
          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:border-[#294840] hover:text-[#294840] transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
