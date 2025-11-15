"use client";

import React from "react";
import TransactionHistoryItem from "./transaction-history-item";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <Card className="p-0 w-130 shadow-xl rounded-lg">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col border-b gap-2 py-2 px-4 bg-neutral-100 rounded-t-lg">
              <CardTitle>Transaction Histories</CardTitle>
              {/* <span className="text-lg font-semibold"></span> */}
              <div className="text-xs">
                All of your transaction history logs.
              </div>
            </div>
            {/* Transaction Histories */}
            <div className="h-96 max-h-96 overflow-y-auto w-full">
              {histories.map((history) => (
                <TransactionHistoryItem
                  key={crypto.randomUUID()}
                  history={history}
                  setRefetch={setRefetch}
                />
              ))}
            </div>
          </div>
          <div className="bg-neutral-100 rounded-b-lg border-t py-4 px-4 m-0">
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
