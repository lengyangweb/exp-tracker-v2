"use client";

import { useEffect, useState } from "react";
import {
  getNextOccurrence,
  sortExpensesByNextOccurrence,
} from "@/utils/recurring";
import { DataTable } from "@/components/shared/recourring/data-table";
import { ReoccurringForm } from "../user-settings/reoccuring-form";

export const MainContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showReOccurringForm, setShowReOccurringForm] = useState(false);
  const [reOccurringExpenses, setReOccurringExpenses] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    // Fetch logic would go here
    async function fetchReOccurringExpenses() {
      try {
        const response = await fetch("/api/reocurring");
        if (!response.ok) {
          throw new Error("Failed to fetch reocurring expenses");
        }

        /**@type {import('../types/reocurring').Recurring} */
        const data = await response.json();
        const updatedExpenses = sortExpensesByNextOccurrence(
          data.map((expense) => ({
            ...expense,
            nextOccurrence: getNextOccurrence(
              expense.startDate,
              expense.frequency,
            ),
          })),
        );

        setReOccurringExpenses(updatedExpenses);
        setRefetch(false);
        setExpenseTotal(calculateExpenseTotal(updatedExpenses));
      } catch (error) {
        console.error("Error fetching reocurring expenses:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (refetch) {
      fetchReOccurringExpenses();
    }
  }, [refetch]);

  const calculateExpenseTotal = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div className="flex flex-col">
      <div className="p-4">
        {isLoading ? (
          <p>Loading recurring expenses...</p>
        ) : (
          <>
            <DataTable 
              data={reOccurringExpenses} 
              setSelectedExpense={setSelectedExpense}
              setShowReOccurringForm={setShowReOccurringForm}
            />
            {showReOccurringForm && (
              <ReoccurringForm
                open={showReOccurringForm}
                setOpen={setShowReOccurringForm}
                reoccurringExpense={selectedExpense}
                setRefetch={setRefetch}
                setSelectedExpense={setSelectedExpense}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
