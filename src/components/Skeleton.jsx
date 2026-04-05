import React from 'react';
import { cn } from '../utils/cn';

export const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse bg-secondary/50 rounded-2xl", className)} />
);

export const DashboardSkeleton = () => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <div className="flex flex-col lg:flex-row justify-between gap-6 px-1">
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-6 w-96 opacity-60" />
      </div>
      <Skeleton className="h-12 w-48 rounded-[16px]" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <Skeleton key={i} className="h-44 rounded-[32px]" />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
      <Skeleton className="h-[500px] rounded-[36px]" />
      <div className="space-y-6">
        <Skeleton className="h-96 rounded-[36px]" />
        <Skeleton className="h-64 rounded-[36px]" />
      </div>
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-6 animate-in fade-in duration-700">
    <div className="flex justify-between gap-6">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-64 opacity-60" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
    <Skeleton className="h-24 rounded-[28px]" />
    <div className="bg-card border border-border rounded-[36px] p-8 space-y-4">
      {[1, 2, 3, 4, 5].map(i => (
        <Skeleton key={i} className="h-20 w-full rounded-2xl" />
      ))}
    </div>
  </div>
);
