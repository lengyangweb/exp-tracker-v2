'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';
import { commatedNumber } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRightIcon, Link } from 'lucide-react';

export const Insight = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({});
  const [insights, setInsights] = useState([]);

  useMemo(() => {
    // Fetch insights data from the API
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/insights');
        
        if (response.status === 401) {
          router.push('/login');
          return;
        }

        const data = await response.json();
        setTotals(data?.totals || {});
        setInsights(data?.insights || []);
      } catch (error) {
        console.error('Error fetching insights:', error)
      } finally {
        setLoading(false);
      }
    }

    fetchInsights()
  }, []);

  if (loading && insights.length === 0) {
    return (
      <Card className="w-full px-2 py-4">
        <CardContent className="w-full h-32 flex flex-col items-center justify-center">
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
      <Card className="w-full px-2 py-4">
        {!loading && (
          <>
            <div className="flex flex-col px-4 py-0">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-xl font-semibold mb-2">
                  This Month's Summary
                </h2>
                {totals.trackerId && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/manage-expense/${totals.trackerId}`)
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
            <CardContent className="px-4 py-0">
              { totals.trackerId && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium">
                    Total Expenses: $
                    {commatedNumber(totals.monthTotal)}
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
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}
