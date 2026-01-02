import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReoccurringForm } from "./reoccuring-form";
import { ReoccurringItem } from "./reoccurring-item";

export function ReOccuringExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showReOccurringForm, setShowReOccurringForm] = useState(false);
  const [reOccurringExpenses, setReOccurringExpenses] = useState([]);

  useEffect(() => {
    // Fetch logic would go here
    async function fetchReOccurringExpenses() {
      try {
        const response = await fetch('/api/reocurring');
        if (!response.ok) {
          throw new Error('Failed to fetch reocurring expenses');
        }
        const data = await response.json();
        setReOccurringExpenses(data);
        setRefetch(false);
      } catch (error) {
        console.error('Error fetching reocurring expenses:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (refetch) {
      fetchReOccurringExpenses();
    }

  }, [refetch]);

  if (isLoading) {
    return <p>Loading...</p>;
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
        <Button size="sm" onClick={() => setShowReOccurringForm(true)}>New</Button>
        {showReOccurringForm && (
          <ReoccurringForm
            open={showReOccurringForm}
            setOpen={setShowReOccurringForm}
            reoccurringExpense={selectedExpense}
            setRefetch={setRefetch}
          />
        )}
      </div>
      <hr />
      <div className="mt-4 flex flex-col gap-2">
      {!reOccurringExpenses.length ? (
        <p>No re-occurring expenses found.</p>
      ) : (
        <div>
          <div className="flex flex-col gap-2">
            {reOccurringExpenses.length > 0 && reOccurringExpenses.map((expense) => (
              <ReoccurringItem 
                key={expense.id}
                expense={expense}
                setSelectedExpense={setSelectedExpense}
                setShowReOccurringForm={setShowReOccurringForm}
              />
            ))}
          </div>
        </div>
      )}
      </div>
    </Card>
  );
}