'use client';

import { useState } from "react";
import { Dot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { commatedNumber } from "@/utils/utils";
import EditTransactionForm from "./edit-transaction-form";

const TransactionHistoryItem = ({ history, setRefetch }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
      className="flex justify-between border-b items-center w-full py-1 hover:bg-gray-50 cursor-pointer"
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={() => setOpenEdit(true)}
    >
      <div className="flex flex-col px-2">
        <div className="flex flex-col">
          <span className="text-[10px]">{moment(history.historyDate).format('MMM DD, YYYY')}</span>
          <span className="text-[13px] font-medium">{history.title}</span>
        </div>
        <div className="flex gap-2">
          <div className={` flex items-center text-xs text-foreground 80`}>
            <span></span>
            <div className={`${history.type === 'income' ? 'text-green-700' : 'text-red-700'}`}>
              {history.type === 'income' ? '+' : '-'} 
              ${commatedNumber(history.amount.toFixed(2))}
            </div>
            <Dot size={14} />
            <span className="text-[8px] bg-gray-100 py-1 px-2 text-center rounded-sm">{history.category}</span> 
          </div>
        </div>
      </div>
      {showDelete && (
        <Button 
          className="bg-transparent text-foreground border-none shadow-none hover:bg-transparent"
          onClick={handleDelete}
        >
          <X />
        </Button>
      )}
      { openEdit && (
        <EditTransactionForm 
          show={openEdit}
          setShow={setOpenEdit}
          transactionItem={history}
          setRefetch={setRefetch}
        />
      )}
    </div>
  );
};

export default TransactionHistoryItem;
