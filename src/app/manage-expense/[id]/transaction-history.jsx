import React, { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import TransactionHistoryItem from "./transaction-history-item";

function TransactionHistory({ histories = [], setRefetch }) {
  return (
    <>
      {histories.length === 0 && (
        <div className="flex flex-col justify-center items-center h-full">
          <span className="text-lg font-semibold">No Transaction History</span>
          <span className="text-sm">Add a new transaction to see it here.</span>
        </div>
      )}
      {histories.length > 0 && (
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
              {histories.map((history) => (
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
      )}
    </>
  );
}

export default TransactionHistory;