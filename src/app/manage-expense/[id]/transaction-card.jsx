'use client';

export default function TransactionCard({ className, name, total }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center border bg-white rounded-lg shadow-md">
      <span className="uppercase text-sm">{ name }</span>
      <span className={`font-bold text-lg ${className}`}>
        ${total || "0.00"}
      </span>
    </div>
  );
}
