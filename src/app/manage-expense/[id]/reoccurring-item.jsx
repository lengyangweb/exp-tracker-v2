import { useEffect, useState } from "react";

export function ReoccurringItem({ expense, setSelectedExpense, setShowReOccurringForm }) {
  const [nextOccurrence, setNextOccurrence] = useState(null);

  useEffect(() => {
    const next = getNextOccurrence(expense.startDate, expense.frequency);
    setNextOccurrence(next);
  }, [expense]);

  /**   * Calculate the next occurrence date based on start date and frequency
   * @param {Date} startDate - The start date of the expense
   * @param {string} frequency - The frequency of the expense
   * @return {Date} - The next occurrence date
   */
  const getNextOccurrence = (startDate, frequency) => {
    const start = new Date(startDate);
    const now = new Date();
    let next = new Date(start);

    while (next <= now) {
      if (frequency === 'daily') {
        next.setDate(next.getDate() + 1);
      } else if (frequency === 'weekly') {
        next.setDate(next.getDate() + 7);
      } else if (frequency === 'monthly') {
        next.setMonth(next.getMonth() + 1);
      } else if (frequency === 'yearly') {
        next.setFullYear(next.getFullYear() + 1);
      }
    }

    return next;
  };

  /**
   * Handle selecting a reoccurring expense item
   */
  const onSelect = () => {
    setSelectedExpense(expense);
    setShowReOccurringForm(true);
  }

  return (
    <div className="p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{expense.title}</h3>
        <span className="font-semibold">${expense.amount.toFixed(2)}</span>
      </div>
      <div className="text-sm text-foreground 80">
        <p className="text-xs">Frequency: {expense.frequency}</p>
        <p className="text-xs">
          Next Occurrence:{" "}
          {nextOccurrence?.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}