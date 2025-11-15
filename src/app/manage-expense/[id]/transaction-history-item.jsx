'use client';

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const TransactionHistoryItem = ({ history, setRefetch }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/histories/${history.id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setRefetch(true);
      } else {
        console.error('Failed to delete history:', data.message);
      }
    } catch (error) {
      console.error('Error deleting history:', error);
    }
  }

  return (
    <div
      className="flex justify-between border-b items-center w-full py-1"
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex flex-col px-2">
        <span className="text-sm">{history.title}</span>
        <div className="flex gap-2">
          <span className={`text-xs text-foreground 80 ${history.type === 'income' ? 'text-green-700' : 'text-red-700'}`}>
            {history.type === 'income' ? '+' : '-'}
            ${history.amount.toFixed(2)}
            <span className="text-foreground 80"> - {new Date(history.createdAt).toLocaleDateString()}</span>
          </span>
        </div>
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
