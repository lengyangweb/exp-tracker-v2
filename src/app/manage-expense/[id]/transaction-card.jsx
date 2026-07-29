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
    <div className="min-h-30 w-full relative flex-1 flex flex-col justify-center items-center border bg-white rounded-lg shadow-md py-1 lg:py-0 overflow-hidden">
      <div className="absolute top-0 bg-neutral-100/80 w-full p-2 text-xs">
        <span className="uppercase text-center font-semibold">{name}</span>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center gap-1 lg:gap-2">
        <span className={`font-bold lg:text-lg ${className}`}>
          ${total || "0.00"}
        </span>
      </div>
      <div className={cn(
        "absolute inset-x-0 bottom-0 text-xs font-semibold text-center py-1",
        footerBackgroundColor ? `${footerBackgroundColor}/80` : '',
      )}>
        {footerContent}
      </div>
    </div>
  );
}
