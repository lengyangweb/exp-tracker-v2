import { BUDGET_MESSAGE, BUDGET_STATUS_COLOR, BUDGET_STATUS_ICON } from "@/app/budgeting/components/budget-summary-card";
import { useBudget } from "@/app/budgeting/hooks/use-budget";
import { Spinner } from "@/components/ui/spinner";
import TransactionCard from "./transaction-card";
import { useMemo } from "react";

function ExpenseFooter({ summary }) {
  return (
    <>
      {summary?.status ? (
        <div className="flex gap-1 items-center justify-center">
          {BUDGET_STATUS_ICON[summary.status]}
          {BUDGET_MESSAGE[summary.status](summary?.budget)}
        </div>
      ) : (
        "No budget set yet."
      )}
    </>
  );
}

export default function ExpenseCard({ totalExpense }) {
  const { summary, isLoading: isLoadingBudget, loadBudget } = useBudget();

  useMemo(() => {
    loadBudget();
  }, [totalExpense])

  if (isLoadingBudget) {
    return (
      <div className="flex min-h-24 min-w-0 flex-1 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border bg-white px-1 py-1 text-center shadow-md">
        <Spinner size={14} />
        <span className="text-[9px] sm:text-xs">Loading Expense</span>
      </div>
    )
  }

  return (
    <TransactionCard
      className="text-red-700"
      name="Total Expense"
      total={totalExpense}
      footerBackgroundColor={BUDGET_STATUS_COLOR[summary?.status]}
      footerContent={<ExpenseFooter summary={summary} />}
    />
  );
}