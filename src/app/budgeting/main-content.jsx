import { Spinner } from "@/components/ui/spinner";
import React, { useEffect, useState } from "react";
import BudgetingForm from "./components/budgeting-form";
import BudgetSummaryCard from "./components/budget-summary-card";
import { useBudgeting } from "./hooks/use-budget-context";

export default function MainContent() {
  const { data, loading, error, loadBudgetingItems } = useBudgeting();
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    loadBudgetingItems();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setBudget(data[0]);
    } else {
      setBudget(null);
    }
  }, [data]);

  if (error) return <p>{error}</p>;

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Spinner />
        <span>Loading Budget...</span>
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-col w-full p-4">
      <BudgetSummaryCard budget={budget} />
      <div className="flex gap-2 flex-wrap">
        <div className="w-full max-w-[500px]">
          <BudgetingForm />
        </div>
      </div>
    </div>
  );
}
