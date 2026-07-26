import useCategoryBreakdown from "@/app/hooks/use-category-breakdown";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Spinner } from "../ui/spinner";

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { useEffect, useState } from "react";

const fillColor = {
  bills: 'blue',
  miscellaneous: 'green',
  utilities: 'yellow',
}

export const description = "A simple pie chart"
const chartDatas = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]
const chartConfigs = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
};

export default function CategoryBreakdown() {
  const { data, isLoading, error } = useCategoryBreakdown();
  const [chartData, setChartData] = useState({});
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    if (!data) return;
    const chartData = data.breakdown.reduce((acc, row) => {
      return ([        
        ...acc, 
        {
          category: row.category,
          amount: row.amount,
          fill: fillColor[row.category],
        }
      ])
    }
    , []);

    const chartConfigTemp = data.breakdown.reduce((acc, row) => {
      if (row.category === 'bills') {
        return {
          ...acc,
          bills: {
            label: row.category,
            color: 'var(--chart-1)'
          }
        }
      }

      if (row.category === 'miscellaneous') {
        return {
          ...acc,
          miscellaneous: {
            label: 'misc',
            color: 'var(--chart-2)'
          }
        }
      }

      if (row.category === 'utilities') {
        return {
          ...acc,
          utilities: {
            label: 'util',
            color: 'var(--chart-3)'
          }
        }
      }

      return acc;
    }, { amounts: { label: 'Amounts'}});

    console.log(chartData);
    console.log(chartConfigTemp);
    setChartData(chartData);
    setChartConfig(chartConfigTemp);
  }, [data])

  if (isLoading) {
    return(
      <div className="w-full h-full flex flex-col items-center">
        <Spinner />
        Loading Breakdown...
      </div>
    )
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus explicabo tenetur pariatur cum quia veritatis esse officia! Repellat perspiciatis ullam eaque veniam? Voluptatibus eum molestiae facilis. Vel minima iure quia.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* <Pie data={chartData} dataKey="visitors" nameKey="browser" /> */}
            <Pie data={chartData} dataKey="amount" nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}