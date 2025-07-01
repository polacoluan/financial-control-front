'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BanknoteArrowDownIcon } from 'lucide-react';

export default function IncomeCard({ income }: { income: number | undefined }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Ganhos <BanknoteArrowDownIcon className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Ganhos totais no mês</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">R$ {income ?? `0,00`}</p>
        </CardContent>
      </Card>
    </div>
  );
}
