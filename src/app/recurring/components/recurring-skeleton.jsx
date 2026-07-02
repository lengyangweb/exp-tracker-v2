import { Skeleton } from "@/components/ui/skeleton";
import { useId } from "react";

export function RecurringSkeleton() {
  return (
    <div className="flex flex-col space-y-4 w-full p-4">
      <Skeleton className="h-8 w-1/4" />
      <div className="overflow-hidden rounded-md border bg-white shadow-sm h-[640px]">
        <div className="grid grid-cols-6 gap-4 border-b px-4 py-3 bg-neutral-100">
          {Array.from({ length: 6 }).map((_) => (
            <Skeleton key={useId()} className="h-4 w-full" />
          ))}
        </div>
        <div className="divide-y">
          {Array.from({ length: 14 }).map(() => (
            <div
              key={useId()}
              className="grid grid-cols-6 gap-4 px-4 py-3 min-h-[3rem]"
            >
              {Array.from({ length: 6 }).map((_) => (
                <Skeleton key={useId()} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
