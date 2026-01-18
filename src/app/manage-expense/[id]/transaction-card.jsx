'use client';

export default function TransactionCard({ className, name, total }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center border bg-white rounded-lg shadow-md py-1 lg:py-0">
      <span className="uppercase text-center text-xs sm:text-sm">{ name }</span>
      <span className={`font-bold lg:text-lg ${className}`}>
        ${total || "0.00"}
      </span>
    </div>
  );
}
