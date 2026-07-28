'use client';

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudget } from "../hooks/use-budget";
import { Spinner } from "@/components/ui/spinner";
import { CircleAlert, CircleCheck, InfoIcon } from "lucide-react";

export const BUDGET_MESSAGE = {
  OVER: (budget) => `Oh no! You are over budget${budget ? ` for $${Number(budget).toFixed(2)}` : ''}.`,
  WARNING: (budget) => `You are getting close to your budget limit${budget ? ` of $${Number(budget).toFixed(2)}` : ''}.`,
  SAFE: (budget) => `You are staying within your budget${budget ? ` of $${Number(budget).toFixed(2)}` : ''}.`
};

export const BUDGET_STATUS_COLOR = {
  OVER: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
  WARNING: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  SAFE: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
}

export const BUDGET_STATUS_ICON = {
  OVER: <CircleAlert width={14} />,
  WARNING: <InfoIcon width={14} />,
  SAFE: <CircleCheck width={14} />,
}

export default function BudgetSummaryCard() {
  const { budget, summary, isLoading, error } = useBudget();

  if (isLoading) {
    return (
      <Card className="w-full px-2 py-4">
        <CardContent className="w-full h-72 flex flex-col items-center justify-center">
          <Spinner />
          <span className="ml-2 text-sm text-foreground/70">
            Loading insights...
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Monthly Budget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {summary ? (
          <>
            <div className="text-sm text-muted-foreground">
              Budget for {budget?.month || "this month"}
            </div>
            <div className="text-3xl font-semibold">
              ${Number(summary.budget).toFixed(2)}
            </div>
            <div className="text-sm">Spent: ${summary.spent.toFixed(2)}</div>
            <div className="text-sm">Remaining: ${summary.remaining.toFixed(2)}</div>
            <div className="text-sm font-medium">
                Status: <Badge className={BUDGET_STATUS_COLOR[summary.status]}>
                  <span className="font-semibold">{summary.status}</span>
                </Badge>
              </div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground">
            No monthly budget set yet. Create one below to start tracking your spending.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
