'use client';

import { toast } from 'sonner';
import { useEffect, useState } from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from '../ui/spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRouter } from 'next/navigation';

const MonthlyChart = () => {
  const router = useRouter();
  const [year, setYear] = useState('2026');
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([])

  useEffect(() => {
    // Placeholder for future side effects or data fetching
    const getChartData = async () => {
      // Future implementation for fetching chart data
      try {
        const response = await fetch(`/api/analytics/monthly-spending?year=${year}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        if (response.status === 401) {
          router.push('/login');
          return;
        }
        
        const data = await response.json();
        setMonthlyData(data.monthlySpending);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        toast.error('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    }

    getChartData();
  }, [year]);

  /**
   * Change handler for year selection
   * @param {string} newYear 
   */
  const onYearChange = (newYear) => {
    setYear(newYear);
    setLoading(true);
  }

  if (loading) {
    return <div className="flex flex-col items-center justify-center h-72 border shadow-md rounded-md">
      <Spinner size={24} />
      <span>Loading chart...</span>
    </div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Monthly Spending</span>
          <Select onValueChange={onYearChange} defaultValue={year}>
            <SelectTrigger>
              <SelectValue defaultValue="2026" placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString()}`}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default MonthlyChart