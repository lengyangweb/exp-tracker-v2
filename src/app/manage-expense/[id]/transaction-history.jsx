import React, { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import TransactionHistoryItem from "./transaction-history-item";

function TransactionHistory({ loading, histories = [], setRefetch }) {
  const skeletonRows = Array.from({ length: 5 });
  
  return (
    <>
      {/* {(!loading && histories.length === 0) && (
        <div className="flex flex-col justify-center items-center h-full">
          <span className="text-lg font-semibold">No Transaction History</span>
          <span className="text-sm">Add a new transaction to see it here.</span>
        </div>
      )} */}
      {/* {histories.length > 0 && ( */}
        <Card className="p-0 w-full md:w-130 shadow-xl rounded-lg gap-0">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 py-2 px-4 bg-background rounded-t-lg">
              <CardTitle>Transaction Histories</CardTitle>
              <div className="text-xs">
                All of your transaction history logs.
              </div>
            </div>
            {/* Transaction Histories */}
            <div className="h-95 max-h-93 overflow-y-auto border-t px-2">
              {loading
                ? skeletonRows.map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 py-3 px-2 border-b last:border-b-0"
                    >
                      <div className="flex-1">
                        <div className="h-4 w-40 bg-gradient-to-r from-neutral-300 to-neutral-100 rounded-md mb-2 animate-pulse" />
                        <div className="h-3 w-28 bg-gradient-to-r from-neutral-300 to-neutral-100 rounded-md animate-pulse" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-20 bg-gradient-to-r from-neutral-300 to-neutral-100 rounded-md animate-pulse" />
                        <div className="h-3 w-16 bg-gradient-to-r from-neutral-300 to-neutral-100 rounded-md animate-pulse" />
                      </div>
                    </div>
                  ))
                : histories.map((history) => (
                    <TransactionHistoryItem
                      key={crypto.randomUUID()}
                      history={history}
                      setRefetch={setRefetch}
                    />
                  ))}
            </div>
          </div>
          <div className="bg-background rounded-b-lg border-t py-4 px-4 m-0">
            <span className="text-xs text-foreground/80">
              Total Transactions: {histories.length}
            </span>
          </div>
        </Card>
      {/* )} */}
    </>
  );
}

export default TransactionHistory;