export type BudgetStatus =  "OVER" | "WARNING" | "SAFE";

export interface Budget {
  id?: string;
  userId?: string;
  month: string;
  year: number;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  spent?: number;
  remaining?: number;
  isOverBudget?: boolean;
}

export interface BudgetSummary {
  budget: number;
  spent: number;
  remaining: number;
  status: BudgetStatus;
}