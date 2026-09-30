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
      <CardContent className="flex w-full flex-col items-center justify-center gap-4 p-4 lg:flex-1 lg:min-h-0 lg:flex-row lg:items-stretch">
        {!chartData.length ? (
          <p className="text-sm text-foreground/70">
            No expenses found for the current month.
          </p>
        ) : null
        }
        <ChartContainer
          config={chartConfig}
          className="h-[240px] w-full min-w-0 lg:h-[280px] lg:flex-1"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="amount" nameKey="category" />
          </PieChart>
        </ChartContainer>
        <div className="flex w-full flex-col justify-center gap-3 lg:w-2/5 lg:min-w-0 lg:py-3">
          {chartData.map((item) => (
            <div key={item.category} className="flex min-w-0 items-center gap-2">
              <div
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="min-w-0 break-words text-sm capitalize">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
