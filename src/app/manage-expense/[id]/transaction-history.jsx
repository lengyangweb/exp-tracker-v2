"use client";

import React from "react";
import TransactionHistoryItem from "./transaction-history-item";

function TransactionHistory({ histories = [] }) {
  return (
    <>
      {histories.length === 0 && (
        <div className="flex flex-col justify-center items-center h-full">
          <span className="text-lg font-semibold">No Transaction History</span>
          <span className="text-sm">Add a new transaction to see it here.</span>
        </div>
      )}
      {histories.length > 0 && (
        <div className="border shadow-xl rounded-lg w-130">
          <div className="flex flex-col gap-2 pb-2">
            <div className="flex flex-col border-b py-2 px-4 bg-neutral-100">
              <span className="text-lg font-semibold">Transaction History</span>
              <div className="text-xs">
                All of your transaction history logs.
              </div>
            </div>
            {/* Transaction Histories */}
            <div className="max-h-107 overflow-y-auto w-full">
              {histories.map((history) => (
                <TransactionHistoryItem
                  key={crypto.randomUUID()}
                  history={history}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionHistory;
