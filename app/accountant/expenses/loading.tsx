import { Skeleton, SkeletonCard, SkeletonTable } from '@/app/components/ui/Skeleton';

export default function ExpensesLoading() {
  return (
    <div className="flex-1 h-full flex flex-col">
      {/* Tab Skeleton */}
      <div className="md:hidden bg-white dark:bg-background-dark px-4 pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>

      {/* Content Skeleton */}
      <main className="flex-1 overflow-y-auto pb-32 md:pb-8 p-4 md:p-8">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

            {/* Left Column */}
            <div className="space-y-6">
              {/* Transaction Details */}
              <div>
                <div className="flex items-center gap-2 px-1 mb-4">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <SkeletonCard />
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 px-1 mb-4">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Vendor & Payment */}
              <div>
                <div className="flex items-center gap-2 px-1 mb-4">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="bg-white dark:bg-white/5 p-5 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                  <Skeleton className="h-32 w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700" />
                </div>
              </div>

              {/* Actions */}
              <div className="hidden md:flex gap-4 pt-4">
                <Skeleton className="flex-1 h-12 rounded-xl" />
                <Skeleton className="flex-[2] h-12 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Footer Skeleton */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white/95 dark:bg-background-dark/95 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
