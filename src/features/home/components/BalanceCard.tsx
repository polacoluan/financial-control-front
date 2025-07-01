'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BanknoteIcon } from 'lucide-react';

export default function BalanceCard({
  balance,
}: {
  balance: number | undefined;
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Saldo <BanknoteIcon className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Salto total no mês</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">R$ {balance ?? `0,00`}</p>
        </CardContent>
      </Card>
    </div>
  );
}
