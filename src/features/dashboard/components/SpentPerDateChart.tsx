"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getExpensesPerMonth } from "../api/get-expenses-per-month";
import Loader from "@/components/loading";

const chartConfig = {
  amount: {
    label: "Valor",
    color: "hsl(var(--chart-3))",
  },

} satisfies ChartConfig

export function SpentPerDateChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        const data = await getExpensesPerMonth();
        setChartData(data.dates);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChartData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Data</CardTitle>
            <CardDescription>Janeiro - 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="date"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={125}
                />
                <XAxis dataKey="amount" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="amount"
                  layout="vertical"
                  fill="var(--color-amount)"
                  radius={4}
                >
                  <LabelList
                    dataKey="amount"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}