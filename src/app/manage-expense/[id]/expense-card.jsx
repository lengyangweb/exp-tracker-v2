import { BUDGET_MESSAGE, BUDGET_STATUS_COLOR } from "@/app/budgeting/components/budget-summary-card";
import { useBudget } from "@/app/budgeting/hooks/use-budget";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

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
    // <TransactionCard className="text-red-700" name="Total Expense" total={totalExpense} />
    <div className="relative flex-1 flex flex-col justify-center items-center border bg-white rounded-lg shadow-md py-1 lg:py-0 overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center gap-1 lg:gap-2">
        <span className="uppercase text-center text-xs sm:text-sm">Total Expense</span>
        <span className={`font-bold lg:text-lg text-red-700`}>
          ${totalExpense || "0.00"}
        </span>
      </div>
        <div className={
          cn(
            "absolute inset-x-0 bottom-0 bg-red-300/90 text-xs font-semibold text-center py-1",
            summary?.status ? BUDGET_STATUS_COLOR[summary.status] : 'bg-slate-100 text-slate-700'
          )
        }>
          {summary?.status
            ? BUDGET_MESSAGE[summary.status](summary?.budget)
            : 'No budget set yet.'}
        </div>
    </div>
  );
}