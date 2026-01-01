import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react"
import { ReoccurringForm } from "./reoccuring-form";
import { Button } from "@/components/ui/button";

export function ReOccuringExpenses() {
  const [isLoading, setIsLoading] = useState(true);
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
      } catch (error) {
        console.error('Error fetching reocurring expenses:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReOccurringExpenses();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="p-4 w-[500px]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Re-Occurring Expenses</h2>
        <Button onClick={() => setShowReOccurringForm(true)}>Add</Button>
      </div>
      <hr />
      {!reOccurringExpenses.length ? (
        <p>No re-occurring expenses found.</p>
      ) : (
        <div>
          { showReOccurringForm && (
            <ReoccurringForm open={showReOccurringForm} setOpen={setShowReOccurringForm} />
          )}

          <div className="flex flex-col gap-2">
            {reOccurringExpenses.length > 0 && reOccurringExpenses.map((expense) => (
              <div
                key={expense.id}
                className="p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowReOccurringForm(true)}
              >
                <h3 className="font-medium">{expense.title}</h3>
                <p>Amount: ${expense.amount}</p>
                <p>Frequency: {expense.frequency}</p>
                <p>Next Occurrence: {new Date(expense.nextOccurrence).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}