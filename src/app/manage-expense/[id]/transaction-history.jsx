import React, { useState } from "react";
import TransactionHistoryItem from "./transaction-history-item";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TransactionHistory({ histories = [], setRefetch }) {
  const [selectedType, setSelectedType] = useState("all");

  const filteredHistories = selectedType === "all" 
    ? histories 
    : histories.filter((history) => history.type === selectedType);

  return (
    <>
      {histories.length === 0 && (
        <div className="flex flex-col justify-center items-center h-full">
          <span className="text-lg font-semibold">No Transaction History</span>
          <span className="text-sm">Add a new transaction to see it here.</span>
        </div>
      )}
      {histories.length > 0 && (
        <Card className="p-0 w-130 shadow-xl rounded-lg gap-0">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col border-b gap-2 py-2 px-4 bg-neutral-100 rounded-t-lg">
              <CardTitle>Transaction Histories</CardTitle>
              <div className="text-xs">
                All of your transaction history logs.
              </div>
              {/* <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            {/* Transaction Histories */}
            <div className="h-102 max-h-102 overflow-y-auto w-full">
              {filteredHistories.map((history) => (
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
              Total Transactions: {filteredHistories.length}
            </span>
          </div>
        </Card>
      )}
    </>
  );
}

export default TransactionHistory;