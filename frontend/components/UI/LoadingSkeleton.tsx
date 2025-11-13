'use client'

export function ItineraryCardSkeleton() {
  return (
    <div className="bg-white rounded-card shadow-sm p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  )
}

export function ActivitySkeleton() {
  return (
    <div className="border border-gray-200 rounded-card p-4 animate-pulse">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-2 mt-3">
        <div className="h-8 bg-gray-200 rounded w-24"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  )
}

export function DayScheduleSkeleton() {
  return (
    <div className="bg-white rounded-card shadow-sm p-6 mb-6 animate-pulse">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>
      <div className="space-y-4">
        <ActivitySkeleton />
        <ActivitySkeleton />
        <ActivitySkeleton />
      </div>
    </div>
  )
}

