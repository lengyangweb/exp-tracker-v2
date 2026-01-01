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

const MonthlyChart = () => {
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([])

  useEffect(() => {
    // Placeholder for future side effects or data fetching
    const getChartData = async () => {
      // Future implementation for fetching chart data
      try {
        const response = await fetch('/api/analytics/monthly-spending?year=2025');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
  }, []);

  if (loading) {
    return <div className="flex flex-col items-center justify-center h-72 border shadow-md rounded-md">
      <Spinner size={24} />
      <span>Loading chart...</span>
    </div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                `$${Number(value).toLocaleString()}`
              }
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default MonthlyChart