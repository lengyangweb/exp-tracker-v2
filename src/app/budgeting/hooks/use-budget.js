import { useEffect, useMemo, useState } from "react";

/**
 * @returns {{
 *  budget: import("@/app/types/budget").Budget;
 *  summary: import("@/app/types/budget").BudgetSummary;
 *  isLoading: boolean;
 *  error: any;
 * }}
 */
export function useBudget() {
  const [budget, setBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    loadBuget();
  }, [])

  async function loadBuget() {
    setIsLoading(true);
    try {
      const currentDate = new Date();
      const month = currentDate.toISOString().slice(0, 7);
      const year = currentDate.getFullYear();
      const response = await fetch(`/api/budgets?month=${month}&year=${year}`);

      if (!response.ok) {
        throw new Error('Unable to fetch budget');
      }

      const result = await response.json();
      setBudget(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  const summary = useMemo(() => {
    if (!budget) return null;

    const spent = Number(budget.spent || 0);
    const remaining = Number(budget.remaining ?? Number(budget.amount || 0) - spent);
    const status = remaining < 0 
      ? "OVER" 
      : remaining < Number(budget.amount || 0) * 0.8 
      ? "WARNING" 
      : "SAFE";

    return { budget: budget.amount, spent, remaining, status };
  }, [budget]);

  return { budget, summary, isLoading, error };
}