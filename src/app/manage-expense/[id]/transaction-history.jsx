import React, { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import TransactionHistoryItem from "./transaction-history-item";

function TransactionHistory({ loading, histories = [], setRefetch }) {
  const skeletonRows = Array.from({ length: 5 });
  
  return (
    <>
      {/* {histories.length > 0 && ( */}
        <div className="w-full gap-0">
          <div className="flex flex-col">
            <div className="w-full overflow-y-auto border-t px-2">
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
          {/* <div className="bg-background rounded-b-lg border-t py-4 px-4 m-0">
            <span className="text-xs text-foreground/80">
              Total Transactions: {histories.length}
            </span>
          </div> */}
        </div>
      {/* )} */}
    </>
  );
}

export default TransactionHistory;