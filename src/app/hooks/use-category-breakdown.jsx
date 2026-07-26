import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * @returns {{
 *  data: {
 *    breakdown: {category: string; amount: number;}[];
 *    totalSpent: number;
 *  };
 *  isLoading: boolean;
 *  error: ErrorOptions;
 * }}
 */
export default function useCategoryBreakdown() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCategoryBreakdown() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/insights/category-breakdown');
      if (!response.ok) throw new Error(`Failed to fetch category breakdow.`);
      if (response.status === 401) return router.push('/login');

      const data = await response.json();
      console.log('data', data);
      setData(data);
    } catch (error) {
      setError(error);     
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoryBreakdown();
  }, []);

  return { data, isLoading, error };
}