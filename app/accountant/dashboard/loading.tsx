import { Skeleton, SkeletonCard } from '@/app/components/ui/Skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex-1 h-full flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto w-full">

          {/* Search Bar Skeleton */}
          <div className="px-4 md:px-8 py-4">
            <Skeleton className="h-12 w-full md:max-w-md rounded-xl" />
          </div>

          {/* Quick Actions Skeleton */}
          <div className="px-4 md:px-8 pt-6 md:pt-2">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Tasks & Budget Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8 pt-8">
            {/* Tasks */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Budget Health */}
            <div>
              <Skeleton className="h-6 w-28 mb-4" />
              <div className="bg-white dark:bg-white/5 p-5 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-3 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
