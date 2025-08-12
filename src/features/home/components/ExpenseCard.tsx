'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ExpenseCreateForm from '@/features/expense/components/ExpenseCreateForm';

export default function ExpenseCard({
  expense,
}: {
  expense: number | undefined;
}) {
  return (
    <div>
      <Card>
        <CardHeader className="p-6 pb-4">
          <div className="grid grid-cols-[1fr_auto] items-start gap-2">
            <div>
              <CardTitle className="leading-tight">Gastos</CardTitle>
              <CardDescription className="mt-0.5">
                Gastos totais no mês
              </CardDescription>
            </div>
            <div className="justify-self-end self-start">
              <ExpenseCreateForm home={true} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">R$ {expense ?? `0,00`}</p>
        </CardContent>
      </Card>
    </div>
  );
}
