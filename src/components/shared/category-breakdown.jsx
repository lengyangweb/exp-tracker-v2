import { Spinner } from "../ui/spinner";
import { Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";
import useCategoryBreakdown from "@/app/hooks/use-category-breakdown";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  getChartConfig,
  mappedChartData,
} from "@/utils/category-breakdown-chart";

export const description = "A simple pie chart";

export default function CategoryBreakdown() {
  const { data, isLoading, error } = useCategoryBreakdown();
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    if (!data) return;

    const chartData = mappedChartData(data.breakdown);
    const chartConfigTemp = getChartConfig(data.breakdown);
    setChartData(chartData);
    setChartConfig(chartConfigTemp);
  }, [data]);

  if (isLoading) {
    return (
      <Card className="w-full p-0">
        <CardContent className="w-full h-103 flex flex-col items-center justify-center">
          <Spinner />
          <span className="ml-2 text-sm text-foreground/70">
            Loading insights...
          </span>
        </CardContent>
      </Card>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription className="text-xs">
          A visual breakdown of total expenses by category for the current
          month.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col  items-center justify-center p-2">
        <ChartContainer
          config={chartConfig}
          className="w-full md:w-1/2 h-full"
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
      <CardFooter className="w-full flex justify-center">
        <div className="mb-4 flex flex-wrap md:mt-4 md:flex-nowrap gap-4">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm capitalize">{item.category}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
