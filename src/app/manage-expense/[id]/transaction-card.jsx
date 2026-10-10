'use client';

import { cn } from "@/lib/utils";

/**
 * A card component that displays a transaction summary, including the name and total amount.
 *
 * @param {{ 
 *  className: string;
 *  name: string; 
 *  total: number;
 *  footerBackgroundColor?: string;
 *  footerContent?: import("react").ReactNode;
 * }} props
 * @returns {JSX.Element}
 */
export default function TransactionCard({ 
  className, 
  name, 
  total,
  footerBackgroundColor,
  footerContent,
}) {
  return (
    <div className="relative flex min-h-24 min-w-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-lg border bg-white px-1 py-1 shadow-md">
      <div className="absolute top-0 w-full bg-neutral-100/80 px-1 py-1 text-center text-[9px] sm:px-2 sm:text-xs">
        <span className="block truncate font-semibold uppercase">{name}</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 pt-3">
        <span className={`max-w-full truncate text-xs font-bold sm:text-sm lg:text-lg ${className}`}>
          ${total || "0.00"}
        </span>
      </div>
      <div className={cn(
        "absolute inset-x-0 bottom-0 truncate px-1 py-0.5 text-center text-[9px] font-semibold sm:text-[10px]",
        footerBackgroundColor ? `${footerBackgroundColor}/80` : '',
      )}>
        {footerContent}
      </div>
    </div>
  );
}
