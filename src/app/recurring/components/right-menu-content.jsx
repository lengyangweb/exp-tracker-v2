'use client';

import { useCallback, useMemo, useState } from "react";
import { useRecurring } from "../recurring-context";
import { AddRecurringButton } from "./add-recurring-button";

export default function RightMenuContent() {
  const { data } = useRecurring();
  const [expenseTotal, setExpenseTotal] = useState(0);

   const calculateExpenseTotal = useCallback((expenses) => {
     return expenses.reduce((total, expense) => total + expense.amount, 0);
   }, []);
 
   useMemo(() => {
     if (data && data.length > 0) {
       setExpenseTotal(calculateExpenseTotal(data));
     }
   }, [data]);

  return (
    <div className="flex justify-center items-center gap-8">
      <div className="flex gap-2 uppercase rounded-md">
        <span>Total:</span>
        <span className="font-semibold">${expenseTotal.toFixed(2)}</span>
      </div>
      <AddRecurringButton />
    </div>
  );
}