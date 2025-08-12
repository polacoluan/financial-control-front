'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import IncomeCreateForm from '@/features/income/components/IncomeCreateForm';

export default function IncomeCard({ income }: { income: number | undefined }) {
  return (
    <div>
      <Card>
        <CardHeader className="p-6 pb-4">
          <div className="grid grid-cols-[1fr_auto] items-start gap-2">
            <div>
              <CardTitle className="leading-tight">Ganhos</CardTitle>
              <CardDescription className="mt-0.5">
                Ganhos totais no mês
              </CardDescription>
            </div>
            <div className="justify-self-end self-start">
              <IncomeCreateForm home={true} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">R$ {income ?? `0,00`}</p>
        </CardContent>
      </Card>
    </div>
  );
}
