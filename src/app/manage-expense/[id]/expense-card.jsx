import { BUDGET_MESSAGE, BUDGET_STATUS_COLOR, BUDGET_STATUS_ICON } from "@/app/budgeting/components/budget-summary-card";
import { useBudget } from "@/app/budgeting/hooks/use-budget";
import { Spinner } from "@/components/ui/spinner";
import TransactionCard from "./transaction-card";

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
  const { summary, isLoading: isLoadingBudget } = useBudget();

  if (isLoadingBudget) {
    return (
      <div className="relative flex-1 flex flex-col justify-center items-center border bg-white rounded-lg shadow-md py-1 lg:py-0 overflow-hidden">
        <Spinner />
        <span>Loading Expense</span>
      </div>
    )
  }

  return (
    <TransactionCard
      className="text-red-700"
      name="Total Expense"
      total={totalExpense}
      footerBackgroundColor={BUDGET_STATUS_COLOR[summary.status]}
      footerContent={<ExpenseFooter summary={summary} />}
    />
  );
}