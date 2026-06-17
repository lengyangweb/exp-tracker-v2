import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReoccurringForm } from "./reoccuring-form";
import { ReoccurringItem } from "./reoccurring-item";
import { Spinner } from "@/components/ui/spinner";
import { commatedNumber } from "@/utils/utils";
import { getNextOccurrence, sortExpensesByNextOccurrence } from "@/utils/recurring";

export function ReOccuringExpenses() {
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
          }))
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

  if (isLoading) {
    return (
      <Card className="px-4 py-2 w-full gap-0">
        <div className="w-full h-full flex flex-col items-center justify-center py-10">
          <Spinner size={18} />
          <p>Loading Reoccuring...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="px-4 py-2 w-full gap-0">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <span className="font-semibold">Re-Occurring Expenses</span>
          <span className="text-xs text-foreground 80">
            Manage your re-occurring expenses here.
          </span>
        </div>
        <Button size="sm" onClick={() => setShowReOccurringForm(true)}>
          New
        </Button>
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
      <hr />
      <div className="flex flex-col">
        {!reOccurringExpenses.length ? (
          <p>No re-occurring expenses found.</p>
        ) : (
          <div>
            <div className="flex flex-col overflow-y-auto max-h-89 mb-4">
              {reOccurringExpenses.length > 0 &&
                reOccurringExpenses.map((expense) => (
                  <ReoccurringItem
                    key={expense.id}
                    expense={expense}
                    setSelectedExpense={setSelectedExpense}
                    setShowReOccurringForm={setShowReOccurringForm}
                  />
                ))}
            </div>
            <div className="relative z-10 border-t text-xs text-foreground 80 h-12 flex justify-between items-center">
              <span>
                {reOccurringExpenses.length} item
                {reOccurringExpenses.length !== 1 ? "s" : ""} total.
              </span>
              <span>Total: ${commatedNumber(expenseTotal.toFixed(2))}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
