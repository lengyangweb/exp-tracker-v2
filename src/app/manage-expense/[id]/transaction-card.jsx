'use client';

/**
 * A card component that displays a transaction summary, including the name and total amount.
 *
 * @param {{ className: string, name: string, total: number, isOverBudget?: boolean }} param0
 * @returns {JSX.Element}
 */
export default function TransactionCard({ className, name, total, isOverBudget }) {
  return (
    <div className="relative flex-1 flex flex-col justify-center items-center border bg-white rounded-lg shadow-md py-1 lg:py-0 overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center gap-1 lg:gap-2">
        <span className="uppercase text-center text-xs sm:text-sm">{ name }</span>
        <span className={`font-bold lg:text-lg ${className}`}>
          ${total || "0.00"}
        </span>
      </div>
      { isOverBudget && (
        <span className="absolute inset-x-0 bottom-0 bg-red-300/90 text-xs font-semibold text-center py-1 text-red-700">
          Oh no! You are over budget!
        </span>
      )}
    </div>
  );
}
