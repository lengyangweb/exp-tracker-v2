import { useEffect, useState } from "react";
import { getRecurringExpenses } from "./recurring-api";

/**
 * @returns {{
 *    recurring: Array<import("../types/reocurring").Recurring>;
 *    isLoading: boolean;
 *    error: any;
 * }}
 */
export function useLoadRecurring() {
  const [recurring, setRecurring] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoading) return;
    fetchRecurring();
  }, [])

  async function fetchRecurring() {
    try {
      const result = await getRecurringExpenses();
      setRecurring(result);
    } catch (error) {
      console.error('Failed to fetch recurring items.', error);
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }

  return { recurring, isLoading, error };
}