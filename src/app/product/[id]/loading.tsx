export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-3 w-12 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-3 w-2 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-3 w-12 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-3 w-2 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-3 w-32 bg-gray-100 rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <div className="aspect-square bg-gray-100 rounded-3xl animate-pulse" />

        {/* Info */}
        <div className="space-y-4">
          <div className="h-3 w-20 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-10 w-3/4 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-4 w-40 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-8 w-28 bg-gray-100 rounded-full animate-pulse" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-gray-100 rounded-full animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="h-14 w-full bg-gray-100 rounded-full animate-pulse mt-8" />
        </div>
      </div>
    </div>
  );
}
