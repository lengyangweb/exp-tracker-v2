"use client";

import { useEffect, useState } from "react";
import {
  getNextOccurrence,
  sortExpensesByNextOccurrence,
} from "@/utils/recurring";
import { DataTable } from "@/components/shared/recourring/data-table";
import { ReoccurringForm } from "../user-settings/reoccuring-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

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
    <div className="flex flex-col w-full">
      <div className="">
        {isLoading ? (
          <p>Loading recurring expenses...</p>
        ) : (
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-between w-full">
              <div className="self-end flex gap-2 border bg-neutral-100 px-3 rounded-md">
                <span>Total:</span>
                <span className="font-semibold">
                  ${expenseTotal.toFixed(2)}
                </span>
              </div>
              <Button 
                className="self-end" 
                size="sm" 
                variant="outline" 
                onClick={() => setShowReOccurringForm(true)}
              >
                <div className="flex justify-between items-center">
                  <span>New Recurring</span>
                  <PlusIcon className="ml-2 h-4 w-4" />
                </div>
              </Button>
            </div>
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
          </div>
        )}
      </div>
    </div>
  );
};
