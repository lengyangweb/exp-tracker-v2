"use client";

import TransactionHistoryItem from "./transaction-history-item";

/**
 * Compact transaction history for narrow screens.
 *
 * @param {{
 *  histories: import('@/app/types/history').History[];
 *  onEdit: (history: import('@/app/types/history').History) => void;
 *  onDelete: (history: import('@/app/types/history').History) => void;
 * }} props
 */
function TransactionHistory({ histories = [], onEdit, onDelete }) {
  if (!histories.length) {
    return (
      <div className="rounded-lg border py-10 text-center text-sm text-muted-foreground">
        No transactions yet. Add a transaction to get started.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {histories.map((history, index) => (
        <li key={history.id}>
          <TransactionHistoryItem
            history={history}
            onEdit={onEdit}
            onDelete={onDelete}
            muted={index % 2 === 1}
          />
        </li>
      ))}
    </ul>
  );
}

export default TransactionHistory;
