import { useMemo, useState } from "react";

/**
 * @typedef {{
 *  trackerId: string;
 *  monthTotal: number;
 *  categories: {};
 * }} InsightTotal
 * 
 * @typedef {{
 *  insights: string[];
 *  totals: InsightTotal
 * }} InsightResponse
 */

/**
 * @returns {{
 *  insights: string[];
 *  totals: InsightTotal;
 *  isLoading: boolean;
 *  error: ErrorOptions;
 * }} 
 */
export default function useInsight() {
  const [insights, setInsights] = useState([]);
  const [totals, setTotals] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useMemo(() => {
    // Fetch insights data from the API
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/insights');
        
        if (response.status === 401) {
          router.push('/login');
          return;
        }

        /**@type {InsightResponse} */
        const data = await response.json();
        setTotals(data?.totals || {});
        setInsights(data?.insights || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchInsights()
  }, []);

  return { insights, totals, isLoading, error };
}