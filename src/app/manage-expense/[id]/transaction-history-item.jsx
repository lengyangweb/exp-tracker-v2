'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, PlusIcon, X } from "lucide-react";

const TransactionHistoryItem = ({ history }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    console.log('DELETE');
  }

  return (
    <div
      className="flex justify-between border-b items-center w-full"
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex flex-col px-2">
        <span className="">{history.title}</span>
        <span
          className={`text-xs ${
            history.type === "income" ? "text-green-700" : "text-red-700"
          }`}
        >
          {history.type === "income" && "+"}
          {history.type === "expense" && "-"}${history.amount}
        </span>
      </div>
      {showDelete && (
        <Button 
          className="bg-white text-foreground border-none shadow-none hover:bg-white"
          onClick={handleDelete}
        >
          <X />
        </Button>
      )}
    </div>
  );
};

export default TransactionHistoryItem;
