'use client'

import { useRouter } from 'next/navigation';
import { commatedNumber } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRightIcon } from 'lucide-react';
import { useBudget } from '@/app/budgeting/hooks/use-budget';
import { BUDGET_MESSAGE, BUDGET_STATUS_COLOR, BUDGET_STATUS_ICON } from '@/app/budgeting/components/budget-summary-card';
import { cn } from '@/lib/utils';
import useInsight from '@/app/hooks/use-insight';

export const Insight = () => {
  const { insights, totals, isLoading: isLoadingInsights } = useInsight();
  const { summary, isLoading: isLoadingBudget } = useBudget();
  const router = useRouter();

  const loading = (isLoadingInsights && isLoadingBudget);

  if (loading) {
    return (
      <Card className="w-full p-0">
        <CardContent className="w-full h-68 flex flex-col items-center justify-center">
          <Spinner />
          <span className="ml-2 text-sm text-foreground/70">
            Loading insights...
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full p-0">
          <>
            <div className="flex flex-col px-4 pt-4">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-xl font-semibold mb-4">
                  This Month's Summary
                </h2>
                {totals?.trackerId && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/manage-expense/${totals?.trackerId}`)
                    }
                  >
                    <div className='flex gap-2 items-center'>
                      <span>View Details</span>
                      <ChevronRightIcon />
                    </div>
                  </Button>
                )}
              </div>
              <span className="text-sm text-foreground/70">
                Insights based on your expenses for the current month.
              </span>
            </div>
            <CardContent className="p-0">
              <div className="px-4 pb-4">
                { totals?.trackerId && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">
                      Total Expenses: $
                      {commatedNumber(totals?.monthTotal)}
                    </h3>
                  </div>
                ) }
                <div className="space-y-1">
                  {insights.map((insight, index) => (
                    <p key={index} className="text-xs sm:text-sm text-foreground/80">
                      - {insight}
                    </p>
                  ))}
                </div>
              </div>
              {summary && (
                <div className={
                  cn(
                    "inset-x-0 bottom-0 bg-red-300/90 text-xs font-semibold px-4 py-1 border-t border-b border-muted/70 rounded-b-md",
                    summary?.status ? BUDGET_STATUS_COLOR[summary.status] : 'bg-slate-100 text-slate-700'
                  )
                }>
                  {summary?.status
                    ? (
                      <div className="flex gap-1 items-center">
                        {BUDGET_STATUS_ICON[summary.status]}
                        <span>{BUDGET_MESSAGE[summary.status](summary?.budget)}</span>
                      </div>
                    )
                    : 'No budget set yet.'}
                </div>
              )}
            </CardContent>
          </>
      </Card>
    </>
  );
}
