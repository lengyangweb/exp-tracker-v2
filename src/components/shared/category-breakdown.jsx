import { Spinner } from "../ui/spinner";
import { Pie, PieChart } from "recharts"
import { useEffect, useState } from "react";
import useCategoryBreakdown from "@/app/hooks/use-category-breakdown";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getChartConfig, mappedChartData } from "@/utils/category-breakdown-chart";

export const description = "A simple pie chart"

export default function CategoryBreakdown() {
  const { data, isLoading, error } = useCategoryBreakdown();
  const [chartData, setChartData] = useState({});
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    if (!data) return;

    const chartData = mappedChartData(data.breakdown);
    const chartConfigTemp = getChartConfig(data.breakdown);
    setChartData(chartData);
    setChartConfig(chartConfigTemp);
  }, [data])

  if (isLoading) {
    return (
      <Card className="w-full p-0">
        <CardContent className="w-full h-32 flex flex-col items-center justify-center">
          <Spinner />
          <span className="ml-2 text-sm text-foreground/70">
            Loading insights...
          </span>
        </CardContent>
      </Card>
    );
  }

  if (error) return <p>{error}</p>
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription className='text-xs'>A visual breakdown of total expenses by category for the current month.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="amount" nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">

      </CardFooter>
    </Card>
  );
}