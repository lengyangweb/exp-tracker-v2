'use client';

import { useState } from "react";
import { Dot, X } from "lucide-react";
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
        <div className="flex items-center gap-2">
          <span className="text-sm">{history.title}</span>
        </div>
        <div className="flex gap-2">
          <div className={` flex items-center text-xs text-foreground 80`}>
            <span>{history.type === 'income' ? '+' : '-'}</span>
            <span className={`${history.type === 'income' ? 'text-green-700' : 'text-red-700'}`}>${history.amount.toFixed(2)}</span>
            <Dot size={14} /> 
            <span className="text-foreground 80">{new Date(history.historyDate).toLocaleDateString()}</span>
            <Dot size={14} />
            <span className="text-[10px] bg-gray-100 py-1 px-2 text-center rounded-sm">{history.category}</span> 
          </div>
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
