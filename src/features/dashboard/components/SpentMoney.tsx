"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/mask-real";

export function SpentMoney({ chartData }: { chartData: any }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Valor Gasto</CardTitle>
          <CardDescription>Saldo Mensal</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total Ganho: {formatCurrency(chartData.total_incomes)}</p>
          <p>Total Gasto: {formatCurrency(chartData.total_expenses)}</p>
        </CardContent>
        <CardFooter>
          <p>Diferença: {formatCurrency(chartData.total)}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
