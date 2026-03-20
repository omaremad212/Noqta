export default function ShopLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="bg-[#f9f6f1] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse mb-3" />
          <div className="h-10 w-48 bg-gray-200 rounded-xl animate-pulse mb-3" />
          <div className="h-4 w-72 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter bar skeleton */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-20 bg-gray-100 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] bg-gray-100 rounded-2xl animate-pulse" />
              <div className="mt-3 space-y-2 px-1">
                <div className="h-3 w-16 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-4 w-36 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-4 w-20 bg-gray-100 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
