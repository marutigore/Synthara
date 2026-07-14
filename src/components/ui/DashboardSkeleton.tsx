import { CardSkeleton, ActivitySkeleton, DatasetTableSkeleton } from "./CardSkeleton";

export function DashboardSkeleton() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="space-y-2 animate-pulse">
        <div className="h-8 w-64 bg-muted rounded" />
        <div className="h-4 w-96 bg-muted rounded" />
      </div>

      {/* Stats cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DatasetTableSkeleton />
        </div>
        <div>
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="h-5 w-32 bg-muted rounded mb-4 animate-pulse" />
            <ActivitySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
