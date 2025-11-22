'use client'

import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { commatedNumber } from '@/utils/utils';
import { fi } from 'date-fns/locale';
import { Car } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react'

export const Insight = () => {
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({});
  const [insights, setInsights] = useState([]);

  useMemo(() => {
    // Fetch insights data from the API
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/insights')
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

  return (
    <>
      {loading && (
        <Card className="w-full px-2 py-4">
          <CardContent className="w-full h-32 flex flex-col items-center justify-center">
            <Spinner />
            <span className="ml-2 text-sm text-foreground/70">
              Loading insights...
            </span>
          </CardContent>
        </Card>
      )}

      {!insights.length === 0 && (
        <Card className="w-full px-2 py-4">
          <CardContent className="w-full h-32 flex items-center justify-center"> 
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-2xl font-semibold">
                Insights Page - Coming Soon!
              </h1>
            </div>
          </CardContent>
        </Card>
      )}

      {insights.length > 0 && (
        <Card className="w-full px-2 py-4">
          {!loading && (
            <>
              <div className="flex flex-col px-4 py-0">
                <h2 className="text-xl font-semibold mb-2">
                  This Month's Summary
                </h2>
                <span className="text-sm text-foreground/70">
                  Insights based on your expenses for the current month.
                </span>
              </div>
              <CardContent className="px-4 py-0">
                <p className="text-lg">
                  Total Expenses: ${commatedNumber(totals.monthTotal.toFixed(2))}
                </p>
                <div className="space-y-1">
                  {insights.map((insight, index) => (
                    <p key={index} className="text-sm">
                      - {insight}
                    </p>
                  ))}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </>
  );
}
