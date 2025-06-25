'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  amount: {
    label: 'Valor',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function SpentPerDateChart({
  chartData,
  totalSpent,
}: {
  chartData: any;
  totalSpent: number;
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Data</CardTitle>
          <CardDescription>Despesas separadas por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="amount" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
