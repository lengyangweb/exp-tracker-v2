import { commatedNumber } from "@/utils/utils";

export function ReoccurringItem({
  expense,
  setSelectedExpense,
  setShowReOccurringForm,
}) {

  /**
   * Handle selecting a reoccurring expense item
   */
  const onSelect = () => {
    setSelectedExpense(expense);
    setShowReOccurringForm(true);
  };

  return (
    <div
      className="p-3 border-t hover:bg-gray-100 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">{expense.title}</span>
        <span className="font-semibold text-sm">
          ${commatedNumber(expense.amount.toFixed(2))}
        </span>
      </div>
      <div className="text-sm text-foreground 80">
        <p className="text-xs">Frequency: {expense.frequency}</p>
        <p className="text-xs">
          Next Occurrence: {expense.nextOccurrence?.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
